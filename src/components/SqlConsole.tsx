import { AlertTriangle, Play, RotateCcw, Sparkles, TerminalSquare } from 'lucide-react'
import type { ExecutionFeedback, TableData } from '../types'

interface SqlConsoleProps {
  value: string
  hint: string
  isRunning: boolean
  resultTitle: string
  resultTable: TableData | null
  feedback: ExecutionFeedback | null
  onChange: (value: string) => void
  onRun: () => void
  onReset: () => void
}

export function SqlConsole({
  value,
  hint,
  isRunning,
  resultTitle,
  resultTable,
  feedback,
  onChange,
  onRun,
  onReset,
}: SqlConsoleProps) {
  const lineCount = Math.max(6, value.split('\n').length)

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl shadow-cyan-950/20">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-3 text-cyan-200">
            <TerminalSquare className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-50">SQL Console</h2>
            <p className="text-sm text-slate-400">Queries run against a real in-memory SQLite database.</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-600 hover:bg-slate-800"
          >
            <RotateCcw className="h-4 w-4" />
            Reset Table
          </button>
          <button
            type="button"
            onClick={onRun}
            disabled={isRunning}
            className="inline-flex items-center gap-2 rounded-2xl border border-cyan-500/30 bg-cyan-500/15 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-500/20 disabled:cursor-wait disabled:opacity-70"
          >
            <Play className="h-4 w-4" />
            {isRunning ? 'Executing...' : 'Run Query'}
          </button>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-violet-500/20 bg-violet-500/10 p-4 text-sm text-violet-100">
        <div className="flex items-center gap-2 font-medium">
          <Sparkles className="h-4 w-4" />
          Mission hint
        </div>
        <p className="mt-2 leading-6 text-violet-50/90">{hint}</p>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-800 bg-[#050816]">
        <div className="border-b border-slate-800 bg-slate-900/70 px-4 py-3 text-xs uppercase tracking-[0.3em] text-slate-500">
          editor.sql
        </div>
        <div className="grid grid-cols-[auto,1fr]">
          <div className="select-none border-r border-slate-800 bg-slate-950/70 px-4 py-4 text-right font-mono text-sm leading-7 text-slate-600">
            {Array.from({ length: lineCount }, (_, index) => (
              <div key={index + 1}>{index + 1}</div>
            ))}
          </div>
          <textarea
            value={value}
            onChange={(event) => onChange(event.target.value)}
            spellCheck={false}
            className="min-h-[260px] w-full resize-none bg-transparent px-4 py-4 font-mono text-sm leading-7 text-cyan-50 outline-none placeholder:text-slate-600"
            placeholder="Write your SQL here..."
          />
        </div>
      </div>

      {feedback ? (
        <div
          className={[
            'mt-5 rounded-2xl border p-4 text-sm leading-6',
            feedback.kind === 'success'
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-100'
              : feedback.kind === 'error'
                ? 'border-rose-500/30 bg-rose-500/10 text-rose-100'
                : 'border-slate-700 bg-slate-900 text-slate-200',
          ].join(' ')}
        >
          <div className="flex items-start gap-2">
            <AlertTriangle
              className={[
                'mt-0.5 h-4 w-4 shrink-0',
                feedback.kind === 'success'
                  ? 'text-emerald-300'
                  : feedback.kind === 'error'
                    ? 'text-rose-300'
                    : 'text-slate-400',
              ].join(' ')}
            />
            <p>{feedback.message}</p>
          </div>
        </div>
      ) : null}

      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/70">
        <div className="border-b border-slate-800 bg-slate-900/80 px-4 py-3 text-sm font-medium text-slate-200">
          {resultTitle}
        </div>

        {resultTable && resultTable.columns.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-800 text-left text-sm">
              <thead className="bg-slate-900/70 text-slate-400">
                <tr>
                  {resultTable.columns.map((column) => (
                    <th key={column} className="px-4 py-3 font-medium">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {resultTable.rows.map((row, rowIndex) => (
                  <tr key={`result-${rowIndex}`} className="hover:bg-slate-900/60">
                    {row.map((value, cellIndex) => (
                      <td key={`result-${rowIndex}-${cellIndex}`} className="px-4 py-3 text-slate-300">
                        {String(value)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-4 py-8 text-sm text-slate-400">
            No result set yet. SELECT missions will show query rows here.
          </div>
        )}
      </div>
    </section>
  )
}
