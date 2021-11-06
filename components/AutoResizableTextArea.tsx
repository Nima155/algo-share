import React, {
	useState,
	useEffect,
	useRef,
	TextareaHTMLAttributes,
	CSSProperties,
} from 'react'
import { UseFormRegister } from 'react-hook-form'
import styled from 'styled-components'
import theme from '../theme'
import { IAlgorithm } from '../utils/types'

interface IExtendedTextArea {
	register: UseFormRegister<any>
	maxLength: number
	rest?: TextareaHTMLAttributes<HTMLTextAreaElement>
	curLen?: number
	minLength?: number
	style?: CSSProperties
	textAreaName: string
}
const TextAreaContainer = styled.div<{
	curLen?: number
	maxLen: number
}>`
	position: relative;
	width: clamp(7rem, 15rem + 10vw, 25rem);
	&:after {
		position: absolute;
		bottom: 10px;
		right: 15px;
		color: ${(props) =>
			(props?.curLen || 0) < props.maxLen
				? theme.colors.textSecondary
				: theme.colors.textTertiary};
		content: '${(props) =>
			props.maxLen - (props?.curLen || 0) < 20
				? props.maxLen - (props?.curLen || 0)
				: ''}';
	}
`

const TextAreaWithCount = styled.textarea<{
	textAreaHeight: string
}>`
	height: ${(props) => props.textAreaHeight};
`

const AutoResizableTextArea = (props: IExtendedTextArea) => {
	const { register, rest, curLen, maxLength, minLength, style, textAreaName } =
		props

	const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
	const [text, setText] = useState('')
	const [textAreaHeight, setTextAreaHeight] = useState('auto')
	const [parentHeight, setParentHeight] = useState('auto')

	const {
		ref,

		onChange: onChangeReg,
		...restOfRegister
	} = register(textAreaName, {
		...{
			maxLength: {
				value: maxLength,
				message: `Maximum length of content is ${maxLength}`,
			},
		},

		...(minLength && {
			minLength: {
				value: minLength,
				message: `Minimum length of content is ${minLength}`,
			},
		}),
	})

	useEffect(() => {
		setParentHeight(`${textAreaRef.current!.scrollHeight || 57}px`)
		setTextAreaHeight(`${textAreaRef.current!.scrollHeight || 57}px`)
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
				...style,
			}}
			curLen={curLen}
			maxLen={maxLength}
		>
			<TextAreaWithCount
				spellCheck={false}
				textAreaHeight={textAreaHeight}
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
