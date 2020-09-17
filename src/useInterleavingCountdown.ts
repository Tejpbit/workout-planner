import { useEffect, useState } from "react";

export const useInterleavingCountdown = (intervals: Array<number>) => {
  const [intervalIndex, setIntervalIndex] = useState(0);

  const [currentSecond, setCurrentSecond] = useState(0);

  const [intervalRestarts, setIntervalRestarts] = useState(0);

  useEffect(() => {
    let _currentSecond = 0;
    let _intervalIndex = 0;
    let _intervalRestarts = 0;
    const i = setInterval(() => {
      if (_currentSecond >= intervals[_intervalIndex]) {
        _intervalIndex = (_intervalIndex + 1) % intervals.length;
        setIntervalIndex(_intervalIndex);
        _currentSecond = 0;
        setCurrentSecond(_currentSecond);
        if (_intervalIndex === 0) {
          _intervalRestarts += 1;
          setIntervalRestarts(_intervalRestarts);
        }
      }

      _currentSecond += 1;
      setCurrentSecond(_currentSecond);
    }, 1000);
    return () => clearInterval(i);
  }, []);

  return [currentSecond, intervalIndex, intervalRestarts];
};
