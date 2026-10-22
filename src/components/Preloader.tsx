import React, { useState, useEffect } from 'react';

export const Preloader: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [visible, setVisible] = useState(() => {
    // Only show once per session unless query flag or fresh tab
    try {
      const shown = sessionStorage.getItem('connekt_preloader_seen');
      return !shown;
    } catch {
      return true;
    }
  });

  const [phase, setPhase] = useState<'pin' | 'text' | 'wipe' | 'done'>('pin');

  useEffect(() => {
    if (!visible) {
      if (onComplete) onComplete();
      return;
    }

    try {
      sessionStorage.setItem('connekt_preloader_seen', 'true');
    } catch (e) {
      console.error(e);
    }

    const t1 = setTimeout(() => setPhase('text'), 400);
    const t2 = setTimeout(() => setPhase('wipe'), 1100);
    const t3 = setTimeout(() => {
      setPhase('done');
      setVisible(false);
      if (onComplete) onComplete();
    }, 1550);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [visible, onComplete]);

  if (!visible || phase === 'done') return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#FAF6F0] flex flex-col items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        phase === 'wipe' ? '-translate-y-full opacity-90' : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="flex flex-col items-center select-none">
        {/* Animated Pink Pin Drawing */}
        <div className="w-12 h-12 mb-4 relative flex items-center justify-center">
          <svg
            className={`w-10 h-10 transition-all duration-500 ${
              phase === 'pin' ? 'scale-75 opacity-70' : 'scale-100 opacity-100'
            }`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z"
              fill="#D93A6B"
              className="transition-all duration-500"
            />
            <circle cx="12" cy="9" r="3" fill="#FAF6F0" />
          </svg>
        </div>

        {/* Wordmark Fade */}
        <div
          className={`flex items-center tracking-[0.28em] text-sm font-bold text-[#14213D] transition-opacity duration-500 ${
            phase !== 'pin' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <span>CONNEKT HOMES</span>
        </div>

        <div
          className={`text-[9px] uppercase tracking-[0.34em] text-[#B89B72] mt-1 transition-opacity duration-500 delay-100 ${
            phase !== 'pin' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Homes with a soul
        </div>
      </div>
    </div>
  );
};
