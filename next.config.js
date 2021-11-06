/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer({
	reactStrictMode: true,

	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		})

		return config
	},
	env: {
		ANALYZE: 'true',
		COOKIE_SECRET: '6eZXee7BDnP9wr60nVt4fY5w4RFZg6kR',
		MONGO_DB_URL:
			'mongodb+srv://Nima155:bqeHrKTJ5BStIcPA@cluster0.bajga.mongodb.net/algo_share?retryWrites=true&w=majority',
		GMAIL_ADD: 'nimashadab155@gmail.com',
		GMAIL_PASS:
			"oijfojiaojfioji39042034#$$)(@)#(@UHUFSDHUASODAODNzxbjh;'gjrlspewrpj",
		JWT_SECRET: "mfk[*$^'AkjC_9yU3TQ{]@u&br&+G,}a",
		CLOUDINARY_URL:
			'cloudinary://928422177339158:zhlLAfZ7vzzVLT7kcYD3NBjmncU@nima155',
		CLOUDINARY_API_KEY: '928422177339158',
		CLOUDINARY_API_SECRET: 'zhlLAfZ7vzzVLT7kcYD3NBjmncU',
		CLOUDINARY_CLOUD_NAME: 'nima155',
	},
	images: {
		domains: ['res.cloudinary.com'],
	},
})
