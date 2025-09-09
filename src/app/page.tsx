import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { issues } from '@/lib/data';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import IssueMap from '@/components/issue-map';
import IssueCard from '@/components/issue-card';

export default function Home() {
  const recentIssues = issues.slice(0, 6);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground font-headline">
          Civitas Connect
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Your direct line to city services. Report issues, track progress, and help improve our community together.
        </p>
        <Button asChild size="lg" className="mt-6">
          <Link href="/submit">
            Report an Issue <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Public Issue Tracker</CardTitle>
          <CardDescription>Live map of reported issues across the city.</CardDescription>
        </CardHeader>
        <CardContent>
          <IssueMap issues={issues} />
        </CardContent>
      </Card>

      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground font-headline mb-6">
          Recently Reported
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentIssues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      </div>
    </div>
  );
}
