import React from 'react';
import Categories from './Categories';
import Search from '../Search/Search';
import './CategoriesLayout.css';

const CategoriesLayout = (props) => {
  return (
    <div className='flex-container'>
      <div className='categories'>
        <Categories 
          isLoggedIn = {props.isLoggedIn}
        />
      </div>
      <div className='search'>
        <Search 
          isLoggedIn = {props.isLoggedIn}
          fact={props.fact}
        />
      </div>
    </div>
  )
}

export default CategoriesLayout