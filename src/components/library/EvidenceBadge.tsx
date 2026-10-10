import { Badge } from '@/components/ui/Badge'
import { evidenceInfo } from '@/data/library'
import type { EvidenceLevel } from '@/types/library'

export function EvidenceBadge({ level }: { level: EvidenceLevel }) {
  return <Badge tone={level === 'ciencia' || level === 'ciencia-em-desenvolvimento' ? 'oliva' : 'neutro'}>{evidenceInfo[level].label}</Badge>
}
