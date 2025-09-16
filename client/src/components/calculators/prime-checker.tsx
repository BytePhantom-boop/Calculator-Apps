import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Helper function to check if a number is prime
const isPrimeNumber = (n: number): boolean => {
  if (n <= 1) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  const sqrt = Math.floor(Math.sqrt(n));
  for (let i = 3; i <= sqrt; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
};

export default function PrimeChecker() {
  const [number, setNumber] = useState<string>("");
  const [result, setResult] = useState<{ number: number; isPrime: boolean } | null>(null);
  const { toast } = useToast();

  const handleCheck = () => {
    const num = parseInt(number);

    if (isNaN(num) || num < 2) {
      toast({
        title: "Invalid Input",
        description: "Please enter a number greater than 1",
        variant: "destructive",
      });
      return;
    }

    setResult({ number: num, isPrime: isPrimeNumber(num) });
  };

  const handleClear = () => {
    setNumber("");
    setResult(null);
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
            <Label className="block text-sm font-medium text-card-foreground mb-1">
              Enter Number (&gt; 1)
            </Label>
            <Input 
              type="number"
              min="2"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="17"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleCheck} className="flex-1">
              Check Prime
            </Button>
            <Button onClick={handleClear} variant="secondary" className="flex-1">
              Clear
            </Button>
          </div>

          {result && (
            <div
              className={`${result.isPrime ? 'bg-accent/10 border-accent/20' : 'bg-destructive/10 border-destructive/20'} border rounded-md p-4`}
            >
              <div className="flex items-center">
                <div className={`w-6 h-6 ${result.isPrime ? 'bg-accent' : 'bg-destructive'} rounded-full flex items-center justify-center mr-2`}>
                  <span className="text-white text-xs font-bold">{result.isPrime ? '✓' : '✗'}</span>
                </div>
                <div>
                  <div className="result-display text-lg font-semibold text-card-foreground">
                    {result.number} is {result.isPrime ? 'Prime' : 'Composite'}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {result.isPrime
                      ? "This number has no factors other than 1 and itself"
                      : "This number has factors other than 1 and itself"}
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
