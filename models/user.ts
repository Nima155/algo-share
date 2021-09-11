import mongoose from 'mongoose'
import * as EmailValidator from 'email-validator'

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true,
		lowercase: true,
		validate: {
			validator: EmailValidator.validate,
			message: ({ value }: { value: string }) =>
				`${value} is not a valid email address`,
		},
	},
	passwordHash: {
		required: true,
	},
	algorithms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Algorithm' }],
	favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Algorithm' }],
})

userSchema.set('toJSON', {
	transform: (doc, ret) => {
		ret.id = ret._id.toString()
		delete ret._id
		delete ret.__v
	},
})

export default mongoose.model('User', userSchema)
