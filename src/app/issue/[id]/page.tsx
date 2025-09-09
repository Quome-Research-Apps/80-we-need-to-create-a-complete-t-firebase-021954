import { notFound } from "next/navigation";
import Image from "next/image";
import { issues } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import IssueStatusBadge from "@/components/issue-status-badge";
import { format } from "date-fns";
import { Calendar, CheckCircle2, Clock, MapPin, Tag } from "lucide-react";

export default async function IssuePage({ params }: { params: { id: string } }) {
  const issue = issues.find((i) => i.id === params.id);

  if (!issue) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground font-headline">
                    {issue.title}
                </h1>
                <p className="text-muted-foreground mt-2">Issue ID: {issue.id}</p>
            </div>
            <IssueStatusBadge status={issue.status} />
        </div>

        {issue.imageUrl && (
          <Card>
            <CardContent className="p-0">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <Image
                  src={issue.imageUrl}
                  alt={issue.title}
                  fill
                  className="object-cover"
                  data-ai-hint="issue photo"
                />
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Category</CardTitle>
              <Tag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{issue.category}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Reported On</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">
                {format(new Date(issue.submittedAt), "PPP")}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Location</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">
                <a 
                    href={`https://www.google.com/maps?q=${issue.location.lat},${issue.location.lng}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline"
                >
                    View on Map
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground whitespace-pre-wrap">{issue.description}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resolution History</CardTitle>
            <CardDescription>Timeline of status updates for this issue.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative pl-6">
              <div className="absolute left-[35px] top-0 h-full w-0.5 bg-border -translate-x-1/2"></div>
              <ul className="space-y-8">
                {issue.history.map((event, index) => (
                  <li key={index} className="flex items-start">
                    <div className="absolute left-[35px] -translate-x-1/2 mt-1 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background">
                       {event.status === 'Resolved' ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                       ) : (
                        <Clock className="h-5 w-5 text-primary" />
                       )}
                    </div>
                    <div className="ml-8 md:ml-12">
                      <div className="flex items-center gap-4">
                        <IssueStatusBadge status={event.status} />
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(event.timestamp), "PPp")}
                        </p>
                      </div>
                      <p className="mt-2 text-muted-foreground">{event.notes}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
