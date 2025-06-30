import React from 'react';
const Button = ({ children, onClick, href }) => {
  const base = "mt-6 px-6 py-2 border rounded transition";
  const style = "border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white";
  return href ? (
    <a href={href} className={`${base} ${style}`}>{children}</a>
  ) : (
    <button onClick={onClick} className={`${base} ${style}`}>{children}</button>
  );
};
export default Button;