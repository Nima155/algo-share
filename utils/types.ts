export interface IMainSignForm {
	username: string
	password: string
}
// export type ISimpleUser = Pick<IUser, 'id'>
export interface IUserSession {
	isLoggedIn: boolean
	id?: string
}
