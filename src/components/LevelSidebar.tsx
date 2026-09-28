import { CheckCircle2, LockKeyhole, Swords, Trophy } from 'lucide-react'
import { CHALLENGES } from '../lib/challenges'

interface LevelSidebarProps {
  currentChallengeId: string
  unlockedLevel: number
  completedChallengeIds: string[]
  onSelect: (challengeId: string) => void
}

export function LevelSidebar({
  currentChallengeId,
  unlockedLevel,
  completedChallengeIds,
  onSelect,
}: LevelSidebarProps) {
  return (
    <aside className="rounded-3xl border border-slate-800/80 bg-slate-950/80 p-5 shadow-2xl shadow-cyan-950/20">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-2 text-cyan-200">
          <Trophy className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Quest Chain</p>
          <h2 className="text-lg font-semibold text-slate-50">SQL Quest</h2>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {CHALLENGES.map((challenge) => {
          const isLocked = challenge.level > unlockedLevel
          const isCompleted = completedChallengeIds.includes(challenge.id)
          const isActive = challenge.id === currentChallengeId

          return (
            <button
              key={challenge.id}
              type="button"
              onClick={() => onSelect(challenge.id)}
              disabled={isLocked}
              className={[
                'w-full rounded-2xl border p-4 text-left transition',
                isActive
                  ? 'border-cyan-400/70 bg-cyan-500/10'
                  : 'border-slate-800 bg-slate-900/80 hover:border-slate-700 hover:bg-slate-900',
                isLocked ? 'cursor-not-allowed opacity-60' : '',
              ].join(' ')}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                    Level {challenge.level}
                  </p>
                  <h3 className="mt-1 text-sm font-semibold text-slate-100">{challenge.codename}</h3>
                  <p className="mt-1 text-sm text-slate-400">{challenge.title}</p>
                  {isActive ? (
                    <p className="mt-2 text-xs text-cyan-300">Active level. Click again to reload it.</p>
                  ) : null}
                </div>

                <div className="rounded-full border border-slate-700 p-2 text-slate-300">
                  {isCompleted ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  ) : isLocked ? (
                    <LockKeyhole className="h-4 w-4" />
                  ) : (
                    <Swords className="h-4 w-4 text-cyan-200" />
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </aside>
  )
}
