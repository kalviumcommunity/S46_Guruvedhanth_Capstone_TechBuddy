import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from './pages/LandingPage';
import Login from './pages/LoginPage';
import Signup from './pages/SignupPage';
import AnswerPage from './pages/AnswerPage';
import QuestionsPage from './pages/QuestionsPage';
import QuestionInput from './components/QuestionInput';
import AnswerInput from "./components/AnswerInput"
import EditQuestion from './components/EditQuestion';

function App() {
  return (
    <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path='/explore' element={<QuestionsPage/>}/>
        <Route path="askquestion" element={<QuestionInput/>}/>
        <Route path="addanswer" element={<AnswerInput/>}/>
        <Route path="/answers/:id" element={<AnswerPage/>}/>
        <Route path="/editquestion/:id" element={<EditQuestion />} />
        <Route path="/" element={<Home/>} />
    </Routes>
  );
}

export default App;
