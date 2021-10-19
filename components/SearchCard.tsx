import React, { ReactNode } from 'react'
import { Optional, IAlgorithm } from '../utils/types'
import Image from 'next/image'
import Link from 'next/link'
export default function SearchCard(
	props: Optional<IAlgorithm & { children?: ReactNode; id: string }, 'code'>
) {
	const {
		author: { profilePicture },
		algorithm,
		description,
		id,
	} = props

	return (
		<div className="flex my-4">
			<div className="flex-shrink-0">
				<Image
					src={
						profilePicture === undefined
							? '/default_profile.png'
							: profilePicture
					}
					alt="Profile picture"
					width={64}
					height={64}
					className="rounded-full"
				/>
				<p className="mt-2 text-xs text-center">nima155</p>
			</div>
			<div className="pl-3">
				<Link href={`/algorithm/${id}`}>
					<a className="hover:underline w-max capitalize text-blue-800 text-lg">
						<h2>{algorithm}</h2>
					</a>
				</Link>
				<p>{description}</p>
			</div>
		</div>
	)
}
