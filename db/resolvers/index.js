import CatagoryResolver from "./CatagoryResolver"
import ProductResolver from "./ProductResolver"

const resolvers = {
    Query: {
        ...CatagoryResolver.Query,
        ...ProductResolver.Query,
    },
    Mutation: {
        ...CatagoryResolver.Mutation,
        ...ProductResolver.Mutation,
    
    }
}

module.exports = resolvers