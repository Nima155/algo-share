import { ironSession } from 'next-iron-session'

export default ironSession({
	password: process.env.COOKIE_SECRET || 'piss',
	cookieName: 'motherOfAllCookies',
	cookieOptions: {
		secure: process.env.NODE_ENV === 'production',
	},
})
