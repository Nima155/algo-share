import { faBolt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled from 'styled-components'
import theme from '../theme'

const CustomFooter = styled.footer`
	background-color: ${theme.colors.quarternaryBackground};
`

export default function Footer() {
	return (
		<CustomFooter className="text-white z-50 flex-shrink-0 max-w-full">
			<p className="inline-block p-2">
				Created by{' '}
				<a href="https://github.com/Nima155" className="underline">
					Nima Shadab
				</a>
				<br />
				<FontAwesomeIcon icon={faBolt} style={{ color: 'yellow' }} /> by{' '}
				<a>Next JS</a>
			</p>
		</CustomFooter>
	)
}
