
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const CTASection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <section className="container mx-auto px-4 py-16 md:py-24 text-center">
      <div className="max-w-3xl mx-auto glass-card p-12 rounded-2xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Take control of your money today!</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Join thousands of users who have transformed their financial habits with Expense Tracker.
        </p>
        {user ? (
          <Button 
            size="lg" 
            className="px-8 hover-scale"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button 
            size="lg" 
            className="px-8 hover-scale"
            onClick={() => navigate("/auth", { state: { mode: "signUp" } })}
          >
            Sign Up Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </section>
  );
};

export default CTASection;
