import React from "react";
import { Link } from "react-router-dom";


export default function CoursesDashboard() {
  return (
    <div className="h-screen">
      <div className="flex justify-between">
        <div className="text-4xl p-5">Courses</div>
        <div className="p-5">
          <Link to="upload">
            <button className="btn btn-success">Add Courses</button>
          </Link>
        </div>
      </div>
      <hr />
      <div>
        
      </div>
    </div>
  );
}
