import { useEffect, useState } from "react";

const LANGUAGE_STORAGE_KEY = "code-language";

const PublicLanguageLoader = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);

    const language = savedLanguage === "ar" ? "ar" : "en";

    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

    // Wait one frame before rendering public pages
    requestAnimationFrame(() => {
      setReady(true);
    });
  }, []);

  if (!ready) {
    return null;
  }

  return <>{children}</>;
};

export default PublicLanguageLoader;