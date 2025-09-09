import type { FC } from "react";
import { Badge } from "@/components/ui/badge";
import type { IssueStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

interface IssueStatusBadgeProps {
  status: IssueStatus;
}

const statusStyles: Record<IssueStatus, string> = {
  Reported: "bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/50 dark:text-amber-300 border-amber-300",
  "In Progress": "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-300 border-blue-300",
  Resolved: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-300 border-emerald-300",
};

const IssueStatusBadge: FC<IssueStatusBadgeProps> = ({ status }) => {
  return (
    <Badge variant="outline" className={cn("capitalize", statusStyles[status])}>
      {status}
    </Badge>
  );
};

export default IssueStatusBadge;
