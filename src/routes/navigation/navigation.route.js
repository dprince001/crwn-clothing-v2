import React, {Fragment, useContext} from 'react'
import { Link, Outlet } from 'react-router-dom'

import './navigation.scss'
import { ReactComponent as Logo } from '../../assets/crown.svg'

import { UserContext } from '../../contexts/user-context'
import { DropdownContext } from '../../contexts/cart-dropdown-context'
import { signOutUser } from '../../utilities/firebase/firebase.utils'

import CartIcon from '../../components/cart-icon/cart-icon'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown'

const Navigation = () => {

  const { currentUser } = useContext(UserContext);

  const {isCartOpen} = useContext(DropdownContext);


  return (
    <Fragment>
        <div className='navigation'>
            <Link className='logo-container' to='/'>
                <Logo />
            </Link>

            <div className='nav-links-container'>
                <Link className='nav-link' to='/shop'>SHOP</Link>
                {
                  currentUser ? <span className='nav-link' onClick={signOutUser}>SIGN OUT</span> : <Link className='nav-link' to='/auth'>SIGN IN</Link>
                }
                <CartIcon />
            </div>
            {isCartOpen && <CartDropdown />}
        </div>
        <Outlet />
    </Fragment>
  )
}

export default Navigation