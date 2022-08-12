import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'

const { Schema } = mongoose

mongoose.Promise = global.Promise

const CatagorySchema = new Schema({
    title: {
      type: String,
      required: true,
      trim: true,
    },
    path: {
      type: String,
      trim: true
    },
    filters: [{
      field: String,
      display: Boolean
    }],
    thumbnail: {
      type: String,
    }
})

module.exports =
  mongoose.models.Catagory || mongoose.model('Catagory', CatagorySchema)