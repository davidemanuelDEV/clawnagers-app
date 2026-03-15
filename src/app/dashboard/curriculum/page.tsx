"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { curriculum } from "@/lib/curriculum"
import { useDashboard } from "../layout"
import { getCompletedWeeks } from "@/lib/queries"

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
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Curriculum</h1>
        <p className="text-white/50 mt-1">
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
              className={`bg-[#1a1a2e] border-white/10 transition-all ${
                isCurrent ? 'border-[#FF6B35]/30 shadow-lg shadow-[#FF6B35]/5' : ''
              } ${isCompleted ? 'opacity-80' : ''}`}
            >
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Week Number */}
                  <div className="flex items-start gap-4 sm:w-48 shrink-0">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold shrink-0 ${
                      isCompleted ? 'bg-green-500/20 text-green-400' :
                      isCurrent ? 'bg-[#FF6B35]/20 text-[#FF6B35]' :
                      'bg-white/5 text-white/30'
                    }`}>
                      {isCompleted ? '✓' : week.week === 8 ? '🏆' : week.week}
                    </div>
                    <div>
                      <div className="text-xs text-white/30 font-mono">WEEK {week.week}</div>
                      <div className={`font-bold ${
                        isCurrent ? 'text-white' : isCompleted ? 'text-white/60' : 'text-white/40'
                      }`}>
                        {week.title}
                      </div>
                      {isCurrent && (
                        <Badge className="bg-[#FF6B35] text-white border-none text-xs mt-1">
                          This Week
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <p className={`text-sm mb-4 ${
                      isCurrent ? 'text-white/70' : 'text-white/40'
                    }`}>
                      {week.description}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* Objectives */}
                      <div>
                        <div className="text-xs font-mono text-[#FF6B35]/60 mb-2">OBJECTIVES</div>
                        <ul className="space-y-1.5">
                          {week.objectives.map((obj, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <span className={`mt-0.5 ${isCompleted ? 'text-green-400' : 'text-white/20'}`}>
                                {isCompleted ? '✓' : '○'}
                              </span>
                              <span className={isCompleted ? 'text-white/40' : isCurrent ? 'text-white/60' : 'text-white/30'}>
                                {obj}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Activities */}
                      <div>
                        <div className="text-xs font-mono text-[#FF6B35]/60 mb-2">ACTIVITIES</div>
                        <ul className="space-y-1.5">
                          {week.activities.map((act, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <span className={`mt-0.5 ${isCompleted ? 'text-green-400' : 'text-white/20'}`}>
                                {isCompleted ? '✓' : '→'}
                              </span>
                              <span className={isCompleted ? 'text-white/40' : isCurrent ? 'text-white/60' : 'text-white/30'}>
                                {act}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {isCurrent && (
                      <div className="mt-4 p-3 rounded-lg bg-[#FF6B35]/5 border border-[#FF6B35]/10">
                        <div className="text-xs text-[#FF6B35] font-medium">
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
      <Card className="bg-[#1a1a2e] border-white/10 mt-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-white mb-4">📁 Additional Resources</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-[#0f0f23] border border-white/5">
              <div className="text-2xl mb-2">📖</div>
              <div className="text-sm font-medium text-white">Teacher Guide</div>
              <div className="text-xs text-white/40 mt-1">Full facilitator manual with session plans</div>
            </div>
            <div className="p-4 rounded-lg bg-[#0f0f23] border border-white/5">
              <div className="text-2xl mb-2">📝</div>
              <div className="text-sm font-medium text-white">Student Workbook</div>
              <div className="text-xs text-white/40 mt-1">Printable worksheets and reflection journals</div>
            </div>
            <div className="p-4 rounded-lg bg-[#0f0f23] border border-white/5">
              <div className="text-2xl mb-2">🎬</div>
              <div className="text-sm font-medium text-white">Demo Day Toolkit</div>
              <div className="text-xs text-white/40 mt-1">Judging rubrics, certificates, and event guide</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
