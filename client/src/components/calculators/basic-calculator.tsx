import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { BasicCalculatorInput } from "@shared/schema";

export default function BasicCalculator() {
  const [num1, setNum1] = useState<string>("");
  const [num2, setNum2] = useState<string>("");
  const [result, setResult] = useState<number>(0);
  const { toast } = useToast();

  const calculateMutation = useMutation({
    mutationFn: async (data: BasicCalculatorInput) => {
      const response = await apiRequest("POST", "/api/calculate", data);
      return response.json();
    },
    onSuccess: (data) => {
      setResult(data.result);
    },
    onError: (error: any) => {
      toast({
        title: "Calculation Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleOperation = (operation: 'add' | 'subtract' | 'multiply' | 'modulo') => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    
    if (isNaN(n1) || isNaN(n2)) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid numbers",
        variant: "destructive",
      });
      return;
    }

    calculateMutation.mutate({ num1: n1, num2: n2, operation });
  };

  return (
    <Card className="bg-card rounded-lg border border-border shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-3">
            <span className="text-primary-foreground font-bold text-xl">+</span>
          </div>
          <h2 className="text-xl font-semibold text-card-foreground">Basic Calculator</h2>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="block text-sm font-medium text-card-foreground mb-1">First Number</Label>
              <Input 
                type="number" 
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
                placeholder="0"
                data-testid="input-num1"
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-card-foreground mb-1">Second Number</Label>
              <Input 
                type="number" 
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
                placeholder="0"
                data-testid="input-num2"
              />
            </div>
          </div>
          
          <div className="calculator-grid">
            <Button 
              onClick={() => handleOperation('add')}
              disabled={calculateMutation.isPending}
              data-testid="button-add"
            >
              Add (+)
            </Button>
            <Button 
              onClick={() => handleOperation('subtract')}
              disabled={calculateMutation.isPending}
              data-testid="button-subtract"
            >
              Subtract (-)
            </Button>
            <Button 
              onClick={() => handleOperation('multiply')}
              disabled={calculateMutation.isPending}
              data-testid="button-multiply"
            >
              Multiply (×)
            </Button>
            <Button 
              onClick={() => handleOperation('modulo')}
              disabled={calculateMutation.isPending}
              data-testid="button-modulo"
            >
              Modulo (%)
            </Button>
          </div>
          
          <div className="bg-muted rounded-md p-4">
            <Label className="block text-sm font-medium text-muted-foreground mb-1">Result</Label>
            <div className="result-display text-2xl font-semibold text-card-foreground" data-testid="text-result">
              {calculateMutation.isPending ? "Calculating..." : result}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
