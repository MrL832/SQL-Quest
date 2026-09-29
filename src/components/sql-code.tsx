import { cn } from '@/lib/utils'

// Multi-word statements come first so they match before their leading word does.
const SQL_KEYWORDS = [
  'INSERT INTO',
  'DELETE FROM',
  'ORDER BY',
  'GROUP BY',
  'PRIMARY KEY',
  'FOREIGN KEY',
  'SELECT',
  'UPDATE',
  'DELETE',
  'VALUES',
  'WHERE',
  'FROM',
  'JOIN',
  'DESC',
  'ASC',
  'AND',
  'NOT',
  'SET',
  'ON',
  'OR',
]

const KEYWORD_PATTERN = new RegExp(
  `\\b(${SQL_KEYWORDS.join('|').replaceAll(' ', '\\s+')})\\b`,
  'gi',
)

const KEYWORD_LOOKUP = new Set(SQL_KEYWORDS)

function isKeyword(part: string) {
  return KEYWORD_LOOKUP.has(part.toUpperCase().replace(/\s+/g, ' '))
}

/** Renders a SQL snippet with its statement keywords emphasised. */
export function SqlCode({ code, className }: { code: string; className?: string }) {
  return (
    <code className={cn('font-mono', className)}>
      {code.split(KEYWORD_PATTERN).map((part, index) =>
        isKeyword(part) ? (
          <strong key={index} className="font-bold text-primary">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </code>
  )
}
