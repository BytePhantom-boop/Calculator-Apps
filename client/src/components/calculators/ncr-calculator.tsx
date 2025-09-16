import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Helper function to compute factorial
const factorial = (n: number): number => {
  let res = 1;
  for (let i = 2; i <= n; i++) {
    res *= i;
  }
  return res;
};

// Helper function to compute nCr
const calculateNCr = (n: number, r: number): number => {
  return factorial(n) / (factorial(r) * factorial(n - r));
};

export default function NCRCalculator() {
  const [n, setN] = useState<string>("");
  const [r, setR] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);
  const { toast } = useToast();

  const handleCalculate = () => {
    const nVal = parseInt(n);
    const rVal = parseInt(r);

    if (isNaN(nVal) || isNaN(rVal) || nVal < 0 || rVal < 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid non-negative numbers",
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

    setResult(calculateNCr(nVal, rVal));
  };

  const handleClear = () => {
    setN("");
    setR("");
    setResult(null);
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
              <Label className="block text-sm font-medium text-card-foreground mb-1">
                n (total items)
              </Label>
              <Input
                type="number"
                min="0"
                value={n}
                onChange={(e) => setN(e.target.value)}
                placeholder="10"
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-card-foreground mb-1">
                r (choose items)
              </Label>
              <Input
                type="number"
                min="0"
                value={r}
                onChange={(e) => setR(e.target.value)}
                placeholder="3"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleCalculate} className="flex-1">
              Calculate nCr
            </Button>
            <Button onClick={handleClear} variant="secondary" className="flex-1">
              Clear
            </Button>
          </div>

          <div className="bg-muted rounded-md p-4">
            <Label className="block text-sm font-medium text-muted-foreground mb-1">Result</Label>
            <div className="result-display text-xl font-semibold text-card-foreground">
              {result !== null ? `${n}C${r} = ${result}` : "Enter values to calculate nCr"}
            </div>
            {result !== null && (
              <div className="text-sm text-muted-foreground mt-1">
                Combinations of choosing {r} items from {n}
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
