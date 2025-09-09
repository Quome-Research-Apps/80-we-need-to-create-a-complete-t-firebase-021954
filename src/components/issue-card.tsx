import type { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import IssueStatusBadge from "./issue-status-badge";
import type { Issue } from "@/lib/types";
import { ArrowRight, Calendar, MapPin, Tag } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface IssueCardProps {
  issue: Issue;
}

const IssueCard: FC<IssueCardProps> = ({ issue }) => {
  return (
    <Link href={`/issue/${issue.id}`} className="group">
      <Card className="h-full flex flex-col transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:border-primary">
        {issue.imageUrl && (
            <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                <Image
                    src={issue.imageUrl}
                    alt={issue.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint="issue photo"
                />
            </div>
        )}
        <CardHeader>
          <CardTitle className="line-clamp-2">{issue.title}</CardTitle>
          <CardDescription className="flex items-center pt-1">
             <Tag className="w-4 h-4 mr-1.5" />
            {issue.category}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground line-clamp-3 text-sm">{issue.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
            <IssueStatusBadge status={issue.status} />
            <div className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(issue.submittedAt), { addSuffix: true })}
            </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default IssueCard;
