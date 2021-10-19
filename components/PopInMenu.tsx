import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { animated } from '@react-spring/web'

import CustomAnchor from './CustomAnchor'
import useUser from '../lib/useUser'
import fetcher from '../lib/fetchJson'
import router from 'next/router'

const PopInMenuContainer = styled(animated.nav)`
	background-color: white;
	color: black;
	max-width: 9rem;
`
// box-shadow: 2px 0px 5px 2px black;
export default function PopInMenu({ style }: { style: any }) {
	const { user, mutateUser } = useUser()

	return (
		<PopInMenuContainer
			className="flex flex-col fixed gap-2 z-10 top-0 px-2 w-3/5
        min-h-full pt-10 shadow-xl"
			style={style}
		>
			<hr />
			{!user?.isLoggedIn ? (
				<Link href="/login" passHref>
					<CustomAnchor>Log in/Sign Up</CustomAnchor>
				</Link>
			) : (
				<>
					<Link href="/profile" passHref>
						<CustomAnchor>Dashboard</CustomAnchor>
					</Link>
					<button
						className="text-left"
						onClick={async (e) => {
							e.preventDefault()
							mutateUser(
								await fetcher('/api/logout', { method: 'POST' }),
								false
							)
							router.push('/')
						}}
					>
						Logout
					</button>
				</>
			)}
		</PopInMenuContainer>
	)
}
