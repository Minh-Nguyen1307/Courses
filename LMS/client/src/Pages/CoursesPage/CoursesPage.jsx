import React from 'react'
import Breadcrumb from '../../Components/CoursesComponents/BreadCrumb'
import ListCourses from '../../Components/CoursesComponents/ListCourses'

export default function CoursesPage() {
  return (
    <div className='mx-10'>
      <div>
        <p className="text-4xl font-medium my-4">All Courses</p>
      </div>
      <div>
        <Breadcrumb />
      </div>
      <div> 
        <ListCourses />
      </div>

    </div>
  )
}
