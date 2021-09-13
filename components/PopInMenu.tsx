import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { animated } from '@react-spring/web'

import CustomAnchor from './CustomAnchor'

const PopInMenuContainer = styled(animated.nav)`
	background-color: white;
	color: black;
	max-width: 9rem;
`
export default function PopInMenu({ style }: { style: React.CSSProperties }) {
	return (
		<PopInMenuContainer
			className="flex flex-col fixed gap-2 z-10 top-0 px-2 w-3/5
        min-h-full pt-10"
			style={style}
		>
			<hr />
			<Link href="/login">
				<CustomAnchor>Log in/Sign Up</CustomAnchor>
			</Link>
		</PopInMenuContainer>
	)
}
