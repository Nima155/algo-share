import type { NextPage } from 'next'
import Button from '../components/Button'
import Head from 'next/head'
import { useDebounce, useMeasure } from 'react-use'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Layout from '../components/Layout'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Wave from '../components/Wave'
import styled, { keyframes } from 'styled-components'
import theme from '../theme'
import TextSelectInputLanguages from '../components/TextSelectInputLanguages'
import { useForm } from 'react-hook-form'
import { IAlgorithm } from '../utils/types'

import useSWR from 'swr'
import { RefObject, useMemo, useRef, useState } from 'react'
import AutoCompleteMenu from '../components/AutoCompleteMenu'
import { config, useTransition, useSpring } from '@react-spring/core'
import { animated } from '@react-spring/web'
import fetcher from '../lib/fetchJson'

import useOnClickOutside from '../lib/useOnClickOutside'
import { useRouter } from 'next/router'

const typewriterAnimation = keyframes`
	to {
		left: 100%;
	}
`
const blinkingAnimation = keyframes`
	to {
		background-color: transparent;
	}
`
const TypeWriterHeader = styled.h1.attrs({
	className: 'text-lg md:text-3xl z-10',
})`
	position: absolute;

	color: white;
	left: 50%;
	top: 15%;
	transform: translateX(-50%);
	white-space: nowrap;
	&:after,
	&:before {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
	&:before {
		background-color: ${theme.colors.quarternaryBackground};
		animation: ${typewriterAnimation} 2s steps(27) 2s forwards;
	}
	&:after {
		width: 0.2rem;
		background-color: white;
		animation: ${typewriterAnimation} 2s steps(27) 2s forwards,
			${blinkingAnimation} 800ms steps(27) infinite;
	}
`
// const HomeDiv = styled.div.attrs({
// 	className: 'flex flex-col justify-center',
// })`
// 	min-height: 100vh;
// 	min-width: 100vw;
// `

// TODO implement debouncing for searches

const Home: NextPage = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
	} = useForm<IAlgorithm>({ mode: 'onChange' })
	// /api/algorithms/search?q=${data.algorithm}
	const router = useRouter()
	//

	const onSubmit = async ({
		language,
		algorithm,
	}: {
		language: string
		algorithm: string
	}) => {
		router.push(`/search?q=${algorithm}&language=${language}`)
	}

	const [lang, alg] = watch(['language', 'algorithm'])
	const [langAlg, setLangAlg] = useState<(string | null)[]>([null, null])
	const [previouslyFetchedData, setPreviouslyFetchedData] = useState<any>(null)

	const { data: autoCompleteData } = useSWR(
		langAlg[0] &&
			langAlg[1] &&
			`/api/algorithms/search?q=${langAlg[1]}&cursor=0&language=${
				langAlg[0]
			}&limit=${5}`
	)

	useDebounce(
		() => {
			// console.log(lang, alg, autoCompleteData)
			if (!lang || !alg) {
				setPreviouslyFetchedData({ data: [] })
			} else if (autoCompleteData) {
				setPreviouslyFetchedData(autoCompleteData)
			}
			setLangAlg([lang, alg])
		},
		250,
		[lang, alg]
	)
	const [showAutoComplete, setShowAutoComplete] = useState(true)
	const collapsableAutoCompleteRef = useRef(null)
	useOnClickOutside(collapsableAutoCompleteRef, () => {
		setShowAutoComplete(false)
	})

	return (
		<div className="w-screen min-h-screen">
			<Head>
				<title>Algo Share: HomePage</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Layout>
				<Wave />
				<TypeWriterHeader>Share your snippets with us</TypeWriterHeader>

				<form
					className="flex flex-col z-20 gap-2 items-center"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div
						className="relative z-10"
						ref={collapsableAutoCompleteRef}
						onClick={() => setShowAutoComplete(true)}
					>
						<TextSelectInputLanguages register={register} isForSearch={true} />

						{autoCompleteData || previouslyFetchedData ? (
							<AutoCompleteMenu
								items={
									showAutoComplete
										? autoCompleteData?.data || previouslyFetchedData?.data
										: []
								}
							/>
						) : null}
					</div>
					<Button text="Search" onClick={handleSubmit(onSubmit)}>
						<FontAwesomeIcon icon={faSearch} size={'sm'} />
					</Button>
				</form>
			</Layout>
		</div>
	)
}

export default Home
