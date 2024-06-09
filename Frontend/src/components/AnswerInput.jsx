import { useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import axios from "axios";
import { category, usernameState, currentQuestionIdState } from "../Recoil"; // Import the category atom
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function AnswerInput() {
  const [answer, setAnswer] = useState('');
  const [code, setCode] = useState('');
  const [explanation, setExplanation] = useState('');
  const [error, setError] = useState(null); // State for error message
  const selectedCategory = useRecoilValue(category); // Get the category from Recoil
  const username = useRecoilValue(usernameState);
  const setUsername = useSetRecoilState(usernameState);
  const questionId = useRecoilValue(currentQuestionIdState);
  const setQuestionId = useSetRecoilState(currentQuestionIdState);
  const navigate = useNavigate();

  useEffect(() => {
    const username = Cookies.get('username');
    if (username) {
      setUsername(username);
    } else {
      setUsername("Anonymous")
    }

    if (!questionId) {
      const storedQuestionId = localStorage.getItem("questionId");
      if (storedQuestionId) {
        setQuestionId(storedQuestionId);
      }
    }
  }, [questionId, setQuestionId],[setUsername]);

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleInputChange = (e) => {
    setCode(e.target.value);
  };

  const handleExplanationChange = (e) => {
    setExplanation(e.target.value);
  };

  const handleSubmit = () => {
    const base64EncodedText = btoa(code);

    axios
      .post("http://localhost:3000/api/qa/answer", {
        answer: answer,
        code: base64EncodedText,
        explanation: explanation,
        username: username,
        questionId: questionId,
        category: selectedCategory // Pass selected category to backend
      })
      .then(response => {
        console.log("Success");
        navigate(`/answers/${questionId}`);
      })
      .catch(error => {
        setError(error.response.data.error); // Set error message based on server response
      });
  };

  return (
    <div className="flex flex-col p-10 md:p-0 justify-center items-center gap-y-10">
      <div className="flex flex-col gap-y-5 w-4/5 md:w-1/2 px-10 border border-white py-3 shadow-lg rounded-xl">
        <div>Answer:</div>
        <input type="text" name="answer" onChange={handleAnswerChange} className="border border-green-600 p-4 rounded" />
      </div>

      <div className="flex flex-col gap-y-5 w-4/5 md:w-1/2 px-10 border border-white py-3 shadow-lg rounded-xl">
        <div className="flex flex-row justify-between items-center">
          <div>Code:</div>
        </div>
        <textarea
          value={code}
          onChange={handleInputChange}
          cols="20"
          rows="5"
          className="border border-green-600 rounded"
          style={{ whiteSpace: 'pre-wrap' }}
        ></textarea>
      </div>

      <div className="flex flex-col gap-y-5 w-4/5 md:w-1/2 px-10 border border-white py-3 shadow-lg rounded-xl">
        <div>Explanation:</div>
        <textarea className="h-32 resize-none border border-green-600 rounded-md p-2" onChange={handleExplanationChange}></textarea>
        <div className="h-7 w-12 flex items-center justify-center bg-green-600 rounded text-white" onClick={handleSubmit}>Next</div>
      </div>

      {error && <div className="text-red-600">{error}</div>} {/* Display error message */}

    </div>
  );
}

export default AnswerInput;
