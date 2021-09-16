import React, { useState } from 'react'
import Layout from '../components/Layout'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs, faUser, faPlus } from '@fortawesome/free-solid-svg-icons'
import useUser from '../lib/useUser'
import { IFontAwesome } from '../utils/types'
import theme from '../theme'
import MyProfile from '../components/MyProfile'
import ComposeAlgorithm from '../components/ComposeAlgorithm'

const DashboardContainer = styled.div`
	margin-top: 45px;
	min-height: 90vh;
`

const CustomFontAwesomeIcon = styled(FontAwesomeIcon).attrs({
	size: '2x',
})<IFontAwesome>`
	color: ${(props) =>
		props.isActive ? theme.colors.secondaryBackground : 'black'};
	cursor: pointer;
`

const MENU_ITEMS = [faUser, faPlus, faCogs]

export default function Profile() {
	const [selected, setSelected] = useState<number>(0)
	const { user } = useUser()
	return (
		<Layout>
			<section className="p-2">
				<DashboardContainer className="bg-gray-100 relative rounded">
					<nav className="flex w-full justify-between border-b p-2">
						{MENU_ITEMS.map((e, i) => (
							<CustomFontAwesomeIcon
								icon={e}
								key={i}
								isActive={selected === i}
								onClick={() => setSelected(i)}
							/>
						))}
					</nav>
					{selected == 0 ? (
						<MyProfile />
					) : selected == 1 ? (
						<ComposeAlgorithm />
					) : (
						user?.id
					)}
				</DashboardContainer>
			</section>
		</Layout>
	)
}
