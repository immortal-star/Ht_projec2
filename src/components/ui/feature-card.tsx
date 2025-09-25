import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) => {
  return (
    <Card 
      className={`p-4 bg-gradient-card border-0 shadow-card hover:shadow-float transition-all duration-300 animate-fade-in-up group cursor-pointer`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="space-y-2 text-center">
        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto text-white group-hover:scale-110 group-hover:animate-pulse-glow transition-all duration-200">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="font-semibold text-sm font-heading">{title}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </Card>
  );
};