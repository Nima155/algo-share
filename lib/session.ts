import { NextApiRequest, NextApiResponse } from 'next'
import { Session, withIronSession } from 'next-iron-session'
type NextIronRequest = NextApiRequest & { session: Session }

function withSession(
	handler: (req: NextIronRequest, res: NextApiResponse) => Promise<void> | void
) {
	return withIronSession(handler, {
		password: process.env.COOKIE_SECRET,
		cookieName: 'motherOfAllCookies',
		cookieOptions: {
			secure: process.env.NODE_ENV === 'production',
		},
	})
}
export default withSession
