// import React from "react";
// import CourseArea from "./CourseArea/CourseArea";

// const ListCourses = ({ courses, filters, setFilters, loading, error }) => {
//   const handleFilterChange = (key, value) => {
//     setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <>
//       <div className="mb-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           <input
//             type="text"
//             placeholder="Search courses"
//             className="border p-2 rounded"
//             value={filters.search}
//             onChange={(e) => handleFilterChange("search", e.target.value)}
//           />
//           <select
//             className="border p-2 rounded"
//             value={filters.category}
//             onChange={(e) => handleFilterChange("category", e.target.value)}
//           >
//             <option value="">All Categories</option>
//             <option value="tech">Tech</option>
//             <option value="business">Business</option>
//           </select>
//           <select
//             className="border p-2 rounded"
//             value={filters.level}
//             onChange={(e) => handleFilterChange("level", e.target.value)}
//           >
//             <option value="">All Levels</option>
//             <option value="Beginner">Beginner</option>
//             <option value="Intermediate">Intermediate</option>
//             <option value="Advanced">Advanced</option>
//           </select>
//           <select
//             className="border p-2 rounded"
//             value={filters.sortBy}
//             onChange={(e) => handleFilterChange("sortBy", e.target.value)}
//           >
//             <option value="">Sort By</option>
//             <option value="price">Price (Low to High)</option>
//             <option value="-price">Price (High to Low)</option>
//             <option value="rating">Rating</option>
//             <option value="numRatings">Most Reviewed</option>
//             <option value="discount">Discount</option>
//             <option value="new">Newly Updated</option>
//           </select>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {courses.length > 0 ? (
//           courses.map((course) => <CourseArea key={course._id} course={course} />)
//         ) : (
//           <div>No courses available.</div>
//         )}
//       </div>
//     </>
//   );
// };

// export default ListCourses;
