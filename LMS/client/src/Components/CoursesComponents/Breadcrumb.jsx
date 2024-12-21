import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = () => (
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
);

export default Breadcrumb;