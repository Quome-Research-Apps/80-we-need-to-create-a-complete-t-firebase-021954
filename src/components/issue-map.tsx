"use client";

import type { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { Issue } from "@/lib/types";
import { cn } from "@/lib/utils";

interface IssueMapProps {
  issues: Issue[];
}

// Normalize coordinates to a 0-1 scale for positioning on the map image
// These are example boundaries for a fictional city map
const MAP_BOUNDS = {
  latMin: 34.03,
  latMax: 34.07,
  lngMin: -118.27,
  lngMax: -118.22,
};

const normalizeCoords = (lat: number, lng: number) => {
  const y = 100 - ((lat - MAP_BOUNDS.latMin) / (MAP_BOUNDS.latMax - MAP_BOUNDS.latMin)) * 100;
  const x = ((lng - MAP_BOUNDS.lngMin) / (MAP_BOUNDS.lngMax - MAP_BOUNDS.lngMin)) * 100;
  return { x: `${x}%`, y: `${y}%` };
};

const statusColors: Record<Issue["status"], string> = {
    Reported: "bg-amber-500",
    "In Progress": "bg-primary",
    Resolved: "bg-emerald-500",
};

const IssueMap: FC<IssueMapProps> = ({ issues }) => {
  return (
    <TooltipProvider>
      <div className="relative w-full h-96 md:h-[500px] rounded-lg overflow-hidden border bg-muted">
        <Image
          src="https://picsum.photos/1200/800"
          alt="City map"
          fill
          className="object-cover opacity-50"
          data-ai-hint="city map"
        />
        {issues.map((issue) => {
          const { x, y } = normalizeCoords(issue.location.lat, issue.location.lng);
          return (
            <Tooltip key={issue.id}>
              <TooltipTrigger asChild>
                <Link
                  href={`/issue/${issue.id}`}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: x, top: y }}
                  aria-label={`View issue: ${issue.title}`}
                >
                  <div className="relative flex h-3 w-3">
                    <div className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", statusColors[issue.status])}></div>
                    <div className={cn("relative inline-flex rounded-full h-3 w-3 border-2 border-background", statusColors[issue.status])}></div>
                  </div>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-semibold">{issue.title}</p>
                <p className="text-sm text-muted-foreground">{issue.category}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
};

export default IssueMap;
