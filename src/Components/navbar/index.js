'use client'
import { AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import logo from "../../../public/logo mph.png";
import Image from "next/image";
import Search from "./searchbar";
import { CartContext } from "../CartContext";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [shouldCloseMenu, setShouldCloseMenu] = useState(false);
  const router = useRouter();
  const pathName = usePathname();
  const mobileMenuRef = useRef();

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

  useEffect(() => {
    if (shouldCloseMenu) {
      setShowMobileMenu(false);
      setShouldCloseMenu(false);
    }
  }, [shouldCloseMenu]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setShouldCloseMenu(true);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const { cartProducts } = useContext(CartContext);

  return (
    <div className="relative h-20">
      <header
        className={`header ${isScrolled && "bg-[#141414]"} ${showMobileMenu && "bg-[#141414]"} hover:bg-[#141414] `}
      >
        <div className="flex items-center space-x-2 md:space-x-10">
          <AiOutlineMenu
            className="md:hidden text-2xl cursor-pointer"
            onClick={() => {
              setShowMobileMenu(!showMobileMenu);
              setShouldCloseMenu(false);
            }}
          />
          <Image
            src={logo}
            width={120}
            height={120}
            alt="NETFLIX"
            className="cursor-pointer object-contain "
            onClick={() => router.push("/")}
          />
          <ul className="hidden md:space-x-4 md:flex cursor-pointer">
            {menuItems.map((item) => (
              <li
                onClick={() => {
                  router.push(item.path);
                  setSearchQuery("");
                  setShowSearchBar(false);
                  setShouldCloseMenu(true);
                }}
                className="cursor-pointer text-[16px] font-light text-[#e5e5e5] transition duration-[.4s] hover:text-purple-600"
                key={item.id}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="font-light gap-4 flex items-end space-x-04 text-sm">
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
              className="mt-[-2px] sm:inline w-6 h-6 cursor-pointer hover:text-purple-600"
            />
          )}
          <div className="flex hover:text-purple-600 text-xl ">
            <Link href={"/cart"}>
              <div className="  flex justify-center items-center">
                <div className="relative py-2">
                  <div className="t-0 absolute left-3">
                    <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">
                      {cartProducts.length}
                    </p>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="file: mt-4 h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </header>
      {showMobileMenu && (
        <div
          ref={mobileMenuRef}
          className="md:hidden fixed top-20 left-0 right-0 bg-[#141414] text-[#e5e5e5] z-10"
        >
          <ul className="flex flex-col mb-5 mt-[-5px] items-center py-4">
            {menuItems.map((item) => (
              <li
                onClick={() => {
                  setShouldCloseMenu(true);
                  router.push(item.path);
                  setSearchQuery("");
                  setShowSearchBar(false);
                }}
                className="cursor-pointer text-[16px] font-light mb-2 hover:text-purple-600 text-purple-600"
                key={item.id}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
