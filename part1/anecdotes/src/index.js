import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ texto, manejadorEventoClick }) => {
  return <button onClick={manejadorEventoClick}>{texto}</button>;
};

const Title = ({texto}) => {
  return <h1>{texto}</h1>;
};

const Anecdote = ({texto}) => {
  return <p>{texto}</p>
};

const Votes = ({selected, points}) => {
  if (points[selected] === 0) {
    return (
      <p>No tiene votos</p>
    );
  }
  return (
    <p>Tiene {points[selected]} votos</p>  
  )
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const App = (props) => {
  const [selected, setSelected] = useState(getRandomInt(props.anecdotes.length));
  const [points, setPoints] = useState(new Array(props.anecdotes.length).fill(0));
  
  console.log(points)

  const getAnecdote = () => {
    setSelected(getRandomInt(props.anecdotes.length))
  }

  const vote = () => {
    const newPoints = [].concat(points);
    // const newPoints = [...points]
    newPoints[selected] += 1
    setPoints(newPoints)
  }

  const getAnecdoteWithMostVotes = () => {
    let mayor = points[0];
    let posicionMayor = 0;
    for (let i = 0; i <= points.length; i++) {
      if (points[i] > mayor) {
        mayor = points[i];
        posicionMayor = i;
      };
    }
    return anecdotes[posicionMayor];
  }

  return (
    <div>
      <Title texto={"Anecdote of the day"}/>
      <Anecdote texto={props.anecdotes[selected]} />
      <Votes selected={selected} points={points}/>
      <Button texto="vote" manejadorEventoClick={vote}/>
      <Button texto="next anecdote" manejadorEventoClick={getAnecdote} />
      <Title texto={"Anecdote with most votes"}/>
      <Anecdote texto={getAnecdoteWithMostVotes()} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
  <App anecdotes={anecdotes}/>,
  document.getElementById('root')
)