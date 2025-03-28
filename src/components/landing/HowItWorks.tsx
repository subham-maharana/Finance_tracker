
import React from "react";

const HowItWorks = () => {
  return (
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
  );
};

export default HowItWorks;
