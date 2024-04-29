import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { currentQuestionIdState } from '../Recoil'; 
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

function Answers() {
  const [answers, setAnswers] = useState([]);
  const questionId = useRecoilValue(currentQuestionIdState);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/qa/result");
        // console.log(response.data);
        setAnswers(response.data);
      } catch (error) {
        console.error("Error fetching answers:", error);
      }
    };

    fetchAnswers();
  }, []);

  return (
    <div className='flex justify-center items-center h-full flex-col w-screen gap-y-10'>
      {answers
        .filter(answer => answer.questionId === questionId) // Filter answers based on the question ID
        .map((answer) => (
          <div className='flex flex-col justify-center items-start w-3/4 gap-y-4' key={answer._id}>
            <div className='flex items-center justify-between w-full'>
              <div>Answer: {answer.answer}</div>
              <div>~~ {answer.username}</div>
            </div>
            <div className='w-full border border-green-600 rounded'>
              <Markdown rehypePlugins={[rehypeHighlight]}>
                {`\`\`\`${answer.category}\n${answer.code}\n\`\`\``}
              </Markdown>
            </div>
            <div className='text-sm py-3 px-1 w-2/4 border border-green-300 flex flex-col gap-y-2'>
              <div className='text-lg font-bold'>Explanation:</div>
              {answer.explanation}
            </div>
          </div>
        ))}
    </div>
  );
}

export default Answers;
