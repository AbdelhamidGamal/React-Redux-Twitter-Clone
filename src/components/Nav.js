import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Nav extends Component {
  render() {
    return (
      <div className='nav'>
        <ul>
          <li>
            <Link to='/new'>New Tweet</Link>
          </li>
          <li>
            <Link to='/'>Home</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Nav;
