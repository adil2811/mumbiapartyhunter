"use client";

import { AiOutlineSearch } from "react-icons/ai";
import { useEffect, useRef } from "react";

export default function Search({
    pathName,
    router,
    searchQuery,
    setSearchQuery,
    setShowSearchBar,
}) {
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchBar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef, setShowSearchBar]);

  function handleSubmit(e) {
    if (e.key === "Enter" && searchQuery && searchQuery.trim() !== "") {
      if (pathName.includes("/search"))
        router.replace(`/search/${searchQuery}`);
      else router.push(`/search/${searchQuery}`);
    }
  }

  return (
    <div className="md:flex justify-center items-center text-center">
      <div className="bg-[rgba(0,0,0,0.75)] border border-[hsla(0,0%,100%,0.85)] px-4 items-center text-center flex max-sm:w-[160px]" ref={searchRef}>
        <div className="order-2">
          <input
            name="search"
            value={searchQuery}
            onKeyUp={handleSubmit}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Event"
            className="max-sm:w-[160px] placeholder:text-[13px] bg-transparent text-[16px] font-medium h-[34px] px-4 py-2  font-md text-white outline-none w-[210px]  max-sm:text-[13px] "
          />
        </div>
        <button className="px-2.5">
          <AiOutlineSearch
            onClick={() => setShowSearchBar(false)}
            className="sm:inline w-3 h-3 max-sm:w-6 max-sm:h-6 cursor-pointer"
          />
        </button>
      </div>
    </div>
  );
}
