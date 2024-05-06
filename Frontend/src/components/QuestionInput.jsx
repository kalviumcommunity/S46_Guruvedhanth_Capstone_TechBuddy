import { useState } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import { category } from "../Recoil"; 

function QuestionInput() {
    const [title, setTitle] = useState('');
    const [code, setCode] = useState('');
    const [description, setDescription] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('javascript');
    const [categoryState, setCategory] = useRecoilState(category); // Use Recoil state for category

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
        // Encode code to base64
        const base64EncodedText = btoa(code);
        setCategory(selectedLanguage);
        // Retrieve username from cookies
        const cookies = document.cookie.split(';');
        let username = '';
        cookies.forEach(cookie => {
            const [name, value] = cookie.split('=').map(c => c.trim());
            if (name === 'username') {
                username = value;
            }
            console.log(username)
        });

        console.log(title, selectedLanguage, code, description);
        axios
            .post("http://localhost:3000/api/qa/question", {
                title: title,
                category: selectedLanguage,
                code: base64EncodedText, // Send base64 encoded code
                description: description,
                username: "tony"
            })
            .then(response => {
                console.log("Success");
            })
            .catch(error => {
                // Handle error if needed
                console.error(error.response.data);
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
                <textarea className="h-32 resize-none border border-green-600 rounded-md p-2 " onChange={handleDescriptionChange} ></textarea>
                <div className="h-7 w-12 flex items-center justify-center bg-green-600 rounded text-white" onClick={handleSubmit} >Next</div>
            </div>
        </div>
    );
}

export default QuestionInput;
