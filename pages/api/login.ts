// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import withSession from '../../lib/session'
import connectDb from '../../middlewares/mongodb'
import User, { IUser } from '../../models/user'
import { IMainSignForm } from '../../utils/types'
import bcrypt from 'bcrypt'
// next-iron-session actually uses cookies
// check if session/cookie is present.. if so redirect else try to login !?

export default connectDb(
	withSession(async (req, res) => {
		const { username, password }: IMainSignForm = req.body

		if (req.method === 'POST') {
			const pulledUser: IUser = await User.findOne({
				username,
			})

			let matched = pulledUser
				? await bcrypt.compare(password, pulledUser.passwordHash)
				: false

			if (!(pulledUser && matched)) {
				return res.status(401).json({
					error: 'Wrong username or password',
				})
			}

			req.session.set('user', {
				id: pulledUser.id,
			})

			await req.session.save()
			return res.status(200).json({
				isLoggedIn: true,
				id: pulledUser.id,
			})
		}
		return res.status(400).json({ error: 'Invalid operation' })
	})
)
