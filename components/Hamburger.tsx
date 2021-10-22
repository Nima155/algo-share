import React, { useState } from 'react'
import styled from 'styled-components'
import theme from '../theme'
import {
	useSprings,
	config,
	animated,
	useSpringRef,
	useSpring,
	useChain,
} from 'react-spring'
import Link from 'next/link'
import PopInMenu from './PopInMenu'
const CustomHr = styled(animated.hr).attrs({
	className: 'border relative z-40',
})``

const transformations = {
	before: [
		{
			transform: 'rotate(0deg) translate3d(0px, 0px, 0px)',
			opacity: 1,
			borderColor: '#fff',
		},
		{ transform: 'translateX(0%)', opacity: 1, borderColor: '#fff' },
		{
			transform: 'rotate(0deg) translate3d(0px, 0px, 0px)',
			opacity: 1,
			borderColor: '#fff',
		},
	],
	after: [
		{
			transform: 'rotate(45deg) translate3d(1px, 9px, 0px)',
			borderColor: '#000',
		},
		{ transform: 'translateX(-100%)', opacity: 0, borderColor: '#000' },
		{
			transform: 'rotate(-45deg) translate3d(6px, -12px, 0px)',
			borderColor: '#000',
		},
	],
}

export default function Hamburger() {
	const [toggled, setToggled] = useState(false)
	const burgerRef = useSpringRef()
	const popInRef = useSpringRef()

	const [springs, api] = useSprings(3, (i) => ({
		...transformations.before[i],
		...(i == 2 && { ref: burgerRef }),
	}))

	const popInStyles = useSpring({
		to: { x: !toggled ? 0 : -144, opacity: toggled ? 1 : 0 },
		ref: popInRef,
	})

	useChain([burgerRef, popInRef])

	return (
		<div className="md:hidden">
			<div
				className={`flex ${
					toggled ? 'fixed' : 'relative'
				} flex-col gap-2 w-6 cursor-pointer z-20 ${toggled ? 'right-2' : ''}`}
				onClick={() => {
					api.start((i) => {
						const mode = !toggled ? 'after' : 'before'

						return transformations[mode][i]
					})
					setToggled((v) => !v)
				}}
			>
				{springs.map((styles, i) => {
					return <CustomHr style={styles} key={i} />
				})}
			</div>

			<PopInMenu style={popInStyles} />
		</div>
	)
}
