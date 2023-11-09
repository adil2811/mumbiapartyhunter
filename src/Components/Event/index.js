'use client'
import React, { useContext } from 'react';
import Image from 'next/image';
import { CartContext } from '../CartContext';
import { useRouter } from 'next/navigation';


export default function Event({ event }) {
      const {cartProducts ,setCartProducts,addproduct} = useContext(CartContext); 
      const router = useRouter()
   
  return (
    <div className='cursor-pointer' >
    <div 
      onClick={() => router.push('/event/'+event._id)}
    className="relative  flex flex-col items-center p-10  ">
      <div className="container">
        <div className="max-w-md w-[300px] bg-gray-900 shadow-lg rounded-xl p-6">
          <div className="flex  flex-col">
            <div>
              <div className="relative h-62 w-full mb-3">
                <div className="absolute flex flex-col top-0 right-0 p-3">
                  <button className="transition ease-in duration-300 bg-gray-800 hover:text-purple-500 shadow hover:shadow-md text-gray-500 rounded-full w-8 h-8 text-center p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
                <Image src={event.images[0]} width={300} height={50} alt="Just a flower" loading="lazy" 	 className="object-cover  rounded-2xl" 	  />
              </div>
              <div className="flex-auto justify-evenly">
                <div className="flex flex-wrap">
                  <div className="w-full flex-none text-sm flex items-center text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-gray-400 whitespace-nowrap mr-3">{event.rating}</span>
                    <span className="mr-2 text-gray-400 text-[10px]">November 25 | Gates Open 3PM Onwards</span>
                    <div className="flex items-center bg-red-800 text-white text-sm px-2 py-1 ml-1 rounded-lg">
                      POP
                    </div>
                  </div>
                  <div className="flex items-center w-full justify-between min-w-0">
                    <h2 className="text-m mr-auto cursor-pointer text-gray-200 hover:text-purple-500 ">{event.title} </h2>
                    
                  </div>
                </div>
                <div className="flex mt-2 text-m text-white font-semibold ">₹{event.price}</div>
              
                <div className="mt-3 flex space-x-2 text-sm font-medium justify-start">
                  <button className="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md-mb-0 bg-purple-500 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover-bg-purple-600"
                           onClick={() => addproduct(event._id)}>
                    <span>Add Cart</span>
                  </button>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
