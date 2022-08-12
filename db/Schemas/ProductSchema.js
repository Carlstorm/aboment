import { gql } from "apollo-server-micro"
const ProductSchema = gql`
    scalar JSON
    type Product {
        _id: ID
        title: String!
        price: String
        variants: [JSON]
        stock: String
        seo: Seo
        catagory: ProductCatagory
        descr: String
        specs: [Spec]
        thumbnail: String
        variantCount: String
    }

    type ProductCatagory {
        title: String
        path: String
        _id: ID
        filters: [JSON]
    }

    type Spec {
        title: String
        value: String
    }

    input SpecInput {
        title: String
        value: String
    }

    type Seo {
        title: String
        slug: String
        descr: String
    }

    input InputSeo {
        title: String
        slug: String
        descr: String
    }


    input ProductInput {
        title: String!
        price: String
        descr: String
        thumbnail: String
        catagory: ID
        specs: [SpecInput]
        seo: InputSeo
        variants: [JSON]
    }

    type Query {
        products_by_catagory(catagory: ID, subcatagories: Boolean): [Product]
        products(searchString: String, catagory: ID, catagories: [ID], sortBy: JSON): [Product]
        product(id: ID!): Product
    }

    type Mutation {
        update_product(id: ID!, input: ProductInput): Product
        create_product(input: ProductInput): Product
        delete_product(id: ID!): String
    }

`
  export default ProductSchema