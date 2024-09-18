import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, disabled = false, className = '' }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`gap-2 self-stretch px-4 py-2 my-auto text-sm font-semibold tracking-normal leading-loose text-white bg-blue-600 rounded-lg min-h-[32px] w-[100px] ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-400 text-gray-950' : ''} ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;