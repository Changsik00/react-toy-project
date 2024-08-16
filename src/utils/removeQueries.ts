import { QueryFilters, QueryKey, QueryClient } from '@tanstack/react-query'

export const removeQuery = (queryClient: QueryClient, queryKey: QueryKey) => {
  queryClient.removeQueries({ queryKey })
}

export const removeQueries = (queryClient: QueryClient, keyPrefix: string) => {
  const filters: QueryFilters = {
    predicate: (query) => {
      const queryKey = query.queryKey
      return Array.isArray(queryKey) && queryKey[0] === keyPrefix
    },
  }
  queryClient.removeQueries(filters)
}
