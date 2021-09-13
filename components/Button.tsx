import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import React, { MouseEventHandler, useState } from 'react'
import styled from 'styled-components'
import theme from '../theme'

const CustomButton = styled.button`
	background-color: ${theme.colors.secondaryBackground};
	transition: 100ms transform linear, 100ms background-color ease-in;
	min-width: 6rem;
	&:disabled {
		opacity: 0.4;
		background-color: ${theme.colors.tertiaryBackground};
		cursor: wait;
	}

	&:hover {
		transform: translateY(-2px);
		background-color: ${theme.colors.quarternaryBackground};
	}

	&:hover:disabled {
		transform: translateY(0px);
	}
`

export default function Button({
	text,
	children,
	onClick,
}: {
	text: string
	children?: React.ReactNode
	onClick?: MouseEventHandler
}) {
	const [loading, setLoading] = useState<boolean>(false)
	console.log(loading)

	return (
		<label>
			<CustomButton
				className={`px-2 py-1 rounded-md text-white whitespace-nowrap flex justify-between`}
				disabled={loading}
				onClick={(e) => {
					if (onClick) {
						e.preventDefault()
						setLoading(true)
						onClick(e)
						setLoading(false)
					}
				}}
			>
				<p>{text}</p>
				<div>
					{!loading ? (
						children
					) : (
						<FontAwesomeIcon icon={faSpinner} spin size="sm" />
					)}
				</div>
			</CustomButton>
		</label>
	)
}
