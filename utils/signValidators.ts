import { IMainSignForm } from './types'
import * as EmailValidator from 'email-validator'

function isString(data: unknown): data is string {
	return typeof data === 'string' || data instanceof String
}

interface ISignForm {
	username: unknown
	password: unknown
}

function isEmail(em: unknown): string {
	if (!isString(em) || !EmailValidator.validate(em)) {
		throw new Error('Invalid email!')
	}

	return em
}

function isPassword(pass: unknown): string {
	if (!isString(pass) || pass.length < 8) {
		throw new Error('Password must be at least 8 characters long')
	}
	return pass
}

function toValidSignForm({ username, password }: ISignForm): IMainSignForm {
	return {
		username: isEmail(username),
		password: isPassword(password),
	}
}

export { toValidSignForm }
