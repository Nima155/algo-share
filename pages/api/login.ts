// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import withSession from '../../lib/session'
// next-iron-session actually uses cookies
// check if session/cookie is present.. if so redirect else try to login !?

export default withSession(async (req, res) => {
	const { username, password } = req.body

	res.json({
		isLoggedIn: true,
	})
})
