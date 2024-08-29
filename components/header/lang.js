"use client";
import { useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";

export const COOKIE_NAME = "googtrans";

const LanguageSwitcher = () => {
  const [currentLanguage, setCurrentLanguage] = useState(null);
  const [languageConfig, setLanguageConfig] = useState(null);
  const [googleTranslateLoaded, setGoogleTranslateLoaded] = useState(false);

  useEffect(() => {
    const cookies = parseCookies();
    const existingLanguageCookieValue = cookies[COOKIE_NAME];

    let languageValue;
    if (existingLanguageCookieValue) {
      const sp = existingLanguageCookieValue.split("/");
      if (sp.length > 2) {
        languageValue = sp[2];
      }
    }

    if (window.__GOOGLE_TRANSLATION_CONFIG__ && !languageValue) {
      languageValue = window.__GOOGLE_TRANSLATION_CONFIG__.defaultLanguage;
    }
    if (languageValue) {
      setCurrentLanguage(languageValue);
    }
    if (window.__GOOGLE_TRANSLATION_CONFIG__) {
      setLanguageConfig(window.__GOOGLE_TRANSLATION_CONFIG__);
    }
  }, []);

  useEffect(() => {
    const checkTranslateLoaded = setInterval(() => {
      if (document.querySelector(".goog-te-combo")) {
        setGoogleTranslateLoaded(true);
        clearInterval(checkTranslateLoaded);
      }
    }, 100);

    return () => clearInterval(checkTranslateLoaded);
  }, []);

  if (!currentLanguage || !languageConfig || !googleTranslateLoaded) {
    return null;
  }

  const handleChange = (event) => {
    const selectedLang = event.target.value;
    setCookie(null, COOKIE_NAME, "/auto/" + selectedLang);
    window.location.reload();
  };

  return (
    <div className="text-center notranslate ml-2">
      <select
        value={currentLanguage}
        onChange={handleChange}
        className="mx-1.5 cursor-pointer hover:underline focus:outline-none border-none"
      >
        {languageConfig.languages.map((ld) => (
          <option key={ld.name} value={ld.name}>
            {ld.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
