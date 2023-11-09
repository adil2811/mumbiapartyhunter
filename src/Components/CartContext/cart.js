"use client"
import React, { useEffect, useState } from 'react';
import { CartContext } from './index.js'

const CartProvider = ({ children }) => {
    const ls = typeof window !== "undefined" ? window.localStorage : null;
    const [cartProducts,setCartProducts] = useState([]);
    useEffect(() => {
            if(cartProducts.length > 0) {
                ls?.setItem('cart',JSON.stringify(cartProducts))
            }
    },[cartProducts])
    useEffect(() => {
        if (ls && ls.getItem('cart')) { // Fixed the typo and properly check for local storage support
          setCartProducts(JSON.parse(ls.getItem('cart')));
        }
      }, []);
      
    function addproduct (productId) {
        setCartProducts(prev => [...prev,productId])

    }
    function lessproduct (productId) {
        setCartProducts(prev => {
            const pos = prev.indexOf(productId);
            if (pos !== -1) {
                return prev.filter((value,index) => index !== pos);
            }
        })
    }
    function removeAllById(productId) {
        setCartProducts((prev) => prev.filter((id) => id !== productId));
      }
      
    return <>
    <CartContext.Provider value={{cartProducts,setCartProducts,addproduct,lessproduct,removeAllById}}>
        {children}
    </CartContext.Provider>
    </>
};

export default CartProvider