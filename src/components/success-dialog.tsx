import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SqlChallenge } from "@/types";

interface SuccessDialogProps {
  open: boolean;
  challenge: SqlChallenge;
  nextChallenge: SqlChallenge | undefined;
  onOpenChange: (open: boolean) => void;
  onAdvance: (challengeId: string) => void;
}

export function SuccessDialog({
  open,
  challenge,
  nextChallenge,
  onOpenChange,
  onAdvance,
}: SuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <span className="mb-1 flex size-9 items-center justify-center rounded-full bg-success/10 text-success">
            <CheckIcon className="size-5" />
          </span>
          <DialogTitle>Level {challenge.level} complete</DialogTitle>
          <DialogDescription>{challenge.successMessage}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose
            render={<Button variant="outline">Stay on this level</Button>}
          />
          {nextChallenge ? (
            <Button onClick={() => onAdvance(nextChallenge.id)}>
              Start level {nextChallenge.level}
            </Button>
          ) : (
            <DialogClose render={<Button>Finish</Button>} />
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
