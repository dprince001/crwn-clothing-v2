import { useContext } from 'react';
import { DropdownContext } from '../../contexts/cart-dropdown-context';

import './checkout-item.scss'

const CheckoutItem = ({cartItem}) => {

    const { addItemToCart, removeItemFromCart , deleteItem} = useContext(DropdownContext);
    const handleDeleteItem = () => deleteItem(cartItem);
    const handleIncreaseItem = () => addItemToCart(cartItem);
    const handleDecreaseItem = () => removeItemFromCart(cartItem);

    const {name, price, imageUrl, quantity} = cartItem;

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <span className='quantity'>
        <div className="arrow" onClick={handleDecreaseItem}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={handleIncreaseItem}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={handleDeleteItem}>
        &#10005;
      </div>
    </div>
  );
}

export default CheckoutItem