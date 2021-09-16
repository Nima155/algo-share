// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nodemailer from 'nodemailer'
import User from '../../../models/user'
import { NextApiRequest, NextApiResponse } from 'next'
import toValidSignForm from '../../../utils/signValidators'
import bcrypt from 'bcrypt'
import nextConnect from 'next-connect'
import middleware from '../../../middlewares/middleware'
const jwtEncoder = require('jwt-encode')
// next-iron-session actually uses cookies
// check if session/cookie is present.. if so redirect else try to login !?

const transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: process.env.GMAIL_ADD,
		pass: process.env.GMAIL_PASS,
	},
})

async function sendMail(recipient: string, recipientSecret: string) {
	await transporter.sendMail({
		from: process.env.GMAIL_ADD,
		to: recipient,
		subject: 'AlgoShare Verification',
		html: `<p>Verify your email by clicking on this <a href="http://localhost:3000/login/${recipientSecret}">link</a></p><p>The link will only be valid for 7 days</p>`,
	})
}

const handler = nextConnect()
handler.use(middleware)

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { username, password } = toValidSignForm(req.body)

		const userIsPresent = await User.findOne({
			username,
		})

		if (userIsPresent) {
			throw new Error('This username is already taken')
		}

		const hashedPassword = await bcrypt.hash(password, 10)

		const signedEmail = jwtEncoder(username, process.env.JWT_SECRET)

		const newUser = new User({
			username,
			passwordHash: hashedPassword,
			confirmationCode: signedEmail,
		})

		await newUser.save()

		await sendMail(username, signedEmail)

		return res.status(200).end()
	} catch (err) {
		if (err instanceof Error) {
			return res.status(400).json({ error: err.message })
		}
	}
})
export default handler
