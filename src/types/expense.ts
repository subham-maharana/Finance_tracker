
export type ExpenseCategory = 
  | "Food" 
  | "Transport" 
  | "Entertainment" 
  | "Utilities" 
  | "Health" 
  | "Shopping" 
  | "Housing" 
  | "Other";

export interface Expense {
  id: string;
  name: string;
  amount: number;
  date: Date;
  category: ExpenseCategory;
}

export interface ExpenseFormData {
  name: string;
  amount: number;
  date: Date;
  category: ExpenseCategory;
}

export interface ExpenseFormInput {
  name: string;
  amount: string | number;
  date: Date;
  category: ExpenseCategory;
}

export interface CategoryTotal {
  category: ExpenseCategory;
  total: number;
  percentage: number;
}
