import React, { useState } from 'react'
import useUser from '../../lib/useUser'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons'
import PasswordChangeContainer from './PasswordChangeContainer'

const DropdownContainer = styled.div`
	width: clamp(10rem, 80vw, 21rem);
`
const PlusIcon = styled.span<{ isActive: boolean }>`
	position: relative;
	&:after,
	&:before {
		top: 50%;
		transition: all 200ms ease-in;
		position: absolute;
		right: 1px;
		width: 10px;
		height: 2px;
		background-color: black;
		content: '';
	}
	&:after {
		${(props) => (!props.isActive ? 'transform: rotate(-90deg);' : '')};
	}
`
export default function Settings() {
	const { user } = useUser({
		redirectTo: '/',
	})
	const [isOpen, setIsOpen] = useState(false)
	return (
		<div className="flex flex-col items-center mt-4">
			<DropdownContainer className="shadow-md rounded-md">
				<div
					className="p-2 flex justify-between rounded-t-md"
					onClick={() => setIsOpen((v) => !v)}
					style={{ backgroundColor: '#e5e7eb' }}
				>
					<FontAwesomeIcon icon={faShieldAlt} />
					<PlusIcon isActive={isOpen} className={isOpen ? 'active' : ''} />
				</div>
				<PasswordChangeContainer isOpen={isOpen} />
			</DropdownContainer>
		</div>
	)
}
