import { DatabaseIcon } from 'lucide-react'
import { ModeToggle } from '@/components/mode-toggle'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'

interface AppHeaderProps {
  completedCount: number
  totalCount: number
}

export function AppHeader({ completedCount, totalCount }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-sm">
      <div className="mx-auto flex h-14 w-full max-w-[1400px] items-center gap-3 px-4 sm:px-6">
        <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <DatabaseIcon className="size-4" />
        </span>

        <div className="flex min-w-0 flex-col">
          <span className="text-sm leading-tight font-semibold">SQL Quest</span>
          <span className="hidden text-xs leading-tight text-muted-foreground sm:block">
            AQA GCSE database practice
          </span>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden items-center gap-2.5 sm:flex">
            <span className="text-xs text-muted-foreground tabular-nums">
              {completedCount} of {totalCount} complete
            </span>
            <Progress
              value={(completedCount / totalCount) * 100}
              className="w-24"
              aria-label={`${completedCount} of ${totalCount} levels complete`}
            />
          </div>

          <Separator orientation="vertical" className="hidden h-5 sm:block" />

          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
