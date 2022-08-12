import Abonnement from '../models/abonnement'

const AbonnementResolver = {
    Query: {
        abonnements: async (_, { searchString, sortBy, active, inactive }) => {
            try {
                let searchParams = {}
                let sort = {difference: 1}
       
                if (sortBy) {
                    if ("name" in sortBy)
                        sort = sortBy

                    if ("time" in sortBy)
                        sort = { difference: sortBy.time}
                    
                    if ("status" in sortBy)
                        sort = { endDate: sortBy.status}
                }

                if (searchString) {
                  let regrex = new RegExp(`${searchString}`)
                  searchParams.name = regrex
                }
                
                if (active && inactive) {
                } else if (inactive) {
                    searchParams.endDate = { "$lte" : new Date() }
                } else if (active) {
                    searchParams.endDate = { "$gt" : new Date() }
                } else {
                    return []
                }
                // if (inactive) {
                //     searchParams.endDate = { "endDate" : { "$lte" : new Date() } }
                // }
                
                // let abbbo = await Abonnement.find({...searchParams}).sort(sort).limit(20);
            
                let abbbo = Abonnement.aggregate([
                    {
                        $match : {...searchParams}
                    },
                    {
                        $project : {
                            startDate : 1,
                            endDate : 1,
                            name : 1,
                            difference : {
                                $abs : {
                                    $subtract : [new Date(), "$endDate"]
                                }
                            }
                        }
                    },
                    {
                        $sort : sort
                    }
                ])

                return abbbo
                let now = new Date()

                console.log(abbbo)
            
  
                if (abbbo === null)
                    return []

                return await abbbo.map(a => ({
                    ...a,
                    timeLeft: Math.floor((a.endDate.getTime()-now.getTime())/(1000 * 3600 * 24))
                }))

            } catch (err) {
                console.log(err)
            }
        }
    },
    Mutation: {
        create_abonnement: async (_, { input }) => {
            await new Abonnement(input).save()
        },
        delete_abonnement: async () => {
            await Abonnement.findOneAndDelete({ name: "anders david" })
        },
    }
} 


export default AbonnementResolver