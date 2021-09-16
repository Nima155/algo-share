import React from 'react'
import useUser from '../lib/useUser'
import Image from 'next/image'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import fetcher from '../lib/fetchJson'
import Link from 'next/link'
import Button from './Button'
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

	const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
						onChange={onChange}
					/>
					<label htmlFor="profile-pic" className="cursor-pointer">
						<FontAwesomeIcon icon={faEdit} />
					</label>
				</div>
			</div>
			<h2 className="text-center">{user?.username?.split('@')[0]}</h2>
			<div className="flex gap-2">
				<Button text="Published" />
				<Button text="Favorites" />
			</div>
		</div>
	)
}
