
import React from "react";
import { AuthMode } from "@/components/auth/types";
import AuthForm from "@/components/auth/AuthForm";
import AuthModeToggle from "@/components/auth/AuthModeToggle";

interface AuthCardProps {
  mode: AuthMode;
  setMode: (mode: AuthMode) => void;
}

const AuthCard = ({ mode, setMode }: AuthCardProps) => {
  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {mode === "signIn" 
            ? "Sign In" 
            : mode === "signUp" 
              ? "Create Account" 
              : "Reset Password"}
        </h2>
        
        <AuthForm mode={mode} setMode={setMode} />
        <AuthModeToggle mode={mode} setMode={setMode} />
      </div>
    </div>
  );
};

export default AuthCard;
