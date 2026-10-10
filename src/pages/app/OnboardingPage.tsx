import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormAlert } from '@/components/feedback/FormAlert'
import { WelcomeStep } from '@/components/onboarding/WelcomeStep'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ChoiceGroup } from '@/components/ui/ChoiceGroup'
import { ProgressIndicator } from '@/components/ui/ProgressIndicator'
import { TextField } from '@/components/ui/TextField'
import { paths } from '@/config/routes'
import { availabilityChoices, intentionChoices, onboardingContent } from '@/data/onboarding'
import { useAuth } from '@/hooks/useAuth'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { authErrorMessage } from '@/services/auth'
import type { Availability } from '@/types/user'

const STEPS = ['boas-vindas', 'nome', 'intencao', 'disponibilidade'] as const
type Step = (typeof STEPS)[number]

/**
 * Onboarding da primeira entrada: acolhimento + três perguntas curtas e puláveis.
 * Ao concluir, marca o onboarding como feito e leva ao painel.
 */
export function OnboardingPage() {
  useDocumentTitle('Boas-vindas')
  const { session, updateProfile } = useAuth()
  const navigate = useNavigate()
  const displayName = session?.user.displayName ?? ''

  const [stepIndex, setStepIndex] = useState(0)
  const [preferredName, setPreferredName] = useState(session?.user.preferences.preferredName ?? displayName)
  const [intention, setIntention] = useState<string | undefined>(session?.user.preferences.intention)
  const [availability, setAvailability] = useState<Availability | undefined>(session?.user.preferences.availability)
  const [formError, setFormError] = useState<string>()
  const [isSaving, setIsSaving] = useState(false)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const isFirstRender = useRef(true)

  const step: Step = STEPS[stepIndex]
  const isLastStep = stepIndex === STEPS.length - 1

  // A cada etapa, o foco vai para o título, para quem usa teclado ou leitor de tela saber onde está.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    headingRef.current?.focus()
  }, [stepIndex])

  async function finish(answers: { intention?: string; availability?: Availability }) {
    setFormError(undefined)
    setIsSaving(true)
    try {
      await updateProfile({
        onboardingCompleted: true,
        preferences: {
          preferredName: preferredName.trim() || displayName,
          intention: answers.intention,
          availability: answers.availability,
        },
      })
      navigate(paths.dashboard, { replace: true })
    } catch (error) {
      setFormError(authErrorMessage(error))
      setIsSaving(false)
    }
  }

  /** Avança uma etapa; "pular" apaga a resposta da pergunta atual. Na última etapa, salva tudo. */
  function next(skip = false) {
    const nextIntention = step === 'intencao' && skip ? undefined : intention
    const nextAvailability = step === 'disponibilidade' && skip ? undefined : availability
    setIntention(nextIntention)
    setAvailability(nextAvailability)
    if (isLastStep) {
      void finish({ intention: nextIntention, availability: nextAvailability })
      return
    }
    setStepIndex((index) => index + 1)
  }

  const titles: Record<Step, string> = {
    'boas-vindas': onboardingContent.welcome.title,
    nome: 'Seu nome',
    intencao: 'Sua intenção',
    disponibilidade: 'Seu momento do dia',
  }

  return (
    <Card className="sm:p-10">
      <ProgressIndicator
        label="Primeiros passos"
        value={stepIndex + 1}
        max={STEPS.length}
        valueText={`Etapa ${stepIndex + 1} de ${STEPS.length}`}
      />

      <h1 ref={headingRef} tabIndex={-1} className="mt-8 text-titulo-1 focus-visible:outline-none">
        {titles[step]}
      </h1>

      <form
        className="mt-6"
        onSubmit={(event) => {
          event.preventDefault()
          next()
        }}
      >
        {formError && (
          <div className="mb-5">
            <FormAlert>{formError}</FormAlert>
          </div>
        )}

        {step === 'boas-vindas' && <WelcomeStep name={displayName} />}

        {step === 'nome' && (
          <TextField
            label={onboardingContent.name.title}
            hint={onboardingContent.name.hint}
            name="preferredName"
            autoComplete="nickname"
            maxLength={60}
            value={preferredName}
            onChange={(event) => setPreferredName(event.target.value)}
          />
        )}

        {step === 'intencao' && (
          <ChoiceGroup
            legend={onboardingContent.intention.title}
            hint={onboardingContent.intention.hint}
            name="intention"
            choices={intentionChoices}
            value={intention}
            onChange={setIntention}
          />
        )}

        {step === 'disponibilidade' && (
          <ChoiceGroup
            legend={onboardingContent.availability.title}
            hint={onboardingContent.availability.hint}
            name="availability"
            choices={availabilityChoices}
            value={availability}
            onChange={setAvailability}
          />
        )}

        <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          {stepIndex > 0 ? (
            <Button variant="ghost" onClick={() => setStepIndex((index) => index - 1)} disabled={isSaving}>
              Voltar
            </Button>
          ) : (
            <span />
          )}
          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            {(step === 'intencao' || step === 'disponibilidade') && (
              <Button variant="secondary" onClick={() => next(true)} disabled={isSaving}>
                Pular esta pergunta
              </Button>
            )}
            <Button type="submit" isLoading={isSaving}>
              {step === 'boas-vindas'
                ? onboardingContent.welcome.cta
                : isLastStep
                  ? isSaving
                    ? 'Salvando…'
                    : onboardingContent.finish
                  : 'Continuar'}
            </Button>
          </div>
        </div>
      </form>
    </Card>
  )
}
