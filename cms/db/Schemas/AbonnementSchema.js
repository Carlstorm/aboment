import { gql } from "apollo-server-micro"
const AbonnementSchema = gql`
    scalar DateTime

    type Abonnement {
        _id: ID
        name: String!
        startDate: DateTime!
        endDate: DateTime!
    }
 
    input AbonnementInput {
        name: String!
        startDate: DateTime!
        endDate: DateTime!
    }

    type Query {
        abonnements(searchString: String, sortBy: JSON, active: Boolean, inactive: Boolean): [Abonnement]
    }

    type Mutation {
        create_abonnement(input: AbonnementInput): Abonnement
        delete_abonnement: Abonnement
    }
`

  export default AbonnementSchema