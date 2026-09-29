import { useEffect } from 'react'
import { AppHeader } from '@/components/app-header'
import { CheatSheet } from '@/components/cheat-sheet'
import { LevelStepper } from '@/components/level-stepper'
import { MissionPanel } from '@/components/mission-panel'
import { SchemaReference } from '@/components/schema-reference'
import { SqlWorkspace } from '@/components/sql-workspace'
import { SuccessDialog } from '@/components/success-dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { CHALLENGES } from '@/lib/challenges'
import { useQuestStore } from '@/store/useQuestStore'

function WorkspaceSkeleton() {
  return (
    <div className="mx-auto grid w-full max-w-[1400px] gap-4 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <div className="flex flex-col gap-4">
        <Skeleton className="h-56 rounded-xl" />
        <Skeleton className="h-72 rounded-xl" />
      </div>
      <div className="flex flex-col gap-4">
        <Skeleton className="h-96 rounded-xl" />
        <Skeleton className="h-40 rounded-xl" />
      </div>
    </div>
  )
}

function App() {
  const {
    currentChallengeId,
    unlockedLevel,
    completedChallengeIds,
    editorByChallenge,
    executionState,
    isReady,
    activeTable,
    showSuccessModal,
    initialise,
    selectChallenge,
    setEditorValue,
    runActiveQuery,
    resetActiveChallenge,
    setActiveTable,
    closeSuccessModal,
  } = useQuestStore()

  useEffect(() => {
    void initialise()
  }, [initialise])

  const currentChallenge =
    CHALLENGES.find((challenge) => challenge.id === currentChallengeId) ?? CHALLENGES[0]
  const editorValue = editorByChallenge[currentChallenge.id] ?? currentChallenge.starterQuery
  const nextChallenge = CHALLENGES.find(
    (challenge) => challenge.level === currentChallenge.level + 1,
  )

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AppHeader completedCount={completedChallengeIds.length} totalCount={CHALLENGES.length} />

      <LevelStepper
        currentChallengeId={currentChallenge.id}
        unlockedLevel={unlockedLevel}
        completedChallengeIds={completedChallengeIds}
        onSelect={(challengeId) => {
          void selectChallenge(challengeId)
        }}
      />

      {!isReady || !executionState ? (
        <WorkspaceSkeleton />
      ) : (
        <main className="mx-auto grid w-full max-w-[1400px] flex-1 grid-cols-[minmax(0,1fr)] items-start gap-4 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          {/* Narrow screens read mission then editor; the reference material follows. */}
          <div className="order-1 min-w-0 lg:col-start-1">
            <MissionPanel
              key={currentChallenge.id}
              challenge={currentChallenge}
              isCompleted={completedChallengeIds.includes(currentChallenge.id)}
            />
          </div>

          <div className="order-2 min-w-0 lg:col-start-2 lg:row-span-3 lg:row-start-1">
            <SqlWorkspace
              value={editorValue}
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

          <div className="order-3 min-w-0 lg:col-start-1">
            <SchemaReference
              snapshot={executionState.snapshot}
              activeTable={activeTable}
              onSelectTable={setActiveTable}
            />
          </div>

          <div className="order-4 min-w-0 lg:col-start-1">
            <CheatSheet />
          </div>
        </main>
      )}

      <SuccessDialog
        open={showSuccessModal}
        challenge={currentChallenge}
        nextChallenge={
          nextChallenge && nextChallenge.level <= unlockedLevel ? nextChallenge : undefined
        }
        onOpenChange={(open) => {
          if (!open) {
            closeSuccessModal()
          }
        }}
        onAdvance={(challengeId) => {
          closeSuccessModal()
          void selectChallenge(challengeId)
        }}
      />
    </div>
  )
}

export default App
