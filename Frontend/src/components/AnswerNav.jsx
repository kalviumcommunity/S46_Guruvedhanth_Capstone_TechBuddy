import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { currentAnswerIdState } from '../Recoil'; // Ensure this import path is correct
import Back from '../assets/back.png';

function AnswerNav() {
  const navigate = useNavigate();
  const setCurrentAnswerId = useSetRecoilState(currentAnswerIdState);

  const handleBackClick = () => {
    // Reset the currentAnswerId to default
    setCurrentAnswerId('');
    // Navigate to the explore page
    navigate('/explore');
  };

  return (
    <div className='flex justify-around items-center m-10'>
      <div className="flex items-center gap-x-5" onClick={handleBackClick}>
        <img src={Back} alt="" className="w-8 h-8" />
        <p>Back to Questions</p>
      </div>
      <div></div>
      <p></p>
      <button className="h-10 bg-green-500 rounded-lg w-32" onClick={() => { navigate('/addanswer'); }}>
        Add answer
      </button>
    </div>
  );
}

export default AnswerNav;
