import React from 'react'
import styled from 'styled-components'
import { IAlgorithm } from '../utils/types'

interface ExtendedAlgorithm extends IAlgorithm {
	_id: string
}
const SpecialisedList = styled.ul.attrs({
	className: 'min-h-full px-2 py-1',
})`
	width: clamp(8rem, 11rem + 5vw, 12rem);
`
export default function AutoCompleteMenu(props: {
	items?: ExtendedAlgorithm[]
}) {
	const { items } = props
	return (
		<div
			className="absolute m-2 bg-white border-t-2 rounded-tl-md top-0 pt-8"
			style={{ zIndex: -1 }}
		>
			<SpecialisedList>
				{items?.map((e) => (
					<li key={e._id}>{e.algorithm}</li>
				))}
			</SpecialisedList>
		</div>
	)
}
