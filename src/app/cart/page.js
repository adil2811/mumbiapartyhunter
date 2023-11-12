'use client'
import { CartContext } from '@/Components/CartContext';
import Navbar from '@/Components/navbar/index.js';
import Image from 'next/image';
import Footer from '@/Components/Footer/index.js';
import { useEffect, useState, useContext } from 'react';

const CartItems = () => {
  const { cartProducts, addproduct, lessproduct, removeAllById } = useContext(CartContext);
  const [product, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [country, setCountry] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (cartProducts.length > 0) {
      fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: cartProducts }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setProducts(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [cartProducts]);

  function moreOfThisProduct(id) {
    addproduct(id);
  }

  function lessOfThisProduct(id) {
    lessproduct(id);
  }

  function remove(productId) {
    removeAllById(productId);
  }

  async function goToPayment() {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          city,
          postalCode,
          streetAddress,
          country,
          cartProducts,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();

      if (responseData.url) {
        window.location = responseData.url;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  let total = 0;
  for (const productId of cartProducts) {
    const price = (product.find((p) => p._id === productId)?.price || 0);
    total += price;
  }

  const shipping = () => (total > 2000 ? 100 : 0);

  if (isSuccess) {
    return (
      <>
        <h2>Successful</h2>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-900 pt-20">
        <h1 className="mb-6 text-center text-lg md:text-2xl lg:text-3xl font-bold text-white">
          Cart Items
        </h1>
        <div className="flex flex-col md:flex-row mx-auto max-w-5xl justify-center px-4 md:px-6 lg:px-8 xl:px-0 space-y-6 md:space-y-0">
          <div className="rounded-lg md:w-full lg:w-2/3 xl:w-2/3">
            {!cartProducts.length ? (
              <div className="text-white">Your cart is empty</div>
            ) : (
              product.length > 0 &&
              product.map((product) => (
                <div
                  key={product._id}
                  className="flex flex-col md:flex-row justify-between mb-6 rounded-lg bg-white p-6 shadow-md"
                >
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    width={100}
                    height={50}
                    className="rounded-lg mb-4 md:mr-6 md:mb-0"
                  />
                  <div className="flex flex-col justify-between md:w-2/3">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">
                        {product.title}
                      </h2>
                      <p className="mt-1 text-xs text-gray-700">
                        {product.description}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center space-x-4">
                        <button
                          className="cursor-pointer rounded-l bg-black py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                          onClick={() => lessOfThisProduct(product._id)}
                        >
                          {' '}
                          -{' '}
                        </button>
                        <input
                          className="h-8 w-8 border text-black bg-white text-center text-xs outline-none"
                          type="number"
                          value={cartProducts.filter(
                            (id) => id === product._id
                          ).length}
                          min="1"
                        />
                        <button
                          className="cursor-pointer rounded-r bg-black py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                          onClick={() => moreOfThisProduct(product._id)}
                        >
                          {' '}
                          +{' '}
                        </button>
                      </div>
                      <div className="flex text-black items-center space-x-4">
                        <p className="text-sm">
                          {product.price *
                            cartProducts.filter(
                              (id) => id === product._id
                            ).length}
                          ₹
                        </p>
                        <button onClick={() => remove(product._id)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-full lg:w-1/3 xl:w-1/3">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              className="w-full text-black mt-1 p-1 mb-1 border border-gray-300 rounded-lg box-border"
              onChange={(ev) => setName(ev.target.value)}
            />

            <input
              type="text"
              placeholder="Email"
              name="email"
              value={email}
              className="w-full text-black mt-1 p-1 mb-1 border border-gray-300 rounded-lg box-border"
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <div className="flex flex-col md:flex-row gap-5">
              <input
                type="text"
                placeholder="City"
                name="city"
                value={city}
                className="w-full text-black mt-1 p-1 mb-1 border border-gray-300 rounded-lg box-border"
                onChange={(ev) => setCity(ev.target.value)}
              />
              <input
                type="text"
                placeholder="Postal Code"
                className="w-full text-black mt-1 p-1 mb-1 border border-gray-300 rounded-lg box-border"
                value={postalCode}
                name="postalCode"
                onChange={(ev) => setPostalCode(ev.target.value)}
              />
            </div>
            <input
              type="text"
              placeholder="Street Address"
              className="w-full text-black mt-1 p-1 mb-1 border border-gray-300 rounded-lg box-border"
              value={streetAddress}
              name="streetAddress"
              onChange={(ev) => setStreetAddress(ev.target.value)}
            />
            <input
              type="text"
              placeholder="Country"
              className="w-full text-black mt-1 p-1 mb-1 border border-gray-300 rounded-lg box-border"
              value={country}
              name="country"
              onChange={(ev) => setCountry(ev.target.value)}
            />
            <div className="mb-2 mt-5 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">${total}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">${shipping()}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold text-gray-700">Total</p>
              <div>
                <p className="mb-1 text-lg font-bold">${total + shipping()} USD</p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            <button
              className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
              onClick={goToPayment}
            >
              Check out
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartItems;
