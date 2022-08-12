import Product from '../models/product'
import Catagory from '../models/catagory'

const catagoriesByParentPath = async (path) => {
  let regrex = new RegExp(`${path}`)
  let csatagory = await Catagory.find({path: regrex})
  if (csatagory != null) 
      return csatagory.map(c => c._id)
  
  return []
}

const catagoryBinding = async (catagoryPath) => {
  if (catagoryPath != null) {
    const csatagory = await Catagory.findOne({path: catagoryPath})
    if (csatagory != null) 
      return csatagory
  }
  return null
}

const ProductResolver = {
    Query: {
        products: async (_, { searchString, catagory, catagories, sortBy }) => {
            try {
                const searchParams = {}
                if (searchString) {
                  let regrex = new RegExp(`${searchString}`)
                  searchParams.title = regrex
                }

                if (catagory)
                  searchParams.catagory = catagory

                if (catagories)
                  searchParams.catagory = catagories

                // if (catagoryPath) {
                //   searchParams.catagory = await catagoriesByParentPath(catagoryPath)
                // }
                //   searchParams.

                // console.log(searchParams)

                let products = await Product.find({...searchParams}).sort(sortBy).limit(20);

                // console.log(products)
                return await products.map(async product => ({
                    ...product._doc,
                    catagory: catagoryBinding.bind(this, catagory),
                    variantCount: product.variants ? product.variants.length.toString() : 0,
                }))

            } catch (err) {
              console.log(err)
            }
          },
        product: async (_, { id }) => {
            let product = await Product.findById(id)
            product = {
              ...product._doc,
            }
            return product
        },
        products_by_catagory: async (_, { catagory, subcatagories }) => {
          let products = []
          if (catagory)
            products = await Product.find( {catagory: catagory} )
          return products

        }
    }
} 


export default ProductResolver