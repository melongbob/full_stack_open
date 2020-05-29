import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Header = ({text}) => <h1>{text}</h1>

const Button = ({text, handleClick}) => (
  <button onClick={handleClick}>
    {text}
  </button>
);

const Statistic = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ratings}) => {
  const [good, neutral, bad] = ratings;
  if(good === 0 && neutral === 0 && bad ===0)
    return (
      <div>
        <p>
          No feedback given
        </p>
      </div>
    );
    
  return ( 
  <div>
    <table>
      <tbody>
        <Statistic text='good' value={good}/>
        <Statistic text='neutral' value={neutral}/>
        <Statistic text='bad' value={bad}/>
        <tr>
          <td>all</td>
          <td>
          {good + neutral + bad}
          </td>
        </tr>
        <tr>
          <td>average</td>
          <td>
            {(good - bad)/(good + neutral + bad)}
          </td>
        </tr>
        <tr>
          <td>positive</td>
          <td>
            {good*100/(good + neutral + bad)}%
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  )
};

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
      <Statistics ratings={[good, neutral, bad]} />
    </div>
  );
}

ReactDOM.render(<App />,
  document.getElementById('root')
);