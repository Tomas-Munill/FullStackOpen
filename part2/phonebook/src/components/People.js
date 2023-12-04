import React from 'react';

const People  = ({ peopleToShow, handlerDeleteClick }) => {
    return (
      <ul>
        {peopleToShow.map(p => 
        <li key={p.name}>{p.name} {p.number} <button type='button' onClick={() => handlerDeleteClick(p.name)}>Delete</button></li>)}
      </ul>
    )
  };

export default People;