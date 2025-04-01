
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import AuthCard from "@/components/auth/AuthCard";
import { AuthMode } from "@/components/auth/types";

type LocationState = { mode?: AuthMode } | null;

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuth();
  const locationState = location.state as LocationState;
  const [mode, setMode] = useState<AuthMode>(locationState?.mode || "signIn");
  
  // Redirect to home if already logged in
  useEffect(() => {
    if (user && !loading) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <AuthCard mode={mode} setMode={setMode} />
    </Layout>
  );
};

export default Auth;
