import mongoose from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import auth from '../../../../middlewares/auth'

import middleware from '../../../../middlewares/middleware'
import Comment from '../../../../models/comment'
import toValidComment from '../../../../utils/commentValidators'
import { NextIronRequest } from '../../../../utils/types'

const handler = nextConnect()
handler.use(middleware)

handler
	// .find({ algorithmId: req.query.id }).populate(
	// 	'author',
	// 	{ profilePicture: 1, username: 1 }
	// )
	.get(async (req: NextApiRequest, res: NextApiResponse) => {
		const { cursor, parentId, limit, id } = req.query
		// console.log(cursor, parentId, limit, id)

		const comments = await Comment.aggregate([
			{
				$match: {
					$and: [
						{
							algorithmId: new mongoose.Types.ObjectId(id.toString()),
						},

						{
							parentId: parentId
								? new mongoose.Types.ObjectId(parentId.toString())
								: null,
						},

						cursor !== '0'
							? {
									_id: { $gt: new mongoose.Types.ObjectId(cursor?.toString()) },
							  }
							: {},
					],
				},
			},
			{ $limit: +limit },
			{
				$graphLookup: {
					from: 'comments',
					startWith: '$parentId',
					connectFromField: 'parentId',
					connectToField: '_id',
					as: 'commentHierarchy',
				},
			},
		])

		return res.status(200).json({
			data: comments,
			...(comments.length
				? { nextCursor: comments[comments.length - 1]._id }
				: { nextCursor: cursor }),
		})
	}) // TODO: we need to have a notification system
	.post(auth, async (req: NextIronRequest, res: NextApiResponse) => {
		const { algorithmId, author, content, parentId } = toValidComment({
			...req.body,
			author: req.session.get('user').id,
		})
		const parentComment = parentId && (await Comment.findById(parentId))

		const newComment = new Comment({
			algorithmId,
			author,
			content,
			parentId,
		})

		const addedComment = await newComment.save()
		if (parentComment) {
			parentComment.replyCount++
			await parentComment.save()
		}

		return res.status(200).json(addedComment)
	})

export default handler
