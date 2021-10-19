import React, { useEffect, useState } from 'react'
import useUser from '../lib/useUser'
import Image from 'next/image'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import fetcher from '../lib/fetchJson'
import { InView, useInView } from 'react-intersection-observer'
import theme from '../theme'
import usePagination from '../lib/usePagination'
import Card from './Card'

import { useSprings, useTransition } from '@react-spring/core'
import { animated } from '@react-spring/web'

const CustomRadioButton = styled.input`
	height: 0;
	width: 0;
	opacity: 0;
	& + label {
		background-color: ${theme.colors.secondaryBackground};
		color: white;
		padding: 2px 5px;
		cursor: pointer;
		border-radius: 5px;
		transition: background-color 100ms ease-in;
	}
	&:checked + label {
		background-color: ${theme.colors.quarternaryBackground};
	}
`
// Photo will appear on page as 170 x 170 pixels
// on desktop and 128 x 128 on smartphones.

const CustomFileInput = styled.input`
	opacity: 0;
	width: 0.1px;
	height: 0.1px;
	position: absolute;
`

export default function MyProfile() {
	const { user, mutateUser } = useUser()
	const [searchMode, setSearchMode] = useState('algorithms')

	const {
		data: algorithmsData,
		error: algorithmsError,
		loadMore: loadMoreAlgorithms,
	} = usePagination({
		initialKey: '/api/user/algorithms',
		limit: 5,
		mode: 'algorithms',
	})

	const {
		data: favoritesData,
		error: favoritesError,
		loadMore: loadMoreFavorites,
	} = usePagination({
		initialKey: '/api/user/algorithms',
		limit: 5,
		mode: 'favorites',
	})

	const onImgChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const formData = new FormData()
		if (e.target.files?.length) {
			formData.append('profilePicture', e.target.files[0])
		}
		mutateUser(
			await fetcher('/api/user', {
				method: 'PATCH',
				body: formData,
			})
		)
	}

	const onRadioChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchMode(e.target.value)
	}

	const flatData = (
		searchMode === 'algorithms' ? algorithmsData : favoritesData
	)
		?.map((e) => e.data)
		?.flat()
		.map((e, i) => ({ ...e, i }))

	// const [springs, api] = useSprings(flatData?.length || 0, (index) => ({
	// 	from: { opacity: 0, marginLeft: -100 },
	// 	to: { opacity: 1, marginLeft: 0 },
	// 	delay: index * 50,
	// }))

	const transition = useTransition(flatData, {
		from: { opacity: 0, marginLeft: -100 },
		enter: {
			opacity: 1,
			marginLeft: 0,
		},
		leave: {
			immediate: true,
			display: 'none',
		},

		keys: (item) => `${item.id} ${item.i}`,
		config: {
			tension: 65,
			friction: 14,
		},

		trail: 40,
	})
	const [ref, inView] = useInView({
		initialInView: true,
		threshold: 0.5,
	})

	useEffect(() => {
		// console.log(data)
		const data = searchMode === 'algorithms' ? algorithmsData : favoritesData

		if (inView && (data ? data[data?.length - 1].data?.length !== 0 : 1)) {
			if (searchMode === 'algorithms') {
				loadMoreAlgorithms()
			} else {
				loadMoreFavorites()
			}
		}
	}, [inView])
	// console.log(data)

	return (
		<div
			className="flex flex-col items-center mt-2 gap-2"
			onScroll={(e) => {
				e.target
			}}
		>
			<div className="rounded-full relative">
				<Image
					src={`${
						!user?.profilePicture ? '/default_profile.png' : user.profilePicture
					}`}
					alt="Profile picture"
					width={128}
					height={128}
				/>
				<div className="absolute top-3 right-0 z-10">
					<CustomFileInput
						type="file"
						id="profile-pic"
						accept="image/png, image/jpeg"
						name="profileImage"
						onChange={onImgChange}
					/>
					<label htmlFor="profile-pic" className="cursor-pointer">
						<FontAwesomeIcon icon={faEdit} />
					</label>
				</div>
			</div>
			<h2 className="text-center">{user?.username?.split('@')[0]}</h2>
			<div className="flex justify-center w-full gap-1">
				<CustomRadioButton
					type="radio"
					value="favorites"
					name="category"
					id="fav"
					onChange={onRadioChange}
				/>

				<label htmlFor="fav">favorites</label>

				<CustomRadioButton
					type="radio"
					value="algorithms"
					name="category"
					id="auth"
					onChange={onRadioChange}
					defaultChecked
				/>
				<label htmlFor="auth">authored</label>
			</div>

			{transition((style, item) => (
				<animated.div style={style} key={item.id}>
					<Card
						{...{
							id: item.id,
							author: item.author,
							algorithm: item.algorithm,
							language: item.language,
							description: item.description,
						}}
					/>
				</animated.div>
			))}

			<div className="h-1 bg-transparent" ref={ref}></div>
		</div>
	)
}
