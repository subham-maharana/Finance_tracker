
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/40 p-4 md:p-8 animate-fade-in">
      <main className="container mx-auto max-w-7xl">
        {children}
      </main>
    </div>
  );
};

export default Layout;
