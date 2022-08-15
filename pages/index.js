import Hero from '../components/hero/Hero'

import style from './index.module.scss'

export default function Website() {
    return (
        <div className={style.page}>
            <Hero />
            <div className={style.article}>

                <p>a Website</p>
            </div>
        </div>
    )
}