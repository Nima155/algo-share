import mongoose, { Mongoose } from 'mongoose'
import { IComment } from '../utils/types'

const commentSchema = new mongoose.Schema({
	content: {
		type: String,
		required: true,
		maxlength: 500,
		minlength: 20,
	},
	parentId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment',
		default: null,
	},
	modifiedDate: Date,
	algorithmId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Algorithm',
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	replyCount: {
		type: Number,
		default: 0,
	},
})

commentSchema.set('toJSON', {
	transform: (doc, ret) => {
		ret.id = ret._id.toString()
		delete ret._id
		delete ret.__v
	},
})

var Comment =
	mongoose.models.Comment || mongoose.model<IComment>('Comment', commentSchema)

export default Comment
