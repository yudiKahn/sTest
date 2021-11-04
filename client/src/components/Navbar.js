import React, { useState } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../redux/actions';

function Navbar({user, logout}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-50 relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 lg:justify-start lg:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link to="/" className="relative z-10 flex items-center w-auto text-2xl font-extrabold leading-none text-black select-none">
                sukkotMe<span className="text-green-600">.</span>
              </Link>
            </div>
            <div className="-mr-2 -my-2 lg:hidden">
              <button
                type="button"
                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
                onClick={() => setOpen(!open)}
              >
                <span className="sr-only">Open menu</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
            <nav className="hidden lg:flex space-x-10">
              <Link to="/" className="relative font-medium leading-6 text-gray-600 transition duration-150 ease-out hover:text-gray-900">
                <span className="block">Home</span>
              </Link>     
              <Link to="/gallery" className="relative font-medium leading-6 text-gray-600 transition duration-150 ease-out hover:text-gray-900">
                <span className="block">Gallery</span>
              </Link>
              <Link to="/shop/all" className="relative font-medium leading-6 text-gray-600 transition duration-150 ease-out hover:text-gray-900">
                <span className="block">Shop</span>
              </Link>
              {
                user._id && <Link to="/user" className="relative font-medium leading-6 text-gray-600 transition duration-150 ease-out hover:text-gray-900">
                  <span className="block">{user.firstName}'s Place</span>
                </Link>
              }
              {
                user._id && user.isAdmin && <Link to="/admin" className="relative font-medium leading-6 text-gray-600 transition duration-150 ease-out hover:text-gray-900">
                  <span className="block">Admin's Place</span>
                </Link>
              }
            </nav>
            <div className="hidden lg:flex items-center justify-end lg:flex-1 lg:w-0">
            {
              user._id ? <span onClick={logout} className="cursor-pointer inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:shadow-none">
                Logout
              </span> : <span className="inline-flex rounded-md shadow-sm">
                <Link to="/login" className="cursor-pointer inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-green-600 border border-green-700 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Login
                </Link>
              </span>
            }
            </div>
          </div>
        </div>
        <div
          className={
            open
              ? "scale-100 transition ease-out duration-200 absolute top-0 inset-x-0 p-2 transition transform origin-top-right lg:hidden"
              : "hidden scale-95 absolute top-0 inset-x-0 p-2 transition transform origin-top-right lg:hidden"
          }
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  
                </div>
                <div className="-mr-2">
                  <button
                    type="button"
                    className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
                    onClick={() => setOpen(!open)}
                  >
                    <span className="sr-only">Close menu</span>
                    {/* Heroicon name: outline/x */}
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <Link to="/" className="relative font-medium leading-6 text-gray-600 transition duration-150 ease-out hover:text-gray-900">
                  <span className="block">Home</span>
                </Link>     
                <Link to="/gallery" className="relative font-medium leading-6 text-gray-600 transition duration-150 ease-out hover:text-gray-900">
                  <span className="block">Gallery</span>
                </Link>
                <Link to="/shop/all" className="relative font-medium leading-6 text-gray-600 transition duration-150 ease-out hover:text-gray-900">
                  <span className="block">Shop</span>
                </Link>
                {
                  user._id && <Link to="/user" className="relative font-medium leading-6 text-gray-600 transition duration-150 ease-out hover:text-gray-900">
                    <span className="block">{user.firstName}'s Place</span>
                  </Link>
                }
                {
                  user._id && user.isAdmin && <Link to="/admin" className="relative font-medium leading-6 text-gray-600 transition duration-150 ease-out hover:text-gray-900">
                    <span className="block">Admin's Place</span>
                  </Link>
                }
              </div>
              <div>
              {
                user._id ? <span onClick={logout} className="w-full cursor-pointer inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:shadow-none">
                  Logout
                </span> : <span className="w-full inline-flex rounded-md shadow-sm">
                  <Link to="/login" className="w-full cursor-pointer inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-green-600 border border-green-700 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Login
                  </Link>
                </span>
              }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(s=>({user:s.user}), {logout})(Navbar);