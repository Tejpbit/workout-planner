import { useEffect, useState } from "react";

export const useInterleavingCountdown = (
  intervals: Array<number>,
  countDown = false
) => {
  const [intervalIndex, setIntervalIndex] = useState(0);

  const [currentSecond, setCurrentSecond] = useState(
    countDown ? intervals[0] : 0
  );

  const [intervalRestarts, setIntervalRestarts] = useState(0);

  useEffect(() => {
    let _intervalIndex = 0;
    let _currentSecond = countDown ? intervals[_intervalIndex] : 0;
    let _intervalRestarts = 0;
    const i = setInterval(() => {
      if (
        (countDown && _currentSecond === 0) ||
        _currentSecond > intervals[_intervalIndex]
      ) {
        _intervalIndex = (_intervalIndex + 1) % intervals.length;
        setIntervalIndex(_intervalIndex);
        _currentSecond = countDown ? intervals[_intervalIndex] + 1 : 0;
        setCurrentSecond(_currentSecond);
        if (_intervalIndex === 0) {
          _intervalRestarts += 1;
          setIntervalRestarts(_intervalRestarts);
        }
      }

      _currentSecond = _currentSecond + (countDown ? -1 : 1);
      setCurrentSecond(_currentSecond);
    }, 1000);
    return () => clearInterval(i);
  }, []);

  return [currentSecond, intervalIndex, intervalRestarts];
};
