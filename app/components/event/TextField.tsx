import React from 'react';

interface TextFieldProps {
    value: string;
    onChange: (val: string) => void;
  }
  
const TextField = ({ value, onChange }: TextFieldProps) => {
  return (
    <input
      className="rounded-md w-full border border-gray-400 p-3 mb-5"
      value={value}
      onChange={({ target: { value } }) => onChange(value)}
    />
  );
};

export default TextField;