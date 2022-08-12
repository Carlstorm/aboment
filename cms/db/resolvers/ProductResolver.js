import Product from '../models/product'
import ProductWithIndex from '../models/ProductWithIndex'
import Catagory from '../models/catagory'
import Inventory from '../models/inventory'
import mongoose from 'mongoose'


const catagoryBinding = async (catagoryId) => {
  if (catagoryId != null) {
    const csatagory = await Catagory.findById(catagoryId)
    if (csatagory != null) 
      return csatagory
  }
  return null
}

const ProductResolver = {
    Query: {
        products: async (_, { searchString, catagory, sortBy }) => {
            try {
                const searchParams = {}
                if (searchString) {
                  let regrex = new RegExp(`${searchString}`)
                  searchParams.title = regrex
                }

                if (catagory)
                  searchParams.catagory = catagory

                let products = await Product.find({...searchParams}).sort(sortBy).limit(20);
                return await products.map(async product => ({
                    ...product._doc,
                    catagory: catagoryBinding.bind(this, product._doc.catagory),
                    variantCount: product.variants ? product.variants.length.toString() : 0
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
        get_test_data: async () => {
          // let products = await Product.find().select({title: 1, price: 1}).limit(1000).lean();
          // let products = await Product.find().select({title: 1}).populate("catagory").select({title: 1}).lean()
          console.time('query_default')
          await Product.find({price: {$gt: 22}})
          console.timeEnd('query_default')

          console.time('query_index')
          await ProductWithIndex.find({price: {$gt: 22}})
          console.timeEnd('query_index')

          console.time('query_select')
          await Product.find({price: {$gt: 22}}).select({price: 1})
          console.timeEnd('query_select')

          console.time('query_index_select')
          await ProductWithIndex.find({price: {$gt: 22}}).select({price: 1})
          console.timeEnd('query_index_select')

          console.time('query_lean')
          await Product.find({price: {$gt: 22}}).lean()
          console.timeEnd('query_lean')

          console.time('query_index_lean')
          await ProductWithIndex.find({price: {$gt: 22}}).lean()
          console.timeEnd('query_index_lean')

          console.time('query_select_lean')
          await Product.find({price: {$gt: 22}}).select({price: 1}).lean()
          console.timeEnd('query_select_lean')

          console.time('query_index_select_lean')
          await ProductWithIndex.find({price: {$gt: 22}}).select({price: 1}).lean()
          console.timeEnd('query_index_select_lean')
          
          return await Product.find({price: {$gt: 22}}).select({price: 1}).lean();
          // return products.map(async product => ({
          //   ...product._doc,
          // }))
        },
        get_test_data_fnd: async () => {
          return await Product.find({price: {$gt: 22}});
        }
    },
    Mutation: {
      create_product: async (_, { input }) => {
        let variantsWithStock = input.variants.map(variant => {
          let variantStockId = mongoose.Types.ObjectId()
          let variantId = mongoose.Types.ObjectId()
          return {
            ...variant,
            stock: variantStockId,
            _id: variantId
          }
        })

        let stockId = mongoose.Types.ObjectId()
        let UpdatedInput = {
          ...input,
          stock: stockId,
          variants: variantsWithStock
        }

        await variantsWithStock.forEach(async variant => {
          await new Inventory({
            stock: 0, 
            _id: variant.stock,
            parent: stockId,
            location: null
          }).save()
        });

        let isParent = UpdatedInput.variants.length > 0 ? true: null
        await new Inventory({
          stock: 0, 
          _id:stockId,
          parent: isParent,
          location: null
        }).save()
        await new Product(UpdatedInput).save()
      },
      update_product: async (_, { id, input }) => {
        let productToUpdate = await Product.findById(id)
        let inputIDs = input.variants.map(variant => variant._id)
        let variantsToDelete = productToUpdate.variants.filter(variant => !inputIDs.includes(variant._id))
        variantsToDelete.forEach(async variant => {
          await Inventory.findOneAndDelete({ _id: variant.stock })
        })

        let variantsWithStock = input.variants.map(variant => {
          if ("stock" in variant)
            return variant

          let variantStockId = mongoose.Types.ObjectId()
          return {
            ...variant,
            stock: variantStockId,
            new: true
          }
        })

        await variantsWithStock.forEach(async variant => {
          console.log(variant.stock)
          if ("new" in variant)
            await new Inventory({
              stock: 0, 
              _id: variant.stock,
              parent: productToUpdate.stock,
              location: null
            }).save()
        })

        const cleanVariants = variantsWithStock.map(variant => {
          if ("new" in variant)
            delete variant.new
          return variant
        })
        input.variants = cleanVariants
        await productToUpdate.update(input)
      },

      create_test_data: async () => {
        let testProduct = {
          title: "testProduct",
          price: 222,
          descr: "a description",
          thumbnail: "/_next/static/media/panda.36f21355.jpg",
          catagory: "62d7cb4afdf89676cc014514",
          specs: [
            {
            title: "material",
            value: "gold"
            }
          ],
          seo: {
            title: "item seo",
            slug: "testProduct",
            descr: "descr seo"
          },
          variants: [
            {
              types: [{key: "color", value: "red"}],
              stock: "62e7e0c30b91823660b9c7c8"
            }
          ],
          stock: "62d7cb5cfdf89676cc01451a"
        }

        let manytestI = []
        for (let i = 0; i<1000; i++) {
          let newT = {...testProduct}
          newT.title = newT.title+i
          manytestI.push(newT)
        }

        await Product.insertMany(manytestI)
      },

      delete_product: async (_, { id }) => {

        // should probably delete by parent stock
        let productToDelete = await Product.findById(id)
        productToDelete.variants.forEach(async variant => {
          await Inventory.findOneAndDelete({_id: variant.stock})
        })

        await Inventory.findOneAndDelete({_id: productToDelete.stock})
        await productToDelete.delete()
      }
    }
} 


export default ProductResolver