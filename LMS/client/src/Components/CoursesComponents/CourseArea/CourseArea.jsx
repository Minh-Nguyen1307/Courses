// import React from "react";

// const CourseArea = ({ course }) => {
//   return (
//     <div className="bg-gray-100 rounded-lg shadow-lg p-10 max-w-xs mx-auto my-6">
//       {/* Course Image */}
//       <img
//         src={course.image} 
//         alt={course.nameCourse}
//         className="w-full h-32 object-cover rounded-md mb-4"
//       />

//       {/* Course Title */}
//       <h2 className="text-xl font-bold text-gray-800 mb-2 truncate text-left">
//         {course.nameCourse} {/* Ensure this is a string */}
//       </h2>

//       {/* Course Author */}
//       <div className="text-left">
//         <span className="">By {course.author}</span> {/* Ensure this is a string */}
//       </div>

//       {/* Course Category */}
//       <div className="text-left">
//         <span className="">Category: {course.category}</span> {/* Ensure this is a string */}
//       </div>

//       {/* Course Rating */}
//       <div className="flex justify-between text-sm pt-2 text-gray-600 mb-1">
//         <span>{`⭐⭐⭐⭐⭐ ${course.rating} (${course.numRatings} ratings)`}</span>
//       </div>

//       {/* Course Enrollment and Chapters */}
//       <div className="flex justify-between text-sm text-gray-600 mb-2">
//         <span className="">Orders: {course.enrollment}</span>
//         <span>Chapters: {course.chapters}</span>
//       </div>

//       {/* Course Price */}
//       <div>
//         <span className="text-2xl font-semibold text-gray-800">
//           {`$ ${course.price}`}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default CourseArea;
