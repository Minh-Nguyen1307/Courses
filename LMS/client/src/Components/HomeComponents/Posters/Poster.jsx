import React from "react";

export default function Poster(props) {
  const { numberStatus, describeStatus } = props;
  return (
    <div className='d-flex flex-column justify-center items-center gap-3 w-1/4 border-l-4 border-r-4'>
      <h3 className='text-4xl font-semibold text-gray-800'>{numberStatus}</h3>
      <p>{describeStatus}</p>
    </div>
  );
}