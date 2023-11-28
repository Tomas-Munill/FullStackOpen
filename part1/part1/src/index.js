import React from 'react'
import ReactDOM from 'react-dom'

const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

// App es un componente
const App = () => { 
  console.log("Mi primer componente en react")

  const now = new Date()
  const a = 10
  const b = 20
  const name = "Ricardo"

  return (
  <>
    <p>Hello world, it is {now.toString()}</p>
    <p>
      {a} + {b} is {a+b}
    </p>
    // Este es un componente nuevo y puede ser reutilizado muchas veces
    <Hello name="Tomas" age="20" />
    <Hello name="Ivan" age="20" />
    <Hello name="Tadeo" age="20" />
    <Hello name={name} age={a+b} />
  </>
  )
}

ReactDOM.render(<App />, document.getElementById('root')) 
