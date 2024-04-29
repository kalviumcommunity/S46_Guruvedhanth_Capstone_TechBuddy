import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { currentQuestionIdState } from '../Recoil'; // Path to your Recoil store file
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

function Questions() {
  const [questions, setQuestion] = useState([]);
  const setCurrentQuestionId = useSetRecoilState(currentQuestionIdState);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/qa/queries");
        setQuestion(response.data);
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerClick = (id) => {
    setCurrentQuestionId(id);
    // Additional logic for navigating to the answer page or displaying answers can be added here
  };

  return (
    <div className='flex justify-center items-center h-full flex-col w-screen gap-y-10'>
      {questions.map((question) => (
        <div className='flex flex-col justify-center items-start w-3/4 gap-y-4' key={question._id}>
          <div className='flex items-center justify-between w-full'>
            <div className='font-bold text-lg'>{question.title}</div>
            <div>~~ {question.username}</div>
          </div>
          <div className='w-full border border-green-600 rounded'>
            <Markdown rehypePlugins={[rehypeHighlight]}>
              {`\`\`\`${question.category}\n${question.code}\n\`\`\``}
            </Markdown>
          </div>
          <div className='text-sm'>{question.description}</div>
          <button onClick={() => handleAnswerClick(question._id)} className='text-lg text-green-700 font-bold'>
            Answer
          </button>
        </div>
      ))}
    </div>
  );
}

export default Questions;
