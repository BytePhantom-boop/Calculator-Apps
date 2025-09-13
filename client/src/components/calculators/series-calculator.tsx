import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { SeriesCalculationInput } from "@shared/schema";

export default function SeriesCalculator() {
  const [number, setNumber] = useState<string>("");
  const [result, setResult] = useState<{ n: number; oddSum: number; evenSum: number; result: number } | null>(null);
  const { toast } = useToast();

  const seriesMutation = useMutation({
    mutationFn: async (data: SeriesCalculationInput) => {
      const response = await apiRequest("POST", "/api/series-sum", data);
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
    const num = parseInt(number);
    
    if (isNaN(num)) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid number",
        variant: "destructive",
      });
      return;
    }

    if (num < 1) {
      toast({
        title: "Invalid Input",
        description: "Number must be positive",
        variant: "destructive",
      });
      return;
    }

    seriesMutation.mutate({ n: num });
  };

  const generateSeriesPattern = (n: number) => {
    const terms = [];
    for (let i = 1; i <= n; i++) {
      if (i === 1) {
        terms.push(i.toString());
      } else if (i % 2 === 0) {
        terms.push(`- ${i}`);
      } else {
        terms.push(`+ ${i}`);
      }
    }
    return terms.join(' ');
  };

  return (
    <Card className="bg-card rounded-lg border border-border shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-chart-4 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white font-bold text-lg">Σ</span>
          </div>
          <h2 className="text-xl font-semibold text-card-foreground">Alternating Series</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label className="block text-sm font-medium text-card-foreground mb-1">Enter n (series length)</Label>
            <Input 
              type="number" 
              min="1"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="10"
              data-testid="input-series"
            />
          </div>
          
          <Button 
            onClick={handleCalculate}
            disabled={seriesMutation.isPending}
            className="w-full"
            style={{ backgroundColor: 'var(--chart-4)', color: 'white' }}
            data-testid="button-calculate-series"
          >
            {seriesMutation.isPending ? "Calculating..." : "Calculate Series"}
          </Button>
          
          <div className="bg-muted rounded-md p-4">
            <Label className="block text-sm font-medium text-muted-foreground mb-1">Series Pattern</Label>
            {result && (
              <>
                <div className="result-display text-sm text-muted-foreground mb-2" data-testid="text-series-pattern">
                  {generateSeriesPattern(result.n)}
                </div>
                <div className="result-display text-xl font-semibold text-card-foreground" data-testid="text-series-result">
                  Result = {result.result}
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  <div>Odd sum: {Array.from({length: Math.ceil(result.n/2)}, (_, i) => 2*i + 1).filter(x => x <= result.n).join('+')} = {result.oddSum}</div>
                  <div>Even sum: {Array.from({length: Math.floor(result.n/2)}, (_, i) => 2*(i + 1)).join('+')} = {result.evenSum}</div>
                  <div>Series result: {result.oddSum} - {result.evenSum} = {result.result}</div>
                </div>
              </>
            )}
            {!result && (
              <div className="text-center text-muted-foreground">Enter a number to calculate series</div>
            )}
          </div>
          
          <div className="text-xs text-muted-foreground bg-muted/50 rounded-md p-2">
            <strong>Formula:</strong> (Sum of odd terms) - (Sum of even terms)
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
