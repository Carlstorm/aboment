import { gql } from "apollo-server-micro"

const typeDefs = gql`
  scalar JSON

  # Products
  type Product {
    _id: ID
    title: String!
    price: Float
    rating: Float
    catagory: Catagory
    slug: String
    variants: [Variant]
    variantDisplay: VariantDisplay
    path: String
    productDetails: ProductDetails
    tags: [String]
    searchParams: [String]
  }


  type ProductDetails {
    _id: ID
    brand: String
    desc: String
    specs: JSON
  }

  type VariantDisplay {
    img: String
    color: String
    size: String
  }

  type Variant {
    variantDetails: VariantDetails
    color: String
    size: String
  }

  type VariantDetails {
    img: String
  }

  type Catagory {
    _id: ID
    title: String!
    path: String
    filters: [CatagoryFilter]
    thumbnail: String
  }

  type CatagoryFilter {
    field: String!
    display: Boolean
  }

  input CatagoryInput {
    title: String!
    path: String!
    filters: [JSON]
    thumbnail: String
  }

  input ProductInput {
    title: String!
    price: Float
    rating: Float
    catagory: ID
    slug: String
    img: String
    searchParams: [String]
  }


  type Query {
    productsByCatagory(catagory: [String]): [Product]
    products(catagoryParams: [String]): [Product]
    product(id: ID, catagoryParams: [String], productSlug: String): Product
    catagories: [Catagory]
    variantDetails: [VariantDetails]
    subcatagories(catagoryParams: [String]): [Catagory]
  }

  type Mutation {
    #Catagories

    #Products
    newProduct(input: ProductInput): Product
    newCatagory(input: CatagoryInput): Catagory
    updateCatagory(id: ID!, input: CatagoryInput): Catagory
    deleteCatagory(id: ID!): String
    updateProduct(id: ID!, input: ProductInput): Product
    deleteProduct(id: ID!): ID
  }
`

module.exports = typeDefs