import mongoose, { Document } from 'mongoose'
import * as EmailValidator from 'email-validator'

export interface IUser extends Document {
	username: string
	passwordHash: string
	verifiedStatus: boolean
	confirmationCode?: string
	profilePicture?: string
	algorithms: [string]
	favorites: [string]
}

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
	profilePicture: String,

	passwordHash: {
		type: String,
		required: true,
	},
	verifiedStatus: {
		type: Boolean,
		default: false,
		required: true,
	},
	confirmationCode: {
		type: String,
		unique: true,
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

var User = mongoose.models.User || mongoose.model<IUser>('User', userSchema)
export default User
