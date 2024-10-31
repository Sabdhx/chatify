import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react'
import UploadWidget from "../uploadWIdget/UploadWedgit"


export default function Register() {
  const navigate = useNavigate();
  const [images  , setImages] = useState(null)
   console.log(images)
  const handleEvent = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target); // `e.target` is the form
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    console.log({ name, email, password,images });

    try {
      const response = await axios.post("http://localhost:5000/auth/register", {
        name,
        email,
        password,
        profilePicture:images
      });
      console.log(response.data);
     if(name && email && password && images ){
      navigate("/login")
     }
    } catch (error) {
      console.error("Registration error:", error);
      // Optionally, you can show an error message to the user here
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6" onSubmit={handleEvent}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


        {/* <input type="file" onChange={(e)=>{uploadWedget(e.target.value)}} /> */}
    
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="sideContainer">
        <img  src={images} alt="" className=" w-[30%] m-3" />
     
          
      <UploadWidget
          uwConfig={{
            cloudName: "lamadev",
            uploadPreset: "estate",
            multiple: false,
            maxImageFileSize: 2000000,
            folder: "avatars",
          }}
          setState={setImages}
        />  
       
       
</div>
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Log in here
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
