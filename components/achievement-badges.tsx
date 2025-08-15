"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Zap, Target, Star, Award, Crown } from "lucide-react"

interface AchievementBadgesProps {
  stats: {
    totalSolved: number
    easySolved: number
    mediumSolved: number
    hardSolved: number
    acceptanceRate: number
    ranking: number
  }
}

export function AchievementBadges({ stats }: AchievementBadgesProps) {
  const achievements = [
    {
      id: "first-steps",
      name: "First Steps",
      description: "Solved your first problem",
      icon: Star,
      earned: stats.totalSolved >= 1,
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    },
    {
      id: "problem-solver",
      name: "Problem Solver",
      description: "Solved 50 problems",
      icon: Trophy,
      earned: stats.totalSolved >= 50,
      color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    },
    {
      id: "century-club",
      name: "Century Club",
      description: "Solved 100 problems",
      icon: Award,
      earned: stats.totalSolved >= 100,
      color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    },
    {
      id: "hard-mode",
      name: "Hard Mode",
      description: "Solved 25 hard problems",
      icon: Zap,
      earned: stats.hardSolved >= 25,
      color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    },
    {
      id: "accuracy-expert",
      name: "Accuracy Expert",
      description: "Maintain 80%+ acceptance rate",
      icon: Target,
      earned: stats.acceptanceRate >= 80,
      color: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
    },
    {
      id: "top-performer",
      name: "Top Performer",
      description: "Rank in top 100k globally",
      icon: Crown,
      earned: stats.ranking <= 100000,
      color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    },
  ]

  const earnedAchievements = achievements.filter((a) => a.earned)
  const nextAchievements = achievements.filter((a) => !a.earned).slice(0, 2)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          Achievement Badges
        </CardTitle>
        <CardDescription>Celebrate your coding milestones</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {earnedAchievements.length > 0 && (
          <div>
            <h4 className="font-medium mb-3 text-green-700 dark:text-green-400">Earned Badges</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {earnedAchievements.map((achievement) => {
                const Icon = achievement.icon
                return (
                  <div
                    key={achievement.id}
                    className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg border"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                      <Icon className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-green-800 dark:text-green-200">{achievement.name}</div>
                      <div className="text-xs text-green-600 dark:text-green-400">{achievement.description}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {nextAchievements.length > 0 && (
          <div>
            <h4 className="font-medium mb-3 text-muted-foreground">Next Achievements</h4>
            <div className="space-y-3">
              {nextAchievements.map((achievement) => {
                const Icon = achievement.icon
                return (
                  <div
                    key={achievement.id}
                    className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-dashed"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-muted-foreground">{achievement.name}</div>
                      <div className="text-xs text-muted-foreground">{achievement.description}</div>
                    </div>
                    <Badge variant="outline">Locked</Badge>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <div className="text-center pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            {earnedAchievements.length} of {achievements.length} badges earned
          </div>
          <div className="w-full bg-muted rounded-full h-2 mt-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(earnedAchievements.length / achievements.length) * 100}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
