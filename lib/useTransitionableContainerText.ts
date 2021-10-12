import {
	SpringValue,
	TransitionFn,
	useSpring,
	useSpringRef,
} from '@react-spring/core'
import { config, useChain, useTransition } from 'react-spring'
import { useMeasure } from 'react-use'
import { UseMeasureRef } from 'react-use/lib/useMeasure'

export default function useTranstionableContainerText(isOpen: boolean): [
	containerStyles: {
		opacity: SpringValue<number>
		height: SpringValue<number>
	},
	transitions: TransitionFn<
		boolean,
		{
			opacity: number
			marginLeft: number
			height: number
		}
	>,

	ref: UseMeasureRef<HTMLDivElement>,
	optionsRef: UseMeasureRef<HTMLDivElement>
] {
	const [optionsRef, { height: optionsHeight }] = useMeasure<HTMLDivElement>()
	const [ref, { height }] = useMeasure<HTMLDivElement>()
	const boxSpringRef = useSpringRef()

	const containerStyles = useSpring({
		from: { opacity: 0, height: 0 },
		to: {
			height: height ? height : 0,
			opacity: 1,
		},
		ref: boxSpringRef,
	})

	const textSpringRef = useSpringRef()

	const transitions = useTransition(isOpen, {
		from: { opacity: 0, marginLeft: -100, height: 0 },
		enter: {
			opacity: 1,
			height: optionsHeight ? optionsHeight : 0,
			marginLeft: 0,
		},
		leave: { opacity: 0, marginLeft: -100, height: 0 },
		update: () => ({
			height: optionsHeight,
		}),
		ref: textSpringRef,
		trail: 400,
		config: config.gentle,
	})

	useChain(
		isOpen ? [textSpringRef, boxSpringRef] : [boxSpringRef, textSpringRef]
	)
	return [containerStyles, transitions, ref, optionsRef]
}
