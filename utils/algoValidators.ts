import generalValidators from './generalValidators'
import consts from './constants'
import { IAlgorithm } from './types'
const { VALID_LANGUAGES } = consts
const { isString } = generalValidators
interface IFields {
	language: unknown
	algorithm: unknown
	description?: unknown
}

function isValidLanguage(lang: unknown): string {
	if (!isString(lang) || !VALID_LANGUAGES.includes(lang)) {
		throw new Error('Invalid language')
	}
	return lang
}
function isValidAlgorithm(algoName: unknown) {
	if (!isString(algoName) || algoName.length < 3) {
		throw new Error('Invalid algorithm name')
	}

	return algoName
}

function toValidAlgorithm({
	language,
	algorithm,
	description,
}: IFields): IAlgorithm {
	return {
		algorithm: isValidAlgorithm(algorithm),
		language: isValidLanguage(language),
		...(isString(description) && { description }),
	}
}
export default toValidAlgorithm
