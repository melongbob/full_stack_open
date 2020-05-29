import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return(
  <h1>{props.course}</h1>
  );
}

const Content = ({parts}) => {
  return(
    <div>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </div>
  );
}

const Part = (props) => {
  const { name, exercises } = props.part
  return(
    <p>{name} {exercises}</p>
  );
}

const Total = ({parts}) => {
  let total = parts.map(part => part.exercises).reduce((a, b) => a + b, 0)
  return(
    <p>Number of exercises {total}</p>
  );
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7  
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };

  return(
    <div>
      <Header course = {course.name}/>
      <Content parts = {course.parts}/>
      <Total parts = {course.parts} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));