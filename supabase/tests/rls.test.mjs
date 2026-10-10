// Testes das políticas de acesso (RLS) num Postgres local (PGlite), sem precisar de um projeto Supabase.
// Rode com: npm run test:db
import { test, before } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { PGlite } from '@electric-sql/pglite'

const dir = new URL('../', import.meta.url)
const db = new PGlite()
let ana, bia

/** Executa como uma participante logada (papel authenticated, com o "sub" do JWT). */
async function as(userId, fn) {
  await db.exec(`reset role; select set_config('request.jwt.claim.sub', '${userId ?? ''}', false); set role ${userId ? 'authenticated' : 'anon'};`)
  try {
    return await fn()
  } finally {
    await db.exec('reset role;')
  }
}
const rows = async (sql, params) => (await db.query(sql, params)).rows
const affected = async (sql, params) => (await db.query(sql, params)).affectedRows

before(async () => {
  await db.exec(readFileSync(new URL('tests/supabase-stub.sql', dir), 'utf8'))
  for (const file of readdirSync(new URL('migrations/', dir)).sort()) {
    await db.exec(readFileSync(new URL(`migrations/${file}`, dir), 'utf8'))
  }
  ;[{ id: ana }] = await rows(`insert into auth.users (email, raw_user_meta_data) values ('ana@exemplo.com', '{"display_name":"Ana"}') returning id`)
  ;[{ id: bia }] = await rows(`insert into auth.users (email, raw_user_meta_data) values ('bia@exemplo.com', '{"display_name":"Bia"}') returning id`)
})

test('o cadastro cria perfil e configurações', async () => {
  const [profile] = await rows('select display_name, onboarding_completed from public.profiles where id = $1', [ana])
  assert.deepEqual(profile, { display_name: 'Ana', onboarding_completed: false })
  assert.equal((await rows('select 1 from public.participant_settings where user_id = $1', [ana])).length, 1)
})

test('perfis: cada uma vê e edita só o próprio', async () => {
  await as(ana, async () => {
    const visible = await rows('select id from public.profiles')
    assert.deepEqual(visible.map((r) => r.id), [ana])
    assert.equal(await affected(`update public.profiles set display_name = 'Invadido' where id = $1`, [bia]), 0)
    assert.equal(await affected(`update public.profiles set preferred_name = 'Aninha', onboarding_completed = true where id = $1`, [ana]), 1)
    await assert.rejects(db.query(`update public.profiles set id = $1 where id = $2`, [bia, ana]), /permission denied/)
    await assert.rejects(db.query(`insert into public.profiles (id) values ($1)`, [bia]), /row-level security|duplicate key/)
    assert.equal(await affected(`delete from public.profiles where id = $1`, [ana]).catch(() => 0), 0)
  })
  const [b] = await rows('select display_name from public.profiles where id = $1', [bia])
  assert.equal(b.display_name, 'Bia')
})

test('diário: outra conta não lê, não edita, não exclui e não cria em nome de outra', async () => {
  const [entry] = await as(ana, () => rows(`insert into public.journal_entries (body, day) values ('Texto íntimo da Ana', 2) returning id, user_id`))
  assert.equal(entry.user_id, ana)
  await as(bia, async () => {
    assert.equal((await rows('select * from public.journal_entries')).length, 0)
    assert.equal((await rows('select * from public.journal_entries where id = $1', [entry.id])).length, 0)
    assert.equal(await affected(`update public.journal_entries set body = 'alterado' where id = $1`, [entry.id]), 0)
    assert.equal(await affected('delete from public.journal_entries where id = $1', [entry.id]), 0)
    await assert.rejects(db.query(`insert into public.journal_entries (user_id, body) values ($1, 'falso')`, [ana]), /row-level security/)
    await assert.rejects(db.query(`update public.journal_entries set user_id = $1`, [ana]), /permission denied/)
  })
  await as(ana, async () => {
    const [own] = await rows('select body from public.journal_entries where id = $1', [entry.id])
    assert.equal(own.body, 'Texto íntimo da Ana')
    assert.equal(await affected(`update public.journal_entries set body = 'Editado pela Ana' where id = $1`, [entry.id]), 1)
    const [after] = await rows('select created_at < updated_at as touched from public.journal_entries where id = $1', [entry.id])
    assert.equal(after.touched, true)
  })
})

test('diário: texto vazio e dia inválido são recusados', async () => {
  await as(ana, async () => {
    await assert.rejects(db.query(`insert into public.journal_entries (body) values ('   ')`), /check constraint/)
    await assert.rejects(db.query(`insert into public.journal_entries (body, day) values ('ok', 22)`), /check constraint/)
  })
})

test('progresso: isolamento por conta e regras de estado', async () => {
  await as(ana, async () => {
    await db.query(`insert into public.practice_progress (day, moment, state) values (1, 'despertar', 'iniciado')`)
    await db.query(
      `insert into public.practice_progress (day, moment, state, completed_at) values (1, 'integrar', 'concluido', now())
       on conflict (user_id, day, moment) do update set state = excluded.state, completed_at = excluded.completed_at`,
    )
    await assert.rejects(db.query(`insert into public.practice_progress (day, moment, state) values (2, 'despertar', 'concluido')`), /check constraint/)
    await assert.rejects(db.query(`insert into public.practice_progress (day, moment, state) values (1, 'tarde', 'iniciado')`), /check constraint/)
    assert.equal((await rows('select * from public.practice_progress')).length, 2)
  })
  await as(bia, async () => {
    assert.equal((await rows('select * from public.practice_progress')).length, 0)
    assert.equal(await affected(`update public.practice_progress set state = 'iniciado', completed_at = null`), 0)
    assert.equal(await affected('delete from public.practice_progress'), 0)
    await assert.rejects(db.query(`insert into public.practice_progress (user_id, day, moment, state) values ($1, 3, 'presenca', 'iniciado')`, [ana]), /row-level security/)
  })
})

test('visitante sem login (anon) não acessa nada', async () => {
  await as(null, async () => {
    for (const table of ['profiles', 'participant_settings', 'practice_progress', 'journal_entries', 'library_articles']) {
      await assert.rejects(db.query(`select * from public.${table}`), /permission denied/, table)
    }
    await assert.rejects(db.query('select public.delete_my_account()'), /permission denied/)
  })
})

test('conteúdos: só os publicados aparecem e ninguém escreve pelo site', async () => {
  await db.exec(`
    insert into public.library_categories (id, name, evidence) values ('respiracao', 'Respiração', 'ciencia');
    insert into public.library_articles (id, category_id, title, status) values ('a1', 'respiracao', 'Publicado', 'publicado'), ('a2', 'respiracao', 'Rascunho', 'pendente');
    insert into public.audio_practices (id, title, category, status) values ('au1', 'Em produção', 'Relaxamento', 'pendente');
  `)
  await assert.rejects(db.query(`insert into public.audio_practices (id, title, category, status) values ('au2', 'x', 'y', 'publicado')`), /check constraint/)
  await as(ana, async () => {
    assert.deepEqual((await rows('select id from public.library_articles')).map((r) => r.id), ['a1'])
    assert.equal((await rows('select * from public.audio_practices')).length, 0)
    await assert.rejects(db.query(`insert into public.library_articles (id, category_id, title) values ('a3', 'respiracao', 'x')`), /permission denied/)
    await assert.rejects(db.query(`update public.library_articles set title = 'x'`), /permission denied/)
  })
})

test('excluir a conta apaga todos os dados dela e nada da outra', async () => {
  await as(bia, () => db.query(`insert into public.journal_entries (body) values ('Registro da Bia')`))
  await as(ana, () => db.query('select public.delete_my_account()'))
  for (const [table, column] of [['profiles', 'id'], ['participant_settings', 'user_id'], ['practice_progress', 'user_id'], ['journal_entries', 'user_id']]) {
    assert.equal((await rows(`select 1 from public.${table} where ${column} = $1`, [ana])).length, 0, table)
  }
  assert.equal((await rows('select 1 from auth.users where id = $1', [ana])).length, 0)
  assert.equal((await rows('select 1 from public.journal_entries where user_id = $1', [bia])).length, 1)
  assert.equal((await rows('select 1 from public.profiles where id = $1', [bia])).length, 1)
})
