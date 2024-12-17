import { faBookOpen, faBookOpenReader, faGear, faLandmark, faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  return (
    <div className="h-screen bg-gray-900 flex flex-col justify-between p-6 w-full">
      <div>
        <div className="w-full mb-10">
          <Link to="/">
            <img src="/Logo.png" alt="Logo of Byway" className="w-32 mx-auto" />
          </Link>
        </div>
        <div className="my-10 px-4">
          <Link to="/admin-dashboard" className="text-3xl text-white font-bold mb-4 block"> 
            Dashboard
          </Link>
        </div>
        <ul className="space-y-4">
          <li>
            <Link
              to="/admin-dashboard/clients"
              className={`block px-4 py-2 rounded-lg ${
                location.pathname === "/admin-dashboard/clients"
                  ? "bg-white text-black"
                  : "text-white hover:font-bold hover:text-black"
              }`}
            >
              <FontAwesomeIcon icon={faBookOpenReader} className="mr-3" />
              Clients
            </Link>
          </li>
          <li>
            <Link
              to="/admin-dashboard/courses"
              className={`block px-4 py-2 rounded-lg ${
                location.pathname === "/admin-dashboard/courses"
                  ? "bg-white text-black"
                  : "text-white hover:font-bold hover:text-black"
              }`}
            >
              <FontAwesomeIcon icon={faBookOpen} className="mr-3" />
              Courses
            </Link>
          </li>
          <li>
            <Link
              to="/admin-dashboard/communication"
              className={`block px-4 py-2 rounded-lg ${
                location.pathname === "/admin-dashboard/communication"
                  ? "bg-white text-black"
                  : "text-white hover:font-bold hover:text-black"
              }`}
            >
              <FontAwesomeIcon icon={faMessage} className="mr-3" />
              Communication
            </Link>
          </li>
          <li>
            <Link
              to="/admin-dashboard/revenue"
              className={`block px-4 py-2 rounded-lg ${
                location.pathname === "/admin-dashboard/revenue"
                  ? "bg-white text-black"
                  : "text-white hover:font-bold hover:text-black"
              }`}
            >
              <FontAwesomeIcon icon={faLandmark} className="mr-3" />
              Revenue
            </Link>
          </li>
          <li>
            <Link
              to="/admin-dashboard/setting"
              className={`block px-4 py-2 rounded-lg ${
                location.pathname === "/admin-dashboard/setting"
                  ? "bg-white text-black"
                  : "text-white hover:font-bold hover:text-black"
              }`}
            >
              <FontAwesomeIcon icon={faGear} className="mr-3" />
              Setting
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <button
          className="text-white hover:text-red-900 focus:outline-none w-full text-left hover:font-extrabold px-4"
          onClick={() => {}}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}