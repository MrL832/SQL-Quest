import { CheckIcon, LockIcon } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { CHALLENGES } from '@/lib/challenges'
import { cn } from '@/lib/utils'

interface LevelStepperProps {
  currentChallengeId: string
  unlockedLevel: number
  completedChallengeIds: string[]
  onSelect: (challengeId: string) => void
}

export function LevelStepper({
  currentChallengeId,
  unlockedLevel,
  completedChallengeIds,
  onSelect,
}: LevelStepperProps) {
  return (
    <nav aria-label="Quest levels" className="border-b bg-muted/40">
      <ol className="mx-auto flex w-full max-w-[1400px] items-stretch gap-1 overflow-x-auto px-4 py-2 sm:px-6">
        {CHALLENGES.map((challenge) => {
          const isLocked = challenge.level > unlockedLevel
          const isCompleted = completedChallengeIds.includes(challenge.id)
          const isActive = challenge.id === currentChallengeId

          return (
            <li key={challenge.id}>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <button
                      type="button"
                      disabled={isLocked}
                      aria-current={isActive ? 'step' : undefined}
                      onClick={() => onSelect(challenge.id)}
                      className={cn(
                        'flex w-44 items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left transition-colors outline-none',
                        'focus-visible:ring-3 focus-visible:ring-ring/50',
                        isActive
                          ? 'bg-background shadow-xs ring-1 ring-border'
                          : 'hover:bg-background/70',
                        isLocked && 'cursor-not-allowed opacity-50 hover:bg-transparent',
                      )}
                    >
                      <span
                        className={cn(
                          'flex size-6 shrink-0 items-center justify-center rounded-md text-xs font-semibold tabular-nums',
                          isCompleted && 'bg-success text-success-foreground',
                          !isCompleted && isActive && 'bg-primary text-primary-foreground',
                          !isCompleted && !isActive && 'bg-muted text-muted-foreground',
                        )}
                      >
                        {isCompleted ? (
                          <CheckIcon className="size-3.5" />
                        ) : isLocked ? (
                          <LockIcon className="size-3" />
                        ) : (
                          challenge.level
                        )}
                      </span>

                      <span className="flex min-w-0 flex-col">
                        <span
                          className={cn(
                            'truncate text-xs font-medium',
                            !isActive && 'text-muted-foreground',
                          )}
                        >
                          {challenge.codename}
                        </span>
                        <span className="truncate text-[0.6875rem] text-muted-foreground">
                          Level {challenge.level}
                        </span>
                      </span>
                    </button>
                  }
                />
                <TooltipContent>
                  {isLocked
                    ? `Complete level ${challenge.level - 1} to unlock this`
                    : challenge.title}
                </TooltipContent>
              </Tooltip>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
