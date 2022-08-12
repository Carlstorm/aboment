
import { cmsContext } from '../../cmsContext'

// style
import style from './Popup.module.scss'

import FadeIn from '../effects/FadeIn/FadeIn'
import { useContext, useEffect, useState } from 'react'

export default function Popup(props) {

    const {setPopUp} = useContext(cmsContext)

    const [pageWidth, setPageWidth] = useState(document.getElementById("page").getBoundingClientRect().width)

    useEffect(() => {
        window.addEventListener("resize", resize)
        return () => window.removeEventListener("resize", resize)
    },[])

    const resize = () => {
        console.log("resize is running")
        setPageWidth(document.getElementById("page").getBoundingClientRect().width)
    }

    const closePopUp = (elm) => {
        if (elm.id === "overlay")
            setPopUp(null)
    }

    const page = document.getElementById("page").getBoundingClientRect()

    return (
        <FadeIn onMouseDown={(e) => closePopUp(e.target)} id="overlay" style={{width: `${pageWidth}px`}} className={style.component}>
            <div className={style.card}>
                {props.children}
            </div>
        </FadeIn>
    )
}