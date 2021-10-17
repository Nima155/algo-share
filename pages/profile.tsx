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
import GeneralContainer from '../components/GeneralContainer'
import Settings from '../components/Settings'

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
	const { user } = useUser({
		redirectTo: '/',
	})

	return (
		<Layout>
			<GeneralContainer className="bg-gray-100 relative rounded m-2">
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
					<Settings />
				)}
			</GeneralContainer>
		</Layout>
	)
}
