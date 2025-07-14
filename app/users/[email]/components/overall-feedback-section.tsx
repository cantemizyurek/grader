'use client'

import { TextAreaAI } from '@/components/ui/textarea-ai'
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

      <div className="text-center mx-auto">
        <h4 className="text-sm font-medium text-gray-700 mb-4">Feedback</h4>
        <div className="w-full max-w-md mx-auto">
          <TextAreaAI
            prompt={`
Please enhance this overall feedback to be comprehensive and constructive. Guidelines:
- Summarize the student's overall performance across all areas
- Highlight key strengths and areas for growth
- Provide specific, actionable suggestions for improvement
- Keep the tone encouraging and supportive
- Maintain first-person perspective ("I" statements)
- Keep it concise but comprehensive (under 80 words)
- Connect feedback to learning objectives when possible
The goal is to give the student a clear understanding of their overall progress and next steps.`.trim()}
            value={feedback}
            onChange={(e) => onFeedbackChange(e.target.value)}
            placeholder="Add feedback for the presentation..."
            className="w-full max-w-md resize-none max-h-40 h-24"
            rows={3}
          />
        </div>
      </div>
    </div>
  )
}
