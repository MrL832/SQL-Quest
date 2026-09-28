import { useEffect } from 'react'
import { ChevronDown, Cpu, Database, ShieldCheck, Star } from 'lucide-react'
import { LevelSidebar } from './components/LevelSidebar'
import { QuestBriefing } from './components/QuestBriefing'
import { SchemaPreview } from './components/SchemaPreview'
import { SqlConsole } from './components/SqlConsole'
import { AQA_CHEAT_SHEET, CHALLENGES } from './lib/challenges'
import { useQuestStore } from './store/useQuestStore'

function App() {
  const {
    currentChallengeId,
    unlockedLevel,
    completedChallengeIds,
    editorByChallenge,
    executionState,
    isReady,
    activeTable,
    isCheatSheetOpen,
    showSuccessModal,
    initialise,
    selectChallenge,
    setEditorValue,
    runActiveQuery,
    resetActiveChallenge,
    setActiveTable,
    toggleCheatSheet,
    closeSuccessModal,
  } = useQuestStore()

  useEffect(() => {
    void initialise()
  }, [initialise])

  const currentChallenge =
    CHALLENGES.find((challenge) => challenge.id === currentChallengeId) ?? CHALLENGES[0]
  const editorValue = editorByChallenge[currentChallenge.id] ?? currentChallenge.starterQuery
  const nextChallenge = CHALLENGES.find((challenge) => challenge.level === currentChallenge.level + 1)

  if (!isReady || !executionState) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-300">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 px-6 py-5 text-sm">
          Loading SQLite engine and mission data...
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(6,182,212,0.16),_transparent_30%),linear-gradient(180deg,_#020617_0%,_#020617_55%,_#030712_100%)] text-slate-100">
      <div className="mx-auto max-w-[1800px] px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl shadow-cyan-950/20">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <div className="flex items-center gap-3 text-cyan-200">
                <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-3">
                  <Database className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">
                    AQA GCSE SQL Revision
                  </p>
                  <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
                    SQL Quest
                  </h1>
                </div>
              </div>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                A client-side SQL adventure for UK GCSE Computer Science students. Every query runs
                in the browser using SQLite WebAssembly, so the app deploys cleanly to GitHub Pages
                with no backend services.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3">
                <div className="flex items-center gap-2 text-cyan-200">
                  <Cpu className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-[0.25em] text-slate-500">Engine</span>
                </div>
                <p className="mt-2 text-sm text-slate-200">`sql.js` in-memory SQLite</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3">
                <div className="flex items-center gap-2 text-cyan-200">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-[0.25em] text-slate-500">
                    Completion
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-200">
                  {completedChallengeIds.length} / {CHALLENGES.length} quests cleared
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3">
                <div className="flex items-center gap-2 text-cyan-200">
                  <Star className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-[0.25em] text-slate-500">Unlocked</span>
                </div>
                <p className="mt-2 text-sm text-slate-200">Levels 1 to {unlockedLevel}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-[300px,minmax(0,1fr),minmax(0,1.05fr)]">
          <LevelSidebar
            currentChallengeId={currentChallenge.id}
            unlockedLevel={unlockedLevel}
            completedChallengeIds={completedChallengeIds}
            onSelect={(challengeId) => {
              void selectChallenge(challengeId)
            }}
          />

          <section className="space-y-6">
            <QuestBriefing
              challenge={currentChallenge}
              isCompleted={completedChallengeIds.includes(currentChallenge.id)}
            />
            <SchemaPreview
              snapshot={executionState.snapshot}
              activeTable={activeTable}
              onSelectTable={setActiveTable}
            />

            <section className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl shadow-cyan-950/20">
              <button
                type="button"
                onClick={toggleCheatSheet}
                className="flex w-full items-center justify-between gap-3 text-left"
              >
                <div>
                  <h2 className="text-lg font-semibold text-slate-50">AQA SQL Syntax Cheat Sheet</h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Common GCSE patterns for retrieval, sorting, joins, and data changes.
                  </p>
                </div>
                <ChevronDown
                  className={[
                    'h-5 w-5 text-slate-400 transition',
                    isCheatSheetOpen ? 'rotate-180' : '',
                  ].join(' ')}
                />
              </button>

              {isCheatSheetOpen ? (
                <div className="mt-5 grid gap-3 text-sm text-slate-300">
                  {AQA_CHEAT_SHEET.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 leading-6"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              ) : null}
            </section>
          </section>

          <SqlConsole
            value={editorValue}
            hint={currentChallenge.hint}
            isRunning={executionState.isRunning}
            resultTitle={executionState.resultTitle}
            resultTable={executionState.resultTable}
            feedback={executionState.feedback}
            onChange={setEditorValue}
            onRun={() => {
              void runActiveQuery()
            }}
            onReset={() => {
              void resetActiveChallenge()
            }}
          />
        </div>
      </div>

      {showSuccessModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-emerald-500/30 bg-slate-950 p-6 shadow-2xl shadow-emerald-950/40">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-emerald-200">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-emerald-300/80">
                  Mission Complete
                </p>
                <h2 className="mt-1 text-2xl font-semibold text-slate-50">{currentChallenge.codename}</h2>
              </div>
            </div>

            <p className="mt-4 text-sm leading-7 text-slate-300">{currentChallenge.successMessage}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={closeSuccessModal}
                className="rounded-2xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-600 hover:bg-slate-800"
              >
                Stay on this level
              </button>

              {nextChallenge && nextChallenge.level <= unlockedLevel ? (
                <button
                  type="button"
                  onClick={() => {
                    closeSuccessModal()
                    void selectChallenge(nextChallenge.id)
                  }}
                  className="rounded-2xl border border-cyan-500/30 bg-cyan-500/15 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-500/20"
                >
                  Open Level {nextChallenge.level}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={closeSuccessModal}
                  className="rounded-2xl border border-cyan-500/30 bg-cyan-500/15 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-500/20"
                >
                  Continue
                </button>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </main>
  )
}

export default App
