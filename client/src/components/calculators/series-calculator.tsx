import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function SeriesCalculator() {
  const [number, setNumber] = useState<string>("");
  const [result, setResult] = useState<{
    n: number;
    oddSum: number;
    evenSum: number;
    seriesResult: number;
  } | null>(null);
  const { toast } = useToast();

  const handleCalculate = () => {
    const n = parseInt(number);

    if (isNaN(n) || n < 1) {
      toast({
        title: "Invalid Input",
        description: "Please enter a positive number",
        variant: "destructive",
      });
      return;
    }

    let oddSum = 0;
    let evenSum = 0;

    for (let i = 1; i <= n; i++) {
      if (i % 2 === 0) evenSum += i;
      else oddSum += i;
    }

    setResult({
      n,
      oddSum,
      evenSum,
      seriesResult: oddSum - evenSum,
    });
  };

  const handleClear = () => {
    setNumber("");
    setResult(null);
  };

  const generateSeriesPattern = (n: number) => {
    const terms = [];
    for (let i = 1; i <= n; i++) {
      if (i === 1) terms.push(i.toString());
      else if (i % 2 === 0) terms.push(`- ${i}`);
      else terms.push(`+ ${i}`);
    }
    return terms.join(" ");
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
            <Label className="block text-sm font-medium text-card-foreground mb-1">
              Enter n (series length)
            </Label>
            <Input
              type="number"
              min="1"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="10"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleCalculate} className="flex-1">
              Calculate Series
            </Button>
            <Button onClick={handleClear} variant="secondary" className="flex-1">
              Clear
            </Button>
          </div>

          {result && (
            <div className="bg-muted rounded-md p-4">
              <Label className="block text-sm font-medium text-muted-foreground mb-1">Series Pattern</Label>
              <div className="result-display text-sm text-muted-foreground mb-2">
                {generateSeriesPattern(result.n)}
              </div>
              <div className="result-display text-xl font-semibold text-card-foreground">
                Result = {result.seriesResult}
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                <div>
                  Odd sum: {Array.from({ length: Math.ceil(result.n / 2) }, (_, i) => 2 * i + 1)
                    .filter(x => x <= result.n)
                    .join("+")} = {result.oddSum}
                </div>
                <div>
                  Even sum: {Array.from({ length: Math.floor(result.n / 2) }, (_, i) => 2 * (i + 1))
                    .join("+")} = {result.evenSum}
                </div>
                <div>
                  Series result: {result.oddSum} - {result.evenSum} = {result.seriesResult}
                </div>
              </div>
              <div className="text-xs text-muted-foreground bg-muted/50 rounded-md p-2 mt-2">
                <strong>Formula:</strong> (Sum of odd terms) - (Sum of even terms)
              </div>
            </div>
          )}
          {!result && (
            <div className="text-center text-muted-foreground">Enter a number to calculate series</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
