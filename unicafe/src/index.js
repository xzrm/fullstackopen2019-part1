import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Buttons = (props) => {
  return (
    <div>
      <Button handleClick={props.handleClickGood} text='good' />
      <Button handleClick={props.handleClickNeutral} text='neutral' />
      <Button handleClick={props.handleClickBad} text='bad' />
    </div>
  )
}

const DisplayTitle = (props) => {
  return (
    <div><h1>{props.text}</h1></div>
  )
}

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.valueGood == 0 && props.valueNeutral == 0 && props.valueBad == 0) {
    return (
      <div>No feedback given</div>
    )
  } else {
    return (
      <table>
        <tbody>
          <Statistic text="good" value={props.valueGood} />
          <Statistic text="neutral" value={props.valueNeutral} />
          <Statistic text="bad" value={props.valueBad} />
          <Statistic text="average" value={props.valueAvg} />
          <Statistic text="positive" value={props.valuePositive} />
        </tbody>
      </table>
    )
  }
}

const average = (good, neutral, bad) => {
  return ((good * 1 + bad * (-1)) / (good + neutral + bad)).toFixed(2)
}

const positive = (good, neutral, bad) => {
  return ((good / (good + neutral + bad))).toFixed(2)
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToValue = (func, value) => {
    func(value)
  }

  return (
    <div>
      <DisplayTitle text='give feedback' />

      <Buttons handleClickGood={() => setToValue(setGood, good + 1)}
        handleClickNeutral={() => setToValue(setNeutral, neutral + 1)}
        handleClickBad={() => setToValue(setBad, bad + 1)} />

      <DisplayTitle text='statistics' />
      <Statistics valueGood={good} valueNeutral={neutral}
        valueBad={bad} valueAvg={average(good, neutral, bad)}
        valuePositive={positive(good, neutral, bad)} />

    </div>

  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)