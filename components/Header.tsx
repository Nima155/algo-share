import React from 'react'

import Hamburger from './Hamburger'

export default function Header() {
	return (
		<div className="flex justify-between top-0 mt-2 p-2 w-full absolute max-w-full">
			{/* Logo goes in place of Hi! */}

			<p className="font-fancy text-white z-10">Algo Share</p>
			<Hamburger />
		</div>
	)
}
