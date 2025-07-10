'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { getInitials, getStatusColor } from '@/lib/utils'
import { ChevronRightIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export default function PageClient({
  users,
}: {
  users: {
    name: string
    email: string
    timestamp: string
    markStatus: string
    score: number
  }[]
}) {
  const [search, setSearch] = useState('')

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-600 text-slate-900 mb-3 tracking-tight">
          Mark Grading
        </h1>
        <p className="text-slate-600 text-lg">
          {users.length} students to review
        </p>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <Input
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredUsers.map((user) => (
            <motion.div
              key={user.email}
              layout
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: 'spring',
                  stiffness: 350,
                  damping: 30,
                },
              }}
              exit={{
                opacity: 0,
                y: -8,
                scale: 0.95,
                transition: {
                  type: 'spring',
                  stiffness: 400,
                  damping: 35,
                  duration: 0.2,
                },
              }}
              transition={{
                layout: {
                  type: 'spring',
                  stiffness: 350,
                  damping: 30,
                },
              }}
            >
              <Link href={`/users/${user.email}`} className="group block">
                <div className="bg-white rounded-xl border border-slate-200 p-4 transition-colors duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10 border-2 border-slate-100">
                        <AvatarFallback className="bg-slate-100 text-slate-700 font-500 text-sm">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-500 text-slate-900">{user.name}</h3>
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
                      <ChevronRightIcon className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredUsers.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
          }}
          className="text-center py-16"
        >
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
              No students found
            </h3>
          </div>
        </motion.div>
      )}
    </div>
  )
}
