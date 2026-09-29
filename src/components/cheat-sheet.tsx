import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SqlCode } from "@/components/sql-code";
import { Card, CardContent } from "@/components/ui/card";
import { AQA_CHEAT_SHEET } from "@/lib/challenges";

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
              <dl className="mt-3 flex flex-col gap-3">
                {AQA_CHEAT_SHEET.map((entry) => (
                  <div key={entry.task} className="flex flex-col gap-1">
                    <dt className="text-sm text-muted-foreground">
                      {entry.task}
                    </dt>
                    <dd>
                      <SqlCode
                        code={entry.code}
                        className="block overflow-x-auto rounded-md border border-primary/15 bg-accent/50 px-2.5 py-2 text-sm whitespace-pre"
                      />
                    </dd>
                  </div>
                ))}
              </dl>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
