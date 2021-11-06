import { faAddressCard, faComments } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useToggle } from 'react-use'
import usePagination from '../../lib/usePagination'
import { IExpandedComment } from '../../utils/types'
import ReplyForm from './ReplyForm'

export default function Comment(props: {
	commentInfo: IExpandedComment
	algoId: string | string[]
}) {
	const { commentInfo, algoId } = props
	// const { cursor, parentId, limit, id } = req.query
	const [initialKey, setInitialKey] = useState<string>('')
	const [on, toggle] = useToggle(false)
	// if reply count !== 0 then we can show fetch more button :)

	const { data, loadMore } = usePagination({
		initialKey: initialKey,
		limit: 50,
	})

	// useEffect(() => {

	// })
	const flattenedData = data?.flatMap((v) => v.data)

	return (
		<li className="flex flex-col">
			<p>{commentInfo.content}</p>
			<div className={on ? '' : 'hidden'}>
				<ReplyForm algoId={algoId} parentId={commentInfo._id} />
			</div>
			<div>
				{commentInfo.replyCount - (flattenedData?.length || 0) > 0 ? (
					<button
						className="float-left text-xs text-blue-600"
						onClick={() => {
							if (!initialKey) {
								setInitialKey(
									`/api/algorithms/${algoId}/comments?parentId=${commentInfo._id}`
								)
							}
							loadMore()
						}}
					>
						load {commentInfo.replyCount - (flattenedData?.length || 0)} replies
					</button>
				) : null}
				<button
					className="hover:underline text-blue-600 float-right mt-1 text-xs"
					onClick={toggle}
				>
					{on ? 'cancel' : 'reply'}
				</button>
			</div>

			<ul className="ml-2 mt-1 border-l-2 border-gray-300 pl-2">
				{flattenedData?.map((e) => {
					return <Comment algoId={algoId} commentInfo={e} key={e._id} />
				})}
			</ul>
		</li>
	)
}
