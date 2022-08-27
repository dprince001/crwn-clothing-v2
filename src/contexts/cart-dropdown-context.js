import { createContext, useEffect, useState } from "react";


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

const removeCartItems = (cartItems, itemToRemove) => {
    // check if the itemToRemove id matches an id in the cart item
    const itemExistAlready = cartItems.find((cartItem) => cartItem.id === itemToRemove.id);


    // check if that matching item has a quantity of just 1
    if(itemExistAlready.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== itemToRemove.id);
    }

    // return a new cartitems array with the the reduced quantity (if quantity was different from 1)
    return cartItems.map(cartItem => cartItem.id === itemToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem);

}

const deleteItemFromCart = (cartItems, itemToDelete) => cartItems.filter((cartItem) => cartItem.id !== itemToDelete.id);



export const DropdownContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    deleteItem: () => {}, 
    quantitySum: 0, 
    totalPriceSum: 0
})

export const DropdownProvider = ({children}) => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [quantitySum, setQuantitySum] = useState(0);
    const [totalPriceSum, setTotalPriceSum] = useState(0);

    useEffect(() => {
        const cartCount = cartItems.reduce((prev, cur) => prev + cur.quantity, 0);
        setQuantitySum(cartCount);
    }, [cartItems])

    useEffect(() => {
      const cartTotals = cartItems.reduce((prev, cur) => prev + cur.quantity * cur.price, 0);
      setTotalPriceSum(cartTotals);
    }, [cartItems]);

    const addItemToCart = (clickedProduct) => {
        setCartItems(addToCartItems(cartItems, clickedProduct));
    }

    const removeItemFromCart = (itemToRemove) => {
        setCartItems(removeCartItems(cartItems, itemToRemove));
    }

    const deleteItem = (itemToDelete) => {
        setCartItems(deleteItemFromCart(cartItems, itemToDelete));
    }

    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, quantitySum, totalPriceSum, removeItemFromCart, deleteItem}
    
    return (
        <DropdownContext.Provider value={value}>{children}</DropdownContext.Provider>
    )
}

