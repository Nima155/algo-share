import { useCallback, useRef, useState } from 'react'
import useSWRInfinite from 'swr/infinite'

function usePagination(args: {
	mode?: string
	fallback?: any
	limit: number
	initialKey: string
}) {
	const { mode, fallback, limit, initialKey } = args
	// TODO: reflect all changes immediately

	const { setSize, size, data, error, isValidating, mutate } = useSWRInfinite(
		(_, previousData) => {
			if ((previousData && !previousData?.data.length) || !initialKey) {
				return null
			}

			return `${initialKey}${initialKey.includes('?') ? '&' : '?'}cursor=${
				previousData?.nextCursor ?? 0
			}&limit=${limit}${mode ? '&mode=' + mode : ''}`
		},
		fallback && { fallbackData: fallback }
	)

	const loadMore = useCallback(() => setSize((size) => size + 1), [])

	return {
		data,
		loadMore,
		error,
		isValidating,
		mutate,
	}
}
export default usePagination
