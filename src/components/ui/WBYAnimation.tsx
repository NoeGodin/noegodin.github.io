"use client";

interface WBYAnimationProps {
  className?: string;
}

export default function WBYAnimation({ className }: WBYAnimationProps) {
  return (
    <div className={`h-full w-full ${className ?? ""}`}>
      <svg
        viewBox="0 0 180 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        aria-hidden="true"
      >
        <style>{`
          .wby-q {
            animation: wby-drop 4.2s ease-in-out infinite;
          }
          @keyframes wby-drop {
            0%          { transform: translateY(-60px); opacity: 0; }
            14%         { transform: translateY(5px);  opacity: 1; }
            20%         { transform: translateY(0);    opacity: 1; }
            64%         { transform: translateY(0);    opacity: 1; }
            70%         { transform: translateY(-4px); opacity: 0.9; }
            84%         { transform: translateY(-58px); opacity: 0; }
            100%        { transform: translateY(-60px); opacity: 0; }
          }
        `}</style>

        <g transform="translate(0, -14)">
          {/* Shoulders */}
          <path
            d="M18 165 L18 140
               C18 112 46 100 72 96
               L72 86 L108 86 L108 96
               C134 100 162 112 162 140
               L162 165 Z"
            fill="#002FA7"
            fillOpacity="0.10"
            stroke="#002FA7"
            strokeWidth="1.5"
            strokeOpacity="0.28"
            strokeLinejoin="round"
          />

          {/* Neck */}
          <rect x="72" y="86" width="36" height="14"
            fill="#002FA7" fillOpacity="0.07" />

          {/* Head circle */}
          <circle cx="90" cy="62" r="32"
            fill="#E2EAFF"
            stroke="#002FA7"
            strokeWidth="1.5"
            strokeOpacity="0.35"
          />

          {/* Question mark: drops in, holds, lifts off */}
          <text
            className="wby-q"
            x="90"
            y="76"
            textAnchor="middle"
            fontSize="34"
            fontWeight="700"
            fill="#002FA7"
            fontFamily="Georgia, 'Times New Roman', serif"
          >
            ?
          </text>
        </g>
      </svg>
    </div>
  );
}
