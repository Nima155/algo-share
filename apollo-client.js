import { ApolloClient, InMemoryCache } from '@apollo/client'

const serverAddress = new HttpLink({
	uri: 'http://localhost:4000/graphql', // back end server address
})

const client = new ApolloClient({
	uri: serverAddress,
	cache: new InMemoryCache(),
})

export default client
