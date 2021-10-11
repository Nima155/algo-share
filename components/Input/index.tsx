import styled from 'styled-components'

const Input = styled.input.attrs({
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
		transform: translateY(-150%);
		font-size: 0.8rem;
	}
`
export default Input
