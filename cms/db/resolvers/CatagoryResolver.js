import Catagory from '../models/catagory'

const CatagoryResolver = {
    Query: {
      catagories: async (_, { searchString, sortBy }) => {
        try {
          return await Catagory.find();
        } catch (err) {
          console.log(err)
        }
      },
      catagory: async (_, { id }) => {
        return await Catagory.findById(id);
      }
    },
    Mutation: {
      create_catagory: async (_, { input }) => {
        await new Catagory(input).save()
      },
      update_catagory: async (_, { id, input }) => {
        console.log(input)
        await Catagory.findOneAndUpdate({ _id: id }, input)
      },
      delete_catagory: async (_, { id }) => {
        await Catagory.findOneAndDelete({ _id: id })
      }
    }
} 


export default CatagoryResolver