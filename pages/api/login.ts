// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import User, { IUser } from '../../models/user'
import { IMainSignForm, NextIronRequest } from '../../utils/types'
import bcrypt from 'bcrypt'
import nextConnect from 'next-connect'
import middleware from '../../middlewares/middleware'
import { NextApiResponse } from 'next'
// next-iron-session actually uses cookies
// check if session/cookie is present.. if so redirect else try to login !?

const handler = nextConnect()
handler.use(middleware)

handler.post(async (req: NextIronRequest, res: NextApiResponse) => {
	if (req.session.get('user')) {
		return res.status(400).json({ error: 'Already logged in!' })
	}

	const { username, password }: IMainSignForm = req.body

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
})
export default handler
