import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { Mail } from "lucide-react";

type AuthMode = "signIn" | "signUp" | "resetPassword";
type LocationState = { mode?: AuthMode } | null;

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuth();
  const locationState = location.state as LocationState;
  const [mode, setMode] = useState<AuthMode>(locationState?.mode || "signIn");
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: ""
  });
  
  // Redirect to home if already logged in
  useEffect(() => {
    if (user && !loading) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      if (mode === "resetPassword") {
        // Send password reset email
        const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
          redirectTo: `${window.location.origin}/auth`
        });

        if (error) throw error;
        
        toast.success("Password reset link sent! Please check your email.");
        // Switch back to sign in mode
        setMode("signIn");
        return;
      }

      if (mode === "signUp") {
        // Sign up
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              name: formData.name,
              phone_number: formData.phoneNumber
            }
          }
        });

        if (error) throw error;
        
        toast.success("Sign up successful! Please check your email for confirmation link.");
        toast.info("For testing: You may need to disable email verification in Supabase dashboard.");
      } else {
        // Sign in
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        });

        if (error) {
          if (error.message === "Email not confirmed") {
            toast.error("Your email is not confirmed. Please check your inbox for the confirmation link or contact support.");
          } else if (error.message === "Invalid login credentials") {
            toast.error("Invalid email or password. Please try again.");
          } else {
            throw error;
          }
          return;
        }

        toast.success("Signed in successfully!");
        navigate("/");
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      toast.error(error.message || "An error occurred during authentication");
    } finally {
      setFormLoading(false);
    }
  };

  const renderFormFields = () => {
    if (mode === "resetPassword") {
      return (
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      );
    }

    return (
      <>
        {mode === "signUp" && (
          <>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}
        
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
      </>
    );
  };

  const getActionButton = () => {
    let buttonText = "";
    
    if (formLoading) {
      buttonText = "Loading...";
    } else if (mode === "signIn") {
      buttonText = "Sign In";
    } else if (mode === "signUp") {
      buttonText = "Create Account";
    } else if (mode === "resetPassword") {
      buttonText = "Send Reset Link";
    }
    
    return (
      <Button type="submit" className="w-full" disabled={formLoading}>
        {mode === "resetPassword" && <Mail className="mr-2 h-4 w-4" />}
        {buttonText}
      </Button>
    );
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-10">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {mode === "signIn" 
              ? "Sign In" 
              : mode === "signUp" 
                ? "Create Account" 
                : "Reset Password"}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {renderFormFields()}
            
            {getActionButton()}
          </form>
          
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
        </div>
      </div>
    </Layout>
  );
};

export default Auth;
