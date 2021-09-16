import { NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import middleware from '../../middlewares/middleware'
import toValidAlgorithm from '../../utils/algoValidators'
import { IAlgorithm, NextIronRequest } from '../../utils/types'
import Algorithm from '../../models/algorithm'
const handler = nextConnect()
handler.use(middleware)

handler.post(async (req: NextIronRequest, res: NextApiResponse) => {
	if (!req.session.get('user')) {
		return res.status(401).json({
			error: 'This feature is only available to registered users',
		})
	}
	try {
		const { algorithm, language, description }: IAlgorithm = toValidAlgorithm(
			req.body
		)

		const newAlgorithm = new Algorithm({
			algorithm,
			language,
			description,
			author: req.session.get('user').id,
		})

		await newAlgorithm.save()
	} catch (err) {
		if (err instanceof Error) {
			return res.status(400).json({
				error: err.message,
			})
		}
	}
})

export default handler
