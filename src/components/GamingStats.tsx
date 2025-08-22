import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Star, Zap, Target, Code } from "lucide-react";

interface GamingStatsProps {
  points: number;
  level: number;
  badges: string[];
  streakDays: number;
  bugsFixed: number;
}

const GamingStats = ({ 
  points = 1250, 
  level = 7, 
  badges = ["First Fix", "Debug Master", "Speed Coder"], 
  streakDays = 5,
  bugsFixed = 23 
}: GamingStatsProps) => {
  const levelProgress = (points % 200) / 200 * 100;
  const nextLevelPoints = 200 - (points % 200);

  const statItems = [
    { icon: Trophy, label: "Level", value: level, color: "text-gaming-gold" },
    { icon: Star, label: "Points", value: points.toLocaleString(), color: "text-primary" },
    { icon: Zap, label: "Streak", value: `${streakDays} days`, color: "text-secondary" },
    { icon: Target, label: "Bugs Fixed", value: bugsFixed, color: "text-success" },
  ];

  return (
    <Card className="bg-gradient-card border-primary/20 animate-slide-up">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2 text-primary">
          <Code className="w-5 h-5" />
          Your Progress
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Level Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Level {level}</span>
            <span className="text-muted-foreground">{nextLevelPoints} to next level</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-primary h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${levelProgress}%` }}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {statItems.map((stat, index) => (
            <div 
              key={stat.label}
              className="bg-background/50 rounded-lg p-3 text-center border border-border/50 hover:border-primary/30 transition-colors duration-200"
            >
              <stat.icon className={`w-5 h-5 mx-auto mb-1 ${stat.color}`} />
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="font-bold text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Recent Badges</p>
          <div className="flex flex-wrap gap-2">
            {badges.map((badge, index) => (
              <Badge 
                key={badge} 
                variant="secondary" 
                className="bg-gradient-gaming text-background hover:shadow-gaming transition-all duration-200"
              >
                {badge}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GamingStats;