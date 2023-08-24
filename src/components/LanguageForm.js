import React, { useState, useEffect } from 'react';

export const LanguageForm = (handlemode) => {
  const [translationCode, setTranslationCode] = useState('');

  useEffect(() => {
    setTranslationCode(navigator.language.split('-')[0]);
  }, []);

  const handleLanguageChange = (e) => {
    setTranslationCode(e.target.value);

    console.log('Selected language:', e.target.value);
    window.globalTranslationCode = e.target.value;
  };


  if (handlemode.handlemode == 0) {
    return (
      <form class = "langSelector">
        <label>
          <select value={translationCode} onChange={handleLanguageChange}>
            <option value="en">EN</option>
            <option value="fr">FR</option>
            <option value="es">ES</option>
            <option value="ko">KO</option>
            <option value="pt">PT</option>
            <option value="de">DE</option>
            
          </select>
        </label>
        </form>
      );
    }
    else {
      return window.globalTranslationCode;
    }

  };