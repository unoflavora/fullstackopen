import React from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  let all = props.good + props.neutral + props.bad;
  let score = props.good * 1 + props.neutral * 0 + props.bad * -1;
  if (all == 0) {
    return (
      <div>
        <h1>Statistics</h1>
        No Feedback Given
      </div>
    );
  }
  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tr>
          <StatisticLine text="Good" value={props.good} />
          <StatisticLine text="Neutral" value={props.neutral} />
          <StatisticLine text="Bad" value={props.bad} />
          <StatisticLine
            text="Average"
            value={Math.round((score / all) * 100) / 100}
          />
          <StatisticLine
            text="Positive"
            value={Math.round((props.good / all) * 100) / 100 + "%"}
          />
        </tr>
      </table>
    </div>
  );
};

export default Statistics;
