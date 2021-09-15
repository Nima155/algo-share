import { NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import middleware from '../../middlewares/middleware'
import { NextIronRequest } from '../../utils/types'
import formidable from 'formidable-serverless'
import path from 'path'
import User, { IUser } from '../../models/user'
import { isValidImageFile } from '../../utils/helpers'
import { readFileSync, writeFile } from 'fs'
import { v2 as cloudinary } from 'cloudinary'
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	secure: true,
})
const handler = nextConnect()
handler.use(middleware)

handler
	.get<NextIronRequest, NextApiResponse>(async (req, res) => {
		const user = req.session.get('user')

		if (user) {
			// in a real world application you might read the user id from the session and then do a database request
			// to get more information on the user if needed
			const userInfo: IUser = await User.findOne({
				id: user.id,
			})
			res.json({
				isLoggedIn: true,
				profilePicture: userInfo.profilePicture,
				username: userInfo.username,
				id: userInfo.id,
			})
		} else {
			res.json({
				isLoggedIn: false,
			})
		}
	})
	.patch<NextIronRequest, NextApiResponse>(async (req, res) => {
		const sess = req.session.get('user')
		if (!sess) {
			return res.status(401).json({
				error: 'You must be logged in!',
			})
		}

		const form = new formidable.IncomingForm()

		const tempUploadFolder = path.join(process.cwd(), 'tmp')

		form.maxFileSize = 1024 * 1024 // maximum filesize of 1mb

		form.parse(req, async (err: any, fields: any, files: any) => {
			// console.log(files.profilePicture)

			let profilePicture
			const file = files.profilePicture
			const isValid = isValidImageFile(file) // has valid extension

			const newFileName = encodeURIComponent(file.name.replace(/\s/g, '-'))

			const readFile = readFileSync(file.path)
			const newPath = path.join(tempUploadFolder, newFileName)
			writeFile(newPath, readFile, async (err) => {
				const image = await cloudinary.uploader.upload(newPath, {
					transformation: {
						width: 128,
						height: 128,
						crop: 'fill',
						radius: 'max',
					},
				})
				profilePicture = image.secure_url

				const cur_user = await User.findOne({
					id: sess.id,
				})
				cur_user.profilePicture = profilePicture

				await cur_user.save()
				return res.status(200).json({
					...sess,
					profilePicture,
					isLoggedIn: true,
				})
			})

			if (!isValid) {
				return res.status(400).json({
					error: 'Invalid file format',
				})
			}
		})
	})

export const config = {
	api: {
		bodyParser: false,
	},
}

export default handler
