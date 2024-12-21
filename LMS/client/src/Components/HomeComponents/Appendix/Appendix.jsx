import React from "react";
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

export default function Appendix() {
  return (
    <div className='my-20'>
      <div className='d-flex justify-around items-center '>
        <div className=''>
          <img src='banner41.png' alt='' className='w-96' />
        </div>
        <div className=''>
          <h3 className='text-3xl font-semibold'>Become an Instructor</h3>
          <p className='my-4'>
            Instructors from around the world teach millions of students on
            Byway. We provide the tools and skills to teach what you love.
          </p>
          <Link to='/courses'>
            <button type='button' className='btn btn-success p-2'>
              Start Your Instructor Journey{" "}
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </Link>
        </div>
      </div>
      <div className='d-flex justify-around items-center'>
        <div>
          <h3 className='text-3xl font-semibold'>
            Transform your life through education
          </h3>
          <p className='my-4'>
            Learners around the world are launching new careers, advancing in
            their fields, and enriching their lives.
          </p>
          <Link to='/courses'>
            <button type='button' className='btn btn-warning p-2'>
              Checkout Courses <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </Link>
        </div>
        <div>
          <img src='banner51.png' alt='' className='w-96' />
        </div>
      </div>
    </div>
  );
}
