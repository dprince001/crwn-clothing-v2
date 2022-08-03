import { useContext } from 'react'

import Buttons from '../buttons/buttons'
import CartItem from '../cart-items/cart-item.comp'

import { DropdownContext } from '../../contexts/cart-dropdown-context'

import './cart-dropdown.scss'

const CartDropdown = () => {
  const {cartItems} = useContext(DropdownContext);

  return (
    <div className='cart-dropdown-container'>
        <div className='cart-items'>
          {cartItems.map(product => <CartItem product={product} key={product.id} />)}
        </div>
        <Buttons value='checkout' />
    </div>
  )
}

export default CartDropdown