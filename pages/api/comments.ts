import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import auth from '../../middlewares/auth'

import middleware from '../../middlewares/middleware'
import Comment from '../../models/comment'
import toValidComment from '../../utils/commentValidators'
import { NextIronRequest } from '../../utils/types'

const handler = nextConnect()
handler.use(middleware)

handler
	.get(async (req: NextApiRequest, res: NextApiResponse) => {
		const comments = await Comment.find({})

		res.json(comments)
	}) // TODO: we need to have a notification system
	.post(auth, async (req: NextIronRequest, res: NextApiResponse) => {
		const { algorithmId, authorId, content, parentId } = toValidComment({
			...req.body,
			authorId: req.session.get('user').id,
		})

		const newComment = new Comment({
			algorithmId,
			authorId,
			content,
			parentId,
		})
		const addedComment = await newComment.save()

		return res.status(200).json(addedComment)
	})

export default handler
