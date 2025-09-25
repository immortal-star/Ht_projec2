import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { StatsCard } from "@/components/ui/stats-card";
import { TestCard } from "@/components/ui/test-card";
import { 
  Timer, 
  Activity, 
  Target, 
  Zap, 
  Trophy, 
  Medal,
  ArrowRight,
  CheckCircle
} from "lucide-react";

const Dashboard = ({ onStartTest }: { onStartTest: (testType: string) => void }) => {
  const fitnessTests = [
    {
      id: "vertical-jump",
      title: "Vertical Jump",
      description: "Measure explosive leg power",
      icon: Activity,
      duration: "2 mins",
      status: "available" as const,
      difficulty: "Medium" as const
    },
    {
      id: "shuttle-run", 
      title: "Shuttle Run",
      description: "Test agility and speed",
      icon: Timer,
      duration: "3 mins",
      status: "completed" as const,
      difficulty: "High" as const
    },
    {
      id: "sit-ups",
      title: "Sit-ups Test",
      description: "Core strength assessment", 
      icon: Target,
      duration: "1 min",
      status: "available" as const,
      difficulty: "Easy" as const
    },
    {
      id: "endurance-run",
      title: "Endurance Run",
      description: "Cardiovascular fitness",
      icon: Zap,
      duration: "12 mins",
      status: "locked" as const,
      difficulty: "High" as const
    }
  ];

  const achievements = [
    { title: "First Assessment", icon: <Trophy className="h-4 w-4" />, earned: true },
    { title: "Speed Demon", icon: <Zap className="h-4 w-4" />, earned: true },
    { title: "Core Strength", icon: <Target className="h-4 w-4" />, earned: false },
    { title: "Champion", icon: <Medal className="h-4 w-4" />, earned: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10 p-6">
      <div className="container mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold font-heading text-foreground">Athlete Dashboard</h1>
            <p className="text-muted-foreground">Track your progress and complete assessments</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-gradient-success text-success-foreground animate-scale-in">
              Assessment Ready
            </Badge>
            <a href="/" className="ml-2">
              <Button variant="outline">Go to Home</Button>
            </a>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatsCard
            title="Tests Completed"
            value="1/4"
            icon={Trophy}
            gradient="bg-gradient-primary"
            delay={0}
          />
          <StatsCard
            title="Overall Score"
            value="85/100"
            icon={Medal}
            gradient="bg-gradient-secondary"
            delay={100}
          />
          <StatsCard
            title="Rank"
            value="#127"
            icon={Target}
            gradient="bg-gradient-success"
            delay={200}
          />
          <Card className="p-6 bg-gradient-card border-0 shadow-card animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Progress</p>
                <Progress value={25} className="w-full mt-1" />
              </div>
            </div>
          </Card>
        </div>

        {/* Fitness Tests */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold font-heading text-foreground animate-fade-in">Fitness Assessments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fitnessTests.map((test, index) => (
              <TestCard
                key={test.id}
                id={test.id}
                title={test.title}
                description={test.description}
                icon={test.icon}
                duration={test.duration}
                status={test.status}
                difficulty={test.difficulty}
                onStartTest={onStartTest}
                delay={index * 100}
              />
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold font-heading text-foreground animate-fade-in">Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <Card key={index} className={`p-4 text-center bg-gradient-card border-0 shadow-card animate-fade-in-up hover:scale-105 transition-all duration-200 ${
                achievement.earned ? 'ring-2 ring-success/20' : 'opacity-60'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 transition-all duration-200 ${
                  achievement.earned ? 'bg-gradient-success animate-float' : 'bg-muted'
                }`}>
                  <span className="text-white">{achievement.icon}</span>
                </div>
                <p className="text-sm font-medium font-heading text-foreground">{achievement.title}</p>
                {achievement.earned && (
                  <Badge className="mt-2 bg-gradient-success text-success-foreground text-xs">
                    Earned
                  </Badge>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;