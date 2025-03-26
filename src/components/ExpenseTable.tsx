
import { Expense } from "@/types/expense";
import { format } from "date-fns";
import { Edit, Trash } from "lucide-react";
import { getCategoryColor } from "@/utils/categoryColors";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface ExpenseTableProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

const ExpenseTable: React.FC<ExpenseTableProps> = ({
  expenses,
  onEdit,
  onDelete,
}) => {
  const isMobile = useIsMobile();
  
  if (expenses.length === 0) {
    return (
      <div className="text-center py-12 glass-card rounded-xl animate-fade-in">
        <p className="text-muted-foreground">No expenses yet. Add your first expense!</p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-xl overflow-hidden shadow-sm animate-fade-in">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              {!isMobile && <TableHead>Date</TableHead>}
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow
                key={expense.id}
                className="transition-colors hover:bg-secondary/40"
              >
                <TableCell className="font-medium">{expense.name}</TableCell>
                {!isMobile && (
                  <TableCell>{format(expense.date, "MMM dd, yyyy")}</TableCell>
                )}
                <TableCell>
                  <span className={`expense-pill ${getCategoryColor(expense.category)}`}>
                    {expense.category}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  ${expense.amount.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onEdit(expense)}
                      className="h-8 w-8"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onDelete(expense.id)}
                      className="h-8 w-8 text-destructive"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ExpenseTable;
