import { CheckCircleIcon } from 'lucide-react'

export function LearnedSection({ learned }: { learned: string }) {
  return (
    <div>
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
            <CheckCircleIcon className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <h4 className="text-lg font-medium text-gray-900 mb-4 text-center">
          Key Learning Outcomes
        </h4>

        {learned && learned.trim() ? (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {learned}
            </p>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 font-medium">
              No learning outcomes recorded
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Student didn&apos;t specify what they learned
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
