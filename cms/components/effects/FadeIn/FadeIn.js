import { useEffect, useRef, useState } from "react";

export default function FadeIn(props) {
    const [savedTrigger, setSavedTrigger] = useState("DEFAULT_TRIGGER")
    const [autoTrigger, setAutoTrigger] = useState(false)
    const fadeRef = useRef(null)
    let trigger = ("trigger" in props) ? props.trigger : autoTrigger;

    if (fadeRef.current != null && savedTrigger != trigger) {
        setSavedTrigger(trigger)
        fadeRef.current.style.transition = "none";
        fadeRef.current.style.opacity = 0;
    }

    // useEffect(() => {
    //     setTimeout(() => {
    //         if (fadeRef.current) {
    //             fadeRef.current.style.transition = "opacity 0.14s ease-in";
    //             fadeRef.current.style.opacity = 1;
    //         }
    //     }, 50);
    // },[trigger])

    setTimeout(() => {
        if (fadeRef.current) {
            fadeRef.current.style.transition = "opacity 0.14s ease-in";
            fadeRef.current.style.opacity = 1;
        }
    }, 150);

    useEffect(() => {
        if (!("trigger" in props))
            setAutoTrigger(!autoTrigger)
    },[fadeRef.current])


    let type = "type" in props ? props.type : "div"
    
    return (
        <>
            {type === "div" ?
                <div 
                    ref={fadeRef} 
                    key={props.key}
                    style={{...props.style, opacity:0}} 
                    className={props.className} 
                    onClick={props.onClick}
                    onMouseDown={props.onMouseDown}
                    onMouseLeave={props.onMouseLeave}
                    id={props.id}
                >
                    {props.children}
                </div>
            : 
                <tr 
                    ref={fadeRef} 
                    key={props.key}
                    style={{...props.style, opacity:0}} 
                    className={props.className} 
                    onClick={props.onClick}
                    onMouseDown={props.onMouseDown}
                    id={props.id}
                >
                    {props.children}
                </tr>
            }
        </>
    )
}