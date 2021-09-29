import { NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import middleware from '../../../middlewares/middleware'
import toValidAlgorithm from '../../../utils/algoValidators'
import { IAlgorithm, NextIronRequest } from '../../../utils/types'
import Algorithm from '../../../models/algorithm'
import User from '../../../models/user'
import auth from '../../../middlewares/auth'

const handler = nextConnect()
handler.use(middleware)

handler
	.post(auth, async (req: NextIronRequest, res: NextApiResponse) => {
		const {
			algorithm,
			language,
			description,
			code,
		}: Omit<IAlgorithm, 'author'> = toValidAlgorithm(req.body)

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
	})
	.get(async (req: NextIronRequest, res: NextApiResponse) => {
		const data = await Algorithm.find({}).select('id')
		return res.json({
			data,
		})
	})

export default handler
