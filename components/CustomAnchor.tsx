import styled from 'styled-components'

const CustomAnchor = styled.a`
	cursor: pointer;
	transition-property: background-color, border-color, color, fill, stroke;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	transition-duration: 150ms;
	&:hover {
		color: rgba(107, 114, 128);
	}
`

export default CustomAnchor
