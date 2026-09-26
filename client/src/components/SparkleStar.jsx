import React from 'react';

export const SparkleStar = ({ size = 28, color = '#d7fe03', className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block align-middle transition-transform duration-300 hover:rotate-45 ${className}`}
      style={{ filter: `drop-shadow(0 0 8px ${color}88)` }}
    >
      <path d="M12 0L14.4 7.6L22 10L14.4 12.4L12 20L9.6 12.4L2 10L9.6 7.6L12 0Z" />
      <circle cx="12" cy="10" r="1.5" fill="#090a0f" />
    </svg>
  );
};
