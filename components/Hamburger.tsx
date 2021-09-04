import React, { useState } from 'react'
import styled from 'styled-components'
import theme from '../theme'
import { useSpring, config, animated } from 'react-spring'

interface IPopInMenu {
	isOpen: boolean
}

const PopInMenu = styled.div<IPopInMenu>`
	right: ${(props) => (props.isOpen ? 0 : 100)}%;
`

const CustomHr = styled(animated.hr).attrs({
	className: 'border relative',
})`
	border-color: ${theme.colors.textPrimary};
`

export default function Hamburger() {
	const [menuState, setMenuState] = useState<boolean>(false)
	const [styleMid, apiMid] = useSpring(() => ({
		x: 0,
		config: config.gentle,
	}))
	// Build a transition and catch its ref
	const [styleTopAndBottom, apiTopAndBottom] = useSpring(() => ({
		y: 0,
		config: config.gentle,
		onRest: () => {
			setMenuState(() => styleTopAndBottom.y.get() !== 0)
		},
	}))
	// First run the spring, when it concludes run the transition
	// useChain([transitionRefRest, springRefMiddleLine])

	return (
		<div>
			<div
				className="flex flex-col gap-2 w-6 cursor-pointer relative z-10"
				onClick={() => {
					apiMid.start({ x: styleMid.x.get() ? 0 : 1 })
					apiTopAndBottom.start({
						y: styleTopAndBottom.y.get() ? 0 : 1,
						delay: 30,
					})
				}}
			>
				<CustomHr
					style={{
						transform: styleTopAndBottom.y.to(
							(val: number) => `rotate(${val * 45}deg)`
						),
						top: styleTopAndBottom.y.to((val) => `${val * 50}%`),
					}}
				/>
				<CustomHr
					style={{
						transform: styleMid.x.to(
							(val: number) => `translateX(-${val * 100}%)`
						),
						opacity: styleMid.x.to((val: number) => `${1 - val}`),
					}}
				/>
				<CustomHr
					style={{
						transform: styleTopAndBottom.y.to(
							(val: number) => `rotate(-${val * 45}deg)`
						),
						top: styleTopAndBottom.y.to((val) => `${-val * 50}%`),
					}}
				/>
			</div>
			<PopInMenu
				className="flex flex-col fixed gap-2 top-0 items-center w-3/5 min-h-full pt-10"
				isOpen={menuState}
			>
				<p>Sign In</p>
				<p>Sign Up</p>
			</PopInMenu>
		</div>
	)
}
