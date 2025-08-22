import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Play, AlertTriangle, CheckCircle2, Code2 } from "lucide-react";
import { useState } from "react";

interface CodeEditorProps {
  code: string;
  onCodeChange: (code: string) => void;
  errors?: Array<{ line: number; message: string; type: "error" | "warning" }>;
  onRun: () => void;
}

const CodeEditor = ({ 
  code, 
  onCodeChange, 
  errors = [], 
  onRun 
}: CodeEditorProps) => {
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async () => {
    setIsRunning(true);
    await onRun();
    setTimeout(() => setIsRunning(false), 1000);
  };

  const errorCount = errors.filter(e => e.type === "error").length;
  const warningCount = errors.filter(e => e.type === "warning").length;

  return (
    <Card className="bg-gradient-card border-primary/20 h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2 text-primary">
            <Code2 className="w-5 h-5" />
            Python Code Editor
          </CardTitle>
          
          <div className="flex items-center gap-2">
            {/* Error/Warning indicators */}
            {errorCount > 0 && (
              <div className="flex items-center gap-1 text-destructive text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>{errorCount}</span>
              </div>
            )}
            {warningCount > 0 && (
              <div className="flex items-center gap-1 text-secondary text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>{warningCount}</span>
              </div>
            )}
            {errorCount === 0 && warningCount === 0 && code.trim() && (
              <div className="flex items-center gap-1 text-success text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>Clean</span>
              </div>
            )}
            
            <Button
              onClick={handleRun}
              disabled={isRunning}
              className="bg-gradient-primary hover:shadow-glow transition-all duration-200"
            >
              <Play className={`w-4 h-4 mr-2 ${isRunning ? 'animate-spin' : ''}`} />
              {isRunning ? 'Running...' : 'Run Code'}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-4 pt-0">
        <div className="flex-1 relative">
          <Textarea
            value={code}
            onChange={(e) => onCodeChange(e.target.value)}
            placeholder="# Start coding your Python solution here...
def hello_world():
    print('Hello, PyCode Bot!')

hello_world()"
            className="h-full min-h-[400px] font-mono text-sm bg-background/50 border-border resize-none focus:border-primary/50 transition-colors duration-200"
            style={{ lineHeight: '1.5' }}
          />
          
          {/* Line numbers overlay */}
          <div className="absolute left-3 top-3 text-muted-foreground text-sm font-mono leading-6 pointer-events-none select-none">
            {code.split('\n').map((_, index) => (
              <div key={index} className="h-6">
                {index + 1}
              </div>
            ))}
          </div>
        </div>
        
        {/* Error list */}
        {errors.length > 0 && (
          <div className="mt-4 space-y-2 max-h-32 overflow-y-auto">
            {errors.map((error, index) => (
              <div 
                key={index}
                className={`
                  text-sm p-2 rounded border-l-4 bg-background/30
                  ${error.type === "error" 
                    ? 'border-l-destructive text-destructive' 
                    : 'border-l-secondary text-secondary'
                  }
                `}
              >
                <span className="font-medium">Line {error.line}:</span> {error.message}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CodeEditor;