// "use client";

// import { useEffect, useState } from "react";
// import { getCookie, hasCookie, setCookie } from "cookies-next";

// const GoogleTranslate = ({ langFormat }) => {
//   const [selected, setSelected] = useState("/auto/ro");

//   useEffect(() => {
//     console.log("Setting up Google Translate configuration globally.");
//     // Set Google Translate config globally
//     window.__GOOGLE_TRANSLATION_CONFIG__ = {
//       languages: [
//         { name: "ro", title: "Ro" },
//         { name: "en", title: "En" },
//       ],
//       defaultLanguage: "ro",
//     };

//     const scriptId = "google-translate-script";
//     const existingScript = document.getElementById(scriptId);

//     if (!existingScript) {
//       console.log(
//         "Google Translate script not found, creating a new script element."
//       );
//       const script = document.createElement("script");
//       script.id = scriptId;
//       script.src =
//         "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//       script.async = true;
//       script.defer = true;

//       script.onload = () => {
//         console.log("Google Translate script loaded successfully.");
//         if (window.googleTranslateElementInit) {
//           window.googleTranslateElementInit();
//         } else {
//           console.error(
//             "googleTranslateElementInit is not defined after script load."
//           );
//         }
//       };

//       script.onerror = (error) => {
//         console.error("Error loading Google Translate script:", error);
//       };

//       document.body.appendChild(script);
//     } else {
//       console.log("Google Translate script already exists.");
//       if (window.googleTranslateElementInit) {
//         window.googleTranslateElementInit();
//       } else {
//         console.error("googleTranslateElementInit is not defined.");
//       }
//     }

//     window.googleTranslateElementInit = () => {
//       try {
//         if (
//           window.google &&
//           window.google.translate &&
//           window.google.translate.TranslateElement
//         ) {
//           console.log("Initializing Google Translate.");
//           new window.google.translate.TranslateElement(
//             {
//               pageLanguage: "auto",
//               autoDisplay: false,
//               includedLanguages: "ro,en",
//               layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
//             },
//             "google_translate_element"
//           );
//           console.log("Google Translate initialized successfully.");
//         } else {
//           console.error("Google Translate API is not available.");
//         }
//       } catch (error) {
//         console.error("Error initializing Google Translate:", error);
//       }
//     };

//     if (hasCookie("googtrans")) {
//       const existingLang = getCookie("googtrans");
//       console.log(`Existing language cookie found: ${existingLang}`);
//       setSelected(existingLang);
//     } else {
//       console.log("No existing language cookie found, using default.");
//     }

//     return () => {
//       const script = document.getElementById(scriptId);
//       if (script) {
//         document.body.removeChild(script);
//         console.log("Google Translate script removed.");
//       }
//     };
//   }, []);

//   const langChange = (event) => {
//     const selectedLang = event.target.value;
//     console.log(`Language changed to: ${selectedLang}`);
//     setCookie("googtrans", selectedLang);
//     setSelected(selectedLang);
//     window.location.reload();
//   };

//   return (
//     <>
//       <div
//         id="google_translate_element"
//         className="skiptranslate "
//         style={{ display: "none" }}
//       />
//       <div className="text-center notranslate ml-2">
//         <select
//           value={selected}
//           onChange={langChange}
//           className="font-[200] mx-1.5 cursor-pointer hover:underline focus:outline-none border-none"
//         >
//           {langFormat.map((lang) => (
//             <option key={lang.value} value={lang.value}>
//               {lang.label}
//             </option>
//           ))}
//         </select>
//       </div>
//     </>
//   );
// };

// export default GoogleTranslate;
"use client";
import Script from "next/script";
import { useEffect, useState } from "react";

const languages = [
  { label: "Romana", value: "ro", src: "https://flagcdn.com/h60/ro.png" },
  { label: "English", value: "en", src: "https://flagcdn.com/h60/us.png" },
  // Add additional languages as needed
];
const includedLanguages = languages.map((lang) => lang.value).join(",");

function googleTranslateElementInit() {
  new window.google.translate.TranslateElement(
    {
      pageLanguage: "auto",
      includedLanguages,
    },
    "google_translate_element"
  );
}

export function GoogleTranslate({ prefLangCookie, moreSyle }) {
  const [langCookie, setLangCookie] = useState(
    decodeURIComponent(prefLangCookie)
  );

  useEffect(() => {
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  const onChange = (newLangValue) => {
    const lang = "/ro/" + newLangValue;
    setLangCookie(lang);
    const element = document.querySelector(".goog-te-combo");
    element.value = newLangValue;
    element.dispatchEvent(new Event("change"));
  };

  return (
    <div>
      <style jsx global>{`
        /* Hide Google Translate toolbar */
        .goog-te-banner-frame.skiptranslate {
          display: none !important;
        }

        body {
          top: 0px !important;
        }

        /* Hide Google Translate popup icon */
        .goog-te-gadget-icon {
          display: none !important;
        }

        /* Hide Google Translate footer */
        .goog-logo-link {
          display: none !important;
        }

        .goog-te-combo {
          margin: 0;
        }
      `}</style>
      <div
        id="google_translate_element"
        style={{ visibility: "hidden", width: "1px", height: "1px" }}
      ></div>
      <LanguageSelector
        moreSyle={moreSyle}
        onChange={onChange}
        value={langCookie}
      />
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </div>
  );
}

function LanguageSelector({ onChange, value, moreSyle }) {
  const langCookie = value.split("/")[2];
  const arrowStrokeColor = moreSyle === "text-black px-5" ? "white" : "black";

  return (
    <select
      className={`bg-transparent border-none text-[var(--second-color)] text-[12px] pr-5 h-full outline-none focus:ring-0 ${moreSyle}`}
      onChange={(e) => onChange(e.target.value)}
      value={langCookie}
      style={{
        appearance: "none",
        WebkitAppearance: "none",
        MozAppearance: "none",
        paddingRight: "1.5rem",
        backgroundImage: `url('data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${encodeURIComponent(
          arrowStrokeColor
        )}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"/></svg>')`, // Custom arrow
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 10px center",
      }}
    >
      {languages.map((it) => (
        <option translate="no" value={it.value} key={it.value}>
          {it.label}
        </option>
      ))}
    </select>
  );
}
