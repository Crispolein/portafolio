import React from 'react';
const sections = ['home','about','skills','experience','projects','contact'];
const Navbar = () => (
  <nav className="fixed top-0 w-full bg-slate-900 bg-opacity-80 backdrop-blur z-50 py-4">
    <ul className="flex justify-center space-x-6">
      {sections.map(sec => (
        <li key={sec}>
          <a href={`#${sec}`} className="uppercase text-sm hover:text-teal-400 transition">
            {sec}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);
export default Navbar;