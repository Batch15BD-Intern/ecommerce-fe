// Button.tsx
import React, { ReactNode } from 'react';

type ButtonProps = {
  color?: string;
  icon?: ReactNode;
  onClick?: () => void;
  highlight?: boolean;
  borderColor?: string;
  borderHighlightColor?: string;
  backgroundColor?: string;
  children: ReactNode;
};

const Button = ({
  color = '#2c59ff',
  icon,
  onClick,
  highlight = false,
  borderColor = '#2c59ff',
  borderHighlightColor = '#1e90ff',
  backgroundColor = '#2c59ff',
  children,
}: ButtonProps) => {
  const handleButtonClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      style={{
        background: highlight ? backgroundColor : color,
        color: '#ffffff',
        padding: '8px 16px',
        borderRadius: '4px',
        border: `2px solid ${highlight ? borderHighlightColor : borderColor}`,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.3s, border-color 0.3s',
      }}
      onClick={handleButtonClick}
    >
      {icon && <span style={{ marginRight: '8px' }}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
