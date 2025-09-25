import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  gradient: string;
  delay?: number;
}

export const StatsCard = ({ title, value, icon: Icon, gradient, delay = 0 }: StatsCardProps) => {
  return (
    <Card 
      className={`p-6 bg-gradient-card border-0 shadow-card hover:shadow-float transition-all duration-300 animate-fade-in-up group cursor-pointer`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 ${gradient} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold font-heading text-foreground">{value}</p>
        </div>
      </div>
    </Card>
  );
};