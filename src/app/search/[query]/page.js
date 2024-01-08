"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '@/Components/navbar/index.js';
import Event from '@/Components/Event/index.js';
import Footer from '@/Components/Footer/index.js';
import { getSearch } from '../../../app/libs/getdata';
import { useParams } from 'next/navigation';
import CircleLoader from '@/Components/CircleLoader/index.js';

export default function Page() {
  const params = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const searchQuery = params.query;
      try {
        setLoading(true);
        const searchData = await getSearch(searchQuery);
        setData(searchData);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setLoading(false);
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [params.query]);

  return (
    <>
      <Navbar />
      <div className="mt-[100px] space-y-0.5 md:space-y-2 px-4">
        <h2 className="text-2xl hover:text-purple-800 cursor-pointer">
          Showing Search Results({data?.length})
        </h2>
        <div className="wrapper grid">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Render your data here */}
            {loading ? (
              <div className="h-[100vh]">
                <CircleLoader />
              </div>
            ) : error ? (
              <div className="h-[100vh]">Error: {error}</div>
            ) : data && data.length > 0 ? (
              data.map((event, index) => <Event key={index} event={event} />)
            ) : (
              <div className="h-[100vh] mt-10 text-2xl text-center text-purple-600">Sorry No data found......</div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

