//Import from react
import { useEffect, useContext, useState, useRef } from "react";

//Import from content
import { MESSAGES } from "../../Content/Quotes/Schema";
import LANGUAGES from "../../Content/Languages";

//Import other components
import LanguagesBar from "../LanguagesBar/LanguagesBar";

//Import context
import { LanguageContext } from "../../Context";
import { QuoteContext } from "../../Context";

//Import style
import "./Quote.css";
import { isRTL } from "../../utils/idnex";

function Quote() {
  const [currentLanguage, setCurrentLanguage] = useContext(LanguageContext);
  const [currentQuote, setCurrentQuote] = useContext(QuoteContext);
  const [fade, setFade] = useState("fade-in");
  const [isShown, setIsShown] = useState(true);

  const firstRender = useRef(true);

  useEffect(() => {
    if (!currentQuote.text[`${currentLanguage}`]) {
      LANGUAGES.map((language) => {
        if (currentQuote.text[`${language.value}`]) {
          setCurrentLanguage(language.value);
          return;
        }
      });
    }
  }, [currentQuote]);

  useEffect(() => {
    setIsShown(true);
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setTimeout(() => {
      setCurrentQuote(MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
      setFade("fade-in");
    }, 1000);
  }, [isShown]);

  useEffect(() => {
    let showQuoteInterval = setInterval(() => {
      setFade("fade-out");
      setIsShown(false);
    }, 14000);
  }, []);

  return (
    <div className="container">
      <LanguagesBar />
      {currentQuote.text && (
        <div className={`quote-container`}>
          <p
            className={`${fade} quote`}
            style={{ textAlign: isRTL(currentLanguage) ? "right" : "left" }}
          >
            {currentQuote.text[`${currentLanguage}`] &&
              currentQuote.text[`${currentLanguage}`]
                .split("\n")
                .map((line) => <p>{line}</p>)}
          </p>
          <a target="_blank" className="quote-ref" href={currentQuote.src}>
            <p>{currentQuote.author[`${currentLanguage}`]}</p>
          </a>
        </div>
      )}
    </div>
  );
}

export default Quote;
