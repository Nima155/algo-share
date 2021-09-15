import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import middleware from '../../../middlewares/middleware'
import User from '../../../models/user'

const handler = nextConnect()
handler.use(middleware)

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
	const { verifId } = req.query
	try {
		let current_user = await User.findOne({
			confirmationCode: verifId,
		})

		if (!current_user) {
			throw new Error('Invalid token')
		}

		current_user.verifiedStatus = true

		await current_user.save()
		return res.status(200)
	} catch (err) {
		if (err instanceof Error) {
			return res.status(400).json({
				error: err.message,
			})
		}
	}
})
