

import { GET_ABONNEMENTS, CREATE_ABONNEMENT } from '../../db/queries/abonnements.gql'
import { useState, useContext } from "react"
import { useMutation } from '@apollo/client'

// contest
import { cmsContext } from "../../cmsContext";

import Button from "../../components/buttons/Button"

export default function OverViewInput() {
    const {setPopUp} = useContext(cmsContext);

    const [inputObj, setInputObj] = useState({
        name: "",
        startDate: "",
        endDate: ""
    })

    const [create_abonnement] = useMutation(CREATE_ABONNEMENT, {
        refetchQueries: [
            GET_ABONNEMENTS
        ]
    });

    const event = {
        name: (input) => {
            let updateObj = {...inputObj}
            setInputObj({
                ...updateObj,
                name: input
            })
        },
        startDate: (input) => {
            let updateObj = {...inputObj}
            setInputObj({
                ...updateObj,
                startDate: input
            })
        },
        endDate: (input) => {
            let updateObj = {...inputObj}
            setInputObj({
                ...updateObj,
                endDate: input
            })
        },
        add: () => {
            create_abonnement({variables: {input: inputObj}})
            setPopUp(null)
        }
    }

    return (
        <div>
            <input value={inputObj.name} onInput={(e => event.name(e.target.value))}></input>
            <input type="date" value={inputObj.startDate} onInput={(e => event.startDate(e.target.value))}></input>
            <input type="date" value={inputObj.endDate} onInput={(e => event.endDate(e.target.value))}></input>

            <Button onClick={() => {event.add()}}>add</Button>
        </div>
    )
}