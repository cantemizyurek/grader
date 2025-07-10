import { ShareIcon, ExternalLinkIcon } from 'lucide-react'

export function SharedContentSection({
  sharedContent,
}: {
  sharedContent: string
}) {
  const isUrl = (text: string) => {
    const urlRegex = /https?:\/\/[^\s]+/g
    return urlRegex.test(text)
  }

  const renderContentWithLinks = (text: string) => {
    const urlRegex = /https?:\/\/[^\s]+/g
    const parts = text.split(urlRegex)
    const urls = text.match(urlRegex) || []

    return parts.map((part, index) => (
      <span key={index}>
        {part}
        {urls[index] && (
          <a
            href={urls[index]}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 underline font-medium max-w-full"
          >
            <ExternalLinkIcon className="w-3 h-3 flex-shrink-0" />
            <span className="truncate min-w-0">{urls[index]}</span>
          </a>
        )}
      </span>
    ))
  }

  return (
    <div>
      <h3 className="text-lg text-gray-500 font-medium tracking-wider uppercase mb-8 text-center">
        Shared Content
      </h3>

      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center">
            <ShareIcon className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <h4 className="text-lg font-medium text-gray-900 mb-4 text-center">
          Resources
        </h4>

        {sharedContent && sharedContent.trim() ? (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {isUrl(sharedContent) ? (
                renderContentWithLinks(sharedContent)
              ) : (
                <p>{sharedContent}</p>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 font-medium">No shared content</p>
            <p className="text-sm text-gray-400 mt-1">
              Student didn't share any additional resources
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
