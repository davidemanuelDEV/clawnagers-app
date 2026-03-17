"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { curriculum } from "@/lib/curriculum"
import { useDashboard } from "../layout"

export default function CurriculumPage() {
  const { data } = useDashboard()

  // Determine current week from aggregate progress
  let currentWeek = 1
  if (data) {
    const maxCompleted = data.progress.reduce((max, p) => {
      if (p.status === 'completed' && p.week_number > max) return p.week_number
      return max
    }, 0)
    currentWeek = Math.min(maxCompleted + 1, 8)
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">Curriculum</h1>
        <p className="text-zinc-500 mt-1">
          8-week journey from AI basics to Demo Day
        </p>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {curriculum.map((week) => {
          const isCompleted = week.week < currentWeek
          const isCurrent = week.week === currentWeek
          const isUpcoming = week.week > currentWeek

          return (
            <Card
              key={week.week}
              className={`bg-white border border-zinc-200 transition-all ${
                isCurrent ? 'border-amber-300 shadow-lg shadow-amber-100' : ''
              } ${isCompleted ? 'opacity-80' : ''}`}
            >
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Week Number */}
                  <div className="flex items-start gap-4 sm:w-48 shrink-0">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold shrink-0 ${
                      isCompleted ? 'bg-green-100 text-green-600' :
                      isCurrent ? 'bg-amber-100 text-amber-600' :
                      'bg-zinc-100 text-zinc-400'
                    }`}>
                      {isCompleted ? '✓' : week.week === 8 ? '🏆' : week.week}
                    </div>
                    <div>
                      <div className="text-xs text-zinc-400 font-mono">WEEK {week.week}</div>
                      <div className={`font-bold ${
                        isCurrent ? 'text-zinc-900' : isCompleted ? 'text-zinc-500' : 'text-zinc-400'
                      }`}>
                        {week.title}
                      </div>
                      {isCurrent && (
                        <Badge className="bg-amber-400 text-zinc-900 border-none text-xs mt-1">
                          This Week
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <p className={`text-sm mb-4 ${
                      isCurrent ? 'text-zinc-600' : 'text-zinc-400'
                    }`}>
                      {week.description}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* Objectives */}
                      <div>
                        <div className="text-xs font-mono text-amber-600 mb-2">OBJECTIVES</div>
                        <ul className="space-y-1.5">
                          {week.objectives.map((obj, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <span className={`mt-0.5 ${isCompleted ? 'text-green-500' : 'text-zinc-300'}`}>
                                {isCompleted ? '✓' : '○'}
                              </span>
                              <span className={isCompleted ? 'text-zinc-400' : isCurrent ? 'text-zinc-600' : 'text-zinc-400'}>
                                {obj}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Activities */}
                      <div>
                        <div className="text-xs font-mono text-amber-600 mb-2">ACTIVITIES</div>
                        <ul className="space-y-1.5">
                          {week.activities.map((act, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <span className={`mt-0.5 ${isCompleted ? 'text-green-500' : 'text-zinc-300'}`}>
                                {isCompleted ? '✓' : '→'}
                              </span>
                              <span className={isCompleted ? 'text-zinc-400' : isCurrent ? 'text-zinc-600' : 'text-zinc-400'}>
                                {act}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {isCurrent && (
                      <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200">
                        <div className="text-xs text-amber-600 font-medium">
                          📎 Lesson plans and worksheets available in the teacher guide
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Resources */}
      <Card className="bg-white border border-zinc-200 mt-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-zinc-900 mb-4">📁 Additional Resources</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200">
              <div className="text-2xl mb-2">📖</div>
              <div className="text-sm font-medium text-zinc-900">Teacher Guide</div>
              <div className="text-xs text-zinc-400 mt-1">Full facilitator manual with session plans</div>
            </div>
            <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200">
              <div className="text-2xl mb-2">📝</div>
              <div className="text-sm font-medium text-zinc-900">Student Workbook</div>
              <div className="text-xs text-zinc-400 mt-1">Printable worksheets and reflection journals</div>
            </div>
            <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200">
              <div className="text-2xl mb-2">🎬</div>
              <div className="text-sm font-medium text-zinc-900">Demo Day Toolkit</div>
              <div className="text-xs text-zinc-400 mt-1">Judging rubrics, certificates, and event guide</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
