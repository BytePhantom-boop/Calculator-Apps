import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { NCrInput } from "@shared/schema";

export default function NCRCalculator() {
  const [n, setN] = useState<string>("");
  const [r, setR] = useState<string>("");
  const [result, setResult] = useState<{ n: number; r: number; result: number } | null>(null);
  const { toast } = useToast();

  const ncrMutation = useMutation({
    mutationFn: async (data: NCrInput) => {
      const response = await apiRequest("POST", "/api/ncr", data);
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

  const handleCalculate = () => {
    const nVal = parseInt(n);
    const rVal = parseInt(r);
    
    if (isNaN(nVal) || isNaN(rVal)) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid numbers",
        variant: "destructive",
      });
      return;
    }

    if (nVal < 0 || rVal < 0) {
      toast({
        title: "Invalid Input",
        description: "n and r cannot be negative",
        variant: "destructive",
      });
      return;
    }

    if (nVal < rVal) {
      toast({
        title: "Invalid Input",
        description: "n should be greater than or equal to r",
        variant: "destructive",
      });
      return;
    }

    ncrMutation.mutate({ n: nVal, r: rVal });
  };

  return (
    <Card className="bg-card rounded-lg border border-border shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-chart-2 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <h2 className="text-xl font-semibold text-card-foreground">nCr Calculator</h2>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="block text-sm font-medium text-card-foreground mb-1">n (total items)</Label>
              <Input 
                type="number" 
                min="0"
                value={n}
                onChange={(e) => setN(e.target.value)}
                placeholder="10"
                data-testid="input-ncr-n"
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-card-foreground mb-1">r (choose items)</Label>
              <Input 
                type="number" 
                min="0"
                value={r}
                onChange={(e) => setR(e.target.value)}
                placeholder="3"
                data-testid="input-ncr-r"
              />
            </div>
          </div>
          
          <Button 
            onClick={handleCalculate}
            disabled={ncrMutation.isPending}
            className="w-full"
            style={{ backgroundColor: 'var(--chart-2)', color: 'white' }}
            data-testid="button-calculate-ncr"
          >
            {ncrMutation.isPending ? "Calculating..." : "Calculate nCr"}
          </Button>
          
          <div className="bg-muted rounded-md p-4">
            <Label className="block text-sm font-medium text-muted-foreground mb-1">Result</Label>
            <div className="result-display text-xl font-semibold text-card-foreground" data-testid="text-ncr-result">
              {result ? `${result.n}C${result.r} = ${result.result}` : "Enter values to calculate nCr"}
            </div>
            {result && (
              <div className="text-sm text-muted-foreground mt-1">
                Combinations of choosing {result.r} items from {result.n}
              </div>
            )}
          </div>
          
          <div className="text-xs text-muted-foreground bg-muted/50 rounded-md p-2">
            <strong>Formula:</strong> nCr = n! / (r! × (n-r)!)
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
