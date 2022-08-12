import { useState } from 'react'
import { useContext } from 'react';

// contest
import { cmsContext } from "../../cmsContext";

import PopUp from '../../components/popup/Popup';
import OverViewList from './OverViewList'
import OverViewInput from './OverViewInput';
import CheckboxInput from '../../components/CheckboxInput/CheckboxInput'


import style from './OverView.module.scss'
import Button from "../../components/buttons/Button"

export default function OverView(props) {

  const {setPopUp} = useContext(cmsContext);

  const [searchParams, setSearchParams] = useState({
    searchString: "",
    sortBy: null,
    active: true,
    inactive: false
  })

  const event = {
    new: () => {
      console.log("hello")
      setPopUp(
        <PopUp><OverViewInput/></PopUp>
      )
    },
    activeFilter: () => {
      setSearchParams({...searchParams, active:!searchParams.active})
    },
    inactiveFilter: () => {
      setSearchParams({...searchParams, inactive:!searchParams.inactive})
    },
    search: (input) => {
      if (input.length > 1)
        setSearchParams({...searchParams, searchString:input})
      else 
        setSearchParams({...searchParams, searchString:""})
    },
    sort: (key) => {
        let sort = {[key] : 1}
        if (searchParams.sortBy && key in searchParams.sortBy) {
          if (searchParams.sortBy[key] > 0)
            sort = {[key] : -1}
          else
            sort = {[key] : 1}
        }
        setSearchParams({...searchParams, sortBy:sort})
    },
  }

  const Th = ({name, sortKey}) => {
    return (
      <th onClick={() => event.sort(sortKey)}>
      <span>{name}</span>
      {searchParams.sortBy && sortKey in searchParams.sortBy ? 
        <span className={searchParams.sortBy[sortKey] > 0 ? style.sortIndicator__up : style.sortIndicator__down}>{">"}</span>
      : null}
    </th>
    )
  }

  return (
    <div className={style.component}>
      <div className={style.bar}>
        <div className={style.bar__inputs}>
          <input onInput={(e) => event.search(e.target.value)} className={style.bar__search} placeholder='søg'></input>
          <div>
            <span>aktive</span>
            <CheckboxInput value={searchParams.active} onClick={() => event.activeFilter()}/>
          </div>
          <div>
            <span>udløbet</span>
            <CheckboxInput value={searchParams.inactive} onClick={() => event.inactiveFilter()}/>
          </div>
        </div>
        <Button onClick={() => event.new()}>Ny</Button>
      </div>
      <div className={style.content}>
        <table className={style.table}>
          <tr className={style.table_header}>
              <Th name="Navn" sortKey="name" />
              <Th name="Tid" sortKey="time" />
              <Th name="Status" sortKey="status" />
          </tr>
          <OverViewList searchParams={searchParams}/>
        </table>
      </div>
    </div>
  )
}
  