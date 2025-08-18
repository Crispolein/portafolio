import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaBars, FaTimes } from 'react-icons/fa';

const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <nav className="fixed top-0 w-full bg-slate-900 bg-opacity-80 backdrop-blur z-50 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center relative">
        {/* Logo or Home Link */}
        <a href="#home" className="text-xl font-bold text-white uppercase tracking-wide">
          CR
        </a>

        {/* Hamburger Menu Icon (Mobile) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex justify-center space-x-8">
          {sections.map(sec => (
            <li key={sec}>
              <a href={`#${sec}`} className="uppercase text-sm hover:text-teal-400 transition">
                {t(`navbar.${sec}`)}
              </a>
            </li>
          ))}
          {/* Language Buttons for Desktop */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => changeLanguage('es')}
              className={`px-2 py-1 rounded ${i18n.language === 'es' ? 'bg-teal-500 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              ES
            </button>
            <button 
              onClick={() => changeLanguage('en')}
              className={`px-2 py-1 rounded ${i18n.language === 'en' ? 'bg-teal-500 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              EN
            </button>
          </div>
        </ul>
      </div>

      {/* Mobile Menu (Conditionally Rendered) */}
      <ul
        className={`md:hidden flex flex-col items-center space-y-4 pt-4 pb-6 transition-all duration-300 ease-in-out
          ${isMenuOpen ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0 overflow-hidden'}`}
      >
        {sections.map(sec => (
          <li key={sec}>
            <a href={`#${sec}`} className="uppercase text-lg hover:text-teal-400 transition" onClick={toggleMenu}>
              {t(`navbar.${sec}`)}
            </a>
          </li>
        ))}
        {/* Language Buttons for Mobile */}
        <div className="flex space-x-4 mt-4">
          <button 
            onClick={() => { changeLanguage('es'); toggleMenu(); }}
            className={`px-3 py-1 rounded ${i18n.language === 'es' ? 'bg-teal-500 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            ES
          </button>
          <button 
            onClick={() => { changeLanguage('en'); toggleMenu(); }}
            className={`px-3 py-1 rounded ${i18n.language === 'en' ? 'bg-teal-500 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            EN
          </button>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;