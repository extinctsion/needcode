"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Users, TrendingUp, Trophy, Target } from "lucide-react"

interface PeerComparisonProps {
  userStats: {
    totalSolved: number
    acceptanceRate: number
    ranking: number
    hardSolved: number
  }
}

export function PeerComparison({ userStats }: PeerComparisonProps) {
  // Mock peer data - in real app, this would come from API
  const peerData = {
    averageSolved: Math.max(50, userStats.totalSolved - 30 + Math.floor(Math.random() * 60)),
    averageAcceptance: Math.max(60, userStats.acceptanceRate - 10 + Math.floor(Math.random() * 20)),
    topPercentile: userStats.ranking < 100000 ? 15 : userStats.ranking < 500000 ? 35 : 65,
    hardProblemsAvg: Math.max(10, userStats.hardSolved - 5 + Math.floor(Math.random() * 10)),
  }

  const comparisons = [
    {
      metric: "Problems Solved",
      userValue: userStats.totalSolved,
      peerAverage: peerData.averageSolved,
      icon: Trophy,
      better: userStats.totalSolved > peerData.averageSolved,
    },
    {
      metric: "Acceptance Rate",
      userValue: userStats.acceptanceRate,
      peerAverage: peerData.averageAcceptance,
      icon: Target,
      better: userStats.acceptanceRate > peerData.averageAcceptance,
      suffix: "%",
    },
    {
      metric: "Hard Problems",
      userValue: userStats.hardSolved,
      peerAverage: peerData.hardProblemsAvg,
      icon: TrendingUp,
      better: userStats.hardSolved > peerData.hardProblemsAvg,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Peer Comparison
        </CardTitle>
        <CardDescription>See how you stack up against other MAANG aspirants</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center p-4 bg-primary/5 rounded-lg">
          <div className="text-2xl font-bold text-primary mb-1">Top {peerData.topPercentile}%</div>
          <p className="text-sm text-muted-foreground">
            You're performing better than {100 - peerData.topPercentile}% of users
          </p>
        </div>

        <div className="space-y-4">
          {comparisons.map((comparison, index) => {
            const Icon = comparison.icon
            const difference = comparison.userValue - comparison.peerAverage
            const percentDiff = Math.abs((difference / comparison.peerAverage) * 100)

            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{comparison.metric}</span>
                  </div>
                  <Badge variant={comparison.better ? "default" : "secondary"}>
                    {comparison.better ? "Above Average" : "Below Average"}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">You</div>
                    <div className="font-semibold text-primary">
                      {comparison.userValue}
                      {comparison.suffix || ""}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Peer Average</div>
                    <div className="font-semibold">
                      {comparison.peerAverage}
                      {comparison.suffix || ""}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <Progress
                    value={comparison.better ? 100 : (comparison.userValue / comparison.peerAverage) * 100}
                    className="flex-1 h-2"
                  />
                  <span className={comparison.better ? "text-green-600" : "text-amber-600"}>
                    {comparison.better ? "+" : ""}
                    {Math.round(percentDiff)}%
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
