import { useContext } from 'react';
import { DropdownContext } from '../../contexts/cart-dropdown-context';

import './product-card.scss'
import Buttons from '../buttons/buttons'


const ProductCard = ({product}) => {
    const {name, price, imageUrl} = product;
    const {addItemToCart} = useContext(DropdownContext);

    const cartItem = () => addItemToCart(product);

  return (
    <div className='product-card-container'>
        <img src={imageUrl} alt={`${name}`}/>
        <div className='footer'>
            <span className='name'>{name}</span>
            <span className='price'>{price}</span>
        </div>
        <Buttons btnType='invertedBtn' value='Add to cart' onClick={cartItem} />
    </div>
  )
}

export default ProductCard