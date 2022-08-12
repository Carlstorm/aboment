import mongoose from 'mongoose'

const { Schema } = mongoose

mongoose.Promise = global.Promise

const VariantDetailsSchema = new Schema({
    img: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
    },
    specs: {
      type: String,
    },
})

module.exports =
  mongoose.models.VariantDetails || mongoose.model('VariantDetails', VariantDetailsSchema)