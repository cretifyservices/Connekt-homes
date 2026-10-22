import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'dark',
  size = 'md',
  showSubtitle = true,
}) => {
  const isDark = variant === 'dark';
  const textColor = isDark ? '#14213D' : '#FAF6F0';
  const subColor = isDark ? '#6B7280' : '#D1D5DB';
  const pinColor = '#D93A6B';

  const scale = size === 'sm' ? 0.75 : size === 'lg' ? 1.25 : 1;

  return (
    <div className={`inline-flex flex-col items-start leading-none select-none ${className}`}>
      <svg
        width={180 * scale}
        height={(showSubtitle ? 42 : 26) * scale}
        viewBox="0 0 190 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Connekt Homes Logo"
        className="overflow-visible"
      >
        {/* CONNEKT */}
        <text
          x="0"
          y="20"
          fontFamily="system-ui, -apple-system, 'Plus Jakarta Sans', sans-serif"
          fontSize="17.5"
          fontWeight="700"
          letterSpacing="0.28em"
          fill={textColor}
        >
          CONNEKT
        </text>

        {/* H */}
        <text
          x="122"
          y="20"
          fontFamily="system-ui, -apple-system, 'Plus Jakarta Sans', sans-serif"
          fontSize="17.5"
          fontWeight="700"
          letterSpacing="0.22em"
          fill={textColor}
        >
          H
        </text>

        {/* PIN icon replacing 'O' in HOMES */}
        <g transform="translate(138.5, 4.5) scale(0.68)">
          <path
            d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z"
            fill={pinColor}
          />
          <circle cx="12" cy="9" r="3.2" fill={isDark ? '#FAF6F0' : '#14213D'} />
        </g>

        {/* MES */}
        <text
          x="154"
          y="20"
          fontFamily="system-ui, -apple-system, 'Plus Jakarta Sans', sans-serif"
          fontSize="17.5"
          fontWeight="700"
          letterSpacing="0.22em"
          fill={textColor}
        >
          MES
        </text>

        {/* Subtitle */}
        {showSubtitle && (
          <text
            x="2"
            y="36"
            fontFamily="system-ui, -apple-system, 'Plus Jakarta Sans', sans-serif"
            fontSize="7"
            fontWeight="500"
            letterSpacing="0.32em"
            fill={subColor}
          >
            PREMIUM SERVICED APARTMENTS
          </text>
        )}
      </svg>
    </div>
  );
};
