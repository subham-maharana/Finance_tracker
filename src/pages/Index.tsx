
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import ExpenseTable from "@/components/ExpenseTable";
import ExpenseChart from "@/components/ExpenseChart";
import AddExpenseModal from "@/components/AddExpenseModal";
import { Expense, ExpenseFormData } from "@/types/expense";
import { useExpenseSync } from "@/hooks/useExpenseSync";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  // Use the expense sync hook
  const { addExpense, updateExpense, deleteExpense } = useExpenseSync(expenses, setExpenses);
  
  // Redirect to auth page if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const handleAddExpense = async (data: ExpenseFormData) => {
    if (editingExpense) {
      // Update existing expense
      const updatedExpense = {
        ...editingExpense,
        ...data,
      };
      
      const success = await updateExpense(updatedExpense);
      if (success) {
        const updatedExpenses = expenses.map((expense) =>
          expense.id === editingExpense.id ? updatedExpense : expense
        );
        setExpenses(updatedExpenses);
        toast.success("Expense updated successfully");
      }
    } else {
      // Add new expense
      const newExpenseId = await addExpense(data);
      
      if (newExpenseId) {
        const newExpense: Expense = {
          id: newExpenseId,
          ...data,
        };
        setExpenses([...expenses, newExpense]);
        toast.success("Expense added successfully");
      }
    }

    setEditingExpense(null);
    setIsAddModalOpen(false);
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setIsAddModalOpen(true);
  };

  const handleDeleteExpense = async (id: string) => {
    const success = await deleteExpense(id);
    
    if (success) {
      setExpenses(expenses.filter((expense) => expense.id !== id));
      toast.success("Expense deleted successfully");
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8 py-6">
        <header className="flex flex-col md:flex-row justify-between items-center gap-4 animate-fade-in">
          <div>
            <p className="text-sm font-medium text-primary animate-slide-up">Expense Tracker</p>
            <h1 className="text-3xl font-bold tracking-tight">Financial Dashboard</h1>
          </div>
          <Button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primary hover:bg-primary/90 text-white transition-all shadow-sm hover:shadow-md hover-scale"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Expense
          </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ExpenseChart expenses={expenses} />
          <div className="glass-card rounded-xl p-6 shadow-sm animate-fade-in h-[400px] overflow-auto">
            <h3 className="text-lg font-medium mb-4">Recent Summary</h3>
            {expenses.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[calc(100%-2rem)] text-center">
                <p className="text-muted-foreground mb-4">
                  No expenses recorded yet.
                </p>
                <Button
                  onClick={() => setIsAddModalOpen(true)}
                  variant="outline"
                  className="hover-scale"
                >
                  Record your first expense
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Expenses</p>
                    <p className="text-2xl font-bold">
                      ${expenses.reduce((sum, expense) => sum + expense.amount, 0).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Number of Expenses</p>
                    <p className="text-2xl font-bold">{expenses.length}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Top Categories</p>
                  <div className="space-y-2">
                    {Object.entries(
                      expenses.reduce((acc, expense) => {
                        if (!acc[expense.category]) {
                          acc[expense.category] = 0;
                        }
                        acc[expense.category] += expense.amount;
                        return acc;
                      }, {} as Record<string, number>)
                    )
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 3)
                      .map(([category, amount]) => (
                        <div key={category} className="flex justify-between">
                          <span>{category}</span>
                          <span>${amount.toFixed(2)}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">All Expenses</h2>
          <ExpenseTable
            expenses={expenses}
            onEdit={handleEditExpense}
            onDelete={handleDeleteExpense}
          />
        </div>
      </div>

      <AddExpenseModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSubmit={handleAddExpense}
        editingExpense={editingExpense}
      />
    </Layout>
  );
};

export default Index;
