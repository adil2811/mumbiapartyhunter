import Navbar from '@/Components/navbar/index.js';
import Banner from '@/Components/banner/index.js';
import Feature from '@/Components/feature/index.js';
import Event from '@/Components/Event/index.js';
import Footer from '@/Components/Footer/index.js';
import CircleLoader from '@/Components/CircleLoader';



async function fetchData() {
  try {
    // Replace 'YOUR_ENDPOINT' with the actual API endpoint
    const response = await fetch(`${process.env.DOMAIN}/api/search`);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const searchData = await response.json();
    return searchData;
  } catch (error) {
    console.error("Fetch data error:", error);
    throw error;
  }
}

export default async function Home() {

 let events = await fetchData()
  console.log(events)
  return (
    <>
      <Navbar />
      <Banner />
      <Feature />
      <h2 className='text-center text-2xl mt-2 hover:text-purple-600 cursor-pointer'>
        Feature Events
      </h2>
      {!events ? (
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
