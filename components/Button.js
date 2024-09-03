'use client';

const Button = ({ text, className, type }) => {
  return (
    <button className={className} type={type}>
      {text}
    </button>
  );
};

export default Button;
