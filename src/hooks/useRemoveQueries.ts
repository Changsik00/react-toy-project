import { QueryFilters, QueryKey, useQueryClient } from '@tanstack/react-query'

export const useRemoveQueries = () => {
  const queryClient = useQueryClient()

  const removeQuery = (queryKey: QueryKey) => {
    queryClient.removeQueries({ queryKey })
  }

  const removeQueries = (keyPrefix: string) => {
    const filters: QueryFilters = {
      predicate: (query) => {
        const queryKey = query.queryKey
        return Array.isArray(queryKey) && queryKey[0] === keyPrefix
      },
    }
    queryClient.removeQueries(filters)
  }

  return {
    removeQuery,
    removeQueries,
  }
}
