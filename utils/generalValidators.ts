import isISO8601 from 'validator/es/lib/isISO8601'
function isString(data: unknown): data is string {
	return typeof data === 'string' || data instanceof String
}

function isIsoDate(date: unknown) {
	if (!isString(date) || !isISO8601(date)) {
		throw new Error('Given date is not valid!')
	}
	return date
}

const generalValidators = { isString, isIsoDate }
export default generalValidators
