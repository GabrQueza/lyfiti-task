import { NextResponse } from 'next/server';
import { openai } from '@/lib/ai';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description } = body;

    // Payload validation
    if (!title || !description) {
      return NextResponse.json(
        { error: 'Both "title" and "description" are required.' },
        { status: 400 }
      );
    }

    const systemPrompt = `You are an expert AI task manager. Evaluate the following task based on its title and description to determine its urgency and impact.
Your response MUST be strictly a JSON object containing exactly two fields:
- "score": an integer from 1 to 10 (10 being highest priority).
- "justification": a brief, one-sentence explaining the reasoning for the score.
Do not include any other text or markdown formatting outside of the JSON block.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Title: ${title}\nDescription: ${description}` }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.2, // Low temperature for consistent formatting
    });

    const completionText = response.choices[0]?.message?.content;
    
    if (!completionText) {
       throw new Error("No response from AI model.");
    }

    // Parse to ensure it is valid JSON before sending to the client
    const parsedResponse = JSON.parse(completionText);

    return NextResponse.json(parsedResponse, { status: 200 });
  } catch (error: any) {
    console.error('Error in /api/prioritize:', error);
    
    // Check if it's a quota exceeded error (429) from OpenAI
    if (error?.status === 429 || error?.code === 'insufficient_quota') {
       return NextResponse.json(
        { 
          score: Math.floor(Math.random() * 10) + 1, 
          justification: "[MOCK RESPONSE - OpenAI Quota Exceeded] This task seems important based on the description provided." 
        },
        { status: 200 }
      );
    }

    // Provide a generic user-facing message, log the details server-side
    return NextResponse.json(
      { error: 'Internal Server Error while prioritizing task.' },
      { status: 500 }
    );
  }
}
