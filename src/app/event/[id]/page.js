'use client'
import  { useState,useEffect,useContext } from 'react';
import Navbar from '@/Components/navbar/index.js';
import Footer from '@/Components/Footer/index.js'
import Image from 'next/image';
import CircleLoader from '@/Components/CircleLoader';
import { CartContext } from '@/Components/CartContext';
import { useRouter } from 'next/navigation';



const Loading = () => {
  return <CircleLoader/>
};

export default function ProductDetails({ params }) {
  const { addproduct  } = useContext(CartContext);
  const router = useRouter(); 
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/singleevent/${params.id}`); // Replace with the correct API route
        if (response.ok) {
          const productData = await response.json();
          setProduct(productData);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  if (isLoading) {
    return <Loading />;
  }

  if (!product) {
    return <div>Error fetching product.</div>;
  }



  console.log(product)
  function moreOfThisProduct(id) {
    addproduct(id);
    router.push('/cart')
  }



  return (
    <>
    <Navbar/>
    <div className="bg-gray-600 py-8 ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-black dark:bg-gray-700 mb-4">
             <Image src={product.images[0]} width={200} height={200}/>
            </div>
            <div className="flex -mx-2 mb-4">
              <div className="w-1/2 px-2">
                <button
                onClick={() => moreOfThisProduct(product._id)} 
                className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                  Add to Cart
                </button>
              </div>
              <div className="w-1/2 px-2">
                <button 
                                  onClick={() => moreOfThisProduct(product._id)} 

                className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                    Buy Now
                  </button>
              </div>
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2"> {product.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            {product.company}            </p>
            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">Price:</span>
                <span className="text-gray-600 dark:text-gray-300">${product.price}</span>
              </div>
              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">Rating:</span>
                <span className="text-gray-600 dark:text-gray-300">{product.rating}</span>
              </div>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-700 dark:text-gray-300">Select Color:</span>
              <div className="flex items-center mt-2">
                <button className="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200 mr-2"></button>
                <button className="w-6 h-6 rounded-full bg-red-500 dark:bg-red-700 mr-2"></button>
                <button className="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-700 mr-2"></button>
                <button className="w-6 h-6 rounded-full bg-yellow-500 dark:bg-yellow-700 mr-2"></button>
              </div>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-700 dark:text-gray-300">Select Size:</span>
              <div className="flex items-center mt-2">
                <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">S</button>
                <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">M</button>
                <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">L</button>
                <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">XL</button>
                <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">XXL</button>
              </div>
            </div>
            <div>
              <span className="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
             {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}
