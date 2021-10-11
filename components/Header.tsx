/* eslint-disable @next/next/link-passhref */
import React from 'react'
import Link from 'next/link'
import Hamburger from './Hamburger'
import CustomAnchor from './CustomAnchor'
import useUser from '../lib/useUser'

// className="font-fancy z-10"

export default function Header() {
	const { user } = useUser()

	return (
		<div className="flex justify-between top-0 mt-2 p-2 w-full absolute max-w-full z-30 text-white self-center">
			{/* Logo goes in place of Hi! */}

			<Link href="/">
				<CustomAnchor className="font-fancy z-10 mix-blend-difference">
					Algo Share
				</CustomAnchor>
			</Link>
			<Hamburger />

			<div className="md:flex gap-2 hidden">
				{!user?.isLoggedIn ? (
					<Link href="/login">
						<CustomAnchor>Log in/Sign up</CustomAnchor>
					</Link>
				) : (
					<Link href="/profile">
						<CustomAnchor>Dashboard</CustomAnchor>
					</Link>
				)}
			</div>
		</div>
	)
}
