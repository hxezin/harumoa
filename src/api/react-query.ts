import { QueryClient } from '@tanstack/react-query'

export function generateQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
        gcTime: 300000, // 5 minutes
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      },
    },
  })
}

export const queryClient = generateQueryClient()
