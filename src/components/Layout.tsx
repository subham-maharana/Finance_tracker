
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LayoutDashboard } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isDemo = location.state?.demoMode;

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xl font-bold text-primary">
              Expense Tracker
            </Link>
            {(user || isDemo) && (
              <Link to="/dashboard" state={{ demoMode: isDemo }} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
            )}
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            {isDemo && (
              <div className="flex items-center">
                <span className="text-xs text-orange-500 font-medium mr-2 bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded-md">
                  Demo Mode
                </span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate("/auth", { state: { mode: "signUp" } })}
                >
                  Sign Up
                </Button>
              </div>
            )}
            
            {!loading && !isDemo && (
              <>
                {user ? (
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600 dark:text-gray-300 hidden sm:inline">
                      Welcome, {user.user_metadata.name || "User"}
                    </span>
                    
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
                          My Account
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => navigate("/profile")}>
                          Profile Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleSignOut}>
                          Sign Out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    
                  </div>
                ) : (
                  <Button onClick={() => navigate("/auth")} size="sm">
                    Sign In / Sign Up
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">
        {isDemo && (
          <div className="mb-4 p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg border border-orange-200 dark:border-orange-900/50">
            <p className="text-orange-700 dark:text-orange-300 text-sm flex items-center">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              <span>
                <strong>Demo Mode:</strong> You can explore all features, but data won't be saved when you leave.
              </span>
            </p>
          </div>
        )}
        {children}
      </main>
    </div>
  );
};

export default Layout;
