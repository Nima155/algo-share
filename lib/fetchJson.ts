type FetchParams = Parameters<typeof window.fetch>

export default async function fetcher(...args: FetchParams) {
	const response = await fetch(...args)

	// if the server replies, there's always some data in json
	// if there's a network error, it will throw at the previous line
	const data = await response.json()

	if (response.ok) {
		return data
	}

	const error = new Error(data.error)

	throw error
}
