import { useState, useEffect } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

export const useScrambleText = (text: string, triggered: boolean, speed = 45) => {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (!triggered) {
      setDisplayText(text);
      return;
    }

    const upperText = text.toUpperCase();
    const iterations = Array(upperText.length).fill(0);
    const maxIterations = upperText.split("").map((_, i) =>
      upperText[i] === " " ? 0 : 5 + i
    );

    const interval = setInterval(() => {
      let allDone = true;
      const next = upperText
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (iterations[i] >= maxIterations[i]) return char;
          allDone = false;
          iterations[i]++;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplayText(next);
      if (allDone) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [triggered, text, speed]);

  return displayText;
};
