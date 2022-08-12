import mongoose, { Types } from 'mongoose'
import { ObjectId } from 'mongodb'

const { Schema } = mongoose

mongoose.Promise = global.Promise

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
    },
    descr: {
        type: String
    },
    thumbnail: {
        type: String
    },
    catagory: {
        type: ObjectId,
        ref: "Catagory"
    },
    specs: [{
        title: {type: String},
        value: {type: String},
        _id : false
    }],
    seo: {
        title: {type: String},
        slug: {type: String},
        descr: {type: String}
    },
    variants: {
        type: Array
    },
    rating: {
        type: Number
    },
    stock: {
        type: ObjectId
    }
})

ProductSchema.index({price: 1, title: 1})

module.exports =
  mongoose.models.ProductWithIndex || mongoose.model('ProductWithIndex', ProductSchema)