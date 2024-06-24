import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { currentQuestionIdState, usernameState } from '../Recoil'; // Path to your Recoil store file
import Cookies from 'js-cookie';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';
import { useNavigate } from "react-router-dom";
import EditIcon from "../assets/edit.png";
import DeleteIcon from "../assets/delete.png";

function Questions() {
  const [questions, setQuestions] = useState([]);
  const setCurrentQuestionId = useSetRecoilState(currentQuestionIdState);
  const setUsername = useSetRecoilState(usernameState);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("https://s46-guruvedhanth-capstone-techbuddy.onrender.com/api/qa/queries");
        const decodedQuestions = response.data.map(question => {
          // Validate the Base64 string before decoding
          if (isValidBase64(question.code)) {
            return {
              ...question,
              code: atob(question.code), // Decode base64 encoded code
            };
          } else {
            console.error(`Invalid Base64 code for question ID ${question._id}`);
            return question;
          }
        });
        // Sort questions by createdAt field in descending order
        decodedQuestions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setQuestions(decodedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
    
    // Get username from cookies and set it in Recoil state
    const username = Cookies.get('username');
    if (username) {
      setUsername(username);
      console.log("Username from cookies:", username); 
    } else {
      console.log("No username found in cookies.");
    }
  }, [setUsername]);

  const isValidBase64 = (str) => {
    try {
      return btoa(atob(str)) === str;
    } catch (err) {
      return false;
    }
  };

  const handleAnswerClick = (id) => {
    setCurrentQuestionId(id);
    localStorage.setItem("questionId", id);
    navigate(`/answers/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://s46-guruvedhanth-capstone-techbuddy.onrender.com/api/qa/delquestion/${id}`);
      setQuestions(questions.filter(question => question._id !== id));
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/editquestion/${id}`);
  };

  const username = Cookies.get('username');

  return (
    <div className='flex justify-center items-center h-full flex-col w-screen gap-y-10'>
      {questions.reverse().map((question) => (
        <div className='flex flex-col justify-center items-start w-3/4 gap-y-4' key={question._id}>
          <div className='flex items-center justify-between w-full'>
            <div className='font-bold text-lg'>{question.title}</div>
            <div className="flex items-center gap-x-5">
              <div>~~ {question.username}</div>
              {username && username !== "Anonymous" && username === question.username && (
                <>
                  <button onClick={() => handleEdit(question._id)} className='text-lg text-green-700 font-bold'>
                    <img src={EditIcon} alt="Edit" className='h-6 w-6'/>
                  </button>
                  <button onClick={() => handleDelete(question._id)} className='text-lg text-green-700 font-bold'>
                    <img src={DeleteIcon} alt="Delete" className='h-6 w-6'/>
                  </button>
                </>
              )}
            </div>
          </div>
          <div className='w-full border border-green-600 rounded'>
            <Markdown rehypePlugins={[rehypeHighlight]}>
              {`\`\`\`${question.category}\n${question.code}\n\`\`\``}
            </Markdown>
          </div>
          <div className='text-sm'>{question.description}</div>
          <div className='flex gap-x-4'>
            <button onClick={() => handleAnswerClick(question._id)} className='text-lg text-green-700 font-bold'>
              Answers
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Questions;
