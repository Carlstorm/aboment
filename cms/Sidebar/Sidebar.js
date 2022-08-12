import style from './Sidebar.module.scss'

import bg from '../assets/img/sidebg.jpg'

export default function Sidebar({setTab, tab}) {

  const Tab = ({title}) => (
    <div onClick={() => setTab(title)} className={tab===title ? style.tab__active : style.tab}>
      <p>{title}</p>
    </div>
  )

  return (
    <div className={style.component}>
        <div className={style.bg} style={{backgroundImage: `url(${bg.src})`}}></div>
        <div className={style.tabs}>
          <Tab title="overview" />
        </div>
    </div>
  )
}
