import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Sparkles } from "lucide-react";
import BotAvatar from "@/components/BotAvatar";
import GamingStats from "@/components/GamingStats";
import ModeSelector from "@/components/ModeSelector";
import CodeEditor from "@/components/CodeEditor";
import ChatInterface from "@/components/ChatInterface";

type Mode = "hint" | "solution" | "optimization";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  type?: Mode;
}

const Index = () => {
  const [selectedMode, setSelectedMode] = useState<Mode>("hint");
  const [code, setCode] = useState(`# Welcome to PyCode Bot! 🐍
# Let's start with a simple function

def calculate_average(numbers):
    total = 0
    for num in numbers:
        total += num
    return total / len(numbers)

# Test your function
test_numbers = [10, 20, 30, 40, 50]
result = calculate_average(test_numbers)
print(f"Average: {result}")`);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hey there, future Python master! 🎉 I'm PyCode Bot, your friendly coding companion. I see you've got some code there - want me to take a look and help you make it even better?",
      sender: "bot",
      timestamp: new Date(),
    }
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (message: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setIsTyping(true);
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(message, selectedMode),
        sender: "bot",
        timestamp: new Date(),
        type: selectedMode,
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const getBotResponse = (userMessage: string, mode: Mode): string => {
    const responses = {
      hint: "🤔 I notice something interesting in your code! Try looking at line 6 - what happens if the numbers list is empty? Maybe add a check before diving into the calculation?",
      solution: "✨ Here's the fixed version! Add this check: `if not numbers: return 0` at the start of your function. This prevents division by zero errors!",
      optimization: "🚀 Great code! Here's how to make it even more Pythonic: `return sum(numbers) / len(numbers) if numbers else 0`. This uses Python's built-in `sum()` function and is more concise!"
    };
    return responses[mode] || responses.hint;
  };

  const handleRunCode = () => {
    console.log("Running code:", code);
    // In a real implementation, this would execute the Python code
  };

  const codeErrors = code.includes("len(numbers)") && !code.includes("if") ? [
    { line: 6, message: "Potential division by zero if numbers list is empty", type: "warning" as const }
  ] : [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-gradient-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <BotAvatar isActive={true} />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  PyCode Bot
                </h1>
                <p className="text-sm text-muted-foreground">
                  Your AI Python Coding Assistant
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="border-primary/50 hover:bg-primary/10 hover:border-primary transition-colors"
              >
                <Brain className="w-4 h-4 mr-2" />
                Learn More
              </Button>
              <Button className="bg-gradient-gaming hover:shadow-gaming transition-all duration-200">
                <Sparkles className="w-4 h-4 mr-2" />
                Get Pro
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-8rem)]">
          {/* Left Sidebar - Stats & Mode */}
          <div className="col-span-3 space-y-4">
            <GamingStats
              points={1250}
              level={7}
              badges={["First Fix", "Debug Master", "Speed Coder"]}
              streakDays={5}
              bugsFixed={23}
            />
            
            <ModeSelector 
              selectedMode={selectedMode}
              onModeChange={setSelectedMode}
            />
          </div>

          {/* Center - Code Editor */}
          <div className="col-span-5">
            <CodeEditor
              code={code}
              onCodeChange={setCode}
              errors={codeErrors}
              onRun={handleRunCode}
            />
          </div>

          {/* Right - Chat Interface */}
          <div className="col-span-4">
            <ChatInterface
              messages={messages}
              onSendMessage={handleSendMessage}
              isTyping={isTyping}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
