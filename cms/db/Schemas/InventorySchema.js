import { gql } from "apollo-server-micro"
const InventorySchema = gql`
    scalar JSON
    type Inventory {
        _id: ID
        stock: String!
    }

    type ProductInventory {
        catagory: String
        title: String
        inventory: Inventory
    }

    # input InventoryInput {
    #     value: String
    # }

    type Query {
        inventories(searchString: String, catagory: ID, sortBy: JSON): [ProductInventory]
    }

    type Mutation {
        update_inventory(id: ID!, value: String!): Inventory
    }
`
  export default InventorySchema