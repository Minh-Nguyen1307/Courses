import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);

  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/courses`); // Replace with your API endpoint
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="mx-10">
      <div>
        <Breadcrumb />
      </div>
      <h2 className="text-2xl font-bold mb-6">Available Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course._id} className="border rounded-lg overflow-hidden shadow-md">
            <img
              src={course.image}
              alt={course.nameCourse}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{course.nameCourse}</h3>
              <p className="text-gray-600 mt-2">{course.author}</p>
              <p className="text-gray-500 text-sm mt-2">Level: {course.level}</p>
              <p className="text-gray-500 text-sm mt-1">Category: {course.category}</p>
              <p className="text-gray-600 mt-2">
                <span className="font-bold">Price: </span>${course.price}
              </p>
              <p className="text-gray-500 mt-2">
                <span className="font-bold">Discount: </span>{course.discount}%
              </p>
              <button
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg"
                onClick={() => alert('Enroll Now!')}
              >
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
