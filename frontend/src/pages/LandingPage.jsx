import React, { useContext, useState } from "react";
import { LuSparkles } from "react-icons/lu";
import { APP_FEATURE } from "../constants/App_feature";
import Modal from "../components/Modal";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import ProfileInfoCard from "../components/cards/ProfileInfoCard";
const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [openAuthModel, setOpenAuthModel] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  const handleCTA = () => {
    if (!user) {
      setOpenAuthModel(true);
    } else {
      navigate("/dashboard");
    }
  };
  return (
    <>
      <div className="w-full min-h-full bg-gradient-to-br from-[#1a0026] via-[#2d003d] to-black text-white">
        <div className="w-[500px] h-[500px] bg-purple-900/30 blur-[65px] absolute top-0 left" />
        <div className="container mx-auto px-4 pt-6 pb-[200px] relative  z-10">
          <header className="flex justify-between items-center mb-16">
            <div className="text-xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              AceMyInterview
            </div>

            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white border border-white transition-colors cursor-pointer"
                onClick={() => setOpenAuthModel(true)}
              >
                Login / Sign Up
              </button>
            )}
          </header>

          <div className="flex flex-row md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
              <div className="flex items-center justify-left mb-2">
                <div className="flex items-center gap-2 text-[13px] text-purple-400 font-semibold bg-purple-800/30 px-3 py-1 rounded-full border border-purple-500">
                  <LuSparkles />
                  AI Powered
                </div>
              </div>
              <h1 className="text-5xl text-white font-medium mb-6 leading-tight">
                Ace Interviews with <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 animate-text-shine font-semibold">
                  AI-Powered
                </span>{" "}
                Learning
              </h1>
            </div>

            <div className="w-full md:w-1/2">
              <p className="text-[17px] text-purple-100 mr-0 md:mr-20 mb-6">
                Get role-specific interview questions tailored to your career
                path. Expand answers only when you need them, dive deeper into
                key concepts, and stay organized throughout your prep journey.
                From first steps to expert level — your personalized interview
                toolkit is here.
              </p>
              <button
                className="bg-gradient-to-r from-purple-700 to-fuchsia-700 text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:opacity-90 transition-colors cursor-pointer"
                onClick={handleCTA}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full min-h-full relative z-10 ">
        <div>
          <section className="flex items-center justify-center -mt-36">
            <img
              src="https://img.freepik.com/free-photo/abstract-dark-background-with-purple-lines-generative-ai_169016-30668.jpg?semt=ais_hybrid&w=740"
              alt="Futuristic purple wave background"
              className="w-[50vw] h-[20vw] rounded-lg"
            />
          </section>
        </div>

        <div className="w-full min-h-full bg-gradient-to-br from-[#1a0026] via-[#2d003d] to-black mt-10">
          <div className="container mx-auto px-4 pt-10 pb-20">
            <section className="mt-5">
              <h2 className="text-2xl font-medium text-center mb-12 text-white">
                Features That Make You Shine
              </h2>

              <div className="flex flex-col items-center gap-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                  {APP_FEATURE.slice(0, 3).map((feature) => (
                    <div
                      key={feature.title}
                      className="bg-gradient-to-br from-[#2d003d] to-black p-6 rounded-xl shadow-md hover:shadow-xl transition border border-purple-900 text-white"
                    >
                      <h3 className="text-base font-semibold mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-purple-200">{feature.description}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {APP_FEATURE.slice(3).map((feature) => (
                    <div
                      key={feature.title}
                      className="bg-gradient-to-br from-[#2d003d] to-black p-6 rounded-xl shadow-md hover:shadow-xl transition border border-purple-900 text-white"
                    >
                      <h3 className="text-base font-semibold mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-purple-200"> {feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className="text-sm bg-black text-purple-300 text-center p-5 mt-5">
          Happy Coding
        </div>
      </div>
      <Modal
        isOpen={openAuthModel}
        onClose={() => {
          setOpenAuthModel(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}

          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </>
  );
};

export default LandingPage;
