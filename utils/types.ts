import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { NextApiRequest } from 'next'
import { Session } from 'next-iron-session'

export interface IMainSignForm {
	username: string
	password: string
}
// export type ISimpleUser = Pick<IUser, 'id'>
export interface IUserSession {
	isLoggedIn: boolean
	id?: string
	username?: string
	profilePicture?: string
}
export interface IFontAwesome extends FontAwesomeIconProps {
	isActive: boolean
}
export type NextIronRequest = NextApiRequest & { session: Session }
