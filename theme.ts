const colors = {
	primaryBackground: '#80EEB0',
	secondaryBackground: '#28ABA7',
	tertiaryBackground: '#3a4b40',
	quarternaryBackground: '#002c2b',
	textPrimary: '#2F4858',
	textSecondary: '#FF8000',
	textTertiary: '#990000',
}
const sizes = {
	tablet: 640,
}
const additionalBreakpoints = {
	tablet: `(min-width: ${sizes.tablet}px)`,
}
const theme = {
	colors,
	additionalBreakpoints,
}
export default theme
