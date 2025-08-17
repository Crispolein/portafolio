import React from 'react';
import { useTranslation } from 'react-i18next';

const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];

const Navbar = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <nav className="fixed top-0 w-full bg-slate-900 bg-opacity-80 backdrop-blur z-50 py-4">
      {/* Botones para cambiar de idioma */}
      <div className="absolute right-4 top-4 space-x-2">
        <button 
          onClick={() => changeLanguage('es')}
          className={`px-2 py-1 rounded ${i18n.language === 'es' ? 'bg-primary text-white' : 'text-slate-400'}`}
        >
          ES
        </button>
        <button 
          onClick={() => changeLanguage('en')}
          className={`px-2 py-1 rounded ${i18n.language === 'en' ? 'bg-primary text-white' : 'text-slate-400'}`}
        >
          EN
        </button>
      </div>

      <ul className="flex justify-center space-x-6">
        {sections.map(sec => (
          <li key={sec}>
            <a href={`#${sec}`} className="uppercase text-sm hover:text-teal-400 transition">
              {/* Usamos la función t() para obtener la traducción */}
              {t(`navbar.${sec}`)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;