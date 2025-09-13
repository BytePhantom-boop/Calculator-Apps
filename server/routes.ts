import type { Express } from "express";
import { createServer, type Server } from "http";
import { 
  basicCalculatorSchema, 
  factorialSchema, 
  primeCheckSchema, 
  nCrSchema, 
  multiplicationTableSchema, 
  seriesCalculationSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Factorial calculation
  function factorial(num: number): number {
    let result = 1;
    for (let i = 1; i <= num; i++) {
      result *= i;
    }
    return result;
  }

  // Basic Calculator
  app.post("/api/calculate", (req, res) => {
    try {
      const { num1, num2, operation } = basicCalculatorSchema.parse(req.body);
      
      let result: number;
      switch (operation) {
        case 'add':
          result = num1 + num2;
          break;
        case 'subtract':
          result = num1 - num2;
          break;
        case 'multiply':
          result = num1 * num2;
          break;
        case 'modulo':
          if (num2 === 0) {
            return res.status(400).json({ message: "Cannot divide by zero" });
          }
          result = num1 % num2;
          break;
        default:
          return res.status(400).json({ message: "Invalid operation" });
      }
      
      res.json({ result });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Factorial Calculator
  app.post("/api/factorial", (req, res) => {
    try {
      const { number } = factorialSchema.parse(req.body);
      
      if (number < 0) {
        return res.status(400).json({ message: "Factorial is not defined for negative numbers" });
      }
      
      const result = factorial(number);
      res.json({ result, number });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Prime Checker
  app.post("/api/prime-check", (req, res) => {
    try {
      const { number } = primeCheckSchema.parse(req.body);
      
      if (number <= 1) {
        return res.status(400).json({ message: "Number must be greater than 1" });
      }
      
      let isPrime = true;
      if (number > 1) {
        for (let i = 2; i <= number - 1; i++) {
          if (number % i === 0) {
            isPrime = false;
            break;
          }
        }
      }
      
      res.json({ 
        number, 
        isPrime, 
        result: isPrime ? "prime" : "composite"
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // nCr Calculator
  app.post("/api/ncr", (req, res) => {
    try {
      const { n, r } = nCrSchema.parse(req.body);
      
      if (n < 0 || r < 0) {
        return res.status(400).json({ message: "n and r cannot be negative" });
      }
      
      if (n < r) {
        return res.status(400).json({ message: "n should be greater than or equal to r" });
      }
      
      const nFactorial = factorial(n);
      const rFactorial = factorial(r);
      const nrFactorial = factorial(n - r);
      const result = nFactorial / (rFactorial * nrFactorial);
      
      res.json({ n, r, result });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Multiplication Table
  app.post("/api/multiplication-table", (req, res) => {
    try {
      const { number } = multiplicationTableSchema.parse(req.body);
      
      const table = [];
      for (let i = 1; i <= 10; i++) {
        table.push({
          multiplier: i,
          result: number * i
        });
      }
      
      res.json({ number, table });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Series Sum Calculator
  app.post("/api/series-sum", (req, res) => {
    try {
      const { n } = seriesCalculationSchema.parse(req.body);
      
      let evenSum = 0, oddSum = 0;
      
      for (let i = 2; i <= n; i += 2) {
        evenSum += i;
      }
      
      for (let i = 1; i <= n; i += 2) {
        oddSum += i;
      }
      
      const result = oddSum - evenSum;
      
      res.json({ n, oddSum, evenSum, result });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
