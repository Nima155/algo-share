import React from 'react'
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
	console.log(data)

	const onClickStar = async () => {
		mutate(
			await fetcher(`/api/user/favorites/${query.id}`, {
				method: 'PATCH',
			})
		)
	}

	return (
		<Layout>
			<section className="p-2">
				<GeneralContainer
					className="rounded text-white"
					style={{ backgroundColor: theme.colors.textPrimary }}
				>
					<div className="flex p-2 items-center gap-2">
						{/* Profile picture? */}
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

					<p className="bg-gray-100 text-black p-2 flex-grow rounded-b">
						{description || 'No description provided'}
					</p>
				</GeneralContainer>
			</section>
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

	return {
		props: allInformationOnAlgorithm,
	}
}
