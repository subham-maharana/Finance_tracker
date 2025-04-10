
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Hero = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 animate-fade-in">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm">
            Track. Analyze. Save.
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Take Control of Your Finances with Expense Tracker
          </h1>
          <p className="text-lg text-muted-foreground">
            Stay on top of your expenses effortlessly. Our smart expense tracker helps you manage your money like a pro!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            {user ? (
              <Button 
                size="lg" 
                className="hover-scale"
                onClick={() => navigate("/dashboard")}
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <>
                <Button 
                  size="lg" 
                  className="hover-scale"
                  onClick={() => navigate("/auth", { state: { mode: "signUp" } })}
                >
                  Get Started for Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="hover-scale"
                  onClick={() => navigate("/dashboard", { state: { demoMode: true } })}
                >
                  Try Demo
                  <Play className="ml-2 h-4 w-4" />
                </Button>
              </>
            )}
          </div>
          <div className="pt-4">
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <span className="inline-block h-5 w-5 rounded-full bg-green-500 flex-shrink-0"></span>
              No credit card required • Free plan available
            </p>
          </div>
        </div>
        <div className="glass-card rounded-xl shadow-lg p-6 animate-fade-in">
          <AspectRatio ratio={16/9} className="overflow-hidden rounded-lg">
            <img 
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1000" 
              alt="Expense Tracker Dashboard" 
              className="w-full h-full object-cover"
            />
          </AspectRatio>
        </div>
      </div>
    </section>
  );
};

export default Hero;
