import { z } from "zod";

// Basic calculator operations
export const basicCalculatorSchema = z.object({
  num1: z.number(),
  num2: z.number(),
  operation: z.enum(['add', 'subtract', 'multiply', 'modulo'])
});

// Factorial calculation
export const factorialSchema = z.object({
  number: z.number().min(0, "Number must be non-negative")
});

// Prime number checking
export const primeCheckSchema = z.object({
  number: z.number().int().min(2, "Number must be greater than 1")
});

// nCr calculation
export const nCrSchema = z.object({
  n: z.number().int().min(0, "n must be non-negative"),
  r: z.number().int().min(0, "r must be non-negative")
}).refine(data => data.n >= data.r, {
  message: "n must be greater than or equal to r"
});

// Multiplication table
export const multiplicationTableSchema = z.object({
  number: z.number()
});

// Series calculation
export const seriesCalculationSchema = z.object({
  n: z.number().int().min(1, "n must be positive")
});

export type BasicCalculatorInput = z.infer<typeof basicCalculatorSchema>;
export type FactorialInput = z.infer<typeof factorialSchema>;
export type PrimeCheckInput = z.infer<typeof primeCheckSchema>;
export type NCrInput = z.infer<typeof nCrSchema>;
export type MultiplicationTableInput = z.infer<typeof multiplicationTableSchema>;
export type SeriesCalculationInput = z.infer<typeof seriesCalculationSchema>;
