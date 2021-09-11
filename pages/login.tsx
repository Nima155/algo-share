import React from 'react'
import styled from 'styled-components'
import Button from '../components/Button'
import Input from '../components/Input'
import Label from '../components/Input/Label'
import Layout from '../components/Layout'
import fetchJson from '../lib/fetchJson'
import useUser from '../lib/useUser'
import { useForm } from 'react-hook-form'
import * as EmailValidator from 'email-validator'
type FormValues = {
	email: string
	password: string
}

const CustomForm = styled.form.attrs({
	className:
		'self-center relative flex flex-col gap-2 pt-2 pb-4 px-4 bg-white shadow-md rounded-md m-2',
})`
	font-size: clamp(0.2rem, 1.2rem + 2vw, 1.4rem);
	width: min(95%, 21.875rem);
	overflow-wrap: break-word;
`

export default function Login() {
	const { mutateUser } = useUser({
		redirectTo: '/',
		redirectIfFound: true,
	})
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>()

	const onFormSubmit = (isSignUp: boolean) => {
		return async ({ email, password }: FormValues) => {
			if (!isSignUp) {
				mutateUser(
					await fetchJson('/api/login', {
						method: 'POST',
						body: JSON.stringify({
							username: email,
							password: password,
						}),
					})
				)
			} else {
			}
		}
	}

	return (
		<Layout>
			<CustomForm onSubmit={handleSubmit(onFormSubmit(false))}>
				<div className="relative pt-2">
					<Input
						{...register('email', {
							required: true,
							validate: EmailValidator.validate,
						})}
						autoComplete="off"
						placeholder=""
					/>
					<Label htmlFor="email">Email</Label>
				</div>

				<div className="relative pt-2 mb-4">
					<Input
						{...register('password', {
							required: true,
							minLength: {
								value: 8,
								message: 'Password must at least be 8 characters long',
							},
						})}
						placeholder=""
						autoComplete="off"
					/>
					<Label htmlFor="password">Password</Label>
				</div>
				<div className="flex justify-evenly px-3 gap-2">
					<Button text="Log in" onClick={handleSubmit(onFormSubmit(false))} />
					<Button text="Sign up" onClick={handleSubmit(onFormSubmit(true))} />
				</div>

				<p className="text-red-500 text-xs">
					{[...Object.values(errors)][0]?.message}
				</p>
			</CustomForm>
		</Layout>
	)
}
