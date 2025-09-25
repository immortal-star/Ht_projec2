import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FeatureCard } from "@/components/ui/feature-card";
import { Play, Users, Trophy, Zap } from "lucide-react";
import heroImage from "@/assets/hero-sports.jpg";

const Hero = ({ onGetStarted }: { onGetStarted: () => void }) => {
  const features = [
    {
      icon: Play,
      title: "Video Assessment",
      description: "Record your fitness tests with AI-powered analysis"
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get immediate feedback on your performance"
    },
    {
      icon: Trophy,
      title: "Performance Tracking",
      description: "Monitor progress and compare with benchmarks"
    },
    {
      icon: Users,
      title: "Fair Assessment",
      description: "AI-powered cheat detection ensures authenticity"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/20">
      {/* Header */}
      <header className="container mx-auto px-6 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Trophy className="h-5 w-5 text-white" />
            </div>
              <span className="text-xl font-bold text-foreground">AthleteX</span>
          </div>
          <Badge variant="secondary" className="bg-gradient-secondary">
            Sports Authority of India
          </Badge>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-gradient-success text-success-foreground animate-fade-in">
                AI-Powered Assessment Platform
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold font-heading text-foreground leading-tight animate-fade-in-up">
                Discover Your
                <span className="bg-gradient-hero bg-clip-text text-transparent"> Athletic Potential</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                Join India's revolutionary sports talent assessment platform. Record your fitness tests, 
                get AI-powered analysis, and unlock opportunities with the Sports Authority of India.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <Button 
                variant="hero" 
                size="lg"
                onClick={onGetStarted}
                className="text-lg px-8 hover:animate-pulse-glow"
              >
                Start Assessment
                <Play className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 hover:scale-105 transition-transform duration-200">
                Learn More
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  delay={index * 100}
                />
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-hero rounded-3xl blur-3xl opacity-20"></div>
            <Card className="relative overflow-hidden border-0 shadow-glow">
              <img 
                src={heroImage}
                alt="Athletes performing fitness assessments"
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <Badge className="bg-white/90 text-foreground mb-2">
                  Live AI Analysis
                </Badge>
                <h3 className="text-white text-lg font-semibold">
                  Real-time performance tracking with advanced computer vision
                </h3>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Hero;