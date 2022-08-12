import mongoose from 'mongoose'

const { Schema } = mongoose

mongoose.Promise = global.Promise

const AbonnementSchema = new Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
})

module.exports =
  mongoose.models.Abonnement || mongoose.model('Abonnement', AbonnementSchema)