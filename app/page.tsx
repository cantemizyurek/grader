import { getUserPreviews } from '@/lib/db'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ChevronRightIcon } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const userPreviews = getUserPreviews()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done':
        return 'bg-green-50 text-green-700 border-green-200 shadow-green-100'
      case 'in-progress':
        return 'bg-amber-50 text-amber-700 border-amber-200 shadow-amber-100'
      case 'not-started':
        return 'bg-slate-50 text-slate-600 border-slate-200 shadow-slate-100'
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200 shadow-slate-100'
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-600 text-slate-900 mb-3 tracking-tight">
            Mark Grading
          </h1>
          <p className="text-slate-600 text-lg">
            {userPreviews.length} students to review
          </p>
        </div>

        {/* Students List */}
        <div className="space-y-3">
          {userPreviews.map((user) => (
            <Link
              href={`/users/${user.email}`}
              key={user.email}
              className="group block"
            >
              <div className="bg-white rounded-xl border border-slate-200 p-4 transition-all duration-200  hover:border-slate-300 ">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10 border-2 border-slate-100">
                      <AvatarFallback className="bg-slate-100 text-slate-700 font-500 text-sm">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-500 text-slate-900 group-hover:text-slate-800 transition-colors">
                        {user.name}
                      </h3>
                      <p className="text-sm text-slate-500 font-400">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {user.score > 0 && (
                      <div className="text-right">
                        <div className="text-sm font-500 text-slate-900">
                          {user.score}
                        </div>
                        <div className="text-xs text-slate-500">score</div>
                      </div>
                    )}
                    <Badge
                      variant="outline"
                      className={`text-xs font-500 px-2.5 py-1 ${getStatusColor(
                        user.markStatus
                      )} shadow-sm`}
                    >
                      {user.markStatus === 'not-started'
                        ? 'Not Started'
                        : user.markStatus === 'in-progress'
                        ? 'In Progress'
                        : 'Done'}
                    </Badge>
                    <ChevronRightIcon className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {userPreviews.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white rounded-xl border border-slate-200 p-8 max-w-md mx-auto">
              <div className="text-slate-400 mb-4">
                <svg
                  className="w-12 h-12 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-500 text-slate-900 mb-2">
                No students to review yet
              </h3>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
