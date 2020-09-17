import React from "react";
import { PageContainer } from "./App";
import { useInterleavingCountdown } from "./useInterleavingCountdown";

interface IntervalTime {
  work: number;
  rest: number;
}

interface Props {
  intervalTime: IntervalTime;
  moves: Array<string>;
}

export const Workout: React.FC<Props> = ({ moves, intervalTime }) => {
  const [
    currentSecond,
    intervalIndex,
    currentExerciseIndex,
  ] = useInterleavingCountdown([intervalTime.work, intervalTime.rest]);

  console.log("render");
  return (
    <PageContainer>
      <div>
        <p style={{ fontSize: "2em" }}>
          {intervalIndex % 2 === 0 ? "Work" : "Rest"}
        </p>
        <p>{currentSecond}</p>
      </div>
      {moves.map((move, i) => (
        <p
          style={
            i === currentExerciseIndex
              ? { fontWeight: "bold", fontSize: "2em" }
              : {}
          }
        >
          {move}
        </p>
      ))}
    </PageContainer>
  );
};
