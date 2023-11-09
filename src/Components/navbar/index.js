"use client";
import { AiOutlineSearch } from "react-icons/ai";

import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import logo from '../../../public/logo mph.png'
import Image from "next/image";
// import Search from "./search";
import Search from './searchbar'
import { CartContext } from "../CartContext";
import Link from "next/link";
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAccountPopup, setShowAccountPopup] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  // const {
  //   setPageLoader,
  //   loggedInAccount,
  //   setAccounts,
  //   accounts,
  //   setLoggedInAccount,
  //   pageLoader,
  //   showDetailsPopup,
  //   setShowDetailsPopup,
  // } = useContext(GlobalContext);

  const menuItems = [
    {
      id: "home",
      title: "Home",
      path: "/",
    },
    {
      id: "Event",
      title: "Event",
      path: "/filterevent",
    },
    {
      id: "movies",
      title: "Movies",
      path: "/",
    },
    {
      id: "list-Event",
      title: "List-Event",
      path: `/listevent`,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) setIsScrolled(true);
      else setIsScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const {cartProducts ,setCartProducts} = useContext(CartContext); 


  // if (pageLoader) return <CircleLoader />;

  return (
    <div className="relative h-20">
      {/* added h-20 */}
      <header className={`header ${isScrolled && "bg-[#141414]"} hover:bg-[#141414]`}>
        <div className="flex items-center space-x-2 md:space-x-10">
          <Image
            src={logo}
            width={120}
            height={120}
            alt="NETFLIX"
            className="cursor-pointer object-contain"
            onClick={() => router.push("/")}
          />
          <ul className="hidden md:space-x-4 md:flex cursor-pointer">
            {menuItems.map((item) => (
              <li
                onClick={() => {
                  // setPageLoader(true);
                  router.push(item.path);
                  setSearchQuery("");
                  setShowSearchBar(false);
                }}
                className="cursor-pointer text-[16px] font-light text-[#e5e5e5] transition duration-[.4s] hover:text-purple-600"
                key={item.id}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="font-light gap-4 flex items-end space-x-04 text-sm ">
          {showSearchBar ? (
            <Search
              pathName={pathName}
              router={router}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setShowSearchBar={setShowSearchBar}
            />
          ) : (
            <AiOutlineSearch
              onClick={() => setShowSearchBar(true)}
              className="hidden sm:inline sm:w-6 sm:h-6 cursor-pointer hover:text-purple-600"
            />
          )}
        <div className="hover:text-purple-600 text-xl ">
        <Link href={'/cart'}>
        
        cart({cartProducts?.length})
        </Link>  
        </div>
        </div>
      </header>
    </div>
);

}