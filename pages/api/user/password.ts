import { NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import middleware from '../../../middlewares/middleware'
import { NextIronRequest } from '../../../utils/types'
import bcrypt from 'bcrypt'
import User from '../../../models/user'
import toValidPasswordChangeObject from '../../../utils/changePassValidators'

const handler = nextConnect()
handler.use(middleware)
// TODO: add forget password feature
handler.put(async (req: NextIronRequest, res: NextApiResponse) => {
	if (!req.session.get('user')) {
		return res.status(401).json({ error: 'You must be logged in!!' })
	}

	const { oldPassword, newPassword } = toValidPasswordChangeObject(req.body)

	const user = await User.findById(req.session.get('user').id)

	if (!(await bcrypt.compare(oldPassword, user.passwordHash))) {
		return res.status(409).json({ error: 'Wrong old password' })
	}
	const hashedNew = await bcrypt.hash(newPassword, 10)
	user.passwordHash = hashedNew
	await user.save()
	res.status(204).end()
})

export default handler
