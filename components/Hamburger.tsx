import React, { useState } from 'react'
import styled from 'styled-components'
import theme from '../theme'
import { useSpring, config, animated } from 'react-spring'

const PopInMenu = styled(animated.div)`
	background-color: ${theme.colors.secondaryBackground};
`

const CustomHr = styled(animated.hr).attrs({
	className: 'border relative',
})``

export default function Hamburger() {
	const [menuState, setMenuState] = useState<boolean>(false)
	const [styleMid, apiMid] = useSpring(() => ({
		x: 0,
		config: config.default,
	}))

	const [styleTopAndBottom, apiTopAndBottom] = useSpring(() => ({
		y: 0,
		config: config.gentle,
		onRest: () => {
			setMenuState(() => styleTopAndBottom.y.get() !== 0)
		},
	}))

	return (
		<div>
			<div
				className="flex flex-col gap-2 w-6 cursor-pointer relative z-20"
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
						borderColor: styleTopAndBottom.y.to((val) =>
							!val ? 'white' : 'black'
						),
					}}
				/>
				<CustomHr
					style={{
						transform: styleMid.x.to(
							(val: number) => `translateX(-${val * 100}%)`
						),
						opacity: styleMid.x.to((val: number) => `${1 - val}`),
						borderColor: styleTopAndBottom.y.to((val) =>
							!val ? 'white' : 'black'
						),
					}}
				/>
				<CustomHr
					style={{
						transform: styleTopAndBottom.y.to(
							(val: number) => `rotate(-${val * 45}deg)`
						),
						top: styleTopAndBottom.y.to((val) => `${-val * 50}%`),
						borderColor: styleTopAndBottom.y.to((val) =>
							!val ? 'white' : 'black'
						),
					}}
				/>
			</div>
			{/* // right: ${(props: IPopInMenu) => (props.isOpen ? 0 : -100)}%; */}
			<PopInMenu
				className="flex flex-col fixed gap-2 z-10 top-0 items-center w-3/5 max-w-xs min-h-full pt-10"
				style={{ right: styleMid.x.to((y) => `${y * 100 - 100}%`) }}
			>
				<p>Sign In</p>
				<p>Sign Up</p>
			</PopInMenu>
		</div>
	)
}
