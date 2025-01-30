import dayjs from "dayjs";
import { useEffect, useState } from "react";

const useTime = () => {
  const [time, setTime] = useState(dayjs().format("HH:mm"));

  const date = dayjs().format("dddd, MMMM D");

  useEffect(() => {
    const interval = setInterval(() => setTime(dayjs().format("HH:mm")), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return { time, date };
};

export default useTime;
