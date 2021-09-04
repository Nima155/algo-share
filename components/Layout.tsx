import React from 'react'
import styled from 'styled-components'
import theme from '../theme'
import Header from './Header'

const LayoutDiv = styled.div`
	background-color: ${theme.colors.primaryBackground};
`

export default function Layout({ children }: { children?: React.ReactNode }) {
	return (
		<LayoutDiv className="min-h-full min-w-full px-2 py-1 font-fancy-rest">
			<Header />
			{children}
		</LayoutDiv>
	)
}
