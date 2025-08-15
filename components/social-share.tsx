"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Share2, Twitter, Linkedin, Copy, Download } from "lucide-react"
import { useState } from "react"

interface SocialShareProps {
  username: string
  totalSolved: number
  ranking: number
  acceptanceRate: number
}

export function SocialShare({ username, totalSolved, ranking, acceptanceRate }: SocialShareProps) {
  const [copied, setCopied] = useState(false)

  const shareText = `🚀 Just analyzed my LeetCode progress on NeedCode!\n\n📊 ${totalSolved} problems solved\n🏆 Rank #${ranking.toLocaleString()}\n✅ ${acceptanceRate}% acceptance rate\n\nReady for MAANG interviews! 💪\n\nCheck your progress: needcode.dev`

  const shareUrl = `https://needcode.dev/analyze`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    window.open(twitterUrl, "_blank")
  }

  const handleLinkedInShare = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(shareText)}`
    window.open(linkedinUrl, "_blank")
  }

  const generateProgressCard = () => {
    // In a real app, this would generate an image or PDF
    const cardData = {
      username,
      totalSolved,
      ranking,
      acceptanceRate,
      timestamp: new Date().toLocaleDateString(),
    }

    const dataStr = JSON.stringify(cardData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)

    const link = document.createElement("a")
    link.href = url
    link.download = `needcode-progress-${username}.json`
    link.click()

    URL.revokeObjectURL(url)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="h-5 w-5" />
          Share Your Progress
        </CardTitle>
        <CardDescription>Show off your coding achievements to the world</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-muted/50 rounded-lg border-l-4 border-l-primary">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">@{username}</Badge>
              <Badge variant="outline">#{ranking.toLocaleString()}</Badge>
            </div>
            <p className="text-sm font-medium">
              🚀 {totalSolved} problems solved with {acceptanceRate}% acceptance rate
            </p>
            <p className="text-xs text-muted-foreground">Ready for MAANG interviews! 💪</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={handleTwitterShare} variant="outline" size="sm">
            <Twitter className="h-4 w-4 mr-2" />
            Twitter
          </Button>
          <Button onClick={handleLinkedInShare} variant="outline" size="sm">
            <Linkedin className="h-4 w-4 mr-2" />
            LinkedIn
          </Button>
          <Button onClick={handleCopyLink} variant="outline" size="sm">
            <Copy className="h-4 w-4 mr-2" />
            {copied ? "Copied!" : "Copy"}
          </Button>
          <Button onClick={generateProgressCard} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download Card
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
