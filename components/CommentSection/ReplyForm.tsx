import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSpring } from '@react-spring/core'
import { animated } from '@react-spring/web'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { postComment } from '../../lib/comments'
import AutoResizableTextArea from '../AutoResizableTextArea'
import Button from '../Button'

export default function ReplyForm(props: {
	algoId: string | string[]
	parentId?: string
}) {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<{ content: string }>()

	const comment = watch('content')

	const onSubmit = async ({ content }: { content: string }) => {
		try {
			await postComment({
				content,
				algorithmId: Array.isArray(props.algoId) ? '' : props.algoId,
				...(props.parentId && { parentId: props.parentId }),
			})
		} catch (error) {
			// TODO: add error handling logic
		}
	}

	const [commentFocused, setCommentFocused] = useState<boolean>(false)

	const animationArray = [
		{ height: commentFocused ? '2rem' : '0rem' },
		{ opacity: commentFocused ? 1 : 0 },
	]

	const styles = useSpring({
		to: commentFocused
			? animationArray
			: animationArray.map(
					(v, idx) => animationArray[animationArray.length - idx - 1]
			  ),
		config: {
			mass: 1.1,
			tension: 331,
			friction: 33,
			clamp: true,
			velocity: 0.003,
		},
	})

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div
				className="shadow-lg p-2 flex flex-col gap-1 items-start"
				onFocus={() => setCommentFocused(true)}
				onBlur={() => setCommentFocused(false)}
			>
				<AutoResizableTextArea
					maxLength={500}
					minLength={20}
					register={register}
					curLen={comment?.length}
					style={{ width: '100%' }}
					rest={{
						className: 'bg-gray-200 p-2 rounded-sm w-full',
						rows: 1,
						placeholder: 'Comment here!',
						style: { resize: 'none' },
					}}
					textAreaName="content"
				/>
				<animated.div style={styles} className="flex items-center gap-1">
					<Button text="Post" onClick={handleSubmit(onSubmit)}>
						<FontAwesomeIcon icon={faPaperPlane} />
					</Button>

					<p className="text-red-500 text-xs">
						{[...Object.values(errors)][0]?.message}
					</p>
				</animated.div>
			</div>
		</form>
	)
}
