import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil'; // Import useSetRecoilState
import { currentQuestionIdState, currentAnswerIdState } from '../Recoil'; // Import currentAnswerIdState
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';
import Comments from "../assets/comment.png";
import { useParams } from 'react-router-dom';

function Answers() {
  const [answers, setAnswers] = useState([]);
  const questionId = useRecoilValue(currentQuestionIdState);
  const setCurrentAnswerId = useSetRecoilState(currentAnswerIdState);
  const { id } = useParams();

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await axios.get("https://s46-guruvedhanth-capstone-techbuddy.onrender.com/api/qa/result");
        const decodedAnswers = response.data.map(answer => ({
          ...answer,
          code: atob(answer.code), // Decode base64 encoded code
        }));
        setAnswers(decodedAnswers);
      } catch (error) {
        console.error("Error fetching answers:", error);
      }
    };

    fetchAnswers();
  }, []);

  const filteredAnswers = answers.filter(answer => answer.questionId === id);

  return (
    <div className='flex justify-center items-center h-full flex-col w-screen gap-y-10 m-10'>
      {filteredAnswers.length > 0 ? (
        filteredAnswers.map((answer) => (
          <div className='flex flex-col justify-center items-start w-3/4 gap-y-4' key={answer._id}>
            <div className='flex items-center justify-between w-full'>
              <div><span className='font-bold'>Answer:</span> {answer.answer}</div>
              <div>~~ {answer.username}</div>
            </div>
            <div className='w-full border border-green-600 rounded'>
              <Markdown rehypePlugins={[rehypeHighlight]}>
                {`\`\`\`${answer.category}\n${answer.code}\n\`\`\``}
              </Markdown>
            </div>
            <img src={Comments} alt="" className='h-4 w-4' onClick={() => { setCurrentAnswerId(answer._id) }} />
            <div className='text-sm py-3 px-1 w-2/4 border border-green-300 flex flex-col gap-y-2'>
              <div className='text-lg font-bold'>Explanation:</div>
              {answer.explanation}
            </div>
          </div>
        ))
      ) : (
        <div className='flex justify-center items-center h-full w-full'>
          <div className='text-center font-bold'>
            No answer added right now. You are the first one to add an answer. Don't hesitate to do it right now!
          </div>
        </div>

      )}
    </div>
  );
}

export default Answers;
