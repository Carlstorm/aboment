
import Link from 'next/link'

// style
import style from './navBar.module.scss'

export default function NavBar(props) {

  let links
  if (Array.isArray(props.links)) {
    links = props.links
  } else {
    links = [props.links]
  }

  return (
    <nav className={style["component"]}>
      <div className={style["container"]}>
          <div className={style["logo"]}><Link href="/">LOGO</Link></div>
          <ul className={style["links"]}>
            {links.map((link, i) => {
              return <li key={link+i}>{link}</li>;
            })}
            <li className={style.call_button}><Link href="/">BOOK NU</Link></li>;
          </ul>
      </div>
  </nav>
  )
}
