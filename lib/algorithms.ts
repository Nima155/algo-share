import fetcher from './fetchJson'
import consts from '../utils/constants'
export async function getAllAlgorithms() {
	const res = await fetcher(`${consts.SERVER}/api/algorithms`)

	return res.data.map((e: any) => {
		return {
			params: e,
		}
	})
}
export async function getSingleAlgorithm(id: string) {
	const res = await fetcher(`${consts.SERVER}/api/algorithms/${id}`)

	return res
}
