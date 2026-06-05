import { useEffect, useState } from 'react';
import { differenceInSeconds } from 'date-fns';

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Data final: 30 dias a partir de hoje
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);

    const timer = setInterval(() => {
      const now = new Date();
      const totalSeconds = differenceInSeconds(targetDate, now);

      if (totalSeconds <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(totalSeconds / (60 * 60 * 24)),
        hours: Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60)),
        minutes: Math.floor((totalSeconds % (60 * 60)) / 60),
        seconds: totalSeconds % 60,
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const format = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="flex gap-2 md:gap-4 mt-8">
      {[
        { label: 'DIAS', value: format(timeLeft.days) },
        { label: 'HORAS', value: format(timeLeft.hours) },
        { label: 'MIN', value: format(timeLeft.minutes) },
        { label: 'SEG', value: format(timeLeft.seconds) },
      ].map((item) => (
        <div key={item.label} className="flex flex-col items-center bg-[#1A1A1A] px-4 py-3 min-w-[70px] md:min-w-[90px] rounded-[4px]">
          <span className="text-3xl md:text-[36px] font-bebas text-[#AAFF00] tabular-nums leading-none">
            {item.value}
          </span>
          <span className="text-[10px] text-[#555] tracking-[1px] mt-1 font-inter font-bold uppercase">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
