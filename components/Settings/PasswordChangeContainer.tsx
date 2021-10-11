import React from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import theme from '../../theme'
import Input from '../Input'
import Label from '../Input/Label'
const CustomFormContainer = styled.form.attrs({
	className: 'flex flex-col p-2 rounded-b-md items-center gap-2 border',
})`
	# background-color: ${theme.colors.textPrimary};
`

export default function PasswordChangeContainer(
	props: {
		children?: React.ReactNode
		isOpen?: boolean
	} = { isOpen: false }
) {
	const { children, isOpen } = props

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

	if (!isOpen) {
		return (
			<div className="text-center border p-2">Expand to change password</div>
		)
	}
	const onSubmit = () => {}
	return (
		<CustomFormContainer onSubmit={handleSubmit(onSubmit)}>
			<div className="relative pt-2">
				<Input
					{...register('oldPassword', {
						required: true,
						minLength: {
							value: 8,
							message: 'Any password must at least be 8 characters long',
						},
					})}
					placeholder=""
					autoComplete="off"
					type="password"
				/>
				<Label htmlFor="oldPassword">Old password</Label>
			</div>
			<div className="relative pt-2">
				<Input
					type="password"
					{...register('newPassword', {
						required: true,
						minLength: {
							value: 8,
							message: 'New password must at least be 8 characters long',
						},
					})}
					placeholder=""
					autoComplete="off"
				/>
				<Label htmlFor="newPassword">New password</Label>
			</div>
			<div className="relative pt-2 mb-2">
				<Input
					type="password"
					{...register('repeatNewPassword', {
						required: true,
						minLength: {
							value: 8,
							message: 'New password must at least be 8 characters long',
						},
					})}
					placeholder=""
					autoComplete="off"
				/>
				<Label htmlFor="repeatNewPassword">Repeat new password</Label>
			</div>
		</CustomFormContainer>
	)
}
