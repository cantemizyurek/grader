import { motion, animate } from 'motion/react'
import { useEffect, useState } from 'react'
import NumberFlow from '@number-flow/react'

interface SubmissionStatusSectionProps {
  daysLate: number
  onDaysLateChange: (days: number) => void
  itemVariants: any
}

export function SubmissionStatusSection({
  daysLate,
  onDaysLateChange,
  itemVariants,
}: SubmissionStatusSectionProps) {
  return (
    <div className="text-center">
      <h3 className="text-lg text-gray-500 font-medium tracking-wider uppercase mb-8 block">
        Submission Status
      </h3>
      <div className="inline-flex bg-gray-50 rounded-full p-1 border border-gray-200">
        {[0, 1, 2, 3, 4].map((days, index) => (
          <motion.button
            key={days}
            onClick={() => onDaysLateChange(days)}
            className={`relative px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
              daysLate === days
                ? 'text-white'
                : 'text-gray-600 hover:text-black'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {daysLate === days && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-black rounded-full"
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                }}
              />
            )}
            <span className="relative z-10">
              {days === 0 ? 'On time' : `${days}d late`}
            </span>
          </motion.button>
        ))}
        <motion.button
          onClick={() => onDaysLateChange(5)}
          className={`relative px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
            daysLate >= 5 ? 'text-white' : 'text-gray-600 hover:text-black'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {daysLate >= 5 && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-black rounded-full"
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
              }}
            />
          )}
          <span className="relative z-10">5+ days</span>
        </motion.button>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: daysLate > 0 ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 h-6 flex items-center justify-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full">
          <motion.div
            className="w-1 h-1 bg-amber-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-xs text-amber-700 font-medium">
            <NumberFlow
              value={daysLate * 20}
              className="text-xs text-amber-700 font-medium"
            />
            % penalty
          </span>
        </div>
      </motion.div>
    </div>
  )
}
