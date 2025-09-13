import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { FactorialInput } from "@shared/schema";

export default function FactorialCalculator() {
  const [number, setNumber] = useState<string>("");
  const [result, setResult] = useState<{ number: number; result: number } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { toast } = useToast();

  const factorialMutation = useMutation({
    mutationFn: async (data: FactorialInput) => {
      const response = await apiRequest("POST", "/api/factorial", data);
      return response.json();
    },
    onSuccess: (data) => {
      setResult(data);
      setErrorMessage("");
    },
    onError: (error: any) => {
      setErrorMessage(error.message);
      toast({
        title: "Calculation Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleCalculate = () => {
    const num = parseFloat(number);
    
    if (isNaN(num)) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid number",
        variant: "destructive",
      });
      return;
    }

    if (num < 0) {
      setErrorMessage("Factorial is not defined for negative numbers");
      return;
    }

    factorialMutation.mutate({ number: num });
  };

  return (
    <Card className="bg-card rounded-lg border border-border shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center mr-3">
            <span className="text-accent-foreground font-bold text-xl">!</span>
          </div>
          <h2 className="text-xl font-semibold text-card-foreground">Factorial Calculator</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label className="block text-sm font-medium text-card-foreground mb-1">Enter Number (n ≥ 0)</Label>
            <Input 
              type="number" 
              min="0"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="5"
              data-testid="input-factorial"
            />
          </div>
          
          <Button 
            onClick={handleCalculate}
            disabled={factorialMutation.isPending}
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            data-testid="button-calculate-factorial"
          >
            {factorialMutation.isPending ? "Calculating..." : "Calculate n!"}
          </Button>
          
          <div className="bg-muted rounded-md p-4">
            <Label className="block text-sm font-medium text-muted-foreground mb-1">Result</Label>
            <div className="result-display text-xl font-semibold text-card-foreground" data-testid="text-factorial-result">
              {result ? `${result.number}! = ${result.result}` : "Enter a number to calculate factorial"}
            </div>
            {result && (
              <div className="text-sm text-muted-foreground mt-1">Factorial of {result.number}</div>
            )}
          </div>
          
          {errorMessage && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3" data-testid="error-factorial">
              <p className="text-destructive text-sm font-medium">{errorMessage}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
