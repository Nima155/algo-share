import mongoose from 'mongoose'
const algorithmSchema = new mongoose.Schema({
	algorithm: {
		type: String,
		required: true,
		minlength: 3,
	},

	description: String,

	language: {
		type: String,
		required: true,
	},

	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
})

algorithmSchema.set('toJSON', {
	transform: (doc, ret) => {
		ret.id = ret._id.toString()
		delete ret._id
		delete ret.__v
	},
})

export default mongoose.model('Algorithm', algorithmSchema)
