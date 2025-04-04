
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import VideoSection from "@/components/landing/VideoSection";
import Testimonials from "@/components/landing/Testimonials";
import HowItWorks from "@/components/landing/HowItWorks";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import { useAuth } from "@/context/AuthContext";

const Landing = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (user && !loading) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);
  
  // Show loading state while checking authentication
  if (loading) {
    return <div className="min-h-screen bg-gradient-to-b from-background to-gray-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <p className="text-lg">Loading...</p>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <Hero />
      <Features />
      <VideoSection />
      <HowItWorks />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Landing;
