import { ApolloClient, InMemoryCache } from '@apollo/client'

const baseurl = "https://aboment.vercel.app/"

const CMSclient = new ApolloClient({
    uri: `${baseurl}/api/cms/`,
    cache: new InMemoryCache()
})

export default CMSclient