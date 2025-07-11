'use client'

import { Textarea } from '@/components/ui/textarea'
import { motion } from 'motion/react'

interface OverallFeedbackSectionProps {
  feedback: string
  onFeedbackChange: (value: string) => void
}

export function OverallFeedbackSection({
  feedback,
  onFeedbackChange,
}: OverallFeedbackSectionProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg text-gray-500 font-medium tracking-wider uppercase mb-8 text-center">
        Overall Feedback
      </h3>

      <div className="text-center">
        <Textarea
          value={feedback}
          onChange={(e) => onFeedbackChange(e.target.value)}
          placeholder="Add feedback for the student..."
          className="w-full max-w-md mx-auto resize-none max-h-40 h-24"
          rows={3}
        />
      </div>
    </div>
  )
}
