import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import React, { CSSProperties, MouseEventHandler, useState } from 'react'
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
	style,
}: {
	text: string
	children?: React.ReactNode
	onClick?: MouseEventHandler
	style?: CSSProperties
}) {
	const [loading, setLoading] = useState<boolean>(false)

	return (
		<label>
			<CustomButton
				className="px-2 py-1 rounded-md text-white whitespace-nowrap flex justify-between"
				disabled={loading}
				onClick={(e) => {
					e.preventDefault()
					setLoading(true)

					if (onClick) {
						onClick(e)
					}

					setLoading(false)
				}}
				style={style}
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
