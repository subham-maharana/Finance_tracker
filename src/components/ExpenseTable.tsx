
import { Expense, ExpenseCategory } from "@/types/expense";
import { format } from "date-fns";
import { Edit, Trash, Filter, ArrowUpDown, Download } from "lucide-react";
import { getCategoryColor, getAllCategories } from "@/utils/categoryColors";
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
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { exportToExcel } from "@/utils/exportUtils";

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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>(expenses);
  const [filters, setFilters] = useState({
    category: "" as ExpenseCategory | "",
    minAmount: "",
    maxAmount: "",
    startDate: "",
    endDate: "",
    searchTerm: "",
  });
  
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Expense | null;
    direction: 'ascending' | 'descending' | null;
  }>({
    key: null,
    direction: null,
  });

  // Update filtered expenses when expenses or filters change
  React.useEffect(() => {
    let result = [...expenses];
    
    // Filter by category
    if (filters.category) {
      result = result.filter((expense) => expense.category === filters.category);
    }
    
    // Filter by amount range
    if (filters.minAmount) {
      result = result.filter((expense) => expense.amount >= Number(filters.minAmount));
    }
    
    if (filters.maxAmount) {
      result = result.filter((expense) => expense.amount <= Number(filters.maxAmount));
    }
    
    // Filter by date range
    if (filters.startDate) {
      const startDate = new Date(filters.startDate);
      result = result.filter((expense) => expense.date >= startDate);
    }
    
    if (filters.endDate) {
      const endDate = new Date(filters.endDate);
      result = result.filter((expense) => expense.date <= endDate);
    }
    
    // Filter by search term
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      result = result.filter((expense) => 
        expense.name.toLowerCase().includes(term) || 
        expense.category.toLowerCase().includes(term)
      );
    }
    
    // Apply sorting
    if (sortConfig.key && sortConfig.direction) {
      result.sort((a, b) => {
        if (a[sortConfig.key!] < b[sortConfig.key!]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key!] > b[sortConfig.key!]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    setFilteredExpenses(result);
  }, [expenses, filters, sortConfig]);

  const handleSort = (key: keyof Expense) => {
    let direction: 'ascending' | 'descending' | null = 'ascending';
    
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') {
        direction = 'descending';
      } else if (sortConfig.direction === 'descending') {
        direction = null;
      }
    }
    
    setSortConfig({ key: direction ? key : null, direction });
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      category: "",
      minAmount: "",
      maxAmount: "",
      startDate: "",
      endDate: "",
      searchTerm: "",
    });
    setSortConfig({ key: null, direction: null });
  };
  
  const handleExportToExcel = () => {
    exportToExcel(filteredExpenses, 'expense_tracker_export');
  };
  
  if (expenses.length === 0) {
    return (
      <div className="text-center py-12 glass-card rounded-xl animate-fade-in">
        <p className="text-muted-foreground">No expenses yet. Add your first expense!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative">
          <Input
            placeholder="Search expenses..."
            value={filters.searchTerm}
            onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
            className="max-w-xs"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Collapsible
            open={isFilterOpen}
            onOpenChange={setIsFilterOpen}
            className="w-full sm:w-auto"
          >
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 rounded-md border bg-background p-4 shadow-md">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select
                    value={filters.category}
                    onValueChange={(value) => handleFilterChange("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Categories</SelectItem>
                      {getAllCategories().map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Amount Range</label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={filters.minAmount}
                      onChange={(e) => handleFilterChange("minAmount", e.target.value)}
                    />
                    <span>-</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={filters.maxAmount}
                      onChange={(e) => handleFilterChange("maxAmount", e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Date</label>
                  <Input
                    type="date"
                    value={filters.startDate}
                    onChange={(e) => handleFilterChange("startDate", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">End Date</label>
                  <Input
                    type="date"
                    value={filters.endDate}
                    onChange={(e) => handleFilterChange("endDate", e.target.value)}
                  />
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetFilters}
                >
                  Reset Filters
                </Button>
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1"
            onClick={handleExportToExcel}
          >
            <Download className="h-4 w-4" />
            Export to Excel
          </Button>
        </div>
      </div>
      
      <div className="glass-card rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer" 
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    Name
                    {sortConfig.key === 'name' && (
                      <ArrowUpDown className={`ml-1 h-4 w-4 ${sortConfig.direction === 'ascending' ? 'rotate-0' : 'rotate-180'}`} />
                    )}
                  </div>
                </TableHead>
                {!isMobile && (
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort('date')}
                  >
                    <div className="flex items-center">
                      Date
                      {sortConfig.key === 'date' && (
                        <ArrowUpDown className={`ml-1 h-4 w-4 ${sortConfig.direction === 'ascending' ? 'rotate-0' : 'rotate-180'}`} />
                      )}
                    </div>
                  </TableHead>
                )}
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('category')}
                >
                  <div className="flex items-center">
                    Category
                    {sortConfig.key === 'category' && (
                      <ArrowUpDown className={`ml-1 h-4 w-4 ${sortConfig.direction === 'ascending' ? 'rotate-0' : 'rotate-180'}`} />
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="text-right cursor-pointer"
                  onClick={() => handleSort('amount')}
                >
                  <div className="flex items-center justify-end">
                    Amount
                    {sortConfig.key === 'amount' && (
                      <ArrowUpDown className={`ml-1 h-4 w-4 ${sortConfig.direction === 'ascending' ? 'rotate-0' : 'rotate-180'}`} />
                    )}
                  </div>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExpenses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={isMobile ? 4 : 5} className="text-center py-8">
                    No expenses match your filters
                  </TableCell>
                </TableRow>
              ) : (
                filteredExpenses.map((expense) => (
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
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground">
        Showing {filteredExpenses.length} of {expenses.length} expenses
      </div>
    </div>
  );
};

export default ExpenseTable;
