import Product from './models/product'
import Catagory from './models/catagory'
import VariantDetails from './models/VariantDetails'

// async function getCurrentcatagoryId(catagory) {
//   catagory.map((c, i) => {
//     let Discatagory = await Catagory.findOne([])
//     c.
//   })

const currentPath = (catagoryParams) => {
  return catagoryParams.toString().replace(/,/g, '/')
}

const makeProductPath = async (catagoryID, slug) => {
  try {
    const catagory = await Catagory.findById(catagoryID)
    return catagory.path+"/"+slug
  } catch {
    throw err
  }
}

const catagory = async catagoryId => {
  try {
    const catagory = await Catagory.findById(catagoryId)
    return {
      ...catagory._doc,
    }
  } catch {
    throw err
  }
}

const variantDetails = async variantDetailsId => {
  try {
    const variantDetails = await VariantDetails.findById(variantDetailsId)
    return {
      ...variantDetails._doc,
    }
  } catch {
    throw err
  }
}

const currentCatagory = async catagoryParams => {
  try {
    let path = currentPath(catagoryParams);
    let regrex = new RegExp(`${path}(?!\/)*$`)
    let cc = await Catagory.findOne({ path: regrex} )
    return cc
  } catch {
    throw err
  }
}

const getSubCatagories = async (catagoryParams, self) => {
  try {
    let path = typeof Array ? currentPath(catagoryParams) : catagoryParams;
    let regrex = self ? new RegExp(`${path}`) : new RegExp(`${path}\/[a-z]+`)
    let subcatagories = await Catagory.find({ path: regrex })
    return subcatagories
  } catch {
    throw err
  }
}

const directsubCatagories = async (catagoryParams) => {
  try {
    let path = currentPath(catagoryParams);
    let regrex = catagoryParams ? new RegExp(`${path}\/[a-z]+(?!\/)*$`) : /^((?!\/).)*$/
    let subcatagories = await Catagory.find({ path: regrex} )
    return subcatagories
  } catch {
    throw err
  }
}

// const getCurrentCatagory = async catagoryparams => {
//   try {
//     const catagory = await Catagory.find(catagoryId)
//     return {
//       ...catagory._doc,
//     }
//   } catch {
//     throw err
//   }
// }
const getCurrentCatagory = async catagoryparams => {
  let catagorypath = []
  let currentcatagoryId = "";
  for (const c of catagoryparams) {
    let nextCatagory = await Catagory.findOne({
      catagorypath: catagorypath,
      title: c
    })
    catagorypath = nextCatagory.catagorypath
    currentcatagoryId = nextCatagory._id
  }
  return currentcatagoryId;
}

const resolvers = {
  Query: {

    variantDetails: async () => {
      let varin = await VariantDetails.find()
      return varin;
    },

    // products
    products: async (_, { catagoryParams }) => {
      try {
        let products;
        if (catagoryParams) {      
          let SC = await getSubCatagories(catagoryParams, true)
          let SCIds = SC.map(sc => sc._id)
          products = await Product.find( {catagory: SCIds } )
        } else {
          products = await Product.find()
        }


        return products.map(async p => {
          return ({
              ...p._doc,
              catagory: catagory.bind(this, p._doc.catagory),
              path: "sa",
              variantDisplay: {...p._doc.variants[0], ...await variantDetails(p._doc.variants[0].variantDetails)},
              variants: p._doc.variants.map(v => (
              {
                ...v,
                variantDetails: variantDetails.bind(this, v.variantDetails)
              }
            ))
          })
        })

      } catch (err) {
        console.log(err)
      }
    },
    product: async (__, { id, catagoryParams, productSlug }) => { 
      let product;
      if (id) {
        product = await Product.findById(id)
      } else {
        const C = await currentCatagory(catagoryParams);
        product = await Product.findOne({
          catagory: C._id,
          slug: productSlug
        })
      }

      return ({
        ...product._doc,
        catagory: catagory.bind(this, product._doc.catagory),
        variants: product._doc.variants.map(v => (
          {
          ...v,
          variantDetails: variantDetails.bind(this, v.variantDetails)
        }))
      })
    },

    productsByCatagory: async (_, { catagory }) => {
      let currentcatagoryId = await getCurrentcatagoryId(catagory)
      const products = await Product.find({ catagory: currentcatagoryId })

      if (!products) {
        throw new Error('Product not found')
      }

      return products
    },
    catagories: async () => {
      try {
        const catagories = await Catagory.find()
        return catagories.map(c => ({
          ...c._doc
        }))
      } catch (err) {
        console.log(err)
      }
    },
    
    subcatagories: async (_, { catagoryParams }) => {
      try {
        catagoryParams = catagoryParams ? catagoryParams : false
        const SC = await directsubCatagories(catagoryParams)
        return SC
      } catch (err) {
        console.log(err)
      }
    },
  },

  Mutation: {
    // products
    newProduct: async (_, { input }) => {
      try {

        const vv = new VariantDetails({img: input.img})
        delete input.img;

        input.variants = [{variantDetails: vv._id}]

        const product = new Product(input)
        await vv.save()

        const result = await product.save()

        return result
      } catch (err) {
        console.log(err)
      }
    },

    newCatagory: async (_, { input }) => {
      try {

        const cc = new Catagory(input)
        const result = await cc.save()

        return result
      } catch (err) {
        console.log(err)
      }
    },

    updateCatagory: async (_, { id, input }) => {
      let catagory = await Catagory.findById(id)

      if (!catagory) {
        throw new Error('Catagory not found')
      }

      catagory = await Catagory.findOneAndUpdate({ _id: id }, input)

      return catagory
    },

    // newCatagoy: async (_, { input }) => {
    //   try {
    //     const catagory = new Catagory(input)

  

    //     return result
    //   } catch (err) {
    //   }
    // },

    updateProduct: async (_, { id, input }) => {
      let product = await Product.findById(id)

      if (!product) {
        throw new Error('Product not found')
      }

      product = await Product.findOneAndUpdate({ _id: id }, input, {
        new: true,
      })

      return product
    },
    deleteProduct: async (_, { id }) => {
      const product = await Product.findById(id)

      if (!product) {
        throw new Error('Producto no encontrado')
      }

      let variantIDs = []
      product.variants.forEach(v => {
        variantIDs.push(v.variantDetails._id)
      });


      await VariantDetails.deleteMany({ _id: {$in: variantIDs} })
      await Product.findOneAndDelete({ _id: id })

      return 'Producto eliminado'
    },
    deleteCatagory: async (_, { id }) => {
      const cC = await Catagory.findById(id)
      const SC = await getSubCatagories(cC.path, false)

      if (SC.length > 1) {
        let subs = SC.map(sc => sc._id != id ? sc.title : null)
        let dada = subs.toString().replace(/,/g, " ")
        return "catagory has subcatagories:"+dada
      }

      let subcatagories = SC.map(sc => sc._id)
      const products = await Product.find({ catagory: subcatagories })

      if (products.length != 0) {
        let p = products.map(p => p._id != id ? p.title : null)
        let dada = p.toString().replace(/,/g, " ")
        return "catagory or subcatagories contains products: "+dada
      }
      await Catagory.findOneAndDelete({ _id: id })
    }
  },
}

module.exports = resolvers



const getProducts = async () => {
  const response = await fetch('http://example.com/products');
  return await response.json();
}

// returns:
//   [
//     {
//       title: "apple",
//       price: 24,
//       id: 7,
//       brand: "pink lady"
//     },
//     {
//       title: "pear",
//       price: 12,
//       id: 1,
//       brand: "yellow lady"
//     }
//   ]

