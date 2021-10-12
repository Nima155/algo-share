import { isPassword } from './signValidators'

interface IPasswordFields {
	oldPassword: unknown
	newPassword: unknown
}

export default function toValidPasswordChangeObject({
	oldPassword,
	newPassword,
}: IPasswordFields): {
	oldPassword: string
	newPassword: string
} {
	return {
		oldPassword: isPassword(oldPassword),
		newPassword: isPassword(newPassword),
	}
}
