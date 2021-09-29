import { NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import auth from '../../../../middlewares/auth'
import middleware from '../../../../middlewares/middleware'
import User from '../../../../models/user'
import { NextIronRequest } from '../../../../utils/types'

const handler = nextConnect()
handler.use(middleware).use(auth)

handler
	.patch(async (req: NextIronRequest, res: NextApiResponse) => {
		const user = await User.findById(req.session.get('user').id)
		const found = user.favorites.find((e: any) => e.toString() === req.query.id)
		if (found) {
			user.favorites = user.favorites.filter(
				(e: any) => e.toString() !== req.query.id
			)
		} else {
			user.favorites = user.favorites.concat(req.query.id)
		}
		await user.save()
		return res.status(200).json({
			data: !found ? req.query.id : null,
		})
	})
	.get(async (req: NextIronRequest, res: NextApiResponse) => {
		const { id } = req.query

		const user = await User.findById(req.session.get('user').id)
		const favoritedItem = user.favorites.find((e: any) => e.toString() === id)

		if (!favoritedItem) {
			return res.json({
				data: null,
			})
		}
		return res.json({
			data: favoritedItem,
		})
	})
export default handler
