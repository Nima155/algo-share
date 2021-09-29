import { NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import middleware from '../../../middlewares/middleware'
import Algorithm from '../../../models/algorithm'
import { NextIronRequest } from '../../../utils/types'
import mongoose from 'mongoose'
const handler = nextConnect()
handler.use(middleware)

handler.get(async (req: NextIronRequest, res: NextApiResponse) => {
	const { q, limit, language, cursor } = req.query
	// console.log('hi', await Algorithm.collection.getIndexes())

	const rses = await Algorithm.aggregate([
		{
			$search: {
				index: 'searchAlgorithm',
				compound: {
					should: [
						{
							autocomplete: {
								query: q,
								path: 'description',
								fuzzy: {
									maxEdits: 2,
									prefixLength: 1,
								},
								tokenOrder: 'sequential',
							},
						},
						{
							autocomplete: {
								query: q,
								path: 'algorithm',
								fuzzy: {
									maxEdits: 2,
									prefixLength: 1,
								},
								tokenOrder: 'sequential',
							},
						},
					],
				},
			},
		},
		...(cursor !== '0'
			? [
					{
						$match: {
							$and: [
								{
									_id: { $gt: new mongoose.Types.ObjectId(cursor?.toString()) },
								},
								{ language },
							],
						},
					},
			  ]
			: [
					{
						$match: {
							language,
						},
					},
			  ]),
		{ $limit: +limit },
		{ $sort: { id: 1 } },
	])

	return res.json({
		data: rses,
		...(rses.length && { nextCursor: rses[rses.length - 1]._id?.toString() }),
	})
})
export default handler
