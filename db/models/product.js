import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'

const { Schema } = mongoose

mongoose.Promise = global.Promise

const ProductsSchema = new Schema({
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
    },
    variants: {
      type: Array
    },
    rating: {
      type: Number,
    },
    catagory: {
      type: ObjectId
    },
    searchParams: {
      type: [String],
    },
    slug: {
      type: String,
      trim: true,
    },
})

module.exports =
  mongoose.models.Product || mongoose.model('Product', ProductsSchema)