export type TableName = 'Students' | 'Houses'

export type CellValue = number | string | Uint8Array | null

export interface TableData {
  columns: string[]
  rows: CellValue[][]
}

export type DatabaseSnapshot = Record<TableName, TableData>

export interface SqlChallenge {
  id: string
  level: number
  codename: string
  title: string
  story: string
  mission: string
  answerType: 'select' | 'mutation'
  /** Table opened in the reference panel when this challenge loads. */
  referenceTable: TableName
  starterQuery: string
  focus: string[]
  successMessage: string
  hint: string
  expectedQuery?: string
  expectedMutationSql?: string
  orderMatters?: boolean
}

export interface ExecutionFeedback {
  ok: boolean
  message: string
  kind: 'success' | 'error' | 'info'
}

export interface ExecutionState {
  isRunning: boolean
  resultTitle: string
  resultTable: TableData | null
  snapshot: DatabaseSnapshot
  feedback: ExecutionFeedback | null
}
