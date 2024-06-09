import React from "react";
import send from "../assets/send.png";
import insta from "../assets/insta.png";
import twitter from "../assets/twitter.png";
import linkedin from "../assets/linkedin.png";

function Footer() {
  return (
    <div className="flex  flex-row justify-around bg-slate-800 text-white">
      <div className="flex  flex-row justify-between w-4/5  px-18 py-2 items-center">
        <div className="flex flex-col gap-y-1">
          <p className="font-bold text-xl">Copyright @ 2024 Tech Buddy ltd.</p>
          <p className="">All rights are reserved</p>
        </div>
        <div className="flex gap-x-5">
          <div className="bg-white h-7 w-7 rounded p-1">
            <img src={insta} alt="" onClick={()=>{window.open("https://www.instagram.com/guru_vedhanth/")}}/>
          </div>
          <div className="bg-white h-7 w-7 rounded p-1">
            <img src={twitter} alt="" onClick={()=>{window.open("https://x.com/guruvedhanth")}}/>
          </div>
          <div className="bg-white h-7 w-7 rounded p-1">
            <img src={linkedin} alt="" onClick={()=>{window.open("https://www.linkedin.com/in/guruvedhanth-s/")}}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
