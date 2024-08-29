"use client";

import { useEffect, useState } from "react";
import { getCookie, hasCookie, setCookie } from "cookies-next";

const GoogleTranslate = ({ langFormat }) => {
  const [selected, setSelected] = useState("/auto/ro");

  useEffect(() => {
    console.log("Setting up Google Translate configuration globally.");
    // Set Google Translate config globally
    window.__GOOGLE_TRANSLATION_CONFIG__ = {
      languages: [
        { name: "ro", title: "Ro" },
        { name: "en", title: "En" },
      ],
      defaultLanguage: "ro",
    };

    const scriptId = "google-translate-script";
    const existingScript = document.getElementById(scriptId);

    if (!existingScript) {
      console.log(
        "Google Translate script not found, creating a new script element."
      );
      const script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.defer = true;

      script.onload = () => {
        console.log("Google Translate script loaded successfully.");
        if (window.googleTranslateElementInit) {
          window.googleTranslateElementInit();
        } else {
          console.error(
            "googleTranslateElementInit is not defined after script load."
          );
        }
      };

      script.onerror = (error) => {
        console.error("Error loading Google Translate script:", error);
      };

      document.body.appendChild(script);
    } else {
      console.log("Google Translate script already exists.");
      if (window.googleTranslateElementInit) {
        window.googleTranslateElementInit();
      } else {
        console.error("googleTranslateElementInit is not defined.");
      }
    }

    window.googleTranslateElementInit = () => {
      try {
        if (
          window.google &&
          window.google.translate &&
          window.google.translate.TranslateElement
        ) {
          console.log("Initializing Google Translate.");
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "auto",
              autoDisplay: false,
              includedLanguages: "ro,en",
              layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
            },
            "google_translate_element"
          );
          console.log("Google Translate initialized successfully.");
        } else {
          console.error("Google Translate API is not available.");
        }
      } catch (error) {
        console.error("Error initializing Google Translate:", error);
      }
    };

    if (hasCookie("googtrans")) {
      const existingLang = getCookie("googtrans");
      console.log(`Existing language cookie found: ${existingLang}`);
      setSelected(existingLang);
    } else {
      console.log("No existing language cookie found, using default.");
    }

    return () => {
      const script = document.getElementById(scriptId);
      if (script) {
        document.body.removeChild(script);
        console.log("Google Translate script removed.");
      }
    };
  }, []);

  const langChange = (event) => {
    const selectedLang = event.target.value;
    console.log(`Language changed to: ${selectedLang}`);
    setCookie("googtrans", selectedLang);
    setSelected(selectedLang);
    window.location.reload();
  };

  return (
    <>
      <div
        id="google_translate_element"
        className="skiptranslate "
        style={{ display: "none" }}
      />
      <div className="text-center notranslate ml-2">
        <select
          value={selected}
          onChange={langChange}
          className="font-[200] mx-1.5 cursor-pointer hover:underline focus:outline-none border-none"
        >
          {langFormat.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default GoogleTranslate;
