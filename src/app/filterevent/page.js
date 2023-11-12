'use client' 
import React, { useEffect, useState, useRef } from 'react';
import Navbar from '@/Components/navbar/index.js';
import Footer from '@/Components/Footer/index.js';
import { getCategory } from '@/app/libs/getdata.js';
import Event from '@/Components/Event';
import CircleLoader from '@/Components/CircleLoader/index.js';
import { useIntersection } from '@mantine/hooks';

function Page() {
  const options = ["rating", "price", "Trending"];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const defaultSelectedButtonIndex = 0;
  const [selectedButton, setSelectedButton] = useState(defaultSelectedButtonIndex);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1); // Initial page number
  const [loading, setLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);

  const handleToggle = (index) => {
    setSelectedButton(index);
    setData([]); // Clear the data array
    setPage(1); // Reset the page number to 1
    setHasMoreData(true); // Reset hasMoreData
  };

  // Define buttonLabels here
  const buttonLabels = [
    "ALLALLALLALLALLALLALLALLALL",
    '6536505647e91cf5f1b4899cPop',
    '653663f07c87a31b4bef530bTrans',
    '6536504347e91cf5f1b48997Hip Hop',
  ];

  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    closeDropdown();
    setData([]); // Clear the data array
    setPage(1); // Reset the page number to 1
  };

  async function fetchData(pageNumber) {
      if (!hasMoreData) {
    return; // No need to fetch more data if there is no more data
  }
    setLoading(true);
    console.log(pageNumber);
    console.log(buttonLabels[selectedButton].slice(0, 24));
    const category = buttonLabels[selectedButton].slice(0, 24);
    const limit = 2;
    const order = 'asc';
    console.log('Selected option:', selectedOption);
    const sort = selectedOption;

    try {
      const response = await getCategory(pageNumber, limit, category, sort, order);
      if (response.length === 0) {
        setHasMoreData(false);
      } else {
        setData((prevData) => [...prevData, ...response]);
        setPage(pageNumber + 1);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData(page);
  }, [selectedButton, selectedOption]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        closeDropdown();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const lastPostRef = useRef(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1
  });

  useEffect(() => {
    if (entry && entry.isIntersecting && !loading) {
      fetchData(page);
    }
  }, [entry, loading, page]);

  return (
    <>
      <Navbar />
      <div className='max-sm:mt-10 '>
        <div className="flex flex-row justify-center">
          <span className='mt-3 text-xs m-1 max-sm:text-[8px]'>Types of Music : </span>
          {buttonLabels.map((label, index) => (
            <button
              key={`toggleButton${index + 1}`}
              onClick={() => handleToggle(index)}
              className={` max-sm:px-2 max-sm:text-[10px] text-white bg-gray-800 hover:bg-red-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 ${
                selectedButton === index ? 'bg-red-800' : 'bg-black'
              }`}
            >
              {label.slice(24)}
            </button>
          ))}
        </div>
        <div className='justify-center'>
          <div className='flex justify-center items-center mt-2'>
            <div className="relative inline-block">
              <div
                ref={buttonRef}
                className=" max-sm:px-2 max-sm:py-1 px-4 py-2 text-white bg-gray-800 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm inline-flex items-center z-10"
                onClick={toggleDropdown}
              >
                {selectedOption} <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </div>
              {isOpen && (
                <div
                  ref={dropdownRef}
                  className="origin-top-right absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                >
                  <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {options.map((option) => (
                      <li key={option}>
                        <button
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          onClick={() => handleOptionClick(option)}
                        >
                          {option}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="wrapper grid mt-10">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.length > 0 ? (
            data.map((event, index) => (
              <Event key={index} event={event} />
            ))
          ) : loading ? (
            <div className='h-[100vh] flex items-center justify-center'>
              <CircleLoader />
            </div>
          ) : null}
          <div ref={ref} />
        </div>
      </div>
          {loading && (
            <div className='h-16 mt-90% top-[90%] flex items-center justify-center '>
              <CircleLoader />
            </div>
          )}
      <Footer />
    </>
  );
}

export default Page;
