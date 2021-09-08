import { faLeaf } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled from 'styled-components'
import Button from '../components/Button'
import Layout from '../components/Layout'
import fetchJson from '../lib/fetchJson'
import useUser from '../lib/useUser'

const CustomInput = styled.input.attrs({
	className: 'border-b-2 border-gray-300 border-solid w-full',
})`
	transition: all 250ms ease-in;
	outline: 0;
	padding-top: 20px;

	&:focus {
		border-color: green;
	}
	&:focus + label,
	&:not(:placeholder-shown) + label {
		transform: translateY(-100%);
		font-size: calc(clamp(0.2rem, 1.2rem + 2vw, 1.4rem) * 0.8);
	}
`

const CustomLabel = styled.label`
	position: absolute;
	bottom: 2px;
	left: 0px;
	color: #0005;
	transition: all 300ms ease;
	pointer-events: none;
`

const CustomForm = styled.form.attrs({
	className:
		'self-center flex flex-col gap-2 pt-2 pb-4 px-4 bg-white shadow-md rounded-md m-2',
})`
	font-size: clamp(0.2rem, 1.2rem + 2vw, 1.4rem);
`

export default function Login() {
	const { mutateUser } = useUser({
		redirectTo: '/',
		redirectIfFound: true,
	})

	const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		mutateUser(
			await fetchJson('/api/login', {
				method: 'POST',
				body: JSON.stringify({
					username: e.target.email.value,
					password: e.target.password.value,
				}),
			})
		)
	}

	return (
		<Layout>
			<CustomForm onSubmit={onFormSubmit}>
				<div className="relative pt-2">
					<CustomInput type="email" id="email" name="email" placeholder="" />
					<CustomLabel htmlFor="email">Email</CustomLabel>
				</div>

				<div className="relative pt-2 mb-3">
					<CustomInput
						type="password"
						id="password"
						name="password"
						placeholder=""
					/>
					<CustomLabel htmlFor="password">Password</CustomLabel>
				</div>
				<Button text="Login" />
			</CustomForm>
		</Layout>
	)
}
