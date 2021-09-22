import React from 'react'
import { getAllAlgorithms, getSingleAlgorithm } from '../../lib/algorithms'
import { IAlgorithm } from '../../utils/types'

export default function Algorithm({
	algorithm,
	code,
	author,
	description,
	language,
}: IAlgorithm) {
	return (
		<div>
			<p>{algorithm}</p>
			<p>{code}</p>
			<p>{author}</p>
			<p>{description}</p>
			<p>{language}</p>
		</div>
	)
}

export async function getStaticPaths() {
	return {
		paths: await getAllAlgorithms(),
		fallback: false,
	}
}

export async function getStaticProps({ params }: { params: { id: string } }) {
	const allInformationOnAlgorithm = await getSingleAlgorithm(params.id)

	return {
		props: allInformationOnAlgorithm,
	}
}
