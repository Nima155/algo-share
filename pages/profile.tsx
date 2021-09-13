import React from 'react'
import Layout from '../components/Layout'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs, faUser, faPlus } from '@fortawesome/free-solid-svg-icons'
const DashboardContainer = styled.div`
	margin-top: 45px;
	min-height: 90vh;
`

export default function Profile() {
	return (
		<Layout>
			<section className="p-2">
				<DashboardContainer className="bg-gray-100 relative rounded">
					<nav className="flex w-full justify-between border-b p-2">
						<FontAwesomeIcon icon={faUser} size="2x" />

						<FontAwesomeIcon icon={faPlus} size="2x" />

						<FontAwesomeIcon icon={faCogs} size="2x" />
					</nav>
				</DashboardContainer>
			</section>
		</Layout>
	)
}
