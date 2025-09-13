import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { MultiplicationTableInput } from "@shared/schema";

interface TableEntry {
  multiplier: number;
  result: number;
}

export default function MultiplicationTable() {
  const [number, setNumber] = useState<string>("");
  const [result, setResult] = useState<{ number: number; table: TableEntry[] } | null>(null);
  const { toast } = useToast();

  const tableMutation = useMutation({
    mutationFn: async (data: MultiplicationTableInput) => {
      const response = await apiRequest("POST", "/api/multiplication-table", data);
      return response.json();
    },
    onSuccess: (data) => {
      setResult(data);
    },
    onError: (error: any) => {
      toast({
        title: "Calculation Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

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

    tableMutation.mutate({ number: num });
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
            <Label className="block text-sm font-medium text-card-foreground mb-1">Enter Number</Label>
            <Input 
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="7"
              data-testid="input-table"
            />
          </div>
          
          <Button 
            onClick={handleGenerate}
            disabled={tableMutation.isPending}
            className="w-full"
            style={{ backgroundColor: 'var(--chart-3)', color: 'white' }}
            data-testid="button-generate-table"
          >
            {tableMutation.isPending ? "Generating..." : "Generate Table"}
          </Button>
          
          <div className="bg-muted rounded-md p-4 max-h-64 overflow-y-auto">
            <Label className="block text-sm font-medium text-muted-foreground mb-2">Multiplication Table (1-10)</Label>
            <div className="result-display space-y-1 text-sm" data-testid="table-result">
              {result ? (
                result.table.map((entry) => (
                  <div key={entry.multiplier} className="flex justify-between py-1 border-b border-border/50">
                    <span>{result.number} × {entry.multiplier}</span>
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
