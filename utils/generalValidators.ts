function isString(data: unknown): data is string {
	return typeof data === 'string' || data instanceof String
}
const generalValidators = { isString }
export default generalValidators
