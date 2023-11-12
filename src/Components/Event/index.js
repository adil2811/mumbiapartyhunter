'use client'
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { CartContext } from '../CartContext';
import { useRouter } from 'next/navigation';
import { Category } from '../../models/Category.js';

export default function Event({ event }) {
  const { cartProducts, setCartProducts, addproduct } = useContext(CartContext);
  const router = useRouter();
  const [categoryTitle, setCategoryTitle] = useState('');
  const categoryTitleMap = {
    '6536504347e91cf5f1b48997': 'HIP HOP',
    '6536505647e91cf5f1b4899c': 'pop',
    '653663f07c87a31b4bef530b': 'Trans',
    // Add more mappings as needed for other categories
  };
  useEffect(() => {
    // Set categoryTitle based on the mapping object
    setCategoryTitle(categoryTitleMap[event.category] || '');
  }, [event.category]);
  

  return (
    <div className='cursor-pointer' >
    <div 
    className="relative  flex flex-col items-center p10 max-sm:p-2  ">
      <div className="container">
        <div className="max-w-md max-sm:w-[120px] w-[300px]  bg-gray-900 shadow-lg rounded-xl p-6">
          <div className="flex  flex-col">
            <div>
              <div 
                                     onClick={() => router.push('/event/'+event._id)} 

                className="relative h-62 w-full mb-3">
                <div className="absolute flex flex-col top-0 right-0 p-3">
                
                </div>
                <Image src={event.images[0]} width={300} height={50} alt="Just a flower" loading="lazy" 	 className="object-cover  rounded-2xl" 	  />
              </div>
              <div className="flex-auto justify-evenly">
                <div
                className="flex flex-wrap">
                  <div className="w-full flex-none text-sm flex items-center text-gray-600 max-sm:ml-[-20px]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-gray-400 whitespace-nowrap mr-3 max-sm:mr-2 max-sm:text-[10px] p-0">{event.rating}</span>
                    <span class="mr-2 text-gray-400 max-sm:text-[6px] text-[10px] whitespace-nowrap max-sm:mr-1">November25 | <br/>GatesOpen 3PM </span>
                    <div className="flex  bg-red-800 text-white text-sm px-2 py-1 ml-1 max-sm:ml-0 rounded-lg max-sm:text-[6px] max-sm:px-1  max-sm:py-1 max-sm:pr-2 whitespace-nowrap">
                    {categoryTitle}
                                    </div>
                  </div>
                  <div className="flex items-center w-full justify-between min-w-0">
                    <h2 className="text-m mr-auto cursor-pointer text-gray-200 hover:text-purple-500 max-sm:text-[8px] ">{event.title} </h2>
                    
                  </div>
                </div>
                <div className="flex mt-2 text-m text-white font-semibold max-sm:text-[9px] ">₹{event.price}</div>
              
                <div className="mt-3 flex space-x-2 text-sm font-medium justify-start">
                  <button className="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md-mb-0 bg-purple-500 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover-bg-purple-600 max-sm:px-3 max-sm:py-1"
                           onClick={() => addproduct(event._id)}>
                    <span className='max-sm:text-[8px]'>Add Cart</span>
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
