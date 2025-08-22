import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle, Lightbulb, Zap } from "lucide-react";

type Mode = "hint" | "solution" | "optimization";

interface ModeSelectorProps {
  selectedMode: Mode;
  onModeChange: (mode: Mode) => void;
}

const ModeSelector = ({ selectedMode, onModeChange }: ModeSelectorProps) => {
  const modes = [
    {
      id: "hint" as Mode,
      title: "Hint Mode",
      description: "Get gentle nudges to fix issues yourself",
      icon: HelpCircle,
      color: "bg-gradient-primary",
      points: "+5 pts",
    },
    {
      id: "solution" as Mode,
      title: "Solution Mode", 
      description: "See the corrected code directly",
      icon: Lightbulb,
      color: "bg-gradient-secondary",
      points: "+2 pts",
    },
    {
      id: "optimization" as Mode,
      title: "Optimization Mode",
      description: "Improve performance and readability",
      icon: Zap,
      color: "bg-gradient-gaming",
      points: "+3 pts",
    },
  ];

  return (
    <Card className="bg-gradient-card border-primary/20">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-primary mb-3 text-center">
          Choose Your Learning Mode
        </h3>
        
        <div className="space-y-3">
          {modes.map((mode) => (
            <Button
              key={mode.id}
              variant={selectedMode === mode.id ? "default" : "outline"}
              className={`
                w-full h-auto p-4 flex items-start gap-3 text-left justify-start
                ${selectedMode === mode.id 
                  ? `${mode.color} text-background shadow-glow border-primary` 
                  : 'bg-background/50 hover:bg-background/70 border-border hover:border-primary/50'
                }
                transition-all duration-200
              `}
              onClick={() => onModeChange(mode.id)}
            >
              <mode.icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-sm">{mode.title}</p>
                  <span className={`
                    text-xs px-2 py-1 rounded-full
                    ${selectedMode === mode.id 
                      ? 'bg-background/20 text-background' 
                      : 'bg-success/20 text-success'
                    }
                  `}>
                    {mode.points}
                  </span>
                </div>
                <p className={`
                  text-xs leading-relaxed
                  ${selectedMode === mode.id 
                    ? 'text-background/80' 
                    : 'text-muted-foreground'
                  }
                `}>
                  {mode.description}
                </p>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ModeSelector;