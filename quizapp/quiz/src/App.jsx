import React, { useState } from 'react';
import { questions } from './questions';
import { useNavigate } from 'react-router-dom';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState();
  const navigate = useNavigate();

  const answerClick = (choice) => {
    setSelectedOption(choice); 
    
    if (choice === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

      if (currentQuestion !== questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
    }
  };

  const finish = () => {
    if (currentQuestion === questions.length - 1) {
      navigate('/Result', { state: { score, total: questions.length } });
    }
  };

  return (
    <div>
      <h1 className="quiz">Quiz Time</h1>
      <div className="app">
        <div className="testscreen">
          <div className="top">
            <h3 className="question">{questions[currentQuestion].question}</h3>
            <h5>{currentQuestion + 1} of {questions.length}</h5>
          </div>

          <div className="option-list"> 
            {questions[currentQuestion].choices.map((choice, i) => (
              <h5 
                key={i} 
                onClick={() => answerClick(choice)} 
                className={`option ${selectedOption === choice ? 'selected' : ''}`}
              >
                {choice}
              </h5>
            ))}
          </div>
        </div>
      </div> 
      <button onClick={finish}>The End</button>
  
    </div>
  );
}

export default App;
