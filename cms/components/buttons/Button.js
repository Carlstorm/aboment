import style from './Button.module.scss'

export default function Button(props) {

    let buttonStyle = "button"
    if ("style" in props) {
        buttonStyle += `-${props.style}`
    } else {
        buttonStyle += `-standard`
    }

    let className = style[buttonStyle]
    if ("className" in props)
        className += ` ${props.className}`

    return (
        <button className={className} onClick={() => props.onClick()}>
            {props.children}
        </button>
    )
}