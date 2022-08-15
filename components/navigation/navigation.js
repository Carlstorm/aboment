import isPhone from '../../hooks/isPhone';

import NavBar from './navBar';
import BurgerBar from './burgerBar';

export default function Navigation(props) {
    return (
    <>
        {isPhone() ? <BurgerBar links={props.children}/> : <NavBar links={props.children}/>}
    </>
    )
}
