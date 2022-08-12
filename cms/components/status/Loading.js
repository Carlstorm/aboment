import { useRef, useEffect } from "react";

// component
import Loader from "../../assets/indicators/Loader";

// style
import style from './Loading.module.scss'


export default function Loading(props) {

    let className = "className" in props ? `${style.component} ${props.className}` : style.component

    let loadingRef = useRef(null)

    useEffect(() => {
        setTimeout(() => {
            if (loadingRef.current != null) {
                loadingRef.current.style.transition = "opacity 0.25s ease-in";
                loadingRef.current.style.opacity = 1;
            }
        }, 200);
    },[loadingRef.current])

    return (
        <div ref={loadingRef} className={className}>
            <Loader />
        </div>
    )
}