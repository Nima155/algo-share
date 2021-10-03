import { animated } from '@react-spring/web'
import Link from 'next/link'

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { config, useTransition, useSpring } from 'react-spring'
import { useMeasure, useTimeout } from 'react-use'
import { isUint16Array } from 'util/types'

import { IAlgorithm } from '../utils/types'

interface ExtendedAlgorithm extends IAlgorithm {
	_id: string
}

const AutoCompleteMenu = (props: {
	items: ExtendedAlgorithm[]
	style?: any
}) => {
	const { items, style } = props

	const [heightRef, { height }] = useMeasure<HTMLUListElement>()

	const styles = useSpring({
		from: { opacity: 0, height: 0 },
		to: { height: height ? height : 0, opacity: height ? 1 : 0 },
	})

	return (
		<div
			className="rounded-md absolute w-full p-2"
			style={{ zIndex: -1, top: '2.3rem' }}
		>
			<animated.div
				style={styles}
				className="bg-white rounded-md overflow-hidden"
			>
				<ul className="pb-1" ref={heightRef}>
					{items.map((e) => (
						<li key={e._id} className={`hover:bg-gray-200 p-2`}>
							<Link href={`/algorithm/${e._id}`}>
								<a>{e.algorithm}</a>
							</Link>
						</li>
					))}
				</ul>
			</animated.div>
			{/* <div className={`px-2 py-1 rounded-md`} heightRef={heightRef}>
				{}
			</div> */}
		</div>
	)
}

export default AutoCompleteMenu
