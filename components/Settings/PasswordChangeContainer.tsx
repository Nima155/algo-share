import React from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import theme from '../../theme'
import Input from '../Input'
import Label from '../Input/Label'
import {
	animated,
	useSpring,
	useSpringRef,
	useChain,
	useTransition,
	config,
} from '@react-spring/web'
import { useMeasure } from 'react-use'
import Button from '../Button'
import useUser from '../../lib/useUser'
import useTranstionableContainerText from '../../lib/useTransitionableContainerText'
const CustomFormContainer = styled.form.attrs({
	className: 'flex flex-col p-2 rounded-b-md items-center gap-2',
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
		getValues,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

	const onSubmit = async (data: {
		oldPassword: string
		newPassword: string
		repeatNewPassword: string
	}) => {
		try {
			await fetch('api/user/password', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message)
			}
		}
	}

	const [containerStyles, transitions, ref, optionsRef] =
		useTranstionableContainerText(isOpen || false)

	return (
		<animated.div style={containerStyles}>
			<div ref={ref}>
				{transitions((styles, item) => (
					<animated.div style={styles}>
						<div ref={optionsRef}>
							{item ? (
								<CustomFormContainer onSubmit={handleSubmit(onSubmit)}>
									<div className="relative pt-2">
										<Input
											{...register('oldPassword', {
												required: true,
												minLength: {
													value: 8,
													message:
														'Any password must at least be 8 characters long',
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
													message:
														'New password must at least be 8 characters long',
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
													message:
														'New password must at least be 8 characters long',
												},
												validate: (value) =>
													value === getValues('newPassword') ||
													'repeat password is not the same as new password',
											})}
											placeholder=""
											autoComplete="off"
										/>
										<Label htmlFor="repeatNewPassword">
											Repeat new password
										</Label>
									</div>
									{/* TODO: add error indicator */}
									<Button
										text="Change Password"
										onClick={handleSubmit(onSubmit)}
									/>
								</CustomFormContainer>
							) : (
								<div className="text-center p-2">Expand to change password</div>
							)}
						</div>
					</animated.div>
				))}
			</div>
		</animated.div>
	)
}
