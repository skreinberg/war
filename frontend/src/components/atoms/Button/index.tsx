import React from 'react';

const Button = ({
  children,
  className,
  onClick,
}: {
  children: JSX.Element;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      className={`border border-black rounded py-2 px-4 focus:outline-none ${
        className ? className : ''
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
