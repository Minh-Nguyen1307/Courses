import React from 'react'
import { Link } from 'react-router-dom'

export default function Breadcrumb() {
  return (
    <div>
        <div className="my-4">
          <p className="text-4xl font-medium">All Courses</p>
        </div>
        <div>
          <nav aria-label="breadcrumb" className="text-lg my-5">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Courses
              </li>
            </ol>
          </nav>
        </div>
    </div>
  )
}
