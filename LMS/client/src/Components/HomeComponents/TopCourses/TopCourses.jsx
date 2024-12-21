import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CoursesList from '../../CoursesComponents/CourseArea/CoursesList';
import axios from 'axios';

export default function TopCourses() {
  const [topCourses, setTopCourses] = useState([]);

  useEffect(() => {
    const fetchTopCourses = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/topcourses`);
        if (Array.isArray(response.data)) {
          setTopCourses(response.data); // Store all courses in the state
        } else {
          console.error("Expected an array, but got", response.data);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    fetchTopCourses();
  }, []);

  return (
    <div>
      <h4 className='text-4xl font-semibold text-gray-800 mx-10 mt-5 '>
        Top Courses
      </h4>
      <Link to='/courses' className='text-blue-800 text-right block mx-10 mt-2'>
        See all
      </Link>
      <div className='mx-10 my-5'>
        {/* Pass topCourses as a prop to CoursesList */}
        <CoursesList courses={topCourses}/>
      </div>
    </div>
  );
}
