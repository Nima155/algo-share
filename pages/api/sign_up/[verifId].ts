import { NextApiRequest, NextApiResponse } from 'next'
import connectDb from '../../../middlewares/mongodb'
import User from '../../../models/user'
export default connectDb(async function verificationHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'PATCH') {
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
			return res.status(400).json({
				error: err.message,
			})
		}
	}
	return res.status(500).json({
		error: 'Error of unknown origin!',
	})
})
