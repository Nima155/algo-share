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
		<CustomFooter className="w-full mt-auto text-white p-2">
			<section>
				<p>
					Created by{' '}
					<a href="https://github.com/Nima155" className="underline">
						<strong>Nima Shadab</strong>
					</a>
					<br />
					<FontAwesomeIcon icon={faBolt} style={{ color: 'yellow' }} /> by{' '}
					<a>
						<strong> Next JS</strong>
					</a>
				</p>
			</section>
		</CustomFooter>
	)
}
