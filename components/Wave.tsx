import React from 'react'
import styled from 'styled-components'
import theme from '../theme'
const WaveDiv = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	overflow: hidden;
	line-height: 0;
	transform: rotate(180deg);

	& svg {
		position: relative;
		display: block;
		width: calc(197% + 1.3px);
		height: 373px;
	}
	& .shape-fill {
		fill: ${theme.colors.quarternaryBackground};
	}
	@media ${theme.additionalBreakpoints.tablet} {
		& svg {
			width: calc(189% + 1.3px);
			height: 500px;
		}
	}
`

export default function Wave() {
	return (
		<WaveDiv>
			<svg
				data-name="Layer 1"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 1200 120"
				preserveAspectRatio="none"
			>
				<path
					d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
					className="shape-fill"
				></path>
			</svg>
		</WaveDiv>
	)
}
