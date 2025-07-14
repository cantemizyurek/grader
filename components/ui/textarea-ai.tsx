'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { enhanceText } from '@/lib/services/ai-enhance'
import { Loader2, Wand2, Undo2 } from 'lucide-react'

interface TextAreaAIProps extends React.ComponentProps<'textarea'> {
  prompt: string
  onValueChange?: (value: string) => void
}

function TextAreaAI({
  className,
  prompt,
  value,
  onValueChange,
  onChange,
  ...props
}: TextAreaAIProps) {
  const [isEnhancing, setIsEnhancing] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [originalText, setOriginalText] = React.useState<string>('')
  const [isEnhanced, setIsEnhanced] = React.useState(false)

  // Reset enhanced state when user manually changes text
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isEnhanced && e.target.value !== value) {
      setIsEnhanced(false)
      setOriginalText('')
    }
    if (onChange) {
      onChange(e)
    }
  }

  const handleEnhanceOrRevert = async () => {
    if (isEnhanced) {
      // Revert to original text
      if (onValueChange) {
        onValueChange(originalText)
      }
      if (onChange) {
        const syntheticEvent = {
          target: { value: originalText },
        } as React.ChangeEvent<HTMLTextAreaElement>
        onChange(syntheticEvent)
      }
      setIsEnhanced(false)
      setOriginalText('')
      setError(null)
      return
    }

    // Enhance text
    if (!value || typeof value !== 'string') {
      setError('Please enter some text to enhance')
      return
    }

    setIsEnhancing(true)
    setError(null)

    try {
      setOriginalText(value) // Store original before enhancing
      const enhancedText = await enhanceText(value, prompt)

      if (onValueChange) {
        onValueChange(enhancedText)
      }

      // Also trigger the onChange event if provided
      if (onChange) {
        const syntheticEvent = {
          target: { value: enhancedText },
        } as React.ChangeEvent<HTMLTextAreaElement>
        onChange(syntheticEvent)
      }

      setIsEnhanced(true)
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Failed to enhance text'
      )
    } finally {
      setIsEnhancing(false)
    }
  }

  return (
    <div className="relative">
      <Textarea
        className={cn(className)}
        value={value}
        onChange={handleChange}
        {...props}
      />

      <button
        type="button"
        onClick={handleEnhanceOrRevert}
        disabled={isEnhancing || (!value && !isEnhanced)}
        className={cn(
          'absolute bottom-2 right-2 p-1 rounded-md z-10',
          'text-muted-foreground/60 hover:text-foreground',
          'hover:bg-accent/50 transition-all duration-200',
          'disabled:opacity-30 disabled:cursor-not-allowed',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'h-6 w-6 flex items-center justify-center shrink-0'
        )}
        title={
          isEnhancing
            ? 'Enhancing...'
            : isEnhanced
            ? 'Revert to original'
            : 'Enhance with AI'
        }
      >
        {isEnhancing ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : isEnhanced ? (
          <Undo2 className="h-3.5 w-3.5" />
        ) : (
          <Wand2 className="h-3.5 w-3.5" />
        )}
      </button>

      {error && (
        <div className="mt-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-2">
          {error}
        </div>
      )}
    </div>
  )
}

export { TextAreaAI, type TextAreaAIProps }
