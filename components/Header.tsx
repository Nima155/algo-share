import React from 'react'
import Hamburger from './Hamburger'

export default function Header() {
	return (
		<div className="flex justify-between p-2">
			{/* Logo goes in place of Hi! */}
			<p className="font-fancy">Algo Share</p>
			<Hamburger />
		</div>
	)
}
