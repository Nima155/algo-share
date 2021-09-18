import React, {
	useState,
	useEffect,
	useRef,
	TextareaHTMLAttributes,
} from 'react'
import { UseFormRegister } from 'react-hook-form'
import styled from 'styled-components'
import theme from '../theme'
import { IAlgorithm } from '../utils/types'

interface IExtendedTextArea {
	rest: TextareaHTMLAttributes<HTMLTextAreaElement>
	register: UseFormRegister<IAlgorithm>
	curLen?: number
}
const TextAreaContainer = styled.div<{
	curLen?: number
}>`
	position: relative;
	width: clamp(7rem, 15rem + 10vw, 25rem);
	&:after {
		position: absolute;
		bottom: 10px;
		right: 15px;
		color: ${(props) =>
			(props?.curLen || 0) < 200
				? theme.colors.textSecondary
				: theme.colors.textTertiary};
		content: '${(props) =>
			200 - (props?.curLen || 0) < 20 ? 200 - (props?.curLen || 0) : ''}';
	}
`

const TextAreaWithCount = styled.textarea<{
	textAreaHeight: string
}>`
	height: ${(props) => props.textAreaHeight};
`

const AutoResizableTextArea = (props: IExtendedTextArea) => {
	const { register, rest, curLen } = props

	const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
	const [text, setText] = useState('')
	const [textAreaHeight, setTextAreaHeight] = useState('auto')
	const [parentHeight, setParentHeight] = useState('auto')

	const {
		ref,
		onChange: onChangeReg,
		...restOfRegister
	} = register('description', {
		maxLength: 200,
	})

	useEffect(() => {
		setParentHeight(`${textAreaRef.current!.scrollHeight}px`)
		setTextAreaHeight(`${textAreaRef.current!.scrollHeight}px`)
	}, [text])

	const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setTextAreaHeight('auto')
		setParentHeight(`${textAreaRef.current!.scrollHeight}px`)
		setText(event.target.value)
	}

	return (
		<TextAreaContainer
			style={{
				minHeight: parentHeight,
			}}
			curLen={curLen}
		>
			<TextAreaWithCount
				spellCheck={false}
				textAreaHeight={textAreaHeight}
				rows={8}
				{...rest}
				{...restOfRegister}
				onChange={(e) => {
					onChangeReg(e)
					onChangeHandler(e)
				}}
				ref={(e) => {
					ref(e)
					textAreaRef.current = e
				}}
			/>
		</TextAreaContainer>
	)
}

export default AutoResizableTextArea
