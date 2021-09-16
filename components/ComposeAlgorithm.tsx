import React, { useState } from 'react'
import { Controlled as ControlledEditor } from 'react-codemirror2'
import { IAlgorithm } from '../utils/types'
import { useForm } from 'react-hook-form'
import Input from './Input'
import TextSelectInputLanguages from './TextSelectInputLanguages'
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
export default function ComposeAlgorithm() {
	const [code, setCode] = useState<string>('')
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IAlgorithm>()

	const onSubmit = (data: IAlgorithm) => {}

	return (
		<div>
			<ControlledEditor
				className="overflow-x-hidden"
				value={code}
				options={{
					mode: 'javascript',
					theme: 'material',
					lineNumbers: true,
					lineWrapping: true,
				}}
				onBeforeChange={(e, d, v) => setCode(v)}
			/>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextSelectInputLanguages additionalStyles="p-2 border" />
			</form>
		</div>
	)
}
