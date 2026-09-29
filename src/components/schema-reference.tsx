import { DataTable } from '@/components/data-table'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TABLE_NAMES } from '@/lib/challenges'
import { cn } from '@/lib/utils'
import type { DatabaseSnapshot, TableName } from '@/types'

interface ColumnDefinition {
  name: string
  key?: 'PK' | 'FK'
}

const TABLE_DETAILS: Record<TableName, { columns: ColumnDefinition[]; note: string }> = {
  Students: {
    columns: [
      { name: 'StudentID', key: 'PK' },
      { name: 'FirstName' },
      { name: 'LastName' },
      { name: 'YearGroup' },
      { name: 'HouseID', key: 'FK' },
    ],
    note: 'Each student stores a HouseID foreign key that links back to Houses.',
  },
  Houses: {
    columns: [
      { name: 'HouseID', key: 'PK' },
      { name: 'HouseName' },
      { name: 'Points' },
    ],
    note: 'HouseID is the primary key that Students refers to.',
  },
}

interface SchemaReferenceProps {
  snapshot: DatabaseSnapshot
  activeTable: TableName
  onSelectTable: (tableName: TableName) => void
}

export function SchemaReference({
  snapshot,
  activeTable,
  onSelectTable,
}: SchemaReferenceProps) {
  return (
    <Tabs
      value={activeTable}
      onValueChange={(value) => onSelectTable(value as TableName)}
      render={<Card />}
    >
      <CardHeader>
        <CardTitle>Database reference</CardTitle>
        <CardDescription>Live data, refreshed after every run or reset.</CardDescription>
        <CardAction>
          <TabsList>
            {TABLE_NAMES.map((tableName) => (
              <TabsTrigger key={tableName} value={tableName}>
                {tableName}
              </TabsTrigger>
            ))}
          </TabsList>
        </CardAction>
      </CardHeader>

      {TABLE_NAMES.map((tableName) => (
        <TabsContent key={tableName} value={tableName} render={<CardContent />}>
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-1.5">
              {TABLE_DETAILS[tableName].columns.map((column) => (
                <Badge
                  key={column.name}
                  variant="outline"
                  className={cn(
                    'gap-1 font-mono text-xs',
                    column.key && 'border-primary/40 bg-primary/10 text-primary',
                  )}
                >
                  {column.name}
                  {column.key ? (
                    <span className="font-bold opacity-70">{column.key}</span>
                  ) : null}
                </Badge>
              ))}
            </div>

            <p className="text-sm text-muted-foreground">{TABLE_DETAILS[tableName].note}</p>

            <DataTable
              data={snapshot[tableName]}
              containerClassName="max-h-96 rounded-lg border"
            />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
