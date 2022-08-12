import mongoose from 'mongoose'

const MongoDb = process.env.MONGODB_URI

if (!process.env.MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local')
}

const connectDb = async () => {
  try {
    await mongoose.connect(MongoDb, {})
    console.log('db success connect')
  } catch (err) {
    console.log('error connecting to database')
    console.log(err)
    process.exit(1)
  }
}

module.exports = connectDb