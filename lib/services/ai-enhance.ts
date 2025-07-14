'use server'

import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'

export async function enhanceText(
  text: string,
  prompt: string
): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key is not configured')
  }

  if (!text || !prompt) {
    throw new Error('Text and prompt are required')
  }

  try {
    const { text: enhancedText } = await generateText({
      model: openai('gpt-4o'),
      prompt: `${prompt}\n\nOriginal text: ${text}`,
      maxTokens: 1000,
    })

    return enhancedText
  } catch (error) {
    console.error('Error enhancing text:', error)
    throw new Error('Failed to enhance text')
  }
}
