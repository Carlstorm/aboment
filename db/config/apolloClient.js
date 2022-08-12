
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const baseurl = "http://localhost:3000/"

const client = new ApolloClient({
    uri: `${baseurl}/api/graphql/`,
    cache: new InMemoryCache()
})

export default client