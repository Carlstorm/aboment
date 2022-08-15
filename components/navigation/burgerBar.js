import { useState, useEffect } from 'react'
import Link from 'next/link'

// style
import style from './burgerBar.module.scss'

export default function BurgerBar(props) {

  const [burgerOpen, setburgerOpen] = useState(false)
  const [burgerDidOpen, setburgerDidOpen] = useState(false)

  useEffect(() => {
    setburgerDidOpen(false);
    setburgerOpen(false);
  },[props.phone])

  const burgerHandle = () => {
    setburgerDidOpen(true);
    setburgerOpen(!burgerOpen);
  }

  let links
  if (Array.isArray(props.links)) {
    links = props.links
  } else {
    links = [props.links]
  }
  
  return (
    <>
    <nav>
      <div className={style["component"]}>
        <div className={style["container"]}>
          <div className={style["logo"]}><Link href="/">LOGO</Link></div>
          <div 
            onClick={() => burgerHandle()}
            className={`${style["burger"]} ${burgerOpen ? style['burger--open'] : ''}`}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
      <div className={`${style["menu"]} 
        ${burgerOpen ? style['menu--open'] : ''} 
        ${burgerDidOpen ? style['menu--activated'] : ''}`}>
        <ul className={style["menu_links"]}>
          {links.map((link, i) => {
            return <li key={link+i} onClick={() => burgerHandle()}>{link}</li>;
          })}
        </ul>
      </div>
    </nav>
    <div className={`${style["page-overlay"]} ${burgerOpen ? style["page-overlay--active"] : ''}`} 
      onClick={() => setburgerOpen(false)}>
    </div>
  </>
  )
}
