'use client'
import { useState, useEffect } from 'react';
import Navbar from '@/Components/navbar/index.js';
import Banner from '@/Components/banner/index.js';
import Feature from '@/Components/feature/index.js';
import Event from '@/Components/Event/index.js';
import Footer from '@/Components/Footer/index.js';
import { getEvents } from '../app/libs/getdata';
import CircleLoader from '@/Components/CircleLoader';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEvents();
        setEvents(response);
        setLoading(false); // Set loading to false after events are fetched
        console.log(response);
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <Banner />
      <Feature />
      <h2 className='text-center text-2xl mt-2 hover:text-purple-600 cursor-pointer'>
        Feature Events
      </h2>
      {loading ? (
        <CircleLoader /> // Show CircleLoader while events are being fetched
        ) : (
          <div className='wrapper  grid sm:place-items-center'>
          <div className='grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {events.map((event, index) => (
              <Event key={index} event={event} />
              ))}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
