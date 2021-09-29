import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import connectDb from './mongodb'
import session from './session'

const middleware = nextConnect<NextApiRequest, NextApiResponse>({
	onError(error, req, res) {
		return res.status(500).json({
			error: error.message,
		})
	},
})
middleware.use(connectDb).use(session)

export default middleware
