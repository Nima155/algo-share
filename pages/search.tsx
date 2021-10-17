import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../components/Layout'
import fetcher from '../lib/fetchJson'
import usePagination from '../lib/usePagination'
import GeneralContainer from '../components/GeneralContainer'
import consts from '../utils/constants'
import Card from '../components/Card'
function Search(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const {
		query: { q, language },
	} = useRouter()

	const { data } = usePagination({
		initialKey: `/api/algorithms/search?q=${q}&language=${language}`,
		limit: 20,
		fallback: props.fallback,
	})
	// console.log(data)

	return (
		<Layout>
			<div className="p-2 flex-grow">
				<GeneralContainer className="bg-gray-100 rounded p-2">
					{data &&
						data
							.map((e) => e.data)
							.flat()
							.map((e) => {
								e.id = e._id

								return <Card key={e._id} {...e} />
							})}
				</GeneralContainer>
			</div>
		</Layout>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const { q, language } = query

	const fallback = await fetcher(
		`${
			consts.SERVER
		}/api/algorithms/search?q=${q}&language=${language}&limit=${20}&cursor=${0}`
	)

	return {
		props: {
			fallback,
		},
	}
}
export default Search
