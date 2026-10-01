import { useState } from "react";
import { ChevronDownIcon, LightbulbIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { SqlChallenge } from "@/types";

interface MissionPanelProps {
  challenge: SqlChallenge;
  isCompleted: boolean;
}

export function MissionPanel({ challenge, isCompleted }: MissionPanelProps) {
  const [isHintOpen, setIsHintOpen] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardDescription className="font-medium text-primary">
          Level {challenge.level} &middot; {challenge.codename}
        </CardDescription>
        <CardTitle className="text-2xl">{challenge.title}</CardTitle>
        {isCompleted ? (
          <CardAction>
            <Badge className="bg-success text-success-foreground">
              Completed
            </Badge>
          </CardAction>
        ) : null}
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <p className="text-muted-foreground">{challenge.story}</p>

        <div className="rounded-lg border border-primary/30 bg-primary/10 p-3.5">
          <p className="mb-1 text-xs font-semibold tracking-wide text-primary uppercase">
            Your task
          </p>
          <p className="font-medium text-pretty">{challenge.mission}</p>
        </div>

        <Collapsible open={isHintOpen} onOpenChange={setIsHintOpen}>
          <CollapsibleTrigger
            render={
              <Button
                variant="ghost"
                className="-ml-2.5 text-primary hover:text-primary"
              >
                <LightbulbIcon data-icon="inline-start" />
                {isHintOpen ? "Hide hint" : "Stuck? Show a hint"}
                <ChevronDownIcon
                  data-icon="inline-end"
                  className={
                    isHintOpen
                      ? "rotate-180 transition-transform"
                      : "transition-transform"
                  }
                />
              </Button>
            }
          />
          <CollapsibleContent>
            <div className="mt-2 flex flex-col gap-3 rounded-lg border border-dashed border-primary/35 bg-accent/40 p-3.5">
              <p>{challenge.hint}</p>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-sm text-muted-foreground">
                  Statements you need:
                </span>
                {challenge.focus.map((statement) => (
                  <Badge key={statement} className="font-mono text-xs">
                    {statement}
                  </Badge>
                ))}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
