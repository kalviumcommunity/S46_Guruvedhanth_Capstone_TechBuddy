import React from "react";
import send from "../assets/send.png";
import insta from "../assets/insta.png";
import twitter from "../assets/twitter.png";
import linkedin from "../assets/linkedin.png";

function Footer() {
  return (
    <div className="flex  flex-row justify-around bg-slate-800 px-36 py-10 text-white">
      <div className="flex  flex-col justify-evenly py-1 gap-y-8">
        <div className="flex flex-col gap-y-4">
          <p className="font-bold text-xl">Copyright @ 2024 Tech Buddy ltd.</p>
          <p className="">All rights are reserved</p>
        </div>
        <div className="flex gap-x-5">
          <div className="bg-white h-6 w-6 rounded-xl p-1">
            <img src={insta} alt="" />
          </div>
          <div className="bg-white h-6 w-6 rounded-xl p-1">
            <img src={twitter} alt="" />
          </div>
          <div className="bg-white h-6 w-6 rounded-xl p-1">
            <img src={linkedin} alt="" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-3">
        <div>
          <p className="font-bold text-xl">Company</p>
        </div>
        <p>About us</p>
        <p>Blog</p>
        <p>Contact Us</p>
      </div>
      <div className="flex flex-col gap-y-3">
        <div>
          <h1 className="font-bold text-xl">Support</h1>
        </div>
        <p>Help Center</p>
        <p>Terms of service</p>
        <p>Privacy policy</p>
      </div>
      <div className="flex flex-col gap-y-6">
        <div className="font-bold text-xl">Stay up to date</div>
        <div className="flex">
          <input
            className="px-3 rounded-l-lg text-black w-44"
            type="text"
            placeholder="Your email address"
          />
          <img src={send} className="w-6 bg-white p-1 rounded-r-lg" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Footer;
