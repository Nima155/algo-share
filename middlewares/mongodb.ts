import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose'

type RequestHandler = () => void

export default async function connectDb(
	req: NextApiRequest,
	res: NextApiResponse,
	next: RequestHandler
) {
	if (mongoose.connections[0].readyState == 1) {
		return next()
	}

	await mongoose.connect(process.env.MONGO_DB_URL || '', { autoIndex: false })
	return next()
}
