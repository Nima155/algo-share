import React, { CSSProperties } from 'react'
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

export default function Layout({
	children,
	style,
}: {
	children?: React.ReactNode
	style?: CSSProperties
}) {
	return (
		<LayoutDiv style={style}>
			<Header />
			<LayoutContent>{children}</LayoutContent>
			<Footer />
		</LayoutDiv>
	)
}
