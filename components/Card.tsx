import consts from '../utils/constants'
import React, { ReactNode } from 'react'
import { IAlgorithm, Optional } from '../utils/types'
import styled from 'styled-components'
import theme from '../theme'
import Link from 'next/link'
import Image from 'next/image'
const CardLayout = styled.div`
	display: flex;
	flex-direction: column;
	width: clamp(12rem, 14rem + 10vw, 17rem);
	background-color: #e5e7eb;
	border-radius: 10px;
	position: relative;
	padding: 5px;
	margin: 0.5rem 0;
`

export default function Card(
	props: Optional<IAlgorithm & { children?: ReactNode; id: string }, 'code'>
) {
	const {
		id,
		children,
		language,
		algorithm,
		description,
		author: { profilePicture },
	} = props
	const Icon = consts.VALID_LANGUAGES.find((e) => e[0] == language)?.at(1)

	return (
		<CardLayout className="shadow-md">
			<div
				className="absolute right-2 top-1 rounded-b-md overflow-hidden inline-flex h-6 justify-end gap-1 w-12"
				style={{ backgroundColor: '#E5E7EB', padding: '2px' }}
			>
				<Image
					src={
						profilePicture === undefined
							? '/default_profile.png'
							: profilePicture
					}
					alt="Profile picture"
					width={24}
					height={24}
					className="rounded-full"
				/>
				<Icon />
				{/* put profile picture here as well! */}
			</div>

			<Link href={`/algorithm/${id}`}>
				<a className="hover:underline w-max capitalize">
					{' '}
					<h2> {algorithm}</h2>
				</a>
			</Link>

			<p className=" bg-white p-1 rounded-md text-xs">
				{description || 'No description'}
			</p>
		</CardLayout>
	)
}
