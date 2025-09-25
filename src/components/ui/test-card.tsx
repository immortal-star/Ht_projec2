import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon, CheckCircle, ArrowRight } from "lucide-react";

interface TestCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  duration: string;
  status: 'available' | 'completed' | 'locked';
  difficulty: 'Easy' | 'Medium' | 'High';
  onStartTest: (testId: string) => void;
  delay?: number;
}

export const TestCard = ({ 
  id, title, description, icon: Icon, duration, status, difficulty, onStartTest, delay = 0 
}: TestCardProps) => {
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'text-success';
      case 'Medium': return 'text-secondary';
      case 'High': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <Card 
      className={`p-6 bg-gradient-card border-0 shadow-card hover:shadow-float transition-all duration-300 animate-fade-in-up group`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110 ${
              status === 'completed' ? 'bg-gradient-success' :
              status === 'available' ? 'bg-gradient-primary' : 
              'bg-muted'
            }`}>
              {status === 'completed' ? (
                <CheckCircle className="h-6 w-6 text-white" />
              ) : (
                <Icon className="h-6 w-6 text-white" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-foreground font-heading">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
          <Badge 
            variant={status === 'completed' ? 'default' : 'secondary'}
            className={`${status === 'completed' ? 'bg-gradient-success' : ''} animate-scale-in`}
            style={{ animationDelay: `${delay + 200}ms` }}
          >
            {status}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Duration: {duration}</span>
          <span className={`font-medium ${getDifficultyColor(difficulty)}`}>
            {difficulty}
          </span>
        </div>

        <Button 
          onClick={() => onStartTest(id)}
          disabled={status === 'locked'}
          variant={status === 'available' ? 'sports' : 'outline'}
          className="w-full group-hover:scale-105 transition-all duration-200"
        >
          {status === 'completed' ? 'Retake Test' : 
           status === 'locked' ? 'Complete Previous Tests' : 
           'Start Test'}
          {status === 'available' && <ArrowRight className="h-4 w-4" />}
        </Button>
      </div>
    </Card>
  );
};