import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'

const { Schema } = mongoose

mongoose.Promise = global.Promise

const InventorySchema = new Schema({
    stock: {
      type: Number
    },
    parent: {
      type: mongoose.Schema.Types.Mixed
    },
    locations: [{
      _id: {type: ObjectId},
      stock: {type: Number},
    }]
})

module.exports =
  mongoose.models.Inventory || mongoose.model('Inventory', InventorySchema)