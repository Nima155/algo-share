import React from 'react'
import styled from 'styled-components'
import theme from '../theme'
import Header from './Header'

const LayoutDiv = styled.div.attrs({
	className:
		'flex flex-col items-center justify-center p-2 relative font-fancy-rest',
})`
	min-height: 100vh;
	width: 100vw;
	background-color: ${theme.colors.primaryBackground};
`

export default function Layout({ children }: { children?: React.ReactNode }) {
	return (
		<LayoutDiv>
			<Header />
			{children}
		</LayoutDiv>
	)
}
