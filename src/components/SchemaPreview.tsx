import { DatabaseZap, KeyRound, Link2 } from 'lucide-react'
import type { DatabaseSnapshot, TableName } from '../types'

interface SchemaPreviewProps {
  snapshot: DatabaseSnapshot
  activeTable: TableName
  onSelectTable: (tableName: TableName) => void
}

const TABLE_DETAILS: Record<TableName, { columns: string[]; note: string }> = {
  Students: {
    columns: ['StudentID (PK)', 'FirstName', 'LastName', 'YearGroup', 'HouseID (FK)'],
    note: 'Each student stores a HouseID foreign key that links back to Houses.',
  },
  Houses: {
    columns: ['HouseID (PK)', 'HouseName', 'Points'],
    note: 'HouseID is the primary key referenced from Students.',
  },
}

export function SchemaPreview({ snapshot, activeTable, onSelectTable }: SchemaPreviewProps) {
  const tableData = snapshot[activeTable]

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl shadow-cyan-950/20">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-3 text-cyan-200">
            <DatabaseZap className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-50">Table Schema Preview</h2>
            <p className="text-sm text-slate-400">Live data refreshes after every run or reset.</p>
          </div>
        </div>

        <div className="flex gap-2 rounded-2xl border border-slate-800 bg-slate-900/80 p-1">
          {(['Students', 'Houses'] as TableName[]).map((tableName) => (
            <button
              key={tableName}
              type="button"
              onClick={() => onSelectTable(tableName)}
              className={[
                'rounded-xl px-4 py-2 text-sm transition',
                activeTable === tableName
                  ? 'bg-cyan-500/15 text-cyan-100'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200',
              ].join(' ')}
            >
              {tableName}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,280px),1fr]">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-100">
            <KeyRound className="h-4 w-4 text-cyan-300" />
            {activeTable} schema
          </div>
          <div className="mt-4 space-y-2 text-sm text-slate-300">
            {TABLE_DETAILS[activeTable].columns.map((column) => (
              <div key={column} className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2">
                {column}
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-violet-500/20 bg-violet-500/10 p-3 text-sm text-violet-100">
            <div className="flex items-center gap-2 font-medium">
              <Link2 className="h-4 w-4" />
              Relational note
            </div>
            <p className="mt-2 leading-6 text-violet-100/90">{TABLE_DETAILS[activeTable].note}</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/70">
          <div className="border-b border-slate-800 bg-slate-900/80 px-4 py-3 text-sm font-medium text-slate-200">
            {activeTable} live data
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-800 text-left text-sm">
              <thead className="bg-slate-900/70 text-slate-400">
                <tr>
                  {tableData.columns.map((column) => (
                    <th key={column} className="px-4 py-3 font-medium">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {tableData.rows.map((row, rowIndex) => (
                  <tr key={`${activeTable}-${rowIndex}`} className="hover:bg-slate-900/60">
                    {row.map((value, cellIndex) => (
                      <td key={`${activeTable}-${rowIndex}-${cellIndex}`} className="px-4 py-3 text-slate-300">
                        {String(value)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
