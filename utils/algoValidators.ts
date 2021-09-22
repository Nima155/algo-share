import generalValidators from './generalValidators'
import consts from './constants'
import { IAlgorithm } from './types'
const { VALID_LANGUAGES } = consts
const { isString } = generalValidators
interface IFields {
	language: unknown
	algorithm: unknown
	description?: unknown
	code: unknown
}

function isValidLanguage(lang: unknown): string {
	if (!isString(lang) || !VALID_LANGUAGES.map((e) => e[0]).includes(lang)) {
		throw new Error('Invalid language')
	}
	return lang
}
function isValidAlgorithm(algoName: unknown): string {
	if (!isString(algoName) || algoName.length < 3) {
		throw new Error('Invalid algorithm name')
	}

	return algoName
}
function isValidCode(code: unknown): string {
	if (!isString(code) || code.trim().length < 20) {
		throw new Error('Invalid code format')
	}
	return code
}
function toValidAlgorithm({
	language,
	algorithm,
	description,
	code,
}: IFields): IAlgorithm {
	return {
		algorithm: isValidAlgorithm(algorithm),
		language: isValidLanguage(language),
		...(isString(description) && { description }),
		code: isValidCode(code),
	}
}
export default toValidAlgorithm
