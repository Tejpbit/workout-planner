import React, { useEffect, useState } from "react";
import { PageContainer } from "./App";
import { useInterleavingCountdown } from "./useInterleavingCountdown";
import _ from "lodash";
import useSound from "use-sound";
import { MuteSwitch } from "./MuteSwitch";

const longBeep = require("./janhgm__beep-2000hz-500ms-mono-jahoma-generated.wav");
const shortBeep = require("./janhgm__beep-2000hz-100ms-mono-jahoma-generated.wav");

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
  ] = useInterleavingCountdown([intervalTime.work, intervalTime.rest], true);
  const [mute, setMute] = useState(false);
  const [playLong] = useSound(longBeep);
  const [playShort] = useSound(shortBeep);
  const isRest = intervalIndex % 2 === 1;

  useEffect(() => {
    if (mute) {
      return;
    }
    if (1 <= currentSecond && currentSecond <= 3) {
      playShort();
    }
    if (currentSecond === 0) {
      playLong();
    }
  }, [currentSecond]);

  return (
    <PageContainer backgroundColor={isRest ? "lightgreen" : "tomato"}>
      <MuteSwitch
        mute={!mute}
        onSwitch={(s) => {
          setMute(s);
        }}
      />

      <div>
        <p
          style={{
            fontSize: "10em",
            paddingBottom: 0,
            marginBottom: 0,
            marginTop: 0,
            paddingTop: 0,
          }}
        >
          {currentSecond}
        </p>
      </div>
      <p style={{ fontWeight: "bold", fontSize: "5em" }}>
        {isRest ? "Rest" : _.first(moves)}
      </p>

      {_.drop(moves, 1)
        .filter((_m, i) => i >= currentExerciseIndex)
        .map((move, i) => (
          <span style={{ fontSize: "2em" }}>{move}</span>
        ))}
      <p style={{ position: "absolute", right: 0, bottom: 0 }}>
        Beep sounds created by janhgm on freesound.org
      </p>
    </PageContainer>
  );
};
