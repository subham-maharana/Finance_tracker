import { ExpenseCategory } from "@/types/expense";

export const getCategoryColor = (category: ExpenseCategory): string => {
  const colors: Record<ExpenseCategory, string> = {
    "Food": "bg-expense-food text-white",
    "Transport": "bg-expense-transport text-white",
    "Entertainment": "bg-expense-entertainment text-white",
    "Utilities": "bg-expense-utilities text-white",
    "Health": "bg-expense-health text-white",
    "Shopping": "bg-expense-shopping text-white",
    "Housing": "bg-expense-housing text-white",
    "Other": "bg-expense-other text-white",
  };
  
  return colors[category] || colors["Other"];
};

export const getCategoryFillColor = (category: ExpenseCategory): string => {
  const colors: Record<ExpenseCategory, string> = {
    "Food": "hsl(152, 57%, 58%)",
    "Transport": "hsl(199, 89%, 48%)",
    "Entertainment": "hsl(262, 83%, 58%)",
    "Utilities": "hsl(31, 89%, 56%)",
    "Health": "hsl(355, 78%, 56%)",
    "Shopping": "hsl(291, 64%, 42%)",
    "Housing": "hsl(228, 74%, 48%)",
    "Other": "hsl(210, 10%, 50%)",
  };
  
  return colors[category] || colors["Other"];
};

export const getAllCategories = (): ExpenseCategory[] => {
  return ["Food", "Transport", "Entertainment", "Utilities", "Health", "Shopping", "Housing", "Other"];
};
