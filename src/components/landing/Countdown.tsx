import { useState, useEffect } from 'react';

export function Countdown() {
  const [isMounted, setIsMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    setIsMounted(true);
    // 30 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const format = (num: number) => String(num).padStart(2, '0');

  if (!isMounted) {
    return (
      <div className="flex gap-4 font-bebas text-4xl text-[#d7f803] opacity-0">
        <div className="flex flex-col items-center">
          <span>00</span>
          <span className="text-[10px] text-[#555] uppercase tracking-widest font-inter">Dias</span>
        </div>
        <span>:</span>
        <div className="flex flex-col items-center">
          <span>00</span>
          <span className="text-[10px] text-[#555] uppercase tracking-widest font-inter">Horas</span>
        </div>
        <span>:</span>
        <div className="flex flex-col items-center">
          <span>00</span>
          <span className="text-[10px] text-[#555] uppercase tracking-widest font-inter">Min</span>
        </div>
        <span>:</span>
        <div className="flex flex-col items-center">
          <span>00</span>
          <span className="text-[10px] text-[#555] uppercase tracking-widest font-inter">Seg</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4 font-bebas text-4xl text-[#d7f803]">
      <div className="flex flex-col items-center">
        <span>{format(timeLeft.days)}</span>
        <span className="text-[10px] text-[#555] uppercase tracking-widest font-inter">Dias</span>
      </div>
      <span>:</span>
      <div className="flex flex-col items-center">
        <span>{format(timeLeft.hours)}</span>
        <span className="text-[10px] text-[#555] uppercase tracking-widest font-inter">Horas</span>
      </div>
      <span>:</span>
      <div className="flex flex-col items-center">
        <span>{format(timeLeft.minutes)}</span>
        <span className="text-[10px] text-[#555] uppercase tracking-widest font-inter">Min</span>
      </div>
      <span>:</span>
      <div className="flex flex-col items-center">
        <span>{format(timeLeft.seconds)}</span>
        <span className="text-[10px] text-[#555] uppercase tracking-widest font-inter">Seg</span>
      </div>
    </div>
  );
}
