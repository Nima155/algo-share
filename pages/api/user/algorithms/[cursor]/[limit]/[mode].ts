import { NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import middleware from '../../../../../../middlewares/middleware'
import Algorithm from '../../../../../../models/algorithm'
import User from '../../../../../../models/user'
import { NextIronRequest } from '../../../../../../utils/types'

const handler = nextConnect()
handler.use(middleware)

handler.get(async (req: NextIronRequest, res: NextApiResponse) => {
	if (!req.session.get('user')) {
		return res.status(401).json({
			error: 'only authorized users can make this request',
		})
	}

	try {
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
		// console.log(data)

		return res.status(200).json({
			data: data[dataString],
			nextCursor: +cursor + data[dataString].length,
		})
	} catch (error) {
		return res.status(400).json({
			error: 'something bad happened',
		})
	}

	// some id.. them limit ?!
})

export default handler
