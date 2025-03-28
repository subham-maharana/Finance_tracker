
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  LineChart, 
  Bell, 
  Check, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck 
} from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-gray-50">
      {/* Navigation */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">Expense Tracker</div>
          <Link to="/auth">
            <Button variant="outline" className="hover-scale">Sign In</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
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
              <Link to="/auth">
                <Button size="lg" className="hover-scale">
                  Get Started for Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
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

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Use Expenses Tracker?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our powerful tools help you take control of your finances and achieve your goals faster.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="glass-card p-6 rounded-xl hover-scale">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Gain Financial Clarity</h3>
            <p className="text-muted-foreground">
              No more guessing where your money went! Get clear insights into your spending habits.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="glass-card p-6 rounded-xl hover-scale">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Budget Smarter, Save More</h3>
            <p className="text-muted-foreground">
              Set budgets, monitor expenses, and achieve your financial goals faster.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="glass-card p-6 rounded-xl hover-scale">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <LineChart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-Time Analytics & Reports</h3>
            <p className="text-muted-foreground">
              Visual dashboards, expense categories, and detailed reports to help you make better financial decisions.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="glass-card p-6 rounded-xl hover-scale">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Bell className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Alerts & Reminders</h3>
            <p className="text-muted-foreground">
              Never miss a bill payment! Get timely notifications to stay on track.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="glass-card p-6 rounded-xl hover-scale">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure & Easy Expense Management</h3>
            <p className="text-muted-foreground">
              Your data is encrypted and safely stored, so you can manage your finances worry-free.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 bg-primary/5 rounded-3xl my-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get started in just a few simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover-scale">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-primary font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
            <p className="text-muted-foreground">
              Create your account in seconds and get started right away.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover-scale">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-primary font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Add Expenses</h3>
            <p className="text-muted-foreground">
              Add your income and expenses effortlessly with our simple interface.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover-scale">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-primary font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Get Insights</h3>
            <p className="text-muted-foreground">
              View detailed reports and insights about your spending habits.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover-scale">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-primary font-bold">4</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Save Money</h3>
            <p className="text-muted-foreground">
              Stay within budget and grow your savings with our smart tools.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 text-center">
        <div className="max-w-3xl mx-auto glass-card p-12 rounded-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Take control of your money today!</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of users who have transformed their financial habits with Expense Tracker.
          </p>
          <Link to="/auth">
            <Button size="lg" className="px-8 hover-scale">
              Sign Up Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-xl font-bold text-primary mb-4 md:mb-0">Expense Tracker</div>
            <div className="flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-foreground">Terms</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Privacy</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Contact</a>
            </div>
          </div>
          <div className="text-center text-muted-foreground text-sm mt-8">
            © {new Date().getFullYear()} Expense Tracker. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
