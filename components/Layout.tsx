import React from 'react'
import styled from 'styled-components'
import theme from '../theme'
import Footer from './Footer'
import Header from './Header'

const LayoutDiv = styled.div.attrs({
	className: 'flex flex-col font-fancy-rest',
})`
	min-height: 100vh;
	width: 100%;
	background-color: ${theme.colors.primaryBackground};
`
const LayoutContent = styled.div.attrs({
	className: 'flex flex-col justify-center',
})`
	flex: 1 0 auto;
`

export default function Layout({ children }: { children?: React.ReactNode }) {
	return (
		<LayoutDiv>
			<Header />
			<LayoutContent>{children}</LayoutContent>
			<Footer />
		</LayoutDiv>
	)
}
