"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import { SocialShare } from "@/components/social-share"
import { PeerComparison } from "@/components/peer-comparison"
import { AchievementBadges } from "@/components/achievement-badges"
import {
  ArrowLeft,
  Search,
  User,
  Calendar,
  Trophy,
  Target,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Brain,
  Lightbulb,
  CheckCircle,
  AlertCircle,
  BookOpen,
} from "lucide-react"
import Link from "next/link"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  PieChart as RechartsPieChart,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Line,
  Area,
  AreaChart,
} from "recharts"

interface LeetCodeStats {
  username: string
  totalSolved: number
  totalQuestions: number
  easySolved: number
  mediumSolved: number
  hardSolved: number
  acceptanceRate: number
  ranking: number
  contributionPoints: number
  reputation: number
}

interface CoachingAdvice {
  overallAssessment: string
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
  studyPlan: string
  maangReadiness: string
}

export default function AnalyzePage() {
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState<LeetCodeStats | null>(null)
  const [coaching, setCoaching] = useState<CoachingAdvice | null>(null)
  const [coachingLoading, setCoachingLoading] = useState(false)
  const [error, setError] = useState("")

  const handleAnalyze = async () => {
    if (!username.trim()) {
      setError("Please enter a LeetCode username")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/leetcode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username.trim() }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch LeetCode data")
      }

      setStats(data)

      // Automatically generate coaching advice
      await generateCoaching(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const generateCoaching = async (statsData: LeetCodeStats) => {
    setCoachingLoading(true)
    try {
      const response = await fetch("/api/coaching", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(statsData),
      })

      const coachingData = await response.json()

      if (!response.ok) {
        throw new Error(coachingData.error || "Failed to generate coaching advice")
      }

      setCoaching(coachingData)
    } catch (err) {
      console.error("Failed to generate coaching advice:", err)
      // Don't show error to user, just skip coaching section
    } finally {
      setCoachingLoading(false)
    }
  }

  // Generate mock data for charts (in real app, this would come from API)
  const generateMockData = (stats: LeetCodeStats) => {
    const difficultyData = [
      { name: "Easy", value: stats.easySolved, color: "hsl(var(--chart-1))" },
      { name: "Medium", value: stats.mediumSolved, color: "hsl(var(--chart-2))" },
      { name: "Hard", value: stats.hardSolved, color: "hsl(var(--chart-3))" },
    ]

    const progressData = Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      solved: Math.max(0, stats.totalSolved - Math.floor(Math.random() * 50) + i),
      target: stats.totalSolved + 10,
    }))

    const categoryData = [
      { category: "Array", solved: Math.floor(stats.totalSolved * 0.25), total: 150 },
      { category: "String", solved: Math.floor(stats.totalSolved * 0.15), total: 120 },
      { category: "Dynamic Programming", solved: Math.floor(stats.totalSolved * 0.12), total: 100 },
      { category: "Tree", solved: Math.floor(stats.totalSolved * 0.18), total: 90 },
      { category: "Graph", solved: Math.floor(stats.totalSolved * 0.08), total: 80 },
      { category: "Linked List", solved: Math.floor(stats.totalSolved * 0.1), total: 60 },
    ]

    const weeklyData = [
      { week: "Week 1", problems: 12, time: 8.5 },
      { week: "Week 2", problems: 15, time: 10.2 },
      { week: "Week 3", problems: 18, time: 12.1 },
      { week: "Week 4", problems: 22, time: 14.8 },
    ]

    return { difficultyData, progressData, categoryData, weeklyData }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Target className="h-5 w-5" />
                </div>
                <span className="text-xl font-bold font-serif">NeedCode Analytics</span>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {!stats ? (
          <div className="text-center space-y-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-serif mb-4">Analyze Your LeetCode Performance</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Enter your LeetCode username to get detailed analytics and personalized AI coaching recommendations.
              </p>
            </div>

            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  LeetCode Username
                </CardTitle>
                <CardDescription>We'll fetch your public LeetCode statistics for analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Input
                    placeholder="Enter your LeetCode username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAnalyze()}
                  />
                  {error && <p className="text-sm text-destructive">{error}</p>}
                </div>
                <Button onClick={handleAnalyze} disabled={loading || !username.trim()} className="w-full">
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Analyze Profile
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Trophy className="h-8 w-8 text-accent mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Performance Analysis</h3>
                  <p className="text-sm text-muted-foreground">Detailed breakdown of your solving patterns</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Target className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">AI Coaching</h3>
                  <p className="text-sm text-muted-foreground">Personalized recommendations for improvement</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Calendar className="h-8 w-8 text-accent mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Progress Tracking</h3>
                  <p className="text-sm text-muted-foreground">Monitor your improvement over time</p>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Header with user info */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold font-serif mb-2">Analytics Dashboard</h1>
                <p className="text-muted-foreground">Comprehensive analysis for @{stats.username}</p>
              </div>
              <Button
                onClick={() => {
                  setStats(null)
                  setCoaching(null)
                }}
                variant="outline"
              >
                Analyze Another Profile
              </Button>
            </div>

            {/* Key Metrics Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Trophy className="h-4 w-4" />
                    Total Solved
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{stats.totalSolved}</div>
                  <p className="text-xs text-muted-foreground">out of {stats.totalQuestions} problems</p>
                  <Progress value={(stats.totalSolved / stats.totalQuestions) * 100} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Acceptance Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-accent">{stats.acceptanceRate}%</div>
                  <p className="text-xs text-muted-foreground">submission success rate</p>
                  <Progress value={stats.acceptanceRate} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Global Ranking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">#{stats.ranking.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">worldwide position</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-xs text-green-500">Top 15%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Reputation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-accent">{stats.reputation}</div>
                  <p className="text-xs text-muted-foreground">community points</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-xs text-green-500">+12 this week</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Analytics Tabs */}
            <Tabs defaultValue="coaching" className="space-y-6">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="coaching">AI Coaching</TabsTrigger>
                <TabsTrigger value="social">Social</TabsTrigger>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
              </TabsList>

              <TabsContent value="social" className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  <SocialShare
                    username={stats.username}
                    totalSolved={stats.totalSolved}
                    ranking={stats.ranking}
                    acceptanceRate={stats.acceptanceRate}
                  />
                  <PeerComparison
                    userStats={{
                      totalSolved: stats.totalSolved,
                      acceptanceRate: stats.acceptanceRate,
                      ranking: stats.ranking,
                      hardSolved: stats.hardSolved,
                    }}
                  />
                </div>
                <AchievementBadges
                  stats={{
                    totalSolved: stats.totalSolved,
                    easySolved: stats.easySolved,
                    mediumSolved: stats.mediumSolved,
                    hardSolved: stats.hardSolved,
                    acceptanceRate: stats.acceptanceRate,
                    ranking: stats.ranking,
                  }}
                />
              </TabsContent>

              <TabsContent value="coaching" className="space-y-6">
                {coachingLoading ? (
                  <Card>
                    <CardContent className="flex items-center justify-center py-12">
                      <div className="text-center space-y-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                        <p className="text-muted-foreground">Generating personalized coaching advice...</p>
                      </div>
                    </CardContent>
                  </Card>
                ) : coaching ? (
                  <div className="space-y-6">
                    {/* Overall Assessment */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Brain className="h-5 w-5 text-primary" />
                          AI Assessment
                        </CardTitle>
                        <CardDescription>Comprehensive analysis of your current level</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-foreground leading-relaxed">{coaching.overallAssessment}</p>
                      </CardContent>
                    </Card>

                    <div className="grid lg:grid-cols-2 gap-6">
                      {/* Strengths */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                            <CheckCircle className="h-5 w-5" />
                            Your Strengths
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3">
                            {coaching.strengths.map((strength, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{strength}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Areas for Improvement */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                            <AlertCircle className="h-5 w-5" />
                            Areas for Improvement
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3">
                            {coaching.weaknesses.map((weakness, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{weakness}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Recommendations */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Lightbulb className="h-5 w-5 text-accent" />
                          Actionable Recommendations
                        </CardTitle>
                        <CardDescription>Strategic steps to improve your MAANG readiness</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {coaching.recommendations.map((recommendation, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Badge variant="secondary" className="mt-0.5 flex-shrink-0">
                                {index + 1}
                              </Badge>
                              <span className="text-sm">{recommendation}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <div className="grid lg:grid-cols-2 gap-6">
                      {/* Study Plan */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-primary" />
                            Personalized Study Plan
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="whitespace-pre-line text-sm leading-relaxed">{coaching.studyPlan}</div>
                        </CardContent>
                      </Card>

                      {/* MAANG Readiness */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5 text-accent" />
                            MAANG Readiness
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm leading-relaxed">{coaching.maangReadiness}</p>
                          <Separator className="my-4" />
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">Estimated Timeline</span>
                            <Badge variant="outline">
                              {stats.totalSolved > 200
                                ? "2-3 months"
                                : stats.totalSolved > 100
                                  ? "4-6 months"
                                  : "6-12 months"}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ) : (
                  <Card>
                    <CardContent className="flex items-center justify-center py-12">
                      <div className="text-center space-y-4">
                        <Brain className="h-12 w-12 text-muted-foreground mx-auto" />
                        <p className="text-muted-foreground">AI coaching advice will appear here</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Difficulty Distribution Pie Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <PieChart className="h-5 w-5" />
                        Difficulty Distribution
                      </CardTitle>
                      <CardDescription>Your solving pattern across difficulty levels</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer
                        config={{
                          easy: { label: "Easy", color: "hsl(var(--chart-1))" },
                          medium: { label: "Medium", color: "hsl(var(--chart-2))" },
                          hard: { label: "Hard", color: "hsl(var(--chart-3))" },
                        }}
                        className="h-[300px]"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPieChart>
                            <ChartTooltip content={<ChartTooltipContent />} />
                            {generateMockData(stats).difficultyData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </RechartsPieChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div className="text-center">
                          <div className="text-lg font-semibold text-chart-1">{stats.easySolved}</div>
                          <div className="text-sm text-muted-foreground">Easy</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-chart-2">{stats.mediumSolved}</div>
                          <div className="text-sm text-muted-foreground">Medium</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-chart-3">{stats.hardSolved}</div>
                          <div className="text-sm text-muted-foreground">Hard</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Weekly Activity */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5" />
                        Weekly Activity
                      </CardTitle>
                      <CardDescription>Problems solved and time spent per week</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer
                        config={{
                          problems: { label: "Problems", color: "hsl(var(--chart-1))" },
                          time: { label: "Hours", color: "hsl(var(--chart-2))" },
                        }}
                        className="h-[300px]"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={generateMockData(stats).weeklyData}>
                            <XAxis dataKey="week" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="problems" fill="hsl(var(--chart-1))" radius={4} />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="progress" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      30-Day Progress Trend
                    </CardTitle>
                    <CardDescription>Your problem-solving progress over the last 30 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        solved: { label: "Solved", color: "hsl(var(--chart-1))" },
                        target: { label: "Target", color: "hsl(var(--chart-2))" },
                      }}
                      className="h-[400px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={generateMockData(stats).progressData}>
                          <XAxis dataKey="day" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Area
                            type="monotone"
                            dataKey="solved"
                            stroke="hsl(var(--chart-1))"
                            fill="hsl(var(--chart-1))"
                            fillOpacity={0.3}
                          />
                          <Line type="monotone" dataKey="target" stroke="hsl(var(--chart-2))" strokeDasharray="5 5" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="categories" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Problem Categories
                    </CardTitle>
                    <CardDescription>Your progress across different problem categories</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {generateMockData(stats).categoryData.map((category) => (
                        <div key={category.category} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{category.category}</span>
                            <span className="text-sm text-muted-foreground">
                              {category.solved}/{category.total}
                            </span>
                          </div>
                          <Progress value={(category.solved / category.total) * 100} className="h-2" />
                          <div className="text-xs text-muted-foreground">
                            {Math.round((category.solved / category.total) * 100)}% complete
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="performance" className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Insights</CardTitle>
                      <CardDescription>Key metrics and recommendations</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                        <div>
                          <div className="font-medium text-green-800 dark:text-green-200">Strong Areas</div>
                          <div className="text-sm text-green-600 dark:text-green-400">Arrays & Strings</div>
                        </div>
                        <Trophy className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                        <div>
                          <div className="font-medium text-yellow-800 dark:text-yellow-200">Needs Improvement</div>
                          <div className="text-sm text-yellow-600 dark:text-yellow-400">Dynamic Programming</div>
                        </div>
                        <Target className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                        <div>
                          <div className="font-medium text-blue-800 dark:text-blue-200">Consistency</div>
                          <div className="text-sm text-blue-600 dark:text-blue-400">
                            {Math.round(stats.totalSolved / 30)} problems/day average
                          </div>
                        </div>
                        <Activity className="h-5 w-5 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>MAANG Readiness</CardTitle>
                      <CardDescription>Assessment based on your current progress</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Overall Readiness</span>
                          <span className="text-sm text-muted-foreground">
                            {Math.min(Math.round((stats.totalSolved / 300) * 100), 100)}%
                          </span>
                        </div>
                        <Progress value={Math.min((stats.totalSolved / 300) * 100, 100)} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Problem Diversity</span>
                          <span className="text-sm text-muted-foreground">85%</span>
                        </div>
                        <Progress value={85} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Hard Problems</span>
                          <span className="text-sm text-muted-foreground">
                            {Math.round((stats.hardSolved / stats.totalSolved) * 100)}%
                          </span>
                        </div>
                        <Progress value={(stats.hardSolved / stats.totalSolved) * 100} />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  )
}
