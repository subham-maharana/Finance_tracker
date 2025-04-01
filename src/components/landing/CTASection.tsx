
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
      <div className="max-w-3xl mx-auto glass-card p-12 rounded-2xl bg-gradient-to-r from-primary/10 to-blue-100/50">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Take control of your money today!</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
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
          <div className="space-y-6">
            <Button 
              size="lg" 
              className="px-8 hover-scale"
              onClick={() => navigate("/auth", { state: { mode: "signUp" } })}
            >
              Sign Up Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="text-sm font-medium">Trusted by 10,000+ users worldwide</div>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div 
                    key={i} 
                    className="h-8 w-8 rounded-full border-2 border-white bg-primary/10 flex items-center justify-center text-xs font-medium"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
                <div className="h-8 w-8 rounded-full border-2 border-white bg-primary/10 flex items-center justify-center text-xs">
                  +5k
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CTASection;
