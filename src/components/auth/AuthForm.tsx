
import React, { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { AuthMode } from "@/components/auth/types";
import AuthFormFields from "@/components/auth/AuthFormFields";

interface AuthFormProps {
  mode: AuthMode;
  setMode: (mode: AuthMode) => void;
}

const AuthForm = ({ mode, setMode }: AuthFormProps) => {
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: ""
  });

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
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      toast.error(error.message || "An error occurred during authentication");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <AuthFormFields 
        mode={mode}
        formData={formData}
        handleChange={handleChange}
      />
      
      <Button type="submit" className="w-full" disabled={formLoading}>
        {mode === "resetPassword" && <span className="mr-2">📧</span>}
        {formLoading
          ? "Loading..."
          : mode === "signIn"
            ? "Sign In"
            : mode === "signUp"
              ? "Create Account"
              : "Send Reset Link"}
      </Button>
    </form>
  );
};

export default AuthForm;
