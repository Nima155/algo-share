import React from 'react'
import { UseFormRegister } from 'react-hook-form'
import styled from 'styled-components'
import consts from '../utils/constants'
import { IAlgorithm } from '../utils/types'

const CustomSelect = styled.select.attrs({
	className: 'h-full rounded-r-md border-l-2 overflow-ellipsis',
})`
	width: clamp(5rem, 5rem + 10vw, 8rem);
`
const SpecialisedInput = styled.input.attrs({
	className: 'min-h-full rounded-l-md px-2 py-1',
})`
	width: clamp(6rem, 8rem + 10vw, 11rem);
`

export default function TextSelectInputLanguages(props: {
	additionalStyles?: string
	register: UseFormRegister<IAlgorithm>
	isForSearch?: boolean
}) {
	const { additionalStyles, register, isForSearch } = props

	return (
		<div className={`flex flex-row m-2 ${additionalStyles}`}>
			<label>
				<SpecialisedInput
					type="text"
					placeholder="Algorithm"
					{...register('algorithm', {
						required: !isForSearch,
						minLength: !isForSearch ? 3 : 0,
					})}
				/>
			</label>
			<label>
				<CustomSelect
					id="language"
					{...register('language', {
						required: true,
					})}
					defaultValue=""
				>
					<option value="" disabled hidden>
						Language
					</option>
					{consts.VALID_LANGUAGES.map((v) => (
						<option value={v[0]} key={v[0]}>
							{v[0]}
						</option>
					))}
				</CustomSelect>
			</label>
		</div>
	)
}
