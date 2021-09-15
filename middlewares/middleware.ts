import nextConnect from 'next-connect'
import connectDb from './mongodb'
import session from './session'

const middleware = nextConnect()
middleware.use(connectDb).use(session)

export default middleware
