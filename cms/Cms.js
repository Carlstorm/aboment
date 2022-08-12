import { useState, useEffect } from "react";

// context
import { cmsContext } from './cmsContext'

// components
import Sidebar from "./Sidebar/Sidebar";
import FadeIn from "./components/effects/FadeIn/FadeIn";
import OverView from "./content/OverView/OverView";

// style
import style from './Cms.module.scss'

export default function Cms() {
    const [tab, setTab] = useState("overview")
    const [popUp, setPopUp] = useState(null)

    useEffect(() => {
        setPopUp(null)
    },[tab])

    const context = {
        popUp,
        setPopUp,
    }

    return (
        <cmsContext.Provider value={context}>
            <div className={style.app}>
                <Sidebar setTab={setTab} tab={tab} />
                <FadeIn className={style.page} id="page">
                    {popUp}
                    {
                        tab === "overview" ? <OverView /> : <OverView />
                    }
                </FadeIn>
            </div>
        </cmsContext.Provider>
    )
}