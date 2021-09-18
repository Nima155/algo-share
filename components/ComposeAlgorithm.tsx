import React, { useState } from 'react'
import { Controlled as ControlledEditor } from 'react-codemirror2'
import { IAlgorithm } from '../utils/types'
import { useForm } from 'react-hook-form'
import theme from '../theme'
import TextSelectInputLanguages from './TextSelectInputLanguages'
import styled from 'styled-components'
import AutoResizableTextArea from './AutoResizableTextArea'
import Button from './Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare } from '@fortawesome/free-solid-svg-icons'
// Workaround

if (typeof navigator !== 'undefined') {
	require('codemirror/lib/codemirror.css')
	require('codemirror/theme/material.css')
	require('codemirror/mode/javascript/javascript')
	require('codemirror/mode/clike/clike')
	require('codemirror/mode/python/python')
	require('codemirror/mode/commonlisp/commonlisp')
	require('codemirror/mode/crystal/crystal')
	require('codemirror/mode/dart/dart')
	require('codemirror/mode/elm/elm')
	require('codemirror/mode/go/go')
	require('codemirror/mode/rust/rust')
	require('codemirror/mode/haskell/haskell')
	require('codemirror/mode/fortran/fortran')
	require('codemirror/mode/lua/lua')
	require('codemirror/mode/julia/julia')
	require('codemirror/mode/ruby/ruby')
	require('codemirror/mode/swift/swift')
	require('codemirror/mode/perl/perl')
	require('codemirror/mode/php/php')
}
const ThemedContainer = styled.div`
	background-color: ${theme.colors.textPrimary};
	flex-grow: 1;
	display: flex;
	flex-direction: column;
`

export default function ComposeAlgorithm() {
	const [code, setCode] = useState<string>(
		'This is where you can write your code.. make sure to select your language first so that you can get language specific features'
	)
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<IAlgorithm>()

	const modeWatch = watch(['language', 'description'])

	const onSubmit = (data: IAlgorithm) => {}

	return (
		<ThemedContainer>
			<ControlledEditor
				className="overflow-x-hidden"
				value={code}
				options={{
					mode: modeWatch[0],
					theme: 'material',
					lineNumbers: true,
					lineWrapping: true,
					autofocus: true,
					screenReaderLabel: 'code environment for writing code',
				}}
				onBeforeChange={(e, d, v) => setCode(v)}
			/>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex items-center flex-col m-2 flex-grow justify-center"
			>
				<TextSelectInputLanguages register={register} />

				<AutoResizableTextArea
					rest={{
						placeholder: 'Description',
						className: 'rounded p-2 w-full mb-2',
					}}
					register={register}
					curLen={modeWatch[1]?.length}
				/>
				<Button text={'Submit'}>
					<FontAwesomeIcon icon={faShare} />
				</Button>
			</form>
		</ThemedContainer>
	)
}
