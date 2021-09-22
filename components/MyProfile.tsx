import React, { useState } from 'react'
import useUser from '../lib/useUser'
import Image from 'next/image'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import fetcher from '../lib/fetchJson'
import Link from 'next/link'
import theme from '../theme'
import usePagination from '../lib/usePagination'
import Card from './Card'
import Button from './Button'

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
	const { data, error, loadMore } = usePagination(
		'/api/user/algorithms',
		5,
		searchMode
	)
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

	return (
		<div className="flex flex-col items-center mt-2 gap-2">
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
			{data &&
				data.map((e) =>
					e.data.map((e) => (
						<Card
							key={e.id}
							{...{
								id: e.id,
								author: e.author,
								algorithm: e.algorithm,
								language: e.language,
								description: e.description,
							}}
						/>
					))
				)}
			{data && data[data.length - 1].data.length != 0 && (
				<Button onClick={() => loadMore()} text={'Load more'} />
			)}
		</div>
	)
}
