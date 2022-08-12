import { gql } from "apollo-server-micro"
const CatagorySchema = gql`
    scalar JSON
    type Catagory {
        _id: ID
        title: String!
        path: String
        filters: [CatagoryFilter]
        thumbnail: String
        subcatagories: [Catagory]
        directsubcatagories: [Catagory]
    }

    type CatagoryFilter {
        title: String!
        display: Boolean
        type: String
    }

    input CatagoryInput {
        title: String!
        path: String!
        filters: [JSON]
        thumbnail: String
    }

    type Query {
        catagories: [Catagory]
        base_catagories: [Catagory]
        catagory_by_path(path: String!): Catagory
        catagory(id: ID!): Catagory
    }

    type Mutation {
        create_catagory(input: CatagoryInput): Catagory
        update_catagory(id: ID!, input: CatagoryInput): Catagory
        delete_catagory(id: ID!): String
    }
`

  export default CatagorySchema