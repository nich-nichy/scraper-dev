import { ExecutionPhase } from "@prisma/client";

type Phase = Pick<ExecutionPhase, "creditsConsumed">

export function GetPhasesTotalCost(phases: Phase[]): number {
    return phases.reduce((acc: number, phase: Phase) => acc + (phase.creditsConsumed || 0), 0);
}
