import middleware from '../../../../middlewares/middleware'
import nextConnect from 'next-connect'
import { NextIronRequest } from '../../../../utils/types'
import { NextApiResponse } from 'next'
import Algorithm from '../../../../models/algorithm'
import User from '../../../../models/user'

const handler = nextConnect()
handler.use(middleware)

handler.get(async (req: NextIronRequest, res: NextApiResponse) => {
	const { id } = req.query
	console.log(id)

	// console.log(id, 'iiiiiiiddddddddddd')
	const algo = await Algorithm.findById(id).populate({
		path: 'author',
		model: User,
		select: 'profilePicture',
	})
	// console.log(algo)

	if (!algo) {
		return res.status(404).json({
			error: 'Not found',
		})
	}
	return res.json(algo)
})
export default handler
