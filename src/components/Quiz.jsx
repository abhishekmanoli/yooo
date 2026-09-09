import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function Quiz({ questions }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (option) => {
    if (option === questions[currentQ].answer) {
      setScore(score + 1);
      confetti({
        particleCount: 30,
        spread: 30,
        origin: { y: 0.7 },
        colors: ['#4ecdc4', '#ffe66d']
      });
    }

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
    }
  };

  const getResultText = () => {
    const percentage = score / questions.length;
    if (percentage === 1) return "100% — Certified Bro 🫡";
    if (percentage >= 0.5) return `${Math.round(percentage * 100)}% — You clearly know your guy 😎`;
    return `${Math.round(percentage * 100)}% — Do you even know him? 😭`;
  };

  return (
    <div className="flex flex-col items-center max-w-xl mx-auto py-8">
      <h2 className="text-3xl font-handwritten mb-8 text-center">How Well Do You Know Him? 👀</h2>

      {!showResult ? (
        <motion.div 
          key={currentQ}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100"
        >
          <h3 className="text-xl font-bold mb-6 text-center">{questions[currentQ].question}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {questions[currentQ].options.map((opt, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(opt)}
                className="p-4 bg-gray-50 hover:bg-primary hover:text-white rounded-xl transition-colors font-medium border border-gray-200"
              >
                {opt}
              </motion.button>
            ))}
          </div>
          <p className="text-center mt-6 text-sm text-gray-400 font-mono">
            Question {currentQ + 1} of {questions.length}
          </p>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center bg-white p-10 rounded-3xl border-4 border-dashed border-primary"
        >
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
          <p className="text-xl font-handwritten text-secondary mb-6">{getResultText()}</p>
          <button 
            onClick={() => {
              setCurrentQ(0);
              setScore(0);
              setShowResult(false);
            }}
            className="text-sm underline text-gray-500 hover:text-gray-800"
          >
            Try again?
          </button>
        </motion.div>
      )}
    </div>
  );
}
