import { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";

export default function Clock() {
  const [date, setDate] = useState(dayjs().format("MM月DD日"));
  const [timeLeft, setTimeLeft] = useState("");

  // 計算距離重置時間多久
  const calcTimeLeft = () => {
    const today = dayjs();
    const nextDay = today.add(1, "day").startOf("day");
    const difference = nextDay.diff(today, "minute");
    const hours = Math.floor(difference / 60);
    const minutes = difference % 60;
    return `${hours}時${minutes}分後重置`;
  };

  // 更新日期和時間
  const updateClock = useCallback(() => {
    setTimeLeft(calcTimeLeft());
    setDate(dayjs().format("MM月DD日"));
  }, []);

  useEffect(() => {
    updateClock(); // 初次渲染
    const now = setInterval(updateClock, 1000);
    return () => {
      clearInterval(now);
    };
  }, [updateClock]);

  return (
    <>
      <h2>
        {date} {timeLeft}
      </h2>
    </>
  );
}
