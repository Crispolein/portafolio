import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importa tus archivos de traducción
import enTranslation from './locales/en/translation.json';
import esTranslation from './locales/es/translation.json';

i18n
  .use(initReactI18next) // Conecta i18next con React
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      es: {
        translation: esTranslation,
      },
    },
    lng: 'es', // Idioma predeterminado
    fallbackLng: 'es', // Idioma de respaldo si la traducción no se encuentra
    interpolation: {
      escapeValue: false, // React ya previene inyecciones XSS
    },
  });

export default i18n;