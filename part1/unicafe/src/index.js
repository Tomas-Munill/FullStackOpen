import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <Title texto={"give feedback"} />
      <Button texto={"good"} manejadorEventoClick={() => setGood(good + 1)} />
      <Button
        texto={"neutral"}
        manejadorEventoClick={() => setNeutral(neutral + 1)}
      />
      <Button texto={"bad"} manejadorEventoClick={() => setBad(bad + 1)} />
      <Title texto={"statistics"} />
      <StatisticsTable good={good} neutral={neutral} bad={bad} />
    </>
  );
};

const Button = ({ texto, manejadorEventoClick }) => {
  return <button onClick={manejadorEventoClick}>{texto}</button>;
};

const Title = ({ texto }) => {
  return <h1>{texto}</h1>;
};

const StatisticLine = ({ texto, valor }) => {
  return (
    <p>
      {texto} {valor}
    </p>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  // función que calcula el promedio
  const average = (good, neutral, bad) => {
    let total = good + bad + neutral;
    if (total > 0) {
      return (good - bad) / total;
    }
    return "";
  };

  // función que calcula el porcentaje de comentarios positivos
  const positive = (good, neutral, bad) => {
    let total = good + bad + neutral;
    if (total > 0) {
      return (good * 100) / total;
    }
    return "";
  };

  let total = good + neutral + bad;
  if (total === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <>
      <StatisticLine texto={"good"} valor={good} />
      <StatisticLine texto={"neutral"} valor={neutral} />
      <StatisticLine texto={"bad"} valor={bad} />
      {/* el número total de comentarios recopilados, la puntuación promedio (buena: 1, neutral: 0, mala: -1) y el porcentaje de comentarios positivos. */}
      <StatisticLine texto={"all"} valor={total} />
      <StatisticLine texto={"average"} valor={average(good, neutral, bad)} />
      <StatisticLine
        texto={"positive"}
        valor={positive(good, neutral, bad) + " %"}
      />
    </>
  );
};

const StatisticsTable = ({ good, neutral, bad }) => {
  // función que calcula el promedio
  const average = (good, neutral, bad) => {
    let total = good + bad + neutral;
    if (total > 0) {
      return (good - bad) / total;
    }
    return "";
  };

  // función que calcula el porcentaje de comentarios positivos
  const positive = (good, neutral, bad) => {
    let total = good + bad + neutral;
    if (total > 0) {
      return (good * 100) / total;
    }
    return "";
  };

  let total = good + neutral + bad;
  if (total === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>all</td>
            <td>{total}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{average(good, neutral, bad)}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{positive(good, neutral, bad)}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
