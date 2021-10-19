import { NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import auth from '../../../middlewares/auth'
import middleware from '../../../middlewares/middleware'
import Algorithm from '../../../models/algorithm'
import User from '../../../models/user'
import { NextIronRequest } from '../../../utils/types'

const handler = nextConnect()
handler.use(middleware).use(auth)

handler.get(async (req: NextIronRequest, res: NextApiResponse) => {
	let { cursor, limit, mode } = req.query

	const dataString = Array.isArray(mode) ? '' : mode

	const data = await User.findById(req.session.get('user').id)
		.populate({
			path: mode,
			model: Algorithm,
			populate: {
				path: 'author',
				model: User,
				select: 'profilePicture',
			},
		})
		.select({
			[dataString]: { $slice: [+cursor, +limit] },
		})

	return res.status(200).json({
		data: data[dataString],
		nextCursor: +cursor + data[dataString].length,
	})

	// some id.. them limit ?!
})

export default handler
