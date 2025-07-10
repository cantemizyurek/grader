import * as React from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface ScoreSelectorProps {
  scores: number[]
  selectedScore: number
  onScoreChange: (score: number) => void
  layoutId: string
  className?: string
}

interface ScoreButtonProps<T extends React.ReactNode> {
  value: T
  active: boolean
  onSelect: (value: T) => void
  layoutId: string
  className?: string
}

function ScoreButton<T extends React.ReactNode>({
  value,
  active,
  onSelect,
  layoutId,
  className,
  ...props
}: ScoreButtonProps<T>) {
  return (
    <motion.button
      onClick={() => onSelect(value)}
      className={cn(
        'relative px-3 py-2 rounded-full text-sm font-medium transition-colors duration-200',
        active ? 'text-white' : 'text-gray-600 hover:text-black',
        className
      )}
      whileHover={{
        scale: 1.03,
        transition: {
          type: 'spring',
          stiffness: 400,
          damping: 20,
        },
      }}
      whileTap={{
        scale: 0.97,
        transition: {
          type: 'spring',
          stiffness: 600,
          damping: 15,
        },
      }}
      {...props}
    >
      {active && (
        <motion.div
          layoutId={layoutId}
          className="absolute inset-0 bg-black rounded-full"
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 30,
            mass: 0.8,
          }}
        />
      )}
      <span className="relative z-10">{value}</span>
    </motion.button>
  )
}

function ScoreSelector({
  scores,
  selectedScore,
  onScoreChange,
  layoutId,
  className,
  ...props
}: ScoreSelectorProps) {
  return (
    <div
      data-slot="score-selector"
      className={cn(
        'inline-flex bg-gray-50 rounded-full p-1 border border-gray-200',
        className
      )}
      {...props}
    >
      {scores.map((scoreValue) => (
        <ScoreButton
          key={scoreValue}
          value={scoreValue}
          active={selectedScore === scoreValue}
          onSelect={onScoreChange}
          layoutId={layoutId}
        />
      ))}
    </div>
  )
}

export { ScoreSelector, ScoreButton }
