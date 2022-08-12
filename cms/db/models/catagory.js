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
      title: {type: String},
      display: {type: Boolean},
      type: {type: String}
    }],
    thumbnail: {
      type: String,
    }
})

module.exports =
  mongoose.models.Catagory || mongoose.model('Catagory', CatagorySchema)