import generalValidators from './generalValidators'
import isLength from 'validator/lib/isLength'
import { IComment } from './types'
const { isString, isIsoDate } = generalValidators

interface ICommentUnknown {
	content: unknown
	modifiedDate?: unknown
	algorithmId: unknown
	author: unknown
	parentId: unknown
}
const thrower = (msg: string) => {
	throw new Error(msg)
}
function isComment(comment: unknown): string {
	if (!isString(comment) || !isLength(comment, { min: 20, max: 500 })) {
		throw new Error('Invalid comment format!')
	}

	return comment
}

function toValidComment({
	content,
	modifiedDate,
	algorithmId,
	author,
	parentId,
}: ICommentUnknown): IComment {
	return {
		author: isString(author) ? author : thrower('Missing or malformed user id'),
		content: isComment(content),
		...(isString(modifiedDate) && { modifiedDate: isIsoDate(modifiedDate) }),
		algorithmId: isString(algorithmId)
			? algorithmId
			: thrower('Missing or malformed algorithm id'),
		...(isString(parentId) && { parentId: parentId }),
	}
}

export default toValidComment
