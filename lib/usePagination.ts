import { useState } from 'react'
import useSWRInfinite from 'swr/infinite'

function usePagination(initialKey: string, limit: number, mode?: string) {
	const [initKey, setInitKey] = useState<string>(initialKey)
	const { setSize, size, data, error } = useSWRInfinite((_, previousData) => {
		if ((previousData && !previousData?.data.length) || !initKey) {
			return null
		}

		return `${initKey}${initKey.includes('?') ? '&' : '?'}cursor=${
			previousData?.nextCursor ?? 0
		}&limit=${limit}${mode ? '&mode=' + mode : ''}`
	})

	const loadMore = () => setSize((size) => size + 1)

	return {
		setInitKey,
		data,
		loadMore,
		error,
	}
}
export default usePagination
