import CatagoryResolver from "./CatagoryResolver"
import ProductResolver from "./ProductResolver"
import InventoryResolver from "./InventoryResolver"
import AbonnementResolver from "./AbonnementResolver"

const resolvers = {
    Query: {
        ...AbonnementResolver.Query,
        ...CatagoryResolver.Query,
        ...ProductResolver.Query,
        ...InventoryResolver.Query
    },
    Mutation: {
        ...AbonnementResolver.Mutation,
        ...CatagoryResolver.Mutation,
        ...ProductResolver.Mutation,
        ...InventoryResolver.Mutation
    
    }
}

module.exports = resolvers