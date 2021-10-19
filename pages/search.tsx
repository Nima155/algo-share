import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import fetcher from '../lib/fetchJson'
import usePagination from '../lib/usePagination'
import GeneralContainer from '../components/GeneralContainer'
import consts from '../utils/constants'

import { useInView } from 'react-intersection-observer'
import SearchCard from '../components/SearchCard'
function Search(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const {
		query: { q, language },
	} = useRouter()

	const { data, loadMore } = usePagination({
		initialKey: `/api/algorithms/search?q=${q}&language=${language}`,
		limit: 20,
		fallback: props.fallback,
	})

	const [ref, inView] = useInView({
		threshold: 0.5,
	})

	useEffect(() => {
		if (inView && (data ? data[data?.length - 1].data?.length !== 0 : 1)) {
			loadMore()
		}
	}, [inView])

	return (
		<Layout>
			<div className="p-2 flex-grow">
				<GeneralContainer className="bg-gray-100 rounded p-2">
					{data &&
						data
							.map((e) => e.data)
							.flat()
							.map((e) => {
								const new_e = { ...e, author: e.author[0], id: e._id }

								return <SearchCard key={new_e._id} {...new_e} />
							})}
				</GeneralContainer>
			</div>
			<div className="h-1 bg-transparent" ref={ref}></div>
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
			fallback: [fallback],
		},
	}
}
export default Search
