import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { CHALLENGES } from '@/lib/challenges'
import { executeChallengeQuery, getInitialExecutionState } from '@/lib/sqlEngine'
import type { ExecutionFeedback, ExecutionState, TableName } from '@/types'

interface QuestStore {
  currentChallengeId: string
  unlockedLevel: number
  completedChallengeIds: string[]
  editorByChallenge: Record<string, string>
  executionState: ExecutionState | null
  isReady: boolean
  activeTable: TableName
  showSuccessModal: boolean
  initialise: () => Promise<void>
  selectChallenge: (challengeId: string) => Promise<void>
  setEditorValue: (value: string) => void
  runActiveQuery: () => Promise<void>
  resetActiveChallenge: () => Promise<void>
  setActiveTable: (tableName: TableName) => void
  closeSuccessModal: () => void
}

function getChallenge(challengeId: string) {
  return CHALLENGES.find((challenge) => challenge.id === challengeId) ?? CHALLENGES[0]
}

function replaceFeedback(executionState: ExecutionState, feedback: ExecutionFeedback): ExecutionState {
  return {
    ...executionState,
    feedback,
  }
}

export const useQuestStore = create<QuestStore>()(
  persist(
    (set, get) => ({
      currentChallengeId: CHALLENGES[0].id,
      unlockedLevel: 1,
      completedChallengeIds: [],
      editorByChallenge: {},
      executionState: null,
      isReady: false,
      activeTable: CHALLENGES[0].referenceTable,
      showSuccessModal: false,
      async initialise() {
        const challenge = getChallenge(get().currentChallengeId)
        const initialExecutionState = await getInitialExecutionState()

        set((state) => ({
          isReady: true,
          activeTable: challenge.referenceTable,
          executionState: initialExecutionState,
          editorByChallenge: {
            ...state.editorByChallenge,
            [challenge.id]: state.editorByChallenge[challenge.id] ?? challenge.starterQuery,
          },
        }))
      },
      async selectChallenge(challengeId) {
        const challenge = getChallenge(challengeId)
        const isSameChallenge = challenge.id === get().currentChallengeId

        if (challenge.level > get().unlockedLevel) {
          return
        }

        const initialExecutionState = await getInitialExecutionState()

        set((state) => ({
          currentChallengeId: challenge.id,
          activeTable: challenge.referenceTable,
          executionState: replaceFeedback(initialExecutionState, {
            ok: false,
            kind: 'info',
            message: isSameChallenge
              ? `${challenge.codename} reloaded. The table state is reset and the editor is blank again.`
              : `Loaded ${challenge.codename}. Review the mission and run your SQL.`,
          }),
          editorByChallenge: {
            ...state.editorByChallenge,
            [challenge.id]: isSameChallenge
              ? challenge.starterQuery
              : state.editorByChallenge[challenge.id] ?? challenge.starterQuery,
          },
        }))
      },
      setEditorValue(value) {
        const challengeId = get().currentChallengeId
        set((state) => ({
          editorByChallenge: {
            ...state.editorByChallenge,
            [challengeId]: value,
          },
        }))
      },
      async runActiveQuery() {
        const challenge = getChallenge(get().currentChallengeId)
        const sql = get().editorByChallenge[challenge.id] ?? challenge.starterQuery

        set((state) => ({
          executionState: state.executionState
            ? {
                ...state.executionState,
                isRunning: true,
              }
            : null,
        }))

        const nextExecutionState = await executeChallengeQuery(challenge, sql)
        const didPass = nextExecutionState.feedback?.ok ?? false

        set((state) => {
          const completedChallengeIds = didPass
            ? Array.from(new Set([...state.completedChallengeIds, challenge.id]))
            : state.completedChallengeIds

          const unlockedLevel = didPass
            ? Math.min(CHALLENGES.length, Math.max(state.unlockedLevel, challenge.level + 1))
            : state.unlockedLevel

          return {
            executionState: {
              ...nextExecutionState,
              isRunning: false,
            },
            completedChallengeIds,
            unlockedLevel,
            showSuccessModal: didPass,
          }
        })
      },
      async resetActiveChallenge() {
        const challenge = getChallenge(get().currentChallengeId)
        const initialExecutionState = await getInitialExecutionState()

        set({
          activeTable: challenge.referenceTable,
          executionState: replaceFeedback(initialExecutionState, {
            ok: false,
            kind: 'info',
            message: 'Table state reset to the original seed data for this mission.',
          }),
        })
      },
      setActiveTable(tableName) {
        set({
          activeTable: tableName,
        })
      },
      closeSuccessModal() {
        set({
          showSuccessModal: false,
        })
      },
    }),
    {
      name: 'sql-quest-progress',
      version: 2,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentChallengeId: state.currentChallengeId,
        unlockedLevel: state.unlockedLevel,
        completedChallengeIds: state.completedChallengeIds,
      }),
      migrate: (persistedState) => {
        const state = persistedState as Partial<QuestStore>

        return {
          ...state,
          editorByChallenge: {},
        } as QuestStore
      },
    },
  ),
)
