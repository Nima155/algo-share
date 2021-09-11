import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose'

type RequestHandler = (req: NextApiRequest, res: NextApiResponse) => void

const connectDb =
	(handler: RequestHandler) =>
	async (req: NextApiRequest, res: NextApiResponse) => {
		if (mongoose.connections[0].readyState == 1) {
			return handler(req, res)
		}
		await mongoose.connect(process.env.MONGO_DB_URL || '')
		return handler(req, res)
	}
export default connectDb
