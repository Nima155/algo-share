import { NextApiResponse } from 'next'
import { Middleware } from 'next-connect'
import { NextIronRequest } from '../utils/types'

export default function auth(
	req: NextIronRequest,
	res: NextApiResponse,
	next: any
) {
	if (!req.session.get('user')) {
		return res.status(401).json({
			error: 'Unauthorized, you must first login!',
		})
	}
	next()
}
