import React, { useEffect, useState } from 'react'
import GeneralContainer from '../../components/GeneralContainer'
import Layout from '../../components/Layout'
import { getAllAlgorithms, getSingleAlgorithm } from '../../lib/algorithms'
import { IAlgorithm } from '../../utils/types'
import { Controlled as ControlledEditor } from 'react-codemirror2'
import theme from '../../theme'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import useUser from '../../lib/useUser'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import fetcher from '../../lib/fetchJson'
import { useMountedState } from 'react-use'
import { getAssociatedComments } from '../../lib/comments'

if (typeof navigator !== 'undefined') {
	require('codemirror/lib/codemirror.css')
	require('codemirror/theme/material.css')
	require('codemirror/mode/javascript/javascript')
	require('codemirror/mode/clike/clike')
	require('codemirror/mode/python/python')
	require('codemirror/mode/commonlisp/commonlisp')
	require('codemirror/mode/crystal/crystal')
	require('codemirror/mode/dart/dart')
	require('codemirror/mode/elm/elm')
	require('codemirror/mode/go/go')
	require('codemirror/mode/rust/rust')
	require('codemirror/mode/haskell/haskell')
	require('codemirror/mode/fortran/fortran')
	require('codemirror/mode/lua/lua')
	require('codemirror/mode/julia/julia')
	require('codemirror/mode/ruby/ruby')
	require('codemirror/mode/swift/swift')
	require('codemirror/mode/perl/perl')
	require('codemirror/mode/php/php')
}

export default function Algorithm({
	algorithm,
	code,
	author,
	description,
	language,
}: IAlgorithm) {
	const { user } = useUser()
	const { query } = useRouter()
	const { data, mutate } = useSWR(`/api/user/favorites/${query.id}`)
	const isMounted = useMountedState()

	const onClickStar = async () => {
		mutate(
			await fetcher(`/api/user/favorites/${query.id}`, {
				method: 'PATCH',
			})
		)
	}

	return (
		<Layout>
			{isMounted() && (
				<GeneralContainer
					className="rounded text-white m-2"
					style={{ backgroundColor: theme.colors.textPrimary }}
				>
					<div className="flex p-2 items-center gap-2">
						<Image
							className="rounded-full"
							src={author?.profilePicture || '/default_profile.png'}
							width={30}
							height={30}
							alt="profile picture of author"
						/>
						<h1>{algorithm}</h1>
						<div className="ml-auto">
							{user?.isLoggedIn && (
								<FontAwesomeIcon
									icon={faStar}
									cursor="pointer"
									color={data?.data ? 'yellow' : 'white'}
									onClick={onClickStar}
								/>
							)}
						</div>
					</div>
					<ControlledEditor
						className="overflow-x-hidden"
						onBeforeChange={() => {}}
						value={code}
						options={{
							readOnly: true,
							mode: language,
							theme: 'material',
							lineNumbers: true,
							lineWrapping: true,
							screenReaderLabel: 'code environment for reading code',
						}}
					/>
					<div className="bg-gray-100 text-black p-2 flex flex-col flex-grow rounded-b gap-1">
						<h2 className="font text-gray-500 tracking-wider">Description:</h2>

						<p className="pl-4">{description || 'No description provided'}</p>

						{/* TODO: Implement comment system! 
							avatar -- username
							comment
								date modified	posted on
						*/}
						<section>
							<h2 className="font text-gray-500 tracking-wider">Comments:</h2>
						</section>
					</div>
				</GeneralContainer>
			)}
		</Layout>
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
	const allComments = await getAssociatedComments()
	return {
		props: allInformationOnAlgorithm,
		revalidate: 60,
	}
}
