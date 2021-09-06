import React from 'react'
import Link from 'next/link'
import Hamburger from './Hamburger'
import CustomAnchor from './CustomAnchor'

export default function Header() {
	return (
		<div className="flex justify-between top-0 mt-2 p-2 w-full absolute max-w-full z-30 text-white">
			{/* Logo goes in place of Hi! */}

			<p className="font-fancy z-10">Algo Share</p>
			<Hamburger />
			<div className="md:flex gap-2 hidden">
				<Link href="sign_in">
					<CustomAnchor>Sign In</CustomAnchor>
				</Link>
				<Link href="sign_up">
					<CustomAnchor>Sign Up</CustomAnchor>
				</Link>
			</div>
		</div>
	)
}
