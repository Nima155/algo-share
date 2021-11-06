import consts from '../utils/constants'
import { IComment } from '../utils/types'
import fetcher from './fetchJson'

async function getAssociatedComments(algorithmId: string) {
	return await fetcher(
		`${consts.SERVER}/api/algorithms/${algorithmId}/comments?limit=50&cursor=0`
	)
}

async function postComment(commentInfo: Omit<IComment, 'author'>) {
	return await fetcher(
		`${consts.SERVER}/api/algorithms/${commentInfo.algorithmId}/comments`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				...commentInfo,
			}),
		}
	)
}

export { getAssociatedComments, postComment }
