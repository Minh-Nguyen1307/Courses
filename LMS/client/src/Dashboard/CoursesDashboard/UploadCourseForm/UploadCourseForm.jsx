import React, { useState } from 'react'; 
import axios from 'axios';

function UploadCourseForm() {
  const [courseData, setCourseData] = useState({
    nameCourse: '',
    price: '',
    category: '',
    rating: '',
    numRatings: '',
    video: '',
    description: '',
    image: null,
    author: '',
    duration: '',
    level: '',
    prerequisites: '',
    tags: '',
    discount: '',
    enrollmentCount: '',
    certification: '',
    chapters: [
      {
        title: "",
        content: "",
        duration: "",
        objectives: "",
        resources: "",
      }
    ],
    timestamp: new Date(),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setCourseData((prevData) => ({
      ...prevData,
      image: e.target.files[0], // Store the selected file
    }));
  };

  const handleChapterChange = (index, e) => {
    const { name, value } = e.target;
    const updatedChapters = [...courseData.chapters];
    updatedChapters[index] = {
      ...updatedChapters[index],
      [name]: value,
    };
    setCourseData((prevData) => ({
      ...prevData,
      chapters: updatedChapters,
    }));
  };

  const handleAddChapter = () => {
    setCourseData((prevData) => ({
      ...prevData,
      chapters: [...prevData.chapters, { title: "", content: "", duration: "", objectives: "", resources: "" }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append all course data to formData, including the image file
    for (const key in courseData) {
      formData.append(key, courseData[key]);
    }

    try {
      // Send the form data to the backend API (POST request to upload course)
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/admin/uploadCourses`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type for file upload
        },
      });

      if (response.status === 200) {
        alert('Course uploaded successfully');
        window.location.reload();
      }
    } catch (error) {
      console.error('Error uploading course:', error);
      alert('Failed to upload course');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="mx-32 my-10 bg-white shadow-md rounded-md p-3 max-h-screen overflow-y-auto"
    >
      <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center">Upload Course</h2>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Course Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
          <input
            type="text"
            name="nameCourse"
            value={courseData.nameCourse}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter course name"
            required
          />
        </div>

        {/* Author Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Author Name</label>
          <input
            type="text"
            name="author"
            value={courseData.author}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter author name"
            required
          />
        </div>

        {/* Chapters */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Chapters</label>
          {courseData.chapters.map((chapter, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-md shadow-sm mb-4">
              <h3 className="text-xl font-semibold mb-2">Chapter {index + 1}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={chapter.title}
                    onChange={(e) => handleChapterChange(index, e)}
                    className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Chapter Title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (in hours)</label>
                  <input
                    type="number"
                    name="duration"
                    value={chapter.duration}
                    onChange={(e) => handleChapterChange(index, e)}
                    className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Duration"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  name="content"
                  value={chapter.content}
                  onChange={(e) => handleChapterChange(index, e)}
                  className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter content"
                  rows="3"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Objectives</label>
                <textarea
                  name="objectives"
                  value={chapter.objectives}
                  onChange={(e) => handleChapterChange(index, e)}
                  className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter learning objectives"
                  rows="3"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Resources</label>
                <textarea
                  name="resources"
                  value={chapter.resources}
                  onChange={(e) => handleChapterChange(index, e)}
                  className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter resources"
                  rows="3"
                ></textarea>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddChapter}
            className="mt-4 text-sm text-blue-600 hover:underline"
          >
            Add New Chapter
          </button>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
          <input
            type="number"
            name="price"
            value={courseData.price}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter course price"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={courseData.category}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter course category"
            required
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
          <input
            type="number"
            name="rating"
            value={courseData.rating}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter rating (1-5)"
            required
          />
        </div>

        {/* Number of Ratings */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Ratings</label>
          <input
            type="number"
            name="numRatings"
            value={courseData.numRatings}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter number of ratings"
            required
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Duration (in hours)</label>
          <input
            type="number"
            name="duration"
            value={courseData.duration}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter course duration"
            required
          />
        </div>
      </div>

      {/* Video URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Video URL</label>
        <input
          type="text"
          name="video"
          value={courseData.video}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter video URL"
        />
      </div>

      {/* Description Field */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          value={courseData.description}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter course description"
          rows="6"
          required
        ></textarea>
      </div>

      {/* Submit Button */}
      <div className='text-center'>
        <button
          type="submit"
          className="w-1/2 text-2xl py-2 mt-6 bg-gray-800 text-white font-medium rounded-md shadow-md hover:bg-gray-900 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Upload Course
        </button>
      </div>
    </form>
  );
}

export default UploadCourseForm;
