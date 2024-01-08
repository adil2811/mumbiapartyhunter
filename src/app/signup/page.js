"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "@/Components/navbar";
import CircleLoader from "@/Components/CircleLoader";

const SignupPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);



  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/signup", user);
      console.log("Signup success", response.data);
      toast.success("🦄 Wow so easy!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.push("/login");
    } catch (error) {
      console.log("Signup failed", error.message);
      toast.error("user already Exist ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };
  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center mt-[10%]">
        <div className="flex flex-col justify-center items-center md:flex-row shadow rounded-xl max-w-7xl w-[90%] m-2">
          <div className="w-full md:w-3/4">
            <div className="text-xl cursor-pointer flex flex-col justify-center items-center mt-5 md:mt-0 py-4">
              <h1 className="font-semibold text-xl md:text-5xl text-gray-600 m-2">
                Signup for an account
              </h1>
              <div className="text-lg lg:text-xl text-center space-x-5 m-2"></div>
            </div>
            <div className="flex flex-col justify-center items-center m-2 space-y-6 md:space-y-8">
              <div>
                <input
                  id="username"
                  type="text"
                  value={user.username}
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                  placeholder="username"
                  className="bg-gray-100 rounded-lg px-5 py-2 focus:border border-blue-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
                />
              </div>
              <div>
                <input
                  id="email"
                  type="text"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  placeholder="email"
                  className="bg-gray-100 rounded-lg px-5 py-2 focus:border border-blue-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
                />
              </div>
              <div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"} 
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  placeholder="password"
                  className="bg-gray-100 rounded-lg px-5 py-2 focus:border border-blue-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
                />
              </div>
              <div className="flex flex-col justify-center items-center m-2 space-y-6 md:space-y-8">
                <div>
                  <input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"} 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="confirm password"
                    className="bg-gray-100 rounded-lg px-5 py-2 focus:border border-blue-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
                  />
                </div>
              </div>
            </div>
            <div class="flex justify-center items-center ">
                            <input
                              name="rememberMe"
                              checked={rememberMe}
                              onChange={handleRememberMeChange}
                              className="border-b border-stone-400"
                              type="checkbox"
                              onClick={handleShowPassword} 
                            />
                            <div className="ml-1 text-white">Show Password</div>
                          </div>
            <div className="text-center mt-7">
              <button
                onClick={onSignup}
                disabled={buttonDisabled || user.password !== confirmPassword} 
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
              >
                {buttonDisabled || user.password !== confirmPassword
                  ? "password not match"
                  : "Signup"}
              </button>
            </div>
          </div>
          <div className="h-[100%] w-full md:w-1/3 bg-gradient-to-l from-blue-400 to-emerald-400 items-center flex justify-center">
            <div className="text-white text-base font-semibold text-center my-10 space-y-2 m-2">
              <h1 className="text-5xl">New Here?</h1>
              <h1 className="">Sign Up and discover new opportunities here</h1>
              <button
                onClick={() => router.push("/login")}
                className="bg-white rounded-2xl px-4 text-emerald-400 py-1"
              >
                login in
              </button>
            </div>
          </div>
        </div>
      </div>
      {loading && <CircleLoader />}
      <ToastContainer />
    </>
  );
};

export default SignupPage;
