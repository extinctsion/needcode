import { type NextRequest, NextResponse } from "next/server"

interface CoachingRequest {
  username: string
  totalSolved: number
  totalQuestions: number
  easySolved: number
  mediumSolved: number
  hardSolved: number
  acceptanceRate: number
  ranking: number
  reputation: number
}

interface CoachingResponse {
  overallAssessment: string
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
  studyPlan: string
  maangReadiness: string
}

export async function POST(request: NextRequest) {
  try {
    const stats: CoachingRequest = await request.json()

    console.log("[v0] Generating AI coaching for user:", stats.username)

    // For demo purposes, we'll use a mock response since we need the actual Cohere API key
    // In production, you would use: const response = await cohere.generate({...})

    const mockCoachingResponse: CoachingResponse = generateMockCoaching(stats)

    // Uncomment and use this when you have the Cohere API key set up:
    /*
    const cohere = require('cohere-ai');
    cohere.init(process.env.COHERE_API_KEY);

    const prompt = `
    Analyze this LeetCode profile and provide personalized MAANG interview coaching:
    
    Username: ${stats.username}
    Total Problems Solved: ${stats.totalSolved}/${stats.totalQuestions}
    Easy: ${stats.easySolved}, Medium: ${stats.mediumSolved}, Hard: ${stats.hardSolved}
    Acceptance Rate: ${stats.acceptanceRate}%
    Global Ranking: #${stats.ranking}
    Reputation: ${stats.reputation}
    
    Provide:
    1. Overall assessment of their current level
    2. Top 3 strengths based on their stats
    3. Top 3 areas for improvement
    4. Specific actionable recommendations
    5. A 4-week study plan
    6. MAANG readiness assessment
    
    Be encouraging but realistic. Focus on actionable advice for MAANG interviews.
    `;

    const response = await cohere.generate({
      model: 'command',
      prompt: prompt,
      max_tokens: 1000,
      temperature: 0.7,
    });

    // Parse the AI response and structure it
    const coachingAdvice = parseCoachingResponse(response.generations[0].text);
    */

    console.log("[v0] Generated coaching response")

    return NextResponse.json(mockCoachingResponse)
  } catch (error) {
    console.error("[v0] Error generating coaching advice:", error)
    return NextResponse.json({ error: "Failed to generate coaching advice" }, { status: 500 })
  }
}

function generateMockCoaching(stats: CoachingRequest): CoachingResponse {
  const completionRate = (stats.totalSolved / stats.totalQuestions) * 100
  const hardPercentage = (stats.hardSolved / stats.totalSolved) * 100

  return {
    overallAssessment: `Based on your ${stats.totalSolved} solved problems with a ${stats.acceptanceRate}% acceptance rate, you're showing solid progress in your coding interview preparation. Your global ranking of #${stats.ranking.toLocaleString()} puts you in a competitive position, but there's room for strategic improvement to reach MAANG-level readiness.`,

    strengths: [
      `Strong problem-solving consistency with ${stats.totalSolved} problems completed`,
      `Good acceptance rate of ${stats.acceptanceRate}% shows quality over quantity approach`,
      `Balanced difficulty distribution demonstrates versatility in problem-solving`,
    ],

    weaknesses: [
      hardPercentage < 20
        ? "Limited exposure to Hard problems - crucial for MAANG interviews"
        : "Could benefit from more diverse problem categories",
      completionRate < 15
        ? "Low overall completion rate - need to increase problem volume"
        : "Time management could be optimized for faster solving",
      "May need to focus more on system design and behavioral interview prep",
    ],

    recommendations: [
      `Increase Hard problem ratio to 25-30% (currently ${Math.round(hardPercentage)}%)`,
      "Focus on MAANG-specific problem patterns: Trees, Graphs, Dynamic Programming",
      "Practice mock interviews and time-boxed problem solving",
      "Study system design fundamentals for senior positions",
      "Join coding communities for peer learning and accountability",
    ],

    studyPlan: `Week 1-2: Focus on ${hardPercentage < 20 ? "Hard problems in Arrays and Strings" : "Dynamic Programming patterns"}. Target: 3-4 problems daily.
    
Week 3-4: Deep dive into ${stats.easySolved > stats.mediumSolved ? "Medium complexity problems" : "Tree and Graph algorithms"}. Practice system design basics.

Daily routine: 2 problems + 1 system design concept + behavioral question practice.

Monthly goal: Increase total solved to ${stats.totalSolved + 50} with 30% Hard problems.`,

    maangReadiness:
      completionRate > 20 && hardPercentage > 15 && stats.acceptanceRate > 70
        ? "You're approaching MAANG readiness! Focus on interview-specific preparation and system design."
        : completionRate > 10
          ? "Good foundation established. Increase problem volume and difficulty to reach MAANG level."
          : "Early stage - build consistency first, then gradually increase difficulty and volume.",
  }
}
