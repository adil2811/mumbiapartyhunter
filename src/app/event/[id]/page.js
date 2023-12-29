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
            <div className="h-500 w-600 rounded-lg bg-black dark:bg-gray-700 mb-4">
             <Image src={product.images[0]} width={600} height={500}
                className='object-cover'
             />
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
                <span className="font-bold text-white dark:text-gray-300">Price:</span>
                <span className="text-white dark:text-gray-300">$<b>
                  {product.price}
                  
                  </b>
                  </span>
              </div>
              <div>
                <span className="font-bold text-white dark:text-gray-300">Rating:</span>
                <span className="text-white dark:text-gray-300">{product.rating?product.rating:' Null' }</span>
              </div>
            </div>
            <div>

            </div>
            <div>

            <span className="font-bold text-white dark:text-gray-300">Category: Party and wellness</span>
            </div>
            <div className='mt-3'>

<span className="font-bold text-white dark:text-gray-300 ">Date: 31/12/2024 </span>
</div>

            <div className='mt-5'>
              <span className="font-bold text-white dark:text-gray-300 ">Product Description:</span>
              <p className="text-white dark:text-gray-300 text-sm mt-2">
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
