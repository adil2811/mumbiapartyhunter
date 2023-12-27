"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/Components/navbar/index.js";
import Event from "@/Components/Event/index.js";
import Footer from "@/Components/Footer/index.js";
import { getSearch } from "../../../app/libs/getdata";
import {  useSearchParams } from "next/navigation";
import CircleLoader from "@/Components/CircleLoader/index.js";

export default function Page() {
  
  const params = useSearchParams();
  const [data, setData] = useState(null);

  // useEffect(() => {
  //   async function fetchData() {
  //     const searchQuery = params.query;
  //     console.log(searchQuery);
  //     const searchData = await getSearch(searchQuery);
  //     setData(searchData);
  //   }
  //   // Only run the effect when params.query changes
  //   fetchData();
  // }, [params.query]);


  return (
    <>
      <Navbar />
      <div className="mt-[100px] space-y-0.5 md:space-y-2 px-4">
        <h2 className="text-2xl hover:text-purple-800 cursor-pointer">
          Showing Search Results({data?.length})
        </h2>
        <div className="wrapper  grid ">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Render your data here */}
            {data ? (
              data.map((event, index) => <Event key={index} event={event} />)
            ) : (
              <div className="h-[100vh]">
              <CircleLoader />
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
