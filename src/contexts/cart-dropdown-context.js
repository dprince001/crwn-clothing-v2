import { createContext, useState } from "react";


const addToCartItems = (cartItems, clickedProduct) => {
    // Check if the clicked item is already in the cart
    const itemExistAlready = cartItems.find((cartitem) => cartitem.id === clickedProduct.id);

    // if found, just increment the quantity then return a new array that now has the incremented cart item
    if (itemExistAlready) {
        return cartItems.map(cartItem => cartItem.id === clickedProduct.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem
        )
    }

    // if we dont have any item in the cart yet
    return [...cartItems, {...clickedProduct, quantity: 1}];
}




export const DropdownContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {}
})

export const DropdownProvider = ({children}) => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (clickedProduct) => {
        setCartItems(addToCartItems(cartItems, clickedProduct));
    }

    const quantitySum = cartItems.map((curItem) => curItem.quantity).reduce((prev, cur) => {
        return prev + cur;
    }, 0)

    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, quantitySum}
    
    return (
        <DropdownContext.Provider value={value}>{children}</DropdownContext.Provider>
    )
}

