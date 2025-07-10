import { motion } from 'motion/react'
import NumberFlow from '@number-flow/react'

interface SharingSectionProps {
  sharing: { discord: boolean; socialMedia: boolean }
  onSharingChange: (sharing: { discord: boolean; socialMedia: boolean }) => void
  itemVariants?: any
}

export function SharingSection({
  sharing,
  onSharingChange,
  itemVariants,
}: SharingSectionProps) {
  const handleToggle = (platform: 'discord' | 'socialMedia') => {
    const newSharing = {
      ...sharing,
      [platform]: !sharing[platform],
    }
    onSharingChange(newSharing)
  }

  return (
    <motion.div className="text-center" variants={itemVariants}>
      <h3 className="text-lg text-gray-500 font-medium tracking-wider uppercase mb-8 text-center">
        Share Achievement
      </h3>

      <div className="flex justify-center gap-8">
        <motion.div
          className="group cursor-pointer"
          onClick={() => handleToggle('discord')}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            className={`relative w-20 h-20 rounded-2xl border-2 transition-all duration-300 ${
              sharing.discord
                ? 'border-black bg-black'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
            animate={
              sharing.discord
                ? {
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  }
                : {}
            }
          >
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={sharing.discord ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              <svg
                className={`w-8 h-8 transition-colors duration-300 ${
                  sharing.discord
                    ? 'text-white'
                    : 'text-gray-400 group-hover:text-gray-600'
                }`}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.445.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.042-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </motion.div>

            {sharing.discord && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
              >
                <motion.svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
              </motion.div>
            )}
          </motion.div>

          <div className="mt-3 text-center">
            <p className="text-xs font-medium text-gray-900">Discord</p>
            <motion.div
              className={`text-xs transition-colors duration-300 ${
                sharing.discord ? 'text-green-600 font-medium' : 'text-gray-500'
              }`}
              animate={sharing.discord ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.4 }}
            >
              {sharing.discord ? '✓ +1 point' : '+1 point'}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="group cursor-pointer"
          onClick={() => handleToggle('socialMedia')}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            className={`relative w-20 h-20 rounded-2xl border-2 transition-all duration-300 ${
              sharing.socialMedia
                ? 'border-black bg-black'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
            animate={
              sharing.socialMedia
                ? {
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  }
                : {}
            }
          >
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={sharing.socialMedia ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              <svg
                className={`w-7 h-7 transition-colors duration-300 ${
                  sharing.socialMedia
                    ? 'text-white'
                    : 'text-gray-400 group-hover:text-gray-600'
                }`}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </motion.div>

            {sharing.socialMedia && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
              >
                <motion.svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
              </motion.div>
            )}
          </motion.div>

          <div className="mt-3 text-center">
            <p className="text-xs font-medium text-gray-900">Social</p>
            <motion.div
              className={`text-xs transition-colors duration-300 ${
                sharing.socialMedia
                  ? 'text-green-600 font-medium'
                  : 'text-gray-500'
              }`}
              animate={sharing.socialMedia ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.4 }}
            >
              {sharing.socialMedia ? '✓ +2 points' : '+2 points'}
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="mt-8 h-16 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={
            sharing.discord || sharing.socialMedia
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 20, scale: 0.8 }
          }
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-sm font-medium"
        >
          <motion.span
            className="text-green-400"
            animate={
              sharing.discord || sharing.socialMedia
                ? { rotate: [0, 360] }
                : { rotate: 0 }
            }
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            ✦
          </motion.span>
          <span>
            +
            <NumberFlow
              value={(sharing.discord ? 1 : 0) + (sharing.socialMedia ? 2 : 0)}
            />{' '}
            bonus points earned
          </span>
        </motion.div>
      </div>
    </motion.div>
  )
}
