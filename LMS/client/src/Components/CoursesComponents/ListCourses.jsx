import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseArea from './CourseArea';


const ListCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);  // To manage loading state

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/getCourses`);
        console.log("Response Data:", response.data);

        if (Array.isArray(response.data.courses)) {
          setCourses(response.data.courses);  // Set courses in state
        } else {
          console.error("Expected an array under 'courses', but got", response.data);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);  // Stop loading when the fetch is done
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5 bg-gray-50 rounded-lg">
      

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.length > 0 ? (
          courses.map(course => (
            <CourseArea key={course._id} course={course} />
          ))
        ) : (
          <div>No courses available.</div>
        )}
      </div>
    </div>
  );
};

export default ListCourses;
