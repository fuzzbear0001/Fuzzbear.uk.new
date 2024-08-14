import React, { useState, useEffect, useRef } from "react";

interface TypingAnimationProps {
  text: any[];
  typingSpeed?: number;
  backspaceSpeed?: number;
  pauseDuration?: number;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  text,
  typingSpeed = 100,
  backspaceSpeed = 50,
  pauseDuration = 1000,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isBackspacing, setIsBackspacing] = useState(false);

  // Use refs to store the timers
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const backspaceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Function to start typing the current text
    const type = () => {
      typingTimerRef.current = setInterval(() => {
        if (index < text[currentTextIndex].length) {
          setDisplayText((prev) => prev + text[currentTextIndex][index]);
          setIndex((prevIndex) => prevIndex + 1);
        } else {
          clearInterval(typingTimerRef.current as NodeJS.Timeout);
          setIsTyping(false);
          if (text.length > 1) {
            setTimeout(() => {
              setIsBackspacing(true);
            }, pauseDuration);
          }
        }
      }, typingSpeed);
    };

    // Function to start backspacing
    const backspace = () => {
      backspaceTimerRef.current = setInterval(() => {
        if (displayText.length > 0) {
          setDisplayText((prev) => prev.slice(0, -1));
        } else {
          clearInterval(backspaceTimerRef.current as NodeJS.Timeout);
          setIsBackspacing(false);
          setIndex(0);
          setCurrentTextIndex((prevIndex) => (prevIndex + 1) % text.length);
          // Check if it should start typing the next text
          if (text.length > 1) {
            setTimeout(() => {
              setIsTyping(true);
            }, pauseDuration);
          }
        }
      }, backspaceSpeed);
    };

    // Start typing or backspacing based on current state
    if (isTyping) {
      type();
    } else if (isBackspacing) {
      backspace();
    }

    // Cleanup timers on component unmount or before starting new typing/backspacing
    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
      if (backspaceTimerRef.current) clearInterval(backspaceTimerRef.current);
    };
  }, [
    isTyping,
    isBackspacing,
    displayText,
    index,
    text,
    currentTextIndex,
    typingSpeed,
    backspaceSpeed,
    pauseDuration,
  ]);

  return (
    <div>
      <span>And&nbsp;{displayText}</span>
      <span className="cursor">|</span>
      <style jsx>{`
        .cursor {
          display: inline-block;
          animation: blink 1s step-start infinite;
        }
        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default TypingAnimation;
