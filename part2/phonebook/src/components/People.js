import React from 'react';

const People  = ({ peopleToShow }) => {
    return (
      <ul>
        {peopleToShow.map(p => <li key={p.name}>{p.name} {p.number}</li>)}
      </ul>
    )
  };

export default People;