
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

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
            <Button 
              size="lg" 
              className="hover-scale"
              onClick={() => navigate("/auth", { state: { mode: "signUp" } })}
            >
              Get Started for Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="glass-card rounded-xl shadow-lg p-8 animate-fade-in">
          <div className="aspect-video bg-white rounded-lg shadow-sm overflow-hidden">
            <img 
              src="/placeholder.svg" 
              alt="Expense Tracker Dashboard" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
