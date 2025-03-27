
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-primary">
            Expense Tracker
          </Link>
          <div className="flex items-center gap-4">
            {!loading && (
              <>
                {user ? (
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">
                      Welcome, {user.user_metadata.name || "User"}
                    </span>
                    <Button
                      variant="outline"
                      onClick={handleSignOut}
                      size="sm"
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Button onClick={() => navigate("/auth")} size="sm">
                    Sign In
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  );
};

export default Layout;
