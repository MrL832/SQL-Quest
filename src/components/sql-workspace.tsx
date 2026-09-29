import { useRef } from 'react'
import { CheckCircle2Icon, InfoIcon, PlayIcon, RotateCcwIcon, TriangleAlertIcon } from 'lucide-react'
import { DataTable } from '@/components/data-table'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@/components/ui/empty'
import { Kbd, KbdGroup } from '@/components/ui/kbd'
import { Spinner } from '@/components/ui/spinner'
import type { ExecutionFeedback, TableData } from '@/types'

const FEEDBACK_PRESENTATION = {
  success: { variant: 'success', title: 'Correct', icon: CheckCircle2Icon },
  error: { variant: 'destructive', title: 'Not quite yet', icon: TriangleAlertIcon },
  info: { variant: 'default', title: 'Ready', icon: InfoIcon },
} as const

interface SqlWorkspaceProps {
  value: string
  isRunning: boolean
  resultTitle: string
  resultTable: TableData | null
  feedback: ExecutionFeedback | null
  onChange: (value: string) => void
  onRun: () => void
  onReset: () => void
}

export function SqlWorkspace({
  value,
  isRunning,
  resultTitle,
  resultTable,
  feedback,
  onChange,
  onRun,
  onReset,
}: SqlWorkspaceProps) {
  const gutterRef = useRef<HTMLDivElement>(null)
  const lineCount = Math.max(8, value.split('\n').length)
  const presentation = feedback ? FEEDBACK_PRESENTATION[feedback.kind] : null
  const hasResults = resultTable !== null && resultTable.columns.length > 0

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>SQL editor</CardTitle>
          <CardDescription>Runs against a real in-browser SQLite database.</CardDescription>
          <CardAction>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={onReset} disabled={isRunning}>
                <RotateCcwIcon data-icon="inline-start" />
                Reset data
              </Button>
              <Button onClick={onRun} disabled={isRunning}>
                {isRunning ? (
                  <Spinner data-icon="inline-start" />
                ) : (
                  <PlayIcon data-icon="inline-start" />
                )}
                {isRunning ? 'Running' : 'Run query'}
              </Button>
            </div>
          </CardAction>
        </CardHeader>

        <CardContent>
          <div className="overflow-hidden rounded-lg border bg-muted/30 focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50">
            <div className="flex items-center justify-between border-b bg-muted/60 px-3 py-1.5">
              <span className="font-mono text-xs text-muted-foreground">editor.sql</span>
              <KbdGroup className="text-muted-foreground">
                <Kbd>{navigator.platform.includes('Mac') ? '\u2318' : 'Ctrl'}</Kbd>
                <Kbd>{'\u21B5'}</Kbd>
                <span className="text-xs">to run</span>
              </KbdGroup>
            </div>

            <div className="flex">
              <div
                ref={gutterRef}
                aria-hidden
                className="max-h-64 shrink-0 overflow-hidden border-r bg-muted/40 py-3 pr-2 pl-3 text-right font-mono text-sm leading-6 text-muted-foreground/60 select-none"
              >
                {Array.from({ length: lineCount }, (_, index) => (
                  <div key={index}>{index + 1}</div>
                ))}
              </div>

              <textarea
                value={value}
                spellCheck={false}
                aria-label="SQL query editor"
                placeholder={'SELECT ...\nFROM ...\nWHERE ...;'}
                onChange={(event) => onChange(event.target.value)}
                onScroll={(event) => {
                  if (gutterRef.current) {
                    gutterRef.current.scrollTop = event.currentTarget.scrollTop
                  }
                }}
                onKeyDown={(event) => {
                  if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
                    event.preventDefault()
                    onRun()
                  }
                }}
                className="h-64 w-full resize-none bg-transparent px-3 py-3 font-mono text-sm leading-6 outline-none placeholder:text-muted-foreground/50"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {feedback && presentation ? (
        <Alert variant={presentation.variant} className="px-3 py-2.5">
          <presentation.icon />
          <AlertTitle>{presentation.title}</AlertTitle>
          <AlertDescription>{feedback.message}</AlertDescription>
        </Alert>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>{resultTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          {hasResults ? (
            <div className="max-h-96 overflow-auto rounded-lg border">
              <DataTable data={resultTable} />
            </div>
          ) : (
            <Empty className="rounded-lg border border-dashed py-8">
              <EmptyHeader>
                <EmptyTitle>No results yet</EmptyTitle>
                <EmptyDescription>
                  Write a query above and run it to see the rows it returns.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
