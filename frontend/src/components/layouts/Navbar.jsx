import React from "react";
import ProfileInfoCard from "../cards/ProfileInfoCard";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="h-16 bg-gradient-to-r from-[#1a0026] via-[#2d003d] to-black border-b border-purple-800/60 shadow-sm backdrop-blur-md py-2.5 z-50">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/">
          <div className="text-xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            AceMyInterview
          </div>
        </Link>
        <ProfileInfoCard />
      </div>
    </div>
  );
};

export default Navbar;
