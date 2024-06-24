import { useState } from "react";
import { Transition } from "@headlessui/react";
import Icon0 from "../assets/add.png";
import Icon1 from "../assets/minus.png";

function FAQs() {
  const [toggles, setToggles] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const toggleAnswer = (index) => {
    setToggles(toggles.map((item, i) => (i === index ? !item : item)));
  };

  return (
    <>
      <p className="text-center font-semibold text-2xl text-gray-600">FAQs</p>
      <br />
      <div className="flex flex-wrap justify-evenly">
        {[...Array(6).keys()].map((index) => (
          <div key={index} className="w-1/2 flex flex-col items-center mb-10">
            <div
              className="w-3/5 rounded-lg shadow-xl p-4 flex justify-between items-center cursor-pointer"
              onClick={() => toggleAnswer(index)}
            >
              <div className="flex flex-col">
                <p className="font-semibold">{generateQuestion(index + 1)}</p>
                <Transition
                  show={toggles[index]}
                  enter="transition-opacity duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  {(ref) => (
                    <p ref={ref} className="text-gray-500 mt-2 w-4/5">
                      {generateAnswer(index + 1)}
                    </p>
                  )}
                </Transition>
              </div>
              <div
                className={`w-10 h-10 p-2 flex items-center justify-center rounded ${
                  toggles[index] ? "bg-lime-600" : "bg-white"
                } shadow-md`}
              >
                <img
                  src={toggles[index] ? Icon1 : Icon0}
                  alt=""
                  className="w-6 h-6"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// Function to generate random questions
const generateQuestion = (index) => {
  switch (index) {
    case 1:
      return "Why should I use TechBuddy?";
    case 2:
      return "When was TechBuddy founded?";
    case 3:
      return "Is problem-solving important for web development?";
    case 4:
      return "How can institutions use TechBuddy?";
    case 5:
      return "Who are the founders of TechBuddy?";
    case 6:
      return "How can I contribute to TechBuddy?";
    default:
      return "Have a question about TechBuddy?";
  }
};

// Function to generate random answers
const generateAnswer = (index) => {
  switch (index) {
    case 1:
      return "TechBuddy is a platform that connects developers to collaborate on code sharing and innovative projects.";
    case 2:
      return "TechBuddy was founded in 2024 by a group of passionate developer.";
    case 3:
      return "Yes, having a problem-solving mindset is crucial for web development.";
    case 4:
      return "Institutions can utilize TechBuddy by signing up for an institutional account and inviting their students and teachers.";
    case 5:
      return "TechBuddy was founded by Guruvedhanth.";
    case 6:
      return "You can contribute to TechBuddy by participating in open-source projects, sharing your knowledge, and collaborating with other developers.";
    default:
      return "This is a default answer for a default question.";
  }
};

export default FAQs;
