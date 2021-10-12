import { IMainSignForm } from './types'
import isEmailOrNah from 'validator/lib/isEmail'
import normalizeEmail from 'validator/lib/normalizeEmail'
import generalValidators from './generalValidators'

const { isString } = generalValidators
interface ISignForm {
	username: unknown
	password: unknown
}

function isEmail(em: unknown): string {
	if (!isString(em) || !isEmailOrNah(em)) {
		throw new Error('Invalid email!')
	}

	return normalizeEmail(em) || ''
}

export function isPassword(pass: unknown): string {
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

export default toValidSignForm
