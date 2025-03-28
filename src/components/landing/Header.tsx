
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold text-primary">Expense Tracker</div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="hover-scale"
            onClick={() => navigate("/auth", { state: { mode: "signIn" } })}
          >
            <LogIn className="mr-2 h-4 w-4" />
            Sign In
          </Button>
          <Button 
            variant="default" 
            className="hover-scale"
            onClick={() => navigate("/auth", { state: { mode: "signUp" } })}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
