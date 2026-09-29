import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import type { CellValue, TableData } from '@/types'

function formatCell(value: CellValue) {
  if (value === null) {
    return 'NULL'
  }

  if (value instanceof Uint8Array) {
    return `[${value.length} bytes]`
  }

  return String(value)
}

export function DataTable({
  data,
  containerClassName,
}: {
  data: TableData
  containerClassName?: string
}) {
  return (
    <Table containerClassName={containerClassName}>
      <TableHeader className="sticky top-0 z-10 bg-accent">
        <TableRow className="border-b-primary/20 hover:bg-transparent">
          {data.columns.map((column) => (
            <TableHead key={column} className="font-mono text-xs text-accent-foreground">
              {column}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.rows.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {row.map((value, cellIndex) => (
              <TableCell
                key={cellIndex}
                className={cn(
                  'font-mono text-sm',
                  value === null && 'text-muted-foreground italic',
                )}
              >
                {formatCell(value)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
