import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { PrimeCheckInput } from "@shared/schema";

export default function PrimeChecker() {
  const [number, setNumber] = useState<string>("");
  const [result, setResult] = useState<{ number: number; isPrime: boolean; result: string } | null>(null);
  const { toast } = useToast();

  const primeCheckMutation = useMutation({
    mutationFn: async (data: PrimeCheckInput) => {
      const response = await apiRequest("POST", "/api/prime-check", data);
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

  const handleCheck = () => {
    const num = parseInt(number);
    
    if (isNaN(num)) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid number",
        variant: "destructive",
      });
      return;
    }

    if (num <= 1) {
      toast({
        title: "Invalid Input",
        description: "Number must be greater than 1",
        variant: "destructive",
      });
      return;
    }

    primeCheckMutation.mutate({ number: num });
  };

  return (
    <Card className="bg-card rounded-lg border border-border shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-chart-1 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white font-bold text-xl">#</span>
          </div>
          <h2 className="text-xl font-semibold text-card-foreground">Prime Number Checker</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label className="block text-sm font-medium text-card-foreground mb-1">Enter Number ({'>'} 1)</Label>
            <Input 
              type="number" 
              min="2"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="17"
              data-testid="input-prime"
            />
          </div>
          
          <Button 
            onClick={handleCheck}
            disabled={primeCheckMutation.isPending}
            className="w-full"
            style={{ backgroundColor: 'var(--chart-1)', color: 'white' }}
            data-testid="button-check-prime"
          >
            {primeCheckMutation.isPending ? "Checking..." : "Check Prime"}
          </Button>
          
          {result && (
            <div className={`${result.isPrime ? 'bg-accent/10 border-accent/20' : 'bg-destructive/10 border-destructive/20'} border rounded-md p-4`} data-testid="result-prime">
              <div className="flex items-center">
                <div className={`w-6 h-6 ${result.isPrime ? 'bg-accent' : 'bg-destructive'} rounded-full flex items-center justify-center mr-2`}>
                  <span className="text-white text-xs font-bold">{result.isPrime ? '✓' : '✗'}</span>
                </div>
                <div>
                  <div className="result-display text-lg font-semibold text-card-foreground" data-testid="text-prime-result">
                    {result.number} is {result.isPrime ? 'Prime' : 'Composite'}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {result.isPrime 
                      ? "This number has no factors other than 1 and itself"
                      : "This number has factors other than 1 and itself"
                    }
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
