
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-100 border-t border-stone-200">
      <div className="container mx-auto px-4 py-6 text-center text-stone-500">
        <p>&copy; {new Date().getFullYear()} 食の縁. 食で繋がる、心豊かな未来を。</p>
      </div>
    </footer>
  );
};

export default Footer;
