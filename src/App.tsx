import React, { useState } from "react";
import "./App.css";
import styled from "styled-components";
import _ from "lodash";
import { Workout } from "./Workout";

const workoutMoves = [
  "crunch",
  "bicycle crunch",
  "pushup",
  "running on the spot",
  "squats",
  "mountain climbers",
  "jumping jacks",
  "squat hold",
  "plank",
  "elbow plank",
  "reverse lunge",
  "squat jumps",
];

enum Route {
  plan,
  workout,
}

const App = () => {
  const [moves, setMoves] = useState(
    _.chain(workoutMoves).shuffle().take(10).value()
  );
  const [intervalTime, setIntervalTime] = useState({ work: 30, rest: 30 });

  const [route, setRoute] = useState(Route.plan);

  if (route === Route.workout) {
    return <Workout intervalTime={intervalTime} moves={moves} />;
  }

  return (
    <PageContainer>
      <h1>Your workout</h1>
      <div>
        {moves.map((move) => (
          <p>{move}</p>
        ))}
      </div>
      <div>
        <input
          type="button"
          value="5/5"
          onClick={() => setIntervalTime({ work: 5, rest: 5 })}
        />
        <input
          type="button"
          value="30/30"
          onClick={() => setIntervalTime({ work: 30, rest: 30 })}
        />
        <input
          type="button"
          value="35/25"
          onClick={() => setIntervalTime({ work: 35, rest: 25 })}
        />
        <input
          type="button"
          value="40/20"
          onClick={() => setIntervalTime({ work: 40, rest: 20 })}
        />
      </div>
      Work/Rest: {`${intervalTime.work}/${intervalTime.rest}`}
      <input
        type="button"
        value="Start workout"
        onClick={() => {
          setRoute(Route.workout);
        }}
      />
    </PageContainer>
  );
};
export default App;

export const PageContainer = styled.div<{ backgroundColor?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.backgroundColor};
  width: 100vw;
  height: 100vh;
`;
