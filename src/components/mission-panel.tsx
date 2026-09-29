import { useState } from 'react'
import { ChevronDownIcon, LightbulbIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import type { SqlChallenge } from '@/types'

interface MissionPanelProps {
  challenge: SqlChallenge
  isCompleted: boolean
}

export function MissionPanel({ challenge, isCompleted }: MissionPanelProps) {
  const [isHintOpen, setIsHintOpen] = useState(false)

  return (
    <Card>
      <CardHeader>
        <CardDescription>
          Level {challenge.level} &middot; {challenge.codename}
        </CardDescription>
        <CardTitle className="text-xl">{challenge.title}</CardTitle>
        {isCompleted ? (
          <CardAction>
            <Badge variant="outline" className="border-success/40 text-success">
              Completed
            </Badge>
          </CardAction>
        ) : null}
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <p className="text-muted-foreground">{challenge.story}</p>

        <div className="rounded-lg border border-primary/25 bg-primary/5 p-3">
          <p className="mb-1 text-xs font-medium tracking-wide text-primary uppercase">
            Your task
          </p>
          <p className="font-medium text-pretty">{challenge.mission}</p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-muted-foreground">Keywords</span>
          {challenge.focus.map((keyword) => (
            <Badge key={keyword} variant="secondary" className="font-mono text-xs">
              {keyword}
            </Badge>
          ))}
        </div>

        <Collapsible open={isHintOpen} onOpenChange={setIsHintOpen}>
          <CollapsibleTrigger
            render={
              <Button variant="ghost" size="sm" className="-ml-2.5">
                <LightbulbIcon data-icon="inline-start" />
                {isHintOpen ? 'Hide hint' : 'Stuck? Show a hint'}
                <ChevronDownIcon
                  data-icon="inline-end"
                  className={isHintOpen ? 'rotate-180 transition-transform' : 'transition-transform'}
                />
              </Button>
            }
          />
          <CollapsibleContent>
            <p className="mt-2 rounded-lg border border-dashed bg-muted/50 p-3 text-muted-foreground">
              {challenge.hint}
            </p>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}
