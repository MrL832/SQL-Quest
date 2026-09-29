import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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

export function DataTable({ data }: { data: TableData }) {
  return (
    <Table>
      <TableHeader className="sticky top-0 bg-muted/80 backdrop-blur-sm">
        <TableRow className="hover:bg-transparent">
          {data.columns.map((column) => (
            <TableHead key={column} className="font-mono text-xs">
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
                className={
                  value === null ? 'font-mono text-xs text-muted-foreground italic' : 'font-mono text-xs'
                }
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
