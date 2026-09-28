import { BookOpenCheck, Target } from 'lucide-react'
import type { SqlChallenge } from '../types'

interface QuestBriefingProps {
  challenge: SqlChallenge
  isCompleted: boolean
}

export function QuestBriefing({ challenge, isCompleted }: QuestBriefingProps) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl shadow-cyan-950/20">
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.3em] text-cyan-200">
          Level {challenge.level}
        </span>
        <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">
          {challenge.codename}
        </span>
        {isCompleted ? (
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
            Completed
          </span>
        ) : null}
      </div>

      <div className="mt-5 flex items-start gap-4">
        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-3 text-cyan-200">
          <BookOpenCheck className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-50">{challenge.title}</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">{challenge.story}</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4">
        <div className="flex items-center gap-2 text-amber-200">
          <Target className="h-4 w-4" />
          <h2 className="text-sm font-semibold uppercase tracking-[0.25em]">Mission Task</h2>
        </div>
        <p className="mt-2 text-sm leading-6 text-amber-50">{challenge.mission}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {challenge.focus.map((topic) => (
          <span
            key={topic}
            className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs text-slate-300"
          >
            {topic}
          </span>
        ))}
      </div>
    </section>
  )
}
