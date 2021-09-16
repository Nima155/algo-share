import type { NextPage } from 'next'
import Button from '../components/Button'
import Head from 'next/head'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Layout from '../components/Layout'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Wave from '../components/Wave'
import styled, { keyframes } from 'styled-components'
import theme from '../theme'
import TextSelectInputLanguages from '../components/TextSelectInputLanguages'

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
				<form className="flex flex-col z-20 gap-2 items-center">
					<TextSelectInputLanguages />
					<Button text="Search">
						<FontAwesomeIcon icon={faSearch} size={'sm'} />
					</Button>
				</form>
			</Layout>
		</div>
	)
}

export default Home
