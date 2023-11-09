"use client";
import React, { use, useState } from "react";
import Navbar from "@/Components/navbar/index.js";
import Footer from "@/Components/Footer/index.js";
import { ReactSortable } from "react-sortablejs";
import Spinner from "@/Components/spinner/index.js";
import { UploadButton } from "@/utils/uploadthing";

function ContactForm() {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [title,setTitle] = useState('')
  const [description,setDescription] = useState('')
  const [company,setCompany] = useState('')
  const [price,setPrice] = useState('');
  const [h1,setH1] = useState('')
  const [category,setCategory] = useState('')
  const [images, setImages] = useState([]);
  
  const [isUploading, setIsUploading] = useState(false);


  // button
  const mapcategory = ['653663f07c87a31b4bef530bPop',
                        '6536504347e91cf5f1b48997HipHop',
                         '6536505647e91cf5f1b4899cEDM',]
  const gradientClasses = [
    "from-blue-500 via-blue-600 to-blue-700",
    "from-green-500 via-green-600 to-green-700",
    "from-red-500 via-red-600 to-red-700",
    // Add more gradient classes as needed
  ];
  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory.slice(0,24));
  };
  console.log(category)
  const buttons = mapcategory.map((cat, index) => (
    <button
      key={index}
      type="button"
      onClick={() => handleCategorySelect(cat)}

      className={`text-white bg-gradient-to-r ${gradientClasses[index]} hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`}
    >
      {cat.slice(24)}
    </button>
  ));


    console.log(images)
  function updateImagesOrder(images) {
    setImages(images);
  }

  const handleUploadStart = () => {
    setIsUploading(true);
  };

  const handleUploadComplete = (res) => {
    // Create a new array that combines the existing images with the new one
    setIsUploading(false);

    const newImages = [...images, ...res.map((item) => item.fileUrl)];
    setImages(newImages);
    console.log("Files: ", newImages);
  };

  const handleSubmit = () => {
    // Create an object with the form data
    const formData = {
      name,
      email,
      title,
      description,
      company,
      price,
      h1,
      category,
      images,
    };
    console.log(formData) 
    // Send a POST request with the form data
    fetch('/api/listevent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Form data submitted successfully:', data);
        setName('');
        setEmail('');
        setTitle('');
        setDescription('');
        setCompany('');
        setPrice('');
        setH1('');
        setCategory('');
        setImages([]);
      })
      .catch((error) => {
        console.error('Error submitting form data:', error);
      });
  };
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center p-12">
        {/* Author: FormBold Team */}
        {/* Learn More: https://formbold.com */}
        <div className="mx-auto w-full max-w-[550px]">
            <div className="mb-5">
              <label
                htmlFor="name"
                className="mb-3 block text-base font-medium text-white"
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value) }
                id="name"
                placeholder="Full Name"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="mb-3 block text-base font-medium text-white"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value) }

                id="email"
                placeholder="example@domain.com"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
                <div className="mb-5">
              <label
                htmlFor="name"
                className="mb-3 block text-base font-medium text-white"
              >
                Title
              </label>
              <input
                type="text"
                name="Title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value) }

                placeholder="Your Title"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            </div>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="mb-3 block text-base font-medium text-white"
              >
                Company
              </label>
              <input
                type="text"
                name="company"
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value) }

                placeholder="your Company name"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="mb-3 block text-base font-medium text-white"
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value) }

                placeholder="company"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-2 flex flex-wrap gap-1"
                  onClick={handleUploadStart}>
              <ReactSortable
                list={images}
                className="flex flex-wrap gap-1"
                setList={updateImagesOrder}
              >
                {images?.length &&
                  images.map((image) => (
                    <div
                      key={image}
                      className="h-24 bg-black p-4 shadow-sm rounded-sm border border-gray-200 items-center"
                    >
                      <img
                        src={image}
                        alt=""
                        className="w-full h-full rounded-lg"
                      />
                    </div>
                  ))}
              </ReactSortable>
              {isUploading && (
                <div className="h-24 flex items-center">
                  <Spinner />
                </div>
              )}
              <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-black shadow-sm border border-primary">
              <UploadButton
                
              
              className="hidden"
              endpoint="imageUploader"
              
              onClientUploadComplete={handleUploadComplete}
              
              onUploadError={(error) => {
                setIsUploading(false);

                                alert(`ERROR! ${error.message}`);
              }}
            />
            
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
                <div>Add image</div>
              </label>
            </div>
            
              <div>{buttons}</div>
            <div className="mb-5">
              <label
                htmlFor="subject"
                className="mb-3 block text-base font-medium text-white"
              >
                Heading 
              </label>
              <input
                type="text"
                name="subject"
                id="subject"
                value={h1}
                onChange={(e) => setH1(e.target.value) }

                placeholder="Enter your Heading"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="message"
                className="mb-3 block text-base font-medium text-white"
              >
                Message
              </label>
              <textarea
                rows="4"
                name="message"
                id="message"
                placeholder="Type your message"
                value={description}
                onChange={(e) => setDescription(e.target.value) }

                className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              ></textarea>
            </div>
            <div>
              <button
                onClick={handleSubmit}
              className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
                Submit
              </button>
            </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ContactForm;
