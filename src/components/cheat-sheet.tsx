import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card, CardContent } from '@/components/ui/card'
import { AQA_CHEAT_SHEET } from '@/lib/challenges'

export function CheatSheet() {
  return (
    <Card>
      <CardContent>
        <Accordion>
          <AccordionItem value="cheat-sheet" className="border-none">
            <AccordionTrigger className="py-0 hover:no-underline">
              <span className="flex flex-col gap-0.5 text-left">
                <span className="font-medium">SQL cheat sheet</span>
                <span className="text-sm font-normal text-muted-foreground">
                  The AQA patterns you need for every level.
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-0">
              <dl className="mt-3 flex flex-col gap-2.5">
                {AQA_CHEAT_SHEET.map((entry) => (
                  <div key={entry.task} className="flex flex-col gap-1">
                    <dt className="text-xs text-muted-foreground">{entry.task}</dt>
                    <dd>
                      <code className="block overflow-x-auto rounded-md bg-muted px-2.5 py-1.5 font-mono text-xs">
                        {entry.code}
                      </code>
                    </dd>
                  </div>
                ))}
              </dl>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}
