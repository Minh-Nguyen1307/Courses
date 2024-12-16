import React, {useState} from 'react'


import { v4 as uuidv4 } from 'uuid';

import PosterList from './PosterList';

const allPosters = [
    {
        id: uuidv4(),
        numberStatus: '25000+',
        describeStatus: 'Enrolled students in our courses',
    },
    {
        id: uuidv4(),
        numberStatus: '1000+',
        describeStatus: 'Available online courses',
    },
    {
        id: uuidv4(),
        numberStatus: '1500+',
        describeStatus: 'Experienced mentors teaching courses',
    },
    {
        id: uuidv4(),
        numberStatus: '2400+',
        describeStatus: 'Hours of video content available',
    },
];
export default function Posters() {
  const [poster, setPoster] = useState(allPosters)
  return (
    <div>
      <PosterList poster = {poster} />
    </div>
  )
}
