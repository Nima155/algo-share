function isValidImageFile(fileName: File): boolean {
	const fileExtension: string | undefined = fileName.type.split('/').pop()

	return ['jpeg', 'png'].includes(fileExtension || 'djaiosodijaoisdj')
}
export { isValidImageFile }
