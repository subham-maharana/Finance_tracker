
import React from "react";
import { AuthMode } from "@/components/auth/types";

interface AuthModeToggleProps {
  mode: AuthMode;
  setMode: (mode: AuthMode) => void;
}

const AuthModeToggle = ({ mode, setMode }: AuthModeToggleProps) => {
  return (
    <>
      <div className="mt-4 text-center">
        {mode === "resetPassword" ? (
          <button 
            onClick={() => setMode("signIn")}
            className="text-blue-500 hover:underline"
            type="button"
          >
            Back to Sign In
          </button>
        ) : (
          <button 
            onClick={() => setMode(mode === "signIn" ? "signUp" : "signIn")}
            className="text-blue-500 hover:underline"
            type="button"
          >
            {mode === "signIn" 
              ? "Don't have an account? Sign up" 
              : "Already have an account? Sign in"}
          </button>
        )}
      </div>
      
      {mode === "signIn" && (
        <div className="mt-2 text-center">
          <button 
            onClick={() => setMode("resetPassword")}
            className="text-blue-500 hover:underline text-sm"
            type="button"
          >
            Forgot your password?
          </button>
        </div>
      )}
      
      {mode === "signIn" && (
        <div className="mt-3 text-center text-sm text-gray-500">
          <p>If you've just signed up, please check your email to confirm your account.</p>
        </div>
      )}
    </>
  );
};

export default AuthModeToggle;
