import { IssueForm } from "@/components/issue-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SubmitPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Report a New Issue</CardTitle>
          <CardDescription>
            Help us improve the city by providing details about the problem you've found. The more details, the faster we can help.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <IssueForm />
        </CardContent>
      </Card>
    </div>
  );
}
