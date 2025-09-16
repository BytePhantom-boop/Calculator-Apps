import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function FactorialCalculator() {
  const [num, setNum] = useState<string>("");
  const [result, setResult] = useState<number | string>("");
  const { toast } = useToast();

  const handleCalculate = () => {
    const n = parseInt(num);

    if (isNaN(n) || n < 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid non-negative integer",
        variant: "destructive",
      });
      return;
    }

    // Factorial calculation (fully offline)
    let res = 1;
    for (let i = 2; i <= n; i++) {
      res *= i;
    }

    setResult(res);
  };

  const handleClear = () => {
    setNum("");
    setResult("");
  };

  return (
    <Card className="bg-card rounded-lg border border-border shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-3">
            <span className="text-primary-foreground font-bold text-xl">!</span>
          </div>
          <h2 className="text-xl font-semibold text-card-foreground">Factorial Calculator</h2>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="block text-sm font-medium text-card-foreground mb-1">
              Number
            </Label>
            <Input
              type="number"
              value={num}
              onChange={(e) => setNum(e.target.value)}
              placeholder="0"
              data-testid="input-num"
            />
          </div>

          <div className="calculator-grid">
            <Button onClick={handleCalculate} data-testid="button-calculate">
              Calculate
            </Button>
            <Button onClick={handleClear} variant="secondary" data-testid="button-clear">
              Clear
            </Button>
          </div>

          <div className="bg-muted rounded-md p-4">
            <Label className="block text-sm font-medium text-muted-foreground mb-1">Result</Label>
            <div
              className="result-display text-2xl font-semibold text-card-foreground"
              data-testid="text-result"
            >
              {result}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
