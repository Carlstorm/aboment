import typeDefs from '../../cms/db/Schemas'
import resolvers from '../../cms/db/resolvers'
// import typeDefs from '../../db/schema'
// import resolvers from '../../db/resolvers'
import connectDb from '../../cms/db/config'


import { ApolloServer } from "apollo-server-micro";
import Cors from "micro-cors";

connectDb();
const cors = Cors();

const apolloServer = new ApolloServer({ typeDefs, resolvers });

const startapolloServer = apolloServer.start();

export const config = {
  api: {
    bodyParser: false
  }
};

export default cors(async function cors(req, res) {  
    if (req.method === 'OPTIONS') {
      res.end();
      return false;
    }  
  
    await startapolloServer;
    await apolloServer.createHandler({ path: "/api/cms" })(req, res);
});