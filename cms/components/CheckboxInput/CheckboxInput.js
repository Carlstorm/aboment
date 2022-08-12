import { useRef } from 'react'

// style
import style, {transition} from './CheckboxInput.module.scss'

export default function CheckboxInput(props) {

    let inputStyle = "component"
    if ("style" in props && props.style != null) {
        inputStyle = `${props.style}`
    }

    const sliderRef = useRef(null)

    const event = {
        click: () => {
            sliderRef.current.style.transition = transition
            props.onClick()
            setTimeout(() => {
                sliderRef.current.style = {}
            }, 100);
        }
    }

    return (
        <div onClick={() => event.click()} className={style[`${props.value ? "component-active" : "component"}`]}>
            <div ref={sliderRef} className={style[`${props.value ? "slider-active" : "slider"}`]}></div>
            <input className={style.input} type="checkbox" value={props.value}></input>
        </div>
    )
}