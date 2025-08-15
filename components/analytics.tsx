"use client"

import { useEffect } from "react"

// Google Analytics tracking functions
export const gtag = (...args: any[]) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    ;(window as any).gtag(...args)
  }
}

// Track page views
export const trackPageView = (url: string) => {
  gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
    page_path: url,
  })
}

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

// Analytics component for Google Analytics (alternative to GTM)
export function Analytics() {
  useEffect(() => {
    // Track initial page view
    trackPageView(window.location.pathname)
  }, [])

  if (!process.env.NEXT_PUBLIC_GA_ID) {
    return null
  }

  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}
