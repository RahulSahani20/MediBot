import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import login from "../assets/login.jpg"

const Auth = ({ setIsAuthenticated }) => {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => setShowLogin((prev) => !prev);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 px-4">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden flex flex-col lg:flex-row">
        {/* Left side - image or branding */}
        <div className="hidden lg:block lg:w-1/2 bg-blue-600 text-white flex items-center justify-center">
          {/* <h1 className="text-4xl font-bold">Welcome to MediBot</h1> */}
          <img src={login} />
        </div>

        {/* Right side - forms */}
        <div className="w-full lg:w-1/2 p-8 mt-20">
          {showLogin ? (
            <>
              <Login setIsAuthenticated={setIsAuthenticated} />
              <p className="mt-4 text-sm text-center">
                Don't have an account?{" "}
                <button
                  onClick={toggleForm}
                  className="text-indigo-600 hover:underline"
                >
                  Sign Up
                </button>
              </p>
            </>
          ) : (
            <>
              <Register />
              <p className="mt-4 text-sm text-center">
                Already have an account?{" "}
                <button
                  onClick={toggleForm}
                  className="text-indigo-600 hover:underline"
                >
                  Sign In
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
