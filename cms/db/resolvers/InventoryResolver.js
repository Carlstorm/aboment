import Inventory from '../models/inventory'
import Product from '../models/product'
import Catagory from '../models/catagory'

const stockBinding = async (stockID) => {
    if (stockID != null) {
        const productInventory = await Inventory.findById(stockID)
        if (productInventory != null) 
          return productInventory
      }
      return null
}

const catagoryBinding = async (catagoryID) => {
    if (catagoryID != null) {
        const productCatagory = await Catagory.findById(catagoryID)
        if (productCatagory != null) 
          return productCatagory.title
      }
      return null
}

const variantTitle = (product, variant) => {
    let title = "title" in variant ? variant.title : product.title

    let titleModifier = ""
    variant.types.forEach((type, i) => {
        titleModifier += type.value
        if (i < variant.types.length-1)
            titleModifier += '/'
    })

    return `${title} - ${titleModifier}`
}

const InventoryResolver = {
    Query: {
      inventories: async (_, { searchString, catagory, sortBy }) => {
        try {
            let searchParams = {}
            if (searchString) {
              let regrex = new RegExp(`${searchString}`)
              searchParams.title = regrex
            }

            if (catagory)
              searchParams.catagory = catagory

            let inventoryIds = null
            if (sortBy != null && "stock" in sortBy) {
                let inventories = await Inventory.find().sort(sortBy).limit(40)
                inventoryIds = inventories.map(i => i._id)
                searchParams = {
                    ...searchParams,
                    $or: [{ 'variants.stock': {$in: inventoryIds}}, {"stock": {$in: inventoryIds}}]
                }
            }

            let products = await Product.find({...searchParams}).sort(sortBy).limit(20);
            
            let productStockObj = products.map(async product => {
                if (product.variants.length > 0) {
                    let variants = product.variants
                    if (inventoryIds != null) {
                        let inventoryStringIds = inventoryIds.map(s => s.toString())
                        variants = product.variants.filter(v => inventoryStringIds.includes(v.stock.toString()))
                    }
                    
                    return Promise.all(variants.map(async variant => ({
                        title: variantTitle(product, variant),
                        catagory: catagoryBinding.bind(this, product.catagory),
                        inventory: stockBinding.bind(this, variant.stock)
                    })))
                } else {
                    return ({
                        title: product.title,
                        catagory: catagoryBinding.bind(this, product.catagory),
                        inventory: stockBinding.bind(this, product.stock)
                    })
                }
            })

            let resolved = await Promise.all(productStockObj).then(v => {return v})
            let returnArray = Array.isArray(resolved) ? resolved.flat() : []

            return returnArray;
        } catch (err) {
          console.log(err)
        }
      },
    },
    Mutation: {
        update_inventory: async (_, { id, value }) => {
            try {
                console.log(value, id)
                await Inventory.findOneAndUpdate({ _id: id }, {stock: value})
            } catch (err) {
                console.log(err)
            }
        }
    }
} 


export default InventoryResolver