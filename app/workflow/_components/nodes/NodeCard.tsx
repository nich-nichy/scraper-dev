"use client"

import useFlowValidation from "@/components/hooks/useFlowValidation"
import { cn } from "@/lib/utils"
import { useReactFlow } from "@xyflow/react"
import { ReactNode } from "react"

export default function NodeCard({ children, nodeId, isSelected }: {
    children: ReactNode,
    nodeId: string,
    isSelected: boolean
}) {
    const { getNode, setCenter } = useReactFlow();
    const { invalidInputs } = useFlowValidation();
    const hasInvalidInputs = invalidInputs.some((node) => node.nodeId === nodeId);
    return (
        <div className={cn("rounded-md border cursor-pointer bg-background p-2 shadow-sm hover:bg-accent hover:text-accent-foreground border-seperate w-[500px] text-xs gap-1 flex flex-col",
            isSelected && "border-green-500",
            hasInvalidInputs && "border-destructive border-2"
        )}
            onDoubleClick={() => {
                const node = getNode(nodeId)
                if (!node) return;
                const { position, measured } = node;
                if (!position || !measured) return;
                const { width, height } = measured;
                const x = position.x + width! / 2;
                const y = position.y + height! / 2;
                if (x === undefined || y === undefined) return;
                console.log("@position", position);
                setCenter(x, y, {
                    zoom: 1,
                    duration: 500,
                });
            }}
        >
            {children}
        </div>
    )
}
