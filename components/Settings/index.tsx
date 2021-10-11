import React, { useState } from 'react'
import useUser from '../../lib/useUser'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faShieldAlt } from '@fortawesome/free-solid-svg-icons'
import PasswordChangeContainer from './PasswordChangeContainer'

const DropdownContainer = styled.div`
	width: clamp(10rem, 80vw, 21rem);
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
					<FontAwesomeIcon icon={faChevronDown} />
				</div>
				<PasswordChangeContainer isOpen={isOpen} />
			</DropdownContainer>
		</div>
	)
}
