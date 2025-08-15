import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowRight, BarChart3, Brain, Target, Trophy, Users, Zap } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <BarChart3 className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold font-serif">NeedCode</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                How it Works
              </a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </a>
            </nav>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button asChild>
                <Link href="/analyze">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-4">
            <Zap className="h-3 w-3 mr-1" />
            AI-Powered Analytics
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Turn LeetCode Grinding into MAANG Success
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Get personalized AI coaching, detailed analytics, and strategic insights to optimize your coding interview
            preparation and land your dream job.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/analyze">
                Start Free Analysis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Everything You Need to Succeed</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive analytics and AI coaching designed specifically for MAANG interview preparation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <CardTitle>Advanced Analytics</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Deep insights into your solving patterns, time complexity analysis, and progress tracking across all
                  problem categories.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Brain className="h-5 w-5" />
                  </div>
                  <CardTitle>AI Coaching</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Personalized recommendations and strategic advice powered by advanced AI to optimize your preparation
                  approach.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Target className="h-5 w-5" />
                  </div>
                  <CardTitle>MAANG Focus</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Curated problem sets and strategies specifically designed for Meta, Apple, Amazon, Netflix, and Google
                  interviews.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <CardTitle>Progress Gamification</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Achievement badges, streak tracking, and milestone celebrations to keep you motivated throughout your
                  journey.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Users className="h-5 w-5" />
                  </div>
                  <CardTitle>Peer Comparison</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Anonymous benchmarking against other MAANG aspirants to understand where you stand in the competition.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Zap className="h-5 w-5" />
                  </div>
                  <CardTitle>Real-time Insights</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Instant feedback on your solutions with optimization suggestions and alternative approaches from our
                  AI coach.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6">Ready to Transform Your Interview Prep?</h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Join thousands of developers who have successfully landed their dream jobs at top tech companies.
          </p>
          <Button size="lg" className="text-lg px-8" asChild>
            <Link href="/analyze">
              Start Your Free Analysis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <BarChart3 className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold font-serif">NeedCode</span>
            </div>
            <p className="text-muted-foreground">© 2025 NeedCode. Empowering developers to achieve MAANG success.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
