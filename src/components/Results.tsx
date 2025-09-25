import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Target, 
  TrendingUp, 
  Award,
  ArrowLeft,
  Share2,
  Download,
  BarChart3
} from "lucide-react";

interface ResultsProps {
  results: {
    testType: string;
    score: number;
    metrics: any;
    benchmarkComparison: string;
    recommendations: string[];
  };
  onBackToDashboard: () => void;
}

const Results = ({ results, onBackToDashboard }: ResultsProps) => {
  const testTitles = {
    "vertical-jump": "Vertical Jump Test",
    "sit-ups": "Sit-ups Test", 
    "shuttle-run": "Shuttle Run Test",
    "endurance-run": "Endurance Run Test"
  };

  const getGradeColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 80) return "text-secondary";
    if (score >= 70) return "text-primary";
    return "text-muted-foreground";
  };

  const getGradeBg = (score: number) => {
    if (score >= 90) return "bg-gradient-success";
    if (score >= 80) return "bg-gradient-secondary";
    if (score >= 70) return "bg-gradient-primary";
    return "bg-muted";
  };

  const getGrade = (score: number) => {
    if (score >= 90) return "A+";
    if (score >= 80) return "A";
    if (score >= 70) return "B";
    if (score >= 60) return "C";
    return "D";
  };

  const benchmarkData = [
    { category: "Beginner", min: 0, max: 60, color: "bg-muted" },
    { category: "Average", min: 60, max: 75, color: "bg-primary/60" },
    { category: "Good", min: 75, max: 85, color: "bg-secondary/60" },
    { category: "Excellent", min: 85, max: 100, color: "bg-success/60" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10 p-6">
      <div className="container mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={onBackToDashboard}
            className="flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Header */}
        <div className="text-center space-y-2 animate-fade-in">
          <Badge className="bg-gradient-success text-success-foreground animate-scale-in">
            Assessment Complete
          </Badge>
          <h1 className="text-3xl font-bold font-heading text-foreground animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            {testTitles[results.testType as keyof typeof testTitles]}
          </h1>
          <p className="text-muted-foreground animate-fade-in-up" style={{ animationDelay: '200ms' }}>Your performance has been analyzed using AI technology</p>
        </div>

        {/* Score Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Score */}
          <Card className="lg:col-span-2 p-8 bg-gradient-card border-0 shadow-glow animate-fade-in-up">
            <div className="text-center space-y-6">
              <div className="relative">
                <div className={`w-32 h-32 rounded-full mx-auto flex items-center justify-center ${getGradeBg(results.score)} shadow-glow animate-pulse-glow`}>
                  <div className="text-center text-white">
                    <div className="text-3xl font-bold font-heading">{results.score}</div>
                    <div className="text-sm opacity-80">out of 100</div>
                  </div>
                </div>
                <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-white font-bold ${getGradeBg(results.score)} animate-scale-in`}>
                  Grade {getGrade(results.score)}
                </div>
              </div>
              
              <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                <h2 className="text-2xl font-bold font-heading text-foreground">Excellent Performance!</h2>
                <p className="text-muted-foreground">
                  Your score places you in the <span className={`font-semibold ${getGradeColor(results.score)}`}>
                    {results.benchmarkComparison}
                  </span> category
                </p>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                {Object.entries(results.metrics).map(([key, value], index) => (
                  <div key={key} className="text-center p-4 bg-muted/30 rounded-lg animate-fade-in-up hover:scale-105 transition-all duration-200" style={{ animationDelay: `${400 + index * 100}ms` }}>
                    <p className="text-sm text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                    <p className="text-lg font-bold font-heading text-foreground">{String(value)}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Benchmark Comparison */}
          <Card className="p-6 bg-gradient-card border-0 shadow-card">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Performance Benchmark
            </h3>
            
            <div className="space-y-4">
              {benchmarkData.map((benchmark, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{benchmark.category}</span>
                    <span className="font-medium">{benchmark.min}-{benchmark.max}</span>
                  </div>
                  <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${benchmark.color} transition-all duration-1000`}
                      style={{ 
                        width: `${((benchmark.max - benchmark.min) / 100) * 100}%` 
                      }}
                    />
                    {results.score >= benchmark.min && results.score <= benchmark.max && (
                      <div 
                        className="absolute top-0 h-full w-1 bg-foreground"
                        style={{ 
                          left: `${((results.score - benchmark.min) / (benchmark.max - benchmark.min)) * 100}%` 
                        }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-success/10 rounded-lg border border-success/20">
              <div className="flex items-center space-x-2 text-success">
                <Trophy className="h-4 w-4" />
                <span className="text-sm font-medium">Your Position</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                You scored higher than 78% of athletes in your age group
              </p>
            </div>
          </Card>
        </div>

        {/* Detailed Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* AI Insights */}
          <Card className="p-6 bg-gradient-card border-0 shadow-card">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Target className="h-5 w-5 mr-2" />
              AI Performance Analysis
            </h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <h4 className="font-medium text-primary mb-2">Strengths Identified</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Excellent explosive power generation</li>
                  <li>• Consistent movement form throughout</li>
                  <li>• Good balance and coordination</li>
                </ul>
              </div>

              <div className="p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                <h4 className="font-medium text-secondary mb-2">Areas for Improvement</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {results.recommendations.map((rec, index) => (
                    <li key={index}>• {rec}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                <h4 className="font-medium text-success mb-2">AI Confidence Level</h4>
                <div className="flex items-center space-x-2">
                  <Progress value={95} className="flex-1" />
                  <span className="text-sm font-medium">95%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  High confidence in movement tracking and analysis
                </p>
              </div>
            </div>
          </Card>

          {/* Next Steps */}
          <Card className="p-6 bg-gradient-card border-0 shadow-card">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Recommended Next Steps
            </h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-gradient-hero/10 rounded-lg border border-primary/20">
                <h4 className="font-medium mb-2">Training Recommendations</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center">
                    <Award className="h-4 w-4 mr-2 text-primary" />
                    Plyometric exercises for power development
                  </li>
                  <li className="flex items-center">
                    <Award className="h-4 w-4 mr-2 text-primary" />
                    Core strengthening program
                  </li>
                  <li className="flex items-center">
                    <Award className="h-4 w-4 mr-2 text-primary" />
                    Balance and coordination drills
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <Button variant="sports" className="w-full">
                  <Trophy className="h-4 w-4 mr-2" />
                  View Detailed Report
                </Button>
                
                <Button variant="outline" className="w-full">
                  Share with Coach
                </Button>
                
                <Button variant="outline" className="w-full">
                  Schedule Follow-up Test
                </Button>
              </div>

              <div className="p-3 bg-muted/30 rounded-lg text-center">
                <p className="text-xs text-muted-foreground">
                  Results will be automatically submitted to Sports Authority of India
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Results;