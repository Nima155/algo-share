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

export interface IComment {
	content: string
	parentId?: string
	modifiedDate?: string
	algorithmId: string
	author: string | { username: string; profilePicture?: string }
	replyCount: number
}
export interface IExpandedComment extends IComment {
	commentHierarchy: string[]
	_id: string
}

export interface IAlgorithm {
	code: string
	algorithm: string
	description?: string
	language: string
	author: { id: string; profilePicture?: string }
}
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>
