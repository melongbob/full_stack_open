import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Header = ({text}) => <h1>{text}</h1>
const Button = ({text, handleClick}) => (
  <button onClick={handleClick}>
    {text}
  </button>
);
const Rating = ({text, rating}) => (
<p>{text} {rating}</p>
);

const App = () =>{
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return(
    <div>
      <Header text='give feedback'/>
      <Button text='good' handleClick={() => setGood(good + 1)} />
      <Button text='neutral' handleClick={() => setNeutral(neutral + 1)} />
      <Button text='bad' handleClick={() => setBad(bad + 1)} />
      
      <Header text='statistics'/>
      <Rating text='good' rating={good}/>
      <Rating text='neutral' rating={neutral}/>
      <Rating text='bad' rating={bad}/>
    </div>
  );
}

ReactDOM.render(<App />,
  document.getElementById('root')
);