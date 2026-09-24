"use client";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Rocket,
  ArrowRight,
  PartyPopper,
} from "lucide-react";

interface SuccessDialogProps {
  open: boolean;
  projectTitle: string;
  projectId: number;
}

export function SuccessDialog({
  open,
  projectTitle,
  projectId,
}: SuccessDialogProps) {
  const router = useRouter();

  const handleGoToProject = () => {
    router.push(`/dashboard/projects`);
    router.refresh();
  };

  const handleNewProject = () => {
    router.push("/dashboard/services");
    router.refresh();
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-950 dark:to-emerald-950">
            <PartyPopper className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <DialogTitle className="text-center text-xl">
            Payment Successful! 🎉
          </DialogTitle>
          <DialogDescription className="text-center">
            Your project has been created and our team will start working on it
            shortly.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-lg border bg-muted/40 p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-green-100 p-2 dark:bg-green-950">
              <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Project</p>
              <p className="mt-0.5 truncate text-sm font-semibold">
                {projectTitle}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                You'll receive an email confirmation shortly
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button onClick={handleGoToProject} className="w-full">
            <Rocket className="mr-2 h-4 w-4" />
            View My Projects
          </Button>
          <Button
            variant="outline"
            onClick={handleNewProject}
            className="w-full"
          >
            Browse More Services
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}