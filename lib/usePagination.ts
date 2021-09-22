import useSWRInfinite from 'swr/infinite'

function usePagination(initialKey: string, limit: number, mode?: string) {
	const { setSize, size, data, error } = useSWRInfinite(
		(pageIndex, previousData) => {
			if (previousData && !previousData?.data.length) {
				return null
			}

			return `${initialKey}/${previousData?.nextCursor ?? 0}/${limit}/${mode}`
		}
	)

	const loadMore = () => setSize((size) => size + 1)

	return {
		data,
		loadMore,
		error,
	}
}
export default usePagination
