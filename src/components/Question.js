import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    // Define handleTimeout inside the useEffect callback
    function handleTimeout() {
      setTimeRemaining(10);
      onAnswered(false);
    }

    // Exit early if the timer reaches 0
    if (timeRemaining === 0) {
      handleTimeout();
      return;
    }

    // Create a timer that decrements timeRemaining every second
    const timerId = setTimeout(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    // Cleanup the timer on component unmount or when the question changes
    return () => clearTimeout(timerId);
  }, [timeRemaining, onAnswered]); // Include dependencies in the dependency array

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
