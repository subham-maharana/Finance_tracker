
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold text-primary">Expense Tracker</div>
        <div className="flex gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage 
                    src={user.user_metadata.avatar_url} 
                    alt={user.user_metadata.name || "User"} 
                  />
                  <AvatarFallback>
                    {user.user_metadata.name 
                      ? getUserInitials(user.user_metadata.name) 
                      : <User className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5 text-sm font-medium">
                  {user.user_metadata.name || user.email}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
