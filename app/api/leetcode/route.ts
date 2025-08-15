import { type NextRequest, NextResponse } from "next/server"

interface LeetCodeGraphQLResponse {
  data: {
    matchedUser: {
      username: string
      submitStats: {
        acSubmissionNum: Array<{
          difficulty: string
          count: number
          submissions: number
        }>
        totalSubmissionNum: Array<{
          difficulty: string
          count: number
          submissions: number
        }>
      }
      profile: {
        ranking: number
        userAvatar: string
        realName: string
        aboutMe: string
        school: string
        websites: string[]
        countryName: string
        company: string
        jobTitle: string
        skillTags: string[]
        postViewCount: number
        postViewCountDiff: number
        reputation: number
        reputationDiff: number
      }
    }
    allQuestionsCount: Array<{
      difficulty: string
      count: number
    }>
  }
}

const LEETCODE_GRAPHQL_ENDPOINT = "https://leetcode.com/graphql"

const LEETCODE_QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      username
      submitStats {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
        totalSubmissionNum {
          difficulty
          count
          submissions
        }
      }
      profile {
        ranking
        userAvatar
        realName
        aboutMe
        school
        websites
        countryName
        company
        jobTitle
        skillTags
        postViewCount
        postViewCountDiff
        reputation
        reputationDiff
      }
    }
    allQuestionsCount {
      difficulty
      count
    }
  }
`

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json()

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 })
    }

    console.log("[v0] Fetching LeetCode data for username:", username)

    const response = await fetch(LEETCODE_GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Referer: "https://leetcode.com/",
      },
      body: JSON.stringify({
        query: LEETCODE_QUERY,
        variables: { username },
      }),
    })

    if (!response.ok) {
      console.log("[v0] LeetCode API response not ok:", response.status)
      throw new Error(`LeetCode API returned ${response.status}`)
    }

    const data: LeetCodeGraphQLResponse = await response.json()
    console.log("[v0] LeetCode API response received")

    if (!data.data?.matchedUser) {
      return NextResponse.json({ error: "User not found. Please check the username and try again." }, { status: 404 })
    }

    const user = data.data.matchedUser
    const allQuestions = data.data.allQuestionsCount

    // Calculate stats
    const acStats = user.submitStats.acSubmissionNum
    const totalStats = user.submitStats.totalSubmissionNum

    const easySolved = acStats.find((s) => s.difficulty === "Easy")?.count || 0
    const mediumSolved = acStats.find((s) => s.difficulty === "Medium")?.count || 0
    const hardSolved = acStats.find((s) => s.difficulty === "Hard")?.count || 0
    const totalSolved = easySolved + mediumSolved + hardSolved

    const totalSubmissions = totalStats.reduce((sum, stat) => sum + stat.submissions, 0)
    const acceptanceRate = totalSubmissions > 0 ? Math.round((totalSolved / totalSubmissions) * 100) : 0

    const totalQuestions = allQuestions.reduce((sum, q) => sum + q.count, 0)

    const result = {
      username: user.username,
      totalSolved,
      totalQuestions,
      easySolved,
      mediumSolved,
      hardSolved,
      acceptanceRate,
      ranking: user.profile.ranking || 0,
      contributionPoints: user.profile.postViewCount || 0,
      reputation: user.profile.reputation || 0,
    }

    console.log("[v0] Processed LeetCode stats:", result)

    return NextResponse.json(result)
  } catch (error) {
    console.error("[v0] Error fetching LeetCode data:", error)
    return NextResponse.json({ error: "Failed to fetch LeetCode data. Please try again later." }, { status: 500 })
  }
}
