import { useContext } from 'react'
import { ReactComponent as ShopIcon } from '../../assets/cart-icon.svg'
import './cart-icon.scss'

import { DropdownContext } from '../../contexts/cart-dropdown-context'

const CartIcon = () => {

  const {isCartOpen, setIsCartOpen, quantitySum} = useContext(DropdownContext)

  const toggleIsCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  }
  

  return (
    <div className='cart-icon-container' onClick={toggleIsCartOpen}>
        <ShopIcon className='shopping-icon' />
        <span className='item-count'>{quantitySum}</span>
    </div>
  )
}

export default CartIcon