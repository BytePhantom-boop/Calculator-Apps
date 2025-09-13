import BasicCalculator from "@/components/calculators/basic-calculator";
import FactorialCalculator from "@/components/calculators/factorial-calculator";
import PrimeChecker from "@/components/calculators/prime-checker";
import NCRCalculator from "@/components/calculators/ncr-calculator";
import MultiplicationTable from "@/components/calculators/multiplication-table";
import SeriesCalculator from "@/components/calculators/series-calculator";

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-2">Mathematical Tools</h1>
            <p className="text-muted-foreground text-lg">Comprehensive calculator suite for all your mathematical needs</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <BasicCalculator />
          <FactorialCalculator />
          <PrimeChecker />
          <NCRCalculator />
          <MultiplicationTable />
          <SeriesCalculator />
        </div>

        {/* Feature Highlights */}
        <div className="mt-12 bg-card rounded-lg border border-border shadow-lg p-6">
          <h3 className="text-2xl font-bold text-center text-card-foreground mb-6">Features & Validations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-start space-x-3 p-4 bg-accent/5 rounded-lg border border-accent/20">
              <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-accent-foreground text-xs font-bold">✓</span>
              </div>
              <div>
                <h4 className="font-semibold text-card-foreground text-sm">Input Validation</h4>
                <p className="text-xs text-muted-foreground">Real-time validation for all mathematical constraints</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-accent/5 rounded-lg border border-accent/20">
              <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-accent-foreground text-xs font-bold">✓</span>
              </div>
              <div>
                <h4 className="font-semibold text-card-foreground text-sm">Error Handling</h4>
                <p className="text-xs text-muted-foreground">Clear error messages for invalid operations</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-accent/5 rounded-lg border border-accent/20">
              <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-accent-foreground text-xs font-bold">✓</span>
              </div>
              <div>
                <h4 className="font-semibold text-card-foreground text-sm">Responsive Design</h4>
                <p className="text-xs text-muted-foreground">Optimized for all devices and screen sizes</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary-foreground text-xs font-bold">✓</span>
              </div>
              <div>
                <h4 className="font-semibold text-card-foreground text-sm">Range Checking</h4>
                <p className="text-xs text-muted-foreground">Factorial (n ≥ 0), Prime (n {'>'} 1), nCr (n {'>'} r {'>'} 0)</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary-foreground text-xs font-bold">✓</span>
              </div>
              <div>
                <h4 className="font-semibold text-card-foreground text-sm">Clear Results</h4>
                <p className="text-xs text-muted-foreground">Monospace display for precise number formatting</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary-foreground text-xs font-bold">✓</span>
              </div>
              <div>
                <h4 className="font-semibold text-card-foreground text-sm">Step-by-Step</h4>
                <p className="text-xs text-muted-foreground">Detailed breakdowns for complex calculations</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-muted border-t border-border mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <p className="text-muted-foreground text-sm">Mathematical Tools Calculator • Built with precision and care</p>
            <p className="text-muted-foreground text-xs mt-1">All calculations are performed locally in your browser</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
