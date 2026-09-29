import initSqlJs, {
  type Database,
  type QueryExecResult,
  type SqlJsStatic,
  type SqlValue,
} from 'sql.js'
import sqlWasmUrl from 'sql.js/dist/sql-wasm.wasm?url'
import { SCHEMA_SQL, SEED_SQL, TABLE_NAMES } from '@/lib/challenges'
import type { DatabaseSnapshot, ExecutionFeedback, ExecutionState, SqlChallenge, TableData } from '@/types'

let sqlJsPromise: Promise<SqlJsStatic> | null = null

const EMPTY_TABLE: TableData = {
  columns: [],
  rows: [],
}

function getSqlJs() {
  if (!sqlJsPromise) {
    sqlJsPromise = initSqlJs({
      locateFile: () => sqlWasmUrl,
    })
  }

  return sqlJsPromise
}

function createSeededDatabase(SQL: SqlJsStatic) {
  const db = new SQL.Database()
  db.exec('PRAGMA foreign_keys = ON;')
  db.exec(SCHEMA_SQL)
  db.exec(SEED_SQL)
  return db
}

function resultToTable(result?: QueryExecResult) {
  if (!result) {
    return null
  }

  return {
    columns: result.columns,
    rows: result.values,
  } satisfies TableData
}

function queryTable(db: Database, tableName: 'Students' | 'Houses') {
  const orderField = tableName === 'Students' ? 'StudentID' : 'HouseID'
  const [result] = db.exec(`SELECT * FROM ${tableName} ORDER BY ${orderField};`)
  return resultToTable(result) ?? EMPTY_TABLE
}

function snapshotDatabase(db: Database): DatabaseSnapshot {
  return {
    Students: queryTable(db, 'Students'),
    Houses: queryTable(db, 'Houses'),
  }
}

function serialiseCell(value: SqlValue) {
  if (value instanceof Uint8Array) {
    return JSON.stringify(Array.from(value))
  }

  return JSON.stringify(value)
}

function compareTables(left: TableData, right: TableData, orderMatters: boolean) {
  if (left.columns.length !== right.columns.length) {
    return false
  }

  if (left.columns.some((column, index) => column !== right.columns[index])) {
    return false
  }

  if (left.rows.length !== right.rows.length) {
    return false
  }

  const leftRows = left.rows.map((row) => row.map(serialiseCell).join('|'))
  const rightRows = right.rows.map((row) => row.map(serialiseCell).join('|'))

  if (!orderMatters) {
    leftRows.sort()
    rightRows.sort()
  }

  return leftRows.every((row, index) => row === rightRows[index])
}

function compareSnapshots(left: DatabaseSnapshot, right: DatabaseSnapshot) {
  return TABLE_NAMES.every((tableName) => compareTables(left[tableName], right[tableName], true))
}

function buildFeedback(kind: ExecutionFeedback['kind'], message: string, ok = false): ExecutionFeedback {
  return {
    ok,
    kind,
    message,
  }
}

function getFriendlySqlError(error: unknown) {
  const rawMessage = error instanceof Error ? error.message : 'Unknown SQL error'

  if (rawMessage.toLowerCase().includes('syntax error')) {
    return `SQLite found a syntax issue. Check commas, keywords, brackets, and semicolons. SQLite says: ${rawMessage}`
  }

  if (rawMessage.toLowerCase().includes('no such column')) {
    return `One of the field names does not exist. Check the Database reference panel for the exact column names. SQLite says: ${rawMessage}`
  }

  if (rawMessage.toLowerCase().includes('no such table')) {
    return `One of the table names does not exist. Check the Database reference panel for the correct table name. SQLite says: ${rawMessage}`
  }

  return `SQLite could not run that query yet. Review the task and try again. SQLite says: ${rawMessage}`
}

function getLatestResult(results: QueryExecResult[]) {
  return resultToTable(results.at(-1))
}

export async function getInitialExecutionState(): Promise<ExecutionState> {
  const SQL = await getSqlJs()
  const db = createSeededDatabase(SQL)

  try {
    return {
      isRunning: false,
      resultTitle: 'Query results',
      resultTable: null,
      snapshot: snapshotDatabase(db),
      feedback: buildFeedback('info', 'Write your SQL, then run it to check it against the mission.'),
    }
  } finally {
    db.close()
  }
}

export async function executeChallengeQuery(
  challenge: SqlChallenge,
  studentSql: string,
): Promise<Omit<ExecutionState, 'isRunning'>> {
  const SQL = await getSqlJs()
  const studentDb = createSeededDatabase(SQL)
  const expectedDb = createSeededDatabase(SQL)

  try {
    if (!studentSql.trim()) {
      return {
        resultTitle: 'Query results',
        resultTable: null,
        snapshot: snapshotDatabase(studentDb),
        feedback: buildFeedback('error', 'Type a SQL statement before running the mission.'),
      }
    }

    const studentResults = studentDb.exec(studentSql)
    const studentSnapshot = snapshotDatabase(studentDb)

    if (challenge.answerType === 'select') {
      const studentTable = getLatestResult(studentResults)

      if (!studentTable) {
        return {
          resultTitle: 'Query results',
          resultTable: null,
          snapshot: studentSnapshot,
          feedback: buildFeedback(
            'error',
            'This level expects a SELECT query that returns a visible results table.',
          ),
        }
      }

      const expectedResults = expectedDb.exec(challenge.expectedQuery ?? '')
      const expectedTable = getLatestResult(expectedResults)
      const expectedSnapshot = snapshotDatabase(expectedDb)

      const matchesExpected =
        expectedTable !== null &&
        compareTables(studentTable, expectedTable, challenge.orderMatters ?? false)

      const keptDatabaseSafe = compareSnapshots(studentSnapshot, expectedSnapshot)

      if (matchesExpected && keptDatabaseSafe) {
        return {
          resultTitle: 'Query results',
          resultTable: studentTable,
          snapshot: studentSnapshot,
          feedback: buildFeedback('success', challenge.successMessage, true),
        }
      }

      const message = keptDatabaseSafe
        ? 'The query ran, but the returned rows or columns do not match the mission target yet.'
        : 'The result table appeared, but this retrieval mission should not change the stored data.'

      return {
        resultTitle: 'Query results',
        resultTable: studentTable,
        snapshot: studentSnapshot,
        feedback: buildFeedback('error', message),
      }
    }

    expectedDb.exec(challenge.expectedMutationSql ?? '')
    const expectedSnapshot = snapshotDatabase(expectedDb)
    const mutationPassed = compareSnapshots(studentSnapshot, expectedSnapshot)

    return {
      resultTitle: 'Students table after your changes',
      resultTable: studentSnapshot.Students,
      snapshot: studentSnapshot,
      feedback: mutationPassed
        ? buildFeedback('success', challenge.successMessage, true)
        : buildFeedback(
            'error',
            'The statements ran, but the final table state does not match the expected database state yet.',
          ),
    }
  } catch (error) {
    return {
      resultTitle: 'Query results',
      resultTable: null,
      snapshot: snapshotDatabase(studentDb),
      feedback: buildFeedback('error', getFriendlySqlError(error)),
    }
  } finally {
    studentDb.close()
    expectedDb.close()
  }
}
