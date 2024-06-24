import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import { category, usernameState } from "../Recoil";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

function QuestionInput() {
    const [title, setTitle] = useState('');
    const [code, setCode] = useState('');
    const [description, setDescription] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('javascript');
    const [categoryState, setCategory] = useRecoilState(category);
    const [username, setUsername] = useRecoilState(usernameState);
    const [error, setError] = useState(null); // State for error message
    const navigate = useNavigate();

    useEffect(() => {
        const cookieUsername = Cookies.get("username");
        if (cookieUsername) {
            setUsername(cookieUsername);
        } else {
            setUsername("Anonymous")
        }
    }, [setUsername]);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleInputChange = (e) => {
        setCode(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleLanguageChange = (e) => {
        const selectedLanguage = e.target.value;
        setSelectedLanguage(selectedLanguage);
    };

    const handleSubmit = () => {
        if (!username) {
            console.error("Username is required to post a question.");
            alert("You must be logged in to post a question.");
            return;
        }

        if (!title || !description || !selectedLanguage) {
            console.error("Title, description, and category are required.");
            alert("Title, description, and category are required.");
            return;
        }
    
        const base64EncodedText = btoa(code);
        setCategory(selectedLanguage);

        axios
            .post("https://s46-guruvedhanth-capstone-techbuddy.onrender.com/api/qa/question", {
                title: title,
                category: selectedLanguage,
                code: base64EncodedText,
                description: description,
                username: username
            })
            .then(response => {
                console.log("Success");
                navigate("/explore");
            })
            .catch(error => {
                setError(error.response.data.error); // Set error message based on server response
            });
    }
    
    return (
        <div className="flex flex-col p-10 md:p-10 justify-center items-center gap-y-10">
            <div className="flex flex-col gap-y-5 w-4/5 md:w-1/2 px-10 border border-white py-3 shadow-lg rounded-xl">
                <div>Title:</div>
                <input type="text" name="title" onChange={handleTitleChange} className="border border-green-600 p-4 rounded"/>
            </div>

            <div className="flex flex-col gap-y-5 w-4/5 md:w-1/2 px-10 border border-white py-3 shadow-lg rounded-xl">
                <div className="flex flex-row justify-between items-center">
                    <div>Code:</div>
                    <div>
                        <select value={selectedLanguage} onChange={handleLanguageChange}>
                            <option value="javascript">JavaScript</option>
                            <option value="python">Python</option>
                            <option value="java">Java</option>
                        </select>
                    </div>
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
                <div>Description:</div>    
                <textarea className="h-32 resize-none border border-green-600 rounded-md p-2" onChange={handleDescriptionChange}></textarea>
                <div className="h-7 w-12 flex items-center justify-center bg-green-600 rounded text-white cursor-pointer" onClick={handleSubmit}>Next</div>
            </div>
            {error && <div className="text-red-600">{error}</div>} {/* Display error message */}

        </div>
    );
}

export default QuestionInput;
