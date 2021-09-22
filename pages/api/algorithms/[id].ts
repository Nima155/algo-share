import middleware from '../../../middlewares/middleware'
import nextConnect from 'next-connect'
import { NextIronRequest } from '../../../utils/types'
import { NextApiResponse } from 'next'
import Algorithm from '../../../models/algorithm'

const handler = nextConnect()
handler.use(middleware)

handler.get(async (req: NextIronRequest, res: NextApiResponse) => {
	const { id } = req.query

	// console.log(id, 'iiiiiiiddddddddddd')
	const algo = await Algorithm.findById(id)
	console.log(algo)

	if (!algo) {
		return res.status(404).json({
			error: 'Not found',
		})
	}
	return res.json(algo)
})
export default handler
