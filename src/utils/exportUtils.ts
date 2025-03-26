
import { Expense } from "@/types/expense";
import { format } from "date-fns";

/**
 * Exports expense data to an Excel file
 * @param expenses Array of expense objects to export
 * @param fileName The name of the exported file (without extension)
 */
export const exportToExcel = (expenses: Expense[], fileName: string = 'expense_data') => {
  // Convert expenses to CSV format
  const headers = ["Name", "Category", "Amount", "Date"];
  
  const csvContent = [
    // Headers row
    headers.join(","),
    
    // Data rows
    ...expenses.map(expense => {
      const formattedDate = format(expense.date, "yyyy-MM-dd");
      const formattedAmount = expense.amount.toFixed(2);
      
      // Create CSV row with proper escaping for strings that might contain commas
      return [
        `"${expense.name.replace(/"/g, '""')}"`,
        `"${expense.category}"`,
        formattedAmount,
        formattedDate
      ].join(",");
    })
  ].join("\n");
  
  // Create a Blob with the CSV data
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  
  // Create a download link and trigger a click
  const link = document.createElement("a");
  
  // Create a URL for the blob
  const url = URL.createObjectURL(blob);
  
  // Set link properties
  link.setAttribute("href", url);
  link.setAttribute("download", `${fileName}.csv`);
  link.style.visibility = "hidden";
  
  // Append link to document, trigger click, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Release the URL object
  URL.revokeObjectURL(url);
};

/**
 * Formats an expense object for display or export
 * @param expense The expense object to format
 * @returns An object with formatted values
 */
export const formatExpenseForExport = (expense: Expense) => {
  return {
    name: expense.name,
    category: expense.category,
    amount: `$${expense.amount.toFixed(2)}`,
    date: format(expense.date, "MMM dd, yyyy")
  };
};
