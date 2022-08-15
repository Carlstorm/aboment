import {useState, useEffect} from 'react';
import {screenMd} from '../style/theme.module.scss'

export default function isPhone() {
  console.log(screenMd, "dwkaijdwaiwaji")
  let mediaQuery;
  const [isphone, setisphone] = useState(true);

  const handleTabletChange = () => {
    setisphone(!mediaQuery.matches)
  }

  useEffect(() => {
    mediaQuery = window.matchMedia(`(min-width: ${screenMd})`)
    setisphone(!mediaQuery.matches)
    mediaQuery.addEventListener("change", handleTabletChange)
    return () => mediaQuery.removeEventListener("change", handleTabletChange)
  }, []);

  return isphone
}
