import {  createContext, ReactNode, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage"
import { StoreItem } from "../components/StoreItem";

interface CartItem {
    id: number
    quantity: number
}

interface ShoppingCartContext {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartQuantity : number
    cartItems: CartItem[]
}

interface ShoppingCartProviderProps {
    children : ReactNode
}
const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}



export function ShoppingCartProvider({ children }: ShoppingCartProviderProps){
    const [isOpen, SetIsOpen] = useState(false)
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
        "Shopping-cart", 
        []
    )
StoreItem
    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

const openCart = () => SetIsOpen(true)
const closeCart = () => SetIsOpen(false)

    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseCartQuantity(id: number){
        setCartItems(currentItems => {
            if (currentItems.find(item => item.id === id) == null) {
                return [...currentItems, { id, quantity:1}]
            }else {
                return currentItems.map(item => {
                    if ( item.id === id ) {
                        return ( {...item, quantity: item.quantity + 1})
                    }else {
                        return item
                    }
                })
            }
        })
    } 

    function decreaseCartQuantity(id: number){
        setCartItems(currentItems => {
            if (currentItems.find(item => item.id === id)?.quantity === 1) {
                return (currentItems.filter(item => item.id !==id))
            }else {
                return currentItems.map(item => {
                    if ( item.id === id ) {
                        return ( {...item, quantity: item.quantity - 1})
                    }else {
                        return item
                    }
                })
            }
        })
    } 

    function   removeFromCart(id: number){
    setCartItems(currentItems => {
            return (currentItems.filter(item => item.id !==id))
    
   })}

  // function cartItems

    return (
        <ShoppingCartContext.Provider 
        value={{removeFromCart,
            getItemQuantity,
            increaseCartQuantity,
             decreaseCartQuantity,
             cartItems,
             cartQuantity,
             openCart,
             closeCart
             }}>
            {children}
            <ShoppingCart isOpen = {isOpen}/>
        </ShoppingCartContext.Provider>
    )

}

