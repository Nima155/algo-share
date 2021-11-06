import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSpring, config } from '@react-spring/core'
import { animated } from '@react-spring/web'
import Comment from './Comment'
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { postComment } from '../../lib/comments'
import { IComment, IExpandedComment } from '../../utils/types'
import AutoResizableTextArea from '../AutoResizableTextArea'
import Button from '../Button'
import ReplyForm from './ReplyForm'

export default function CommentSection(props: {
	algoId: string | string[]
	comments?: IExpandedComment[]
}) {
	return (
		<section>
			<h2 className="font text-gray-500 tracking-wider">Comments:</h2>
			<ReplyForm algoId={props.algoId} />
			<div className="flex mt-2 p-2 bg-white shadow-lg rounded-sm">
				<ul className="flex-grow flex flex-col gap-4 max-w-md">
					{props.comments?.map((e) => (
						<Comment key={e._id} commentInfo={e} algoId={props.algoId} />
					))}
				</ul>
			</div>
		</section>
	)
}
