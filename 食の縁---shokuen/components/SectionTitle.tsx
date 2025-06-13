
import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children, className }) => {
  return (
    <h2 className={`text-3xl font-bold text-green-700 mb-6 pb-2 border-b-2 border-green-200 ${className || ''}`}>
      {children}
    </h2>
  );
};

export default SectionTitle;
