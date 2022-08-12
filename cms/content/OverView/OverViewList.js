import { GET_ABONNEMENTS } from '../../db/queries/abonnements.gql'
import { useQuery, gql } from '@apollo/client';

import FadeIn from '../../components/effects/FadeIn/FadeIn';

import Loading from '../../components/status/Loading'

import style from './OverViewList.module.scss'

export default function OverViewList(props) {
    const {
        searchParams
    } = props

    // const abonnementQuery = useQuery(GET_ABONNEMENTS, {
    //     notifyOnNetworkStatusChange: true,
    //     variables: {...searchParams}
    // })
    let abonnementQuery = useQuery(GET_ABONNEMENTS, {
        notifyOnNetworkStatusChange: true,
        variables: {...searchParams}
    })

    const {loading, error, data, networkStatus} = abonnementQuery;

    if (loading || networkStatus === 4)
        return <Loading className={style.loading}/>
    
    if (error) {
        return <FadeIn className={style.noresults}><span>fejl</span></FadeIn>
    }

    console.log(data)
    
    if (data.abonnements.length < 1)
        return <FadeIn className={style.noresults}><span>ingen resultater</span></FadeIn>

    return (
        data.abonnements.map((abonnement, i) => {
            let datenow = new Date()
            let dateend = new Date(abonnement.endDate)
            console.log(abonnement)
            let timeLeft = Math.floor((dateend.getTime()-datenow.getTime())/(1000 * 3600 * 24))
            return (
                <FadeIn type={"tr"} className={style.item}> 
                    <td>{abonnement.name}</td>
                    <td>{timeLeft == 1 ? <span>{timeLeft} dag tilbage</span> : timeLeft >= 0 ? <span>{timeLeft} dage tilbage</span> : <span>{Math.abs(timeLeft)} dage siden</span>}</td>
                    <td>{timeLeft >= 0 ? <span className={style.active}>aktiv</span> : <span className={style.inactive}>udløbet</span>}</td>
                </FadeIn>
            )
        })
    )
}