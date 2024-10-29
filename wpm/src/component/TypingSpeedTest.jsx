import React, { useState, useEffect, useRef } from "react";

const sentences = [
  "The quick brown fox jumps over the lazy dog",
  "Practice makes perfect",
  "React is a powerful library for building user interfaces",
  "Typing speed is measured in words per minute",
  "This is a typing speed test"
];

const TypingSpeedTest = () => {
  const [sentence, setSentence] = useState("");
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [completed, setCompleted] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    getNewSentence();
  }, []);

  useEffect(() => {
    if (input === sentence) {
      const timeTaken = (Date.now() - startTime) / 60000; 
      const wordCount = sentence.split(" ").length;
      setWpm(Math.round(wordCount / timeTaken));
      setCompleted(true);
    }
  }, [input]);

  const getNewSentence = () => {
    const randomIndex = Math.floor(Math.random() * sentences.length);
    setSentence(sentences[randomIndex]);
    setInput("");
    setStartTime(null);
    setWpm(0);
    setCompleted(false);
    inputRef.current.focus();
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (!startTime) {
      setStartTime(Date.now());
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Typing Speed Test</h2>
      <p>Type the following sentence as quickly as you can:</p>
      <blockquote style={{ fontSize: "1.2em", marginBottom: "20px" }}>{sentence}</blockquote>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        ref={inputRef}
        placeholder="Start typing here..."
        style={{ width: "100%", padding: "10px", fontSize: "1em" }}
        disabled={completed}
      />
      <div style={{ marginTop: "20px" }}>
        {completed ? (
          <h3>You typed at {wpm} WPM!</h3>
        ) : (
          <p>Typing speed will appear here after you finish.</p>
        )}
        <button onClick={getNewSentence} style={{ marginTop: "10px" }}>Reset</button>
      </div>
    </div>
  );
};

export default TypingSpeedTest;
