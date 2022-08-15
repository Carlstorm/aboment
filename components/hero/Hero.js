import img from '../../assets/imgs/hero.jpg'

// style
import styles from './Hero.module.scss'

export default function Hero() {
  return (
    <div className={styles["hero"]} style={{backgroundImage: `url(${img.src})`}}>
        <div className={styles["hero_content"]}>
            <h1>this is a hero</h1>
            <p>this is a here subheading with more text than the actual heading has</p>
            <a className={styles["hero_button"]}>BOOK NU</a>
        </div>

    </div>
  )
}