import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface TableEntry {
  multiplier: number;
  result: number;
}

export default function MultiplicationTable() {
  const [number, setNumber] = useState<string>("");
  const [table, setTable] = useState<TableEntry[] | null>(null);
  const { toast } = useToast();

  const handleGenerate = () => {
    const num = parseFloat(number);
    
    if (isNaN(num)) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid number",
        variant: "destructive",
      });
      return;
    }

    // Generate multiplication table 1-10 offline
    const generatedTable: TableEntry[] = [];
    for (let i = 1; i <= 10; i++) {
      generatedTable.push({ multiplier: i, result: num * i });
    }

    setTable(generatedTable);
  };

  const handleClear = () => {
    setNumber("");
    setTable(null);
  };

  return (
    <Card className="bg-card rounded-lg border border-border shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-chart-3 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white font-bold text-xl">×</span>
          </div>
          <h2 className="text-xl font-semibold text-card-foreground">Multiplication Table</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label className="block text-sm font-medium text-card-foreground mb-1">
              Enter Number
            </Label>
            <Input 
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="7"
              data-testid="input-table"
            />
          </div>
          
          <div className="flex gap-2">
            <Button onClick={handleGenerate} className="flex-1">
              Generate Table
            </Button>
            <Button onClick={handleClear} variant="secondary" className="flex-1">
              Clear
            </Button>
          </div>
          
          <div className="bg-muted rounded-md p-4 max-h-64 overflow-y-auto">
            <Label className="block text-sm font-medium text-muted-foreground mb-2">
              Multiplication Table (1-10)
            </Label>
            <div className="result-display space-y-1 text-sm" data-testid="table-result">
              {table ? (
                table.map((entry) => (
                  <div key={entry.multiplier} className="flex justify-between py-1 border-b border-border/50">
                    <span>{number} × {entry.multiplier}</span>
                    <span className="font-semibold">= {entry.result}</span>
                  </div>
                ))
              ) : (
                <div className="text-center text-muted-foreground">Enter a number to generate table</div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
