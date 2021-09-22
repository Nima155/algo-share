import { NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import middleware from '../../../middlewares/middleware'
import toValidAlgorithm from '../../../utils/algoValidators'
import { IAlgorithm, NextIronRequest } from '../../../utils/types'
import Algorithm from '../../../models/algorithm'
import User from '../../../models/user'

const handler = nextConnect()
handler.use(middleware)

handler
	.post(async (req: NextIronRequest, res: NextApiResponse) => {
		if (!req.session.get('user')) {
			return res.status(401).json({
				error: 'This feature is only available to registered users',
			})
		}
		try {
			const { algorithm, language, description, code }: IAlgorithm =
				toValidAlgorithm(req.body)

			const newAlgorithm = new Algorithm({
				algorithm,
				language,
				description,
				code,
				author: req.session.get('user').id,
			})
			const addedAlgorithm = await newAlgorithm.save()
			const findAuthor = await User.findById(req.session.get('user').id)
			findAuthor.algorithms = findAuthor.algorithms.concat(addedAlgorithm.id)
			await findAuthor.save()
			return res.status(200).json(addedAlgorithm)
		} catch (err) {
			if (err instanceof Error) {
				return res.status(400).json({
					error: err.message,
				})
			}
		}
	})
	.get(async (req: NextIronRequest, res: NextApiResponse) => {
		const data = await Algorithm.find({}).select('id')
		return res.json({
			data,
		})
	})

export default handler
