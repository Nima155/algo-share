import { NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import middleware from '../../middlewares/middleware'
import { NextIronRequest } from '../../utils/types'

const handler = nextConnect()
handler.use(middleware)

handler.post(async (req: NextIronRequest, res: NextApiResponse) => {
	req.session.destroy() // destroy saved cookie
	res.json({
		isLoggedIn: false,
	})
})
export default handler
