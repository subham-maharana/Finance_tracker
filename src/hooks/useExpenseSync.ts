
import { useEffect } from "react";
import { Expense } from "@/types/expense";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

export const useExpenseSync = (
  expenses: Expense[],
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>
) => {
  const { user, loading } = useAuth();

  // Fetch expenses from Supabase when user is authenticated
  useEffect(() => {
    const fetchExpenses = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from("expenses")
          .select("*")
          .eq("user_id", user.id)
          .order("date", { ascending: false });

        if (error) throw error;

        if (data) {
          const formattedExpenses: Expense[] = data.map((item: any) => ({
            id: item.id,
            name: item.name,
            amount: Number(item.amount),
            date: new Date(item.date),
            category: item.category,
          }));
          
          setExpenses(formattedExpenses);
        }
      } catch (error: any) {
        console.error("Error fetching expenses:", error);
        toast.error("Failed to load expenses");
      }
    };

    if (user && !loading) {
      fetchExpenses();
    }
  }, [user, loading, setExpenses]);

  // Handle adding expense to Supabase
  const addExpense = async (expense: Omit<Expense, "id">) => {
    if (!user) {
      toast.error("You must be logged in to add expenses");
      return null;
    }

    try {
      const { data, error } = await supabase
        .from("expenses")
        .insert({
          user_id: user.id,
          name: expense.name,
          amount: expense.amount,
          date: expense.date.toISOString(),
          category: expense.category,
        })
        .select()
        .single();

      if (error) throw error;
      
      return data.id;
    } catch (error: any) {
      console.error("Error adding expense:", error);
      toast.error("Failed to add expense");
      return null;
    }
  };

  // Handle updating expense in Supabase
  const updateExpense = async (expense: Expense) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from("expenses")
        .update({
          name: expense.name,
          amount: expense.amount,
          date: expense.date.toISOString(),
          category: expense.category,
        })
        .eq("id", expense.id)
        .eq("user_id", user.id);

      if (error) throw error;
      
      return true;
    } catch (error: any) {
      console.error("Error updating expense:", error);
      toast.error("Failed to update expense");
      return false;
    }
  };

  // Handle deleting expense from Supabase
  const deleteExpense = async (id: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from("expenses")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) throw error;
      
      return true;
    } catch (error: any) {
      console.error("Error deleting expense:", error);
      toast.error("Failed to delete expense");
      return false;
    }
  };

  return { addExpense, updateExpense, deleteExpense };
};
