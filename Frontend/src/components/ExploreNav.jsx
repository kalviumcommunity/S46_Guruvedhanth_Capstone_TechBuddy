import Back from "../assets/back.png"
import { Link, useNavigate } from "react-router-dom";

function ExploreNav() {
  const navigate = useNavigate();
  return (
    <div className='flex justify-around items-center m-10'>
        <div className="flex items-center gap-x-5" onClick={()=>{navigate("/")}}>
            <img src={Back} alt="" className="w-8 h-8" />
            <p>Back to Home</p>
        </div>
        <div></div>
        <p></p>
        <button className="h-10 bg-green-500 rounded-lg  w-32" onClick={()=>{navigate("/askquestion")}}>
            Ask a Question
        </button>
    </div>
  )
}

export default ExploreNav