'use client'

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
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg text-gray-500 font-medium tracking-wider uppercase mb-8 text-center">
        Overall Feedback
      </h3>

      <div className="text-center">
        <textarea
          value={feedback}
          onChange={(e) => onFeedbackChange(e.target.value)}
          placeholder="Add feedback for the student..."
          className="w-full max-w-md px-4 py-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black/20 transition-all duration-200"
          rows={3}
        />
      </div>
    </motion.div>
  )
}
