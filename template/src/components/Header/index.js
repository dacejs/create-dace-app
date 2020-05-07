import React from 'react';
import { Link } from 'dace';

export default () => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/list">List</Link>
      </li>
      <li>
        <Link to="/detail">Detail</Link>
      </li>
    </ul>
  </nav>
);
