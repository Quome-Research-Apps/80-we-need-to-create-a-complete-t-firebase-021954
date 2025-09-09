'use server';

/**
 * @fileOverview This file defines a Genkit flow for categorizing issue reports and providing helpful tips.
 *
 * - categorizeIssueReport - A function that takes an issue description and returns suggested categories and tips.
 * - CategorizeIssueReportInput - The input type for the categorizeIssueReport function.
 * - CategorizeIssueReportOutput - The return type for the categorizeIssueReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CategorizeIssueReportInputSchema = z.object({
  description: z.string().describe('The description of the issue report.'),
});
export type CategorizeIssueReportInput = z.infer<typeof CategorizeIssueReportInputSchema>;

const CategorizeIssueReportOutputSchema = z.object({
  suggestedCategories: z.array(z.string()).describe('Suggested categories for the issue report.'),
  helpfulTips: z.string().describe('Helpful tips for the reporter to improve the issue report.'),
});
export type CategorizeIssueReportOutput = z.infer<typeof CategorizeIssueReportOutputSchema>;

export async function categorizeIssueReport(input: CategorizeIssueReportInput): Promise<CategorizeIssueReportOutput> {
  return categorizeIssueReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'categorizeIssueReportPrompt',
  input: {schema: CategorizeIssueReportInputSchema},
  output: {schema: CategorizeIssueReportOutputSchema},
  prompt: `You are an AI assistant helping citizens categorize their issue reports and provide helpful tips.

  Based on the following issue report description, suggest relevant categories and provide helpful tips to the reporter.

  Description: {{{description}}}

  Respond in JSON format with the following keys:
  - suggestedCategories: An array of strings representing the suggested categories for the issue report.
  - helpfulTips: A string containing helpful tips for the reporter to improve the issue report, focusing on the type of details and images that will aid in resolution.
  `,
});

const categorizeIssueReportFlow = ai.defineFlow(
  {
    name: 'categorizeIssueReportFlow',
    inputSchema: CategorizeIssueReportInputSchema,
    outputSchema: CategorizeIssueReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
