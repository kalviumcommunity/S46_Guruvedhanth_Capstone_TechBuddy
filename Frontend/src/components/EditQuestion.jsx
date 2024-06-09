import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRecoilState } from 'recoil';
import { usernameState } from '../Recoil'; // Import the username state from Recoil

function EditQuestion() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [username, setUsername] = useRecoilState(usernameState); // Use Recoil state for username
  const [error, setError] = useState(null); // State to store error
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/qa/queries/${id}`);
        const question = response.data;
        setTitle(question.title);
        setCategory(question.category);
        setCode(validateBase64(question.code) ? atob(question.code) : question.code);
        setDescription(question.description);
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };

    fetchQuestion();
  }, [id]);

  useEffect(() => {
    const cookieUsername = Cookies.get("username");
    if (cookieUsername) {
      setUsername(cookieUsername);
    }
  }, [setUsername]);

  const validateBase64 = (str) => {
    try {
      return btoa(atob(str)) === str;
    } catch (err) {
      return false;
    }
  };

  const handleUpdate = async () => {
    // Clear previous errors
    setError(null);

    // Frontend validation for title and description
    if (!title || !description) {
      setError("Title and description are required");
      return;
    }
    if (title.length < 5 || title.length > 25) {
      setError("Title must be between 5 and 25 characters long");
      return;
    }
    if (description.length < 25 || description.length > 250) {
      setError("Description must be between 25 and 250 characters long");
      return;
    }

    try {
      const updatedQuestion = { title, description };
      const response = await axios.patch(`http://localhost:3000/api/qa/updatequestion/${id}`, updatedQuestion);
      navigate('/explore');
    } catch (error) {
      setError(error.response.data.error); // Update error state with the error message from server
      console.error("Error updating question:", error);
    }
  };

  return (
    <div className="flex flex-col p-10 md:p-10 justify-center items-center gap-y-10">
      <div className="flex flex-col gap-y-5 w-4/5 md:w-1/2 px-10 border border-white py-3 shadow-lg rounded-xl">
        <div>Title:</div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-green-600 p-4 rounded"
        />
      </div>

      <div className="flex flex-col gap-y-5 w-4/5 md:w-1/2 px-10 border border-white py-3 shadow-lg rounded-xl">
        <div className="flex flex-row justify-between items-center">
          <div>Category:</div>
          <div>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
            </select>
          </div>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          cols="20"
          rows="5"
          className="border border-green-600 rounded"
          style={{ whiteSpace: 'pre-wrap' }}
        ></textarea>
      </div>

      <div className="flex flex-col gap-y-5 w-4/5 md:w-1/2 px-10 border border-white py-3 shadow-lg rounded-xl">
        <div>Description:</div>
        <textarea
          className="h-32 resize-none border border-green-600 rounded-md p-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div className="h-7 w-12 flex items-center justify-center bg-green-600 rounded text-white cursor-pointer" onClick={handleUpdate}>
          Update
        </div>
      </div>

      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}

export default EditQuestion;
