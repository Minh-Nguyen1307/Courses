import React from 'react'
import Banners from '../../Components/HomeComponents/Banners/Banners'
import Posters from '../../Components/HomeComponents/Posters/Posters'
import TopCourses from '../../Components/HomeComponents/TopCourses/TopCourses'
import Appendix from '../../Components/HomeComponents/Appendix/Appendix'




export default function HomePage() {

  return (
    
    <div>
        <Banners />
        <Posters />
        <TopCourses />
        <Appendix />
    </div>
  )
}
