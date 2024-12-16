import React from "react";
import Poster from "./Poster";



export default function PosterList(props) {
  const { poster = [] } = props;
  const listPoster =
    poster &&
    poster.map((allPoster) => (
      <Poster
        key={allPoster.id}
        numberStatus={allPoster.numberStatus}
        describeStatus={allPoster.describeStatus}
      />
    ));
  return (
    <div className='d-flex justify-around items-center h-48 bg-zinc-100 gap-2 mb-5 '>
      {listPoster}
    </div>
  );
}