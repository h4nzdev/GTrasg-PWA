'use server';
/**
 * @fileOverview An AI agent for classifying waste items into biodegradable, recyclable, or residual categories.
 *
 * - classifyWasteItem - A function that handles the waste item classification process.
 * - ClassifyWasteItemInput - The input type for the classifyWasteItem function.
 * - ClassifyWasteItemOutput - The return type for the classifyWasteItem function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ClassifyWasteItemInputSchema = z.object({
  wasteItemPhotoDataUri: z
    .string()
    .describe(
      "A photo of a waste item, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ClassifyWasteItemInput = z.infer<typeof ClassifyWasteItemInputSchema>;

const ClassifyWasteItemOutputSchema = z.object({
  classification: z
    .enum(['biodegradable', 'recyclable', 'residual'])
    .describe('The classification of the waste item.'),
  explanation: z.string().describe('A concise explanation for the classification.'),
});
export type ClassifyWasteItemOutput = z.infer<typeof ClassifyWasteItemOutputSchema>;

export async function classifyWasteItem(input: ClassifyWasteItemInput): Promise<ClassifyWasteItemOutput> {
  return classifyWasteItemFlow(input);
}

const classifyWasteItemPrompt = ai.definePrompt({
  name: 'classifyWasteItemPrompt',
  input: {schema: ClassifyWasteItemInputSchema},
  output: {schema: ClassifyWasteItemOutputSchema},
  prompt: `You are an expert waste segregation assistant. Your task is to classify a given waste item from an image into one of three categories:
- 'biodegradable': Items that can naturally decompose.
- 'recyclable': Items that can be processed and reused.
- 'residual': Items that cannot be recycled or composted and typically go to a landfill.

Analyze the provided image of the waste item and determine its most appropriate classification. Provide a concise explanation for your decision.

Waste Item Photo: {{media url=wasteItemPhotoDataUri}}`,
});

const classifyWasteItemFlow = ai.defineFlow(
  {
    name: 'classifyWasteItemFlow',
    inputSchema: ClassifyWasteItemInputSchema,
    outputSchema: ClassifyWasteItemOutputSchema,
  },
  async input => {
    const {output} = await classifyWasteItemPrompt(input);
    return output!;
  }
);
