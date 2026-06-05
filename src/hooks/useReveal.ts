import { useEffect, useRef } from 'react';

export function useReveal() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return;

    try {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.target) {
              entry.target.classList.add('visible');
            }
          });
        },
        { threshold: 0.1 }
      );

      const elements = ref.current.querySelectorAll('.reveal');
      elements.forEach((el) => {
        if (el) observer.observe(el);
      });

      return () => {
        elements.forEach((el) => {
          if (el) observer.unobserve(el);
        });
        observer.disconnect();
      };
    } catch (error) {
      console.error('IntersectionObserver error:', error);
    }
  }, []);

  return ref;
}
