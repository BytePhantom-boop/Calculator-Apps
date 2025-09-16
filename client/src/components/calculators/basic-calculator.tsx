import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function BasicCalculator() {
  const [num1, setNum1] = useState<string>("");
  const [num2, setNum2] = useState<string>("");
  const [result, setResult] = useState<number | string>("");
  const { toast } = useToast();

  const handleOperation = (operation: "add" | "subtract" | "multiply" | "modulo") => {
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

    let res: number;
    switch (operation) {
      case "add":
        res = n1 + n2;
        break;
      case "subtract":
        res = n1 - n2;
        break;
      case "multiply":
        res = n1 * n2;
        break;
      case "modulo":
        res = n1 % n2;
        break;
      default:
        res = NaN;
    }

    setResult(res);
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
              <Label className="block text-sm font-medium text-card-foreground mb-1">
                First Number
              </Label>
              <Input
                type="number"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
                placeholder="0"
                data-testid="input-num1"
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-card-foreground mb-1">
                Second Number
              </Label>
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
            <Button onClick={() => handleOperation("add")} data-testid="button-add">
              Add (+)
            </Button>
            <Button onClick={() => handleOperation("subtract")} data-testid="button-subtract">
              Subtract (-)
            </Button>
            <Button onClick={() => handleOperation("multiply")} data-testid="button-multiply">
              Multiply (×)
            </Button>
            <Button onClick={() => handleOperation("modulo")} data-testid="button-modulo">
              Modulo (%)
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
