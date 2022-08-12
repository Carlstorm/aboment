import Catagory from '../models/catagory'

const getSubCatagories = async (path) => {
    try {
      let regrex = new RegExp(`${path}\/[a-z]+`)
      let subcatagories = await Catagory.find({ path: regrex })
      return subcatagories
    } catch {
      throw err
    }
  }

const CatagoryResolver = {
    Query: {
      catagories: async () => {
        try {
          return await Catagory.find();
        } catch (err) {
          console.log(err)
        }
      },
      catagory: async (_, { id }) => {
        return await Catagory.findById(id);
      },
      base_catagories: async () => {
        try {
          return await Catagory.find({path: { $not: /\// }});
        } catch (err) {
          console.log(err)
        }
      },
      catagory_by_path: async (_, {path}) => {
        let catagory, subCatagories
        if (path) {
          catagory = await Catagory.findOne({path: path})
          subCatagories = await getSubCatagories(path)
        } else {
          catagory._doc = {title:"base", _id:null}
          subCatagories = await Catagory.find()
        }
        let directsubcatagories = subCatagories.filter(c => {
          let regrex = new RegExp(`${path}\/[a-z]+(?!\/)*$`)
          let cPath = c.path
          return regrex.test(cPath)
        })

        catagory = {
          ...catagory._doc,
          subcatagories: subCatagories,
          directsubcatagories: directsubcatagories
        }

        if (catagory)
            return catagory

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