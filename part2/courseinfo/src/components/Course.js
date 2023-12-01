import React from "react";

const Course = ({ course }) => (
        <>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total sum={course.parts.reduce((suma, part) => suma += part.exercises , 0)}/>
      </>
    );

const Header = ({ course }) => <h2>{course}</h2>;

const Content = ({ parts }) => {
    /*hay un warning relacionado con la posibilidad de que algunos elementos dentro de course.parts no tengan una propiedad id o que id pueda ser undefined para algunos elementos. Por lo tanto debo verificar si existe antes de crear el elemento Part */   
    return (
    <>
        {parts.map((part) => (part.id 
            ? <Part key={part.id} part={part} /> 
            : null))}
    </>
)};

const Part = ({ part }) => (
    <p>
      {part.name} {part.exercises}
    </p>
  );

const Total = ({ sum }) => <p>Number of exercises {sum}</p>;

export default Course;
