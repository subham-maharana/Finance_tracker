
import React from "react";
import { BarChart3, LineChart, Bell, TrendingUp, ShieldCheck } from "lucide-react";

const Features = () => {
  return (
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
  );
};

export default Features;
