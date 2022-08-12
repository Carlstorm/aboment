import { ApolloClient, InMemoryCache } from '@apollo/client'

const baseurl = "http://localhost:3000/"

const CMSclient = new ApolloClient({
    uri: `${baseurl}/api/cms/`,
    cache: new InMemoryCache()
})

export default CMSclient