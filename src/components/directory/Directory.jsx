import React from 'react'
import Category from '../categories/Category'

import './directory.scss';


const Directory = ({ structure }) => {

  return (
    <div className='categories-container'>
      {structure.map((item) => <Category itemObj={item} key={item.id} />)}
    </div>
  )
}

export default Directory