"use client"

import type React from "react"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState } from "react"
import { getApiErrorStatus } from "@/services/api-client"

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
            // 4xx (e.g. demo API 403 limits): do not retry. 5xx / network: up to 3 retries.
            retry: (failureCount, error) => {
              const status = getApiErrorStatus(error)
              if (status !== undefined && status >= 400 && status < 500) {
                return false
              }
              return failureCount < 3
            },
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
