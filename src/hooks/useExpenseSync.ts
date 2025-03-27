
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Expense, ExpenseFormData, ExpenseCategory } from "@/types/expense";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

// Define a type for the expense record from the database
interface ExpenseRecord {
  id: string;
  user_id: string;
  name: string;
  amount: string | number;
  date: string;
  category: string;
}

export const useExpenseSync = (
  expenses: Expense[],
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>
) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  // Fetch expenses when the component mounts
  useEffect(() => {
    const fetchExpenses = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from("expenses")
          .select("*")
          .eq("user_id", user.id)
          .order("date", { ascending: false });

        if (error) {
          throw error;
        }

        if (data) {
          const formattedExpenses: Expense[] = data.map((expense: ExpenseRecord) => ({
            id: expense.id,
            name: expense.name,
            amount: typeof expense.amount === 'string' ? parseFloat(expense.amount) : expense.amount,
            date: new Date(expense.date),
            category: expense.category as ExpenseCategory
          }));

          setExpenses(formattedExpenses);
        }
      } catch (error: any) {
        console.error("Error fetching expenses:", error);
        toast.error(`Failed to load expenses: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [user, setExpenses]);

  // Add a new expense
  const addExpense = async (data: ExpenseFormData): Promise<string | null> => {
    if (!user) {
      toast.error("You must be logged in to add expenses");
      return null;
    }

    try {
      const { data: insertedData, error } = await supabase
        .from("expenses")
        .insert({
          user_id: user.id,
          name: data.name,
          amount: data.amount,
          date: data.date,
          category: data.category
        } as any)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return insertedData?.id || null;
    } catch (error: any) {
      console.error("Error adding expense:", error);
      toast.error(`Failed to add expense: ${error.message}`);
      return null;
    }
  };

  // Update an existing expense
  const updateExpense = async (expense: Expense): Promise<boolean> => {
    if (!user) {
      toast.error("You must be logged in to update expenses");
      return false;
    }

    try {
      const { error } = await supabase
        .from("expenses")
        .update({
          name: expense.name,
          amount: expense.amount,
          date: expense.date,
          category: expense.category
        } as any)
        .eq("id", expense.id)
        .eq("user_id", user.id);

      if (error) {
        throw error;
      }

      return true;
    } catch (error: any) {
      console.error("Error updating expense:", error);
      toast.error(`Failed to update expense: ${error.message}`);
      return false;
    }
  };

  // Delete an expense
  const deleteExpense = async (id: string): Promise<boolean> => {
    if (!user) {
      toast.error("You must be logged in to delete expenses");
      return false;
    }

    try {
      const { error } = await supabase
        .from("expenses")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) {
        throw error;
      }

      return true;
    } catch (error: any) {
      console.error("Error deleting expense:", error);
      toast.error(`Failed to delete expense: ${error.message}`);
      return false;
    }
  };

  return {
    loading,
    addExpense,
    updateExpense,
    deleteExpense,
  };
};
