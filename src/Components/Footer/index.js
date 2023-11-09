import React from 'react'

export default function Footer() {
  return (
    <footer className="mt-20 flex flex-col items-center bg-neutral-900 text-center text-white">
    <div className="container px-6 pt-6">
      {/* Social media icons container */}
      <div className="mb-6 flex justify-center">
        <a
          href="#!"
          type="button"
          className="m-1 h-9 w-9 rounded-full border-2 border-white uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
          data-te-ripple-init
          data-te-ripple-color="light"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-full w-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
            />
          </svg>
        </a>

        {/* Repeat the above block for other social media icons */}
      </div>

      {/* Newsletter sign-up form */}
      <div>
        <form action="">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0">
            <div className="md:mb-6 md:ml-auto">
              <p>
                <strong>Sign up for our newsletter</strong>
              </p>
            </div>

            {/* Newsletter sign-up input field */}
            <div className="relative md:mb-6" data-te-input-wrapper-init>
              <input
                type="text"
                className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] text-neutral-200 outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleFormControlInput1"
                placeholder="Email address"
              />
              <label
                htmlFor="exampleFormControlInput1"
                className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-200 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-neutral-200 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
              >
                Email address
              </label>
            </div>

            {/* Newsletter sign-up submit button */}
            <div className="mb-6 md:mr-auto">
              <button
                type="submit"
                className="inline-block rounded border-2 border-neutral-50 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                Subscribe
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Copyright information */}
      <div className="mb-6">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
          distinctio earum repellat quaerat voluptatibus placeat nam,
          commodi optio pariatur est quia magnam eum harum corrupti dicta,
          aliquam sequi voluptate quas.
        </p>
      </div>

      {/* Links section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {/* Repeat the following block for each set of links */}
        <div className="mb-6">
          <h5 className="mb-2.5 font-bold uppercase">Links</h5>

          <ul className="mb-0 list-none">
            <li>
              <a href="#!" className="text-white">
                Link 1
              </a>
            </li>
            <li>
              <a href="#!" className="text-white">
                Link 2
              </a>
            </li>
            <li>
              <a href="#!" className="text-white">
                Link 3
              </a>
            </li>
            <li>
              <a href="#!" className="text-white">
                Link 4
              </a>
            </li>
          </ul>
        </div>
        {/* Repeat the above block for other sets of links */}
      </div>
    </div>

    {/* Copyright section */}
    <div
      className="w-full p-4 text-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
    >
      © 2023 Copyright:
      <a className="text-white" href="https://tw-elements.com/">
        TW elements
      </a>
    </div>
  </footer>  )
}
