module.exports = {
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily: {
				fancy: ['Caveat'],
				'fancy-rest': ['Comfortaa'],
			},
			rotate: {
				'-30': '-30deg',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
