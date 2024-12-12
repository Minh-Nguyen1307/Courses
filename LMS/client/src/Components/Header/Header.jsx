import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // Implement search functionality or filtering logic here
    console.log("Searching for:", e.target.value);
  };

  return (
    <div className="bg-slate-50">
      <div className="mx-10 flex justify-between items-center h-20">
        {/* Logo Section */}
        <div>
          <Link to="/" className="text-2xl">
            <img src="/Logo1.png" alt="Logo of Byway" className="w-32" />
          </Link>
        </div>

        {/* Courses Link */}
        <div>
          <Link to="/courses" className="text-2xl">
            Courses
          </Link>
        </div>
        
        {/* Search Input */}
        <div className="w-1/2">
          <form className="border border-black rounded-lg flex justify-start">
            <button type="button" className="flex items-center">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="ml-2 text-2xl" />
            </button>
            <input
              type="search"
              placeholder="Search Courses"
              className="w-11/12 border-none focus:outline-none p-2 bg-slate-50"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </form>
        </div>
        
        {/* Sign-in/Sign-up Section */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-4 w-full">
            <Link to="/signin">
              <button className="border border-gray-300 p-2">Sign in</button>
            </Link>
            <Link to="/signup">
              <button className="border bg-emerald-800 text-white p-2">Sign up</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
