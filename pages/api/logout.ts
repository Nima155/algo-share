import withSession from '../../lib/session'

export default withSession(async (req, res) => {
	req.session.destroy() // destroy saved cookie
	res.json({
		isLoggedIn: false,
	})
})
