'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import Navbar from "@/Components/navbar";
import CircleLoader from "@/Components/CircleLoader";
import img from '../../../public/logo mph.png';
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      const response = await axios.post("/api/login", user);
      setLoading(true);
      router.push("/");
      console.log("Login success", response.data);
 
    } catch (error) {
      console.log("Login failed", error.message);
      toast.error(error.unknown);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add any form submission logic if needed
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      {loading ? (
        <CircleLoader /> 
      ) : (
        <div className="flex justify-center mx-auto">
          <div className="flex flex-col justify-center">
            <div className="flex flex-col md:flex-row max-w-7xl justify-center items-center">
              <form onSubmit={handleSubmit}>
                <div className="overflow-hidden w-full m-4 flex justify-center bg-gray-900 rounded-lg shadow-xl">
                  <div className="flex flex-col md:flex-row items-center shadow-md h-full">
                    <div className="md:w-1/2 overflow-hidden">
                      <div className="flex flex-col items-center justify-center text-black">
                        <div className="flex flex-col">
                          <div className="m-2 text-white">EMAIL</div>
                          <input
                            name="email"
                            value={user.email}
                            onChange={handleInputChange}
                            className="bg-gray-100 rounded-lg px-5 py-2 focus:border border-blue-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
                          />

                          <div className="m-2 text-white">PASSWORD</div>
                          <input
                            name="password"
                            value={user.password}
                            onChange={handleInputChange}
                            className="bg-gray-100 rounded-lg px-5 py-2 focus:border border-blue-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
                            type="password"
                          />
                          <div className="flex m-2">
                            <input
                              name="rememberMe"
                              checked={rememberMe}
                              onChange={handleRememberMeChange}
                              className="border-b border-stone-400"
                              type="checkbox"
                            />
                            <div className="ml-1 text-white">Remember Me</div>
                          </div>
                          <div className="flex m-2">
                            <button
                              disabled={buttonDisabled}
                              onClick={onLogin}
                              className="bg-gradient-to-l from-fuchsia-600 to-cyan-400 px-6 py-1 rounded-2xl text-white font-medium"
                            >
                              LOGIN
                            </button>
                            <button
                              className="text-transparent bg-clip-text bg-gradient-to-l from-fuchsia-600 to-cyan-400 font-bold ml-2 border-2 rounded-2xl px-6 border-cyan-400"
                              onClick={() => router.push("/signup")}
                            >
                              CREATE ACCOUNT
                            </button>
                          </div>
                       
                        </div>
                      </div>
                    </div>
                    <div className="md:w-1/2 overflow-hidden">
                      <Image src={img} width={1000} height={1000} alt="image" />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
