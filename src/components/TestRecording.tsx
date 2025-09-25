import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Video, 
  Square, 
  RotateCcw, 
  CheckCircle, 
  Camera,
  Timer,
  Eye,
  Activity
} from "lucide-react";

const TestRecording = ({ 
  testType, 
  onComplete 
}: { 
  testType: string; 
  onComplete: (results: any) => void; 
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [phase, setPhase] = useState<'setup' | 'recording' | 'analyzing' | 'complete'>('setup');
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const testInfo = {
    "vertical-jump": {
      title: "Vertical Jump Test",
      description: "Stand with feet shoulder-width apart. Jump as high as possible.",
      instructions: [
        "Position yourself in front of the camera",
        "Keep your feet shoulder-width apart",
        "Jump as high as you can when ready",
        "Land softly and stay in frame"
      ],
      duration: 10
    },
    "sit-ups": {
      title: "Sit-ups Test", 
      description: "Complete as many sit-ups as possible in 60 seconds.",
      instructions: [
        "Lie on your back with knees bent",
        "Keep your hands behind your head",
        "Perform sit-ups with proper form",
        "Complete as many as possible"
      ],
      duration: 60
    },
    "shuttle-run": {
      title: "Shuttle Run Test",
      description: "Run back and forth between two points as fast as possible.",
      instructions: [
        "Set up 10 meters between markers",
        "Run to touch the far marker", 
        "Return to starting position",
        "Repeat for the full duration"
      ],
      duration: 30
    }
  };

  const currentTest = testInfo[testType as keyof typeof testInfo] || testInfo["vertical-jump"];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= currentTest.duration) {
            handleStopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, currentTest.duration]);

  useEffect(() => {
    if (phase === 'analyzing') {
      const interval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 100) {
            setPhase('complete');
            clearInterval(interval);
            // Mock results
            const mockResults = {
              testType,
              score: Math.floor(Math.random() * 20) + 80,
              metrics: {
                "vertical-jump": { height: "64cm", power: "850W" },
                "sit-ups": { count: 45, form: "Excellent" },
                "shuttle-run": { time: "28.5s", speed: "12.3 km/h" }
              }[testType] || { performance: "Good" },
              benchmarkComparison: "Above Average",
              recommendations: ["Improve core strength", "Focus on explosive power"]
            };
            onComplete(mockResults);
            return 100;
          }
          return prev + 5;
        });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [phase, testType, onComplete]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' }, 
        audio: false 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        mediaStreamRef.current = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    setPhase('recording');
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setPhase('analyzing');
    setAnalysisProgress(0);
    // Stop camera stream
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  const handleRetry = () => {
    setPhase('setup');
    setRecordingTime(0);
    setAnalysisProgress(0);
    startCamera();
  };

  useEffect(() => {
    startCamera();
    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10 p-6">
      <div className="container mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 animate-fade-in">
          <Badge className="bg-gradient-secondary text-secondary-foreground animate-scale-in">
            {currentTest.title}
          </Badge>
          <h1 className="text-2xl font-bold font-heading text-foreground animate-fade-in-up" style={{ animationDelay: '100ms' }}>{currentTest.description}</h1>
          <p className="text-muted-foreground animate-fade-in-up" style={{ animationDelay: '200ms' }}>Follow the instructions and complete your assessment</p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Video Feed */}
          <Card className="overflow-hidden bg-gradient-card border-0 shadow-glow animate-fade-in-up">
            <div className="relative bg-black rounded-t-lg">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-80 object-cover"
              />
              
              {/* Recording Overlay */}
              {isRecording && (
                <div className="absolute top-4 left-4 flex items-center space-x-2 animate-fade-in">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-white font-medium font-heading">
                    {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}
                  </span>
                </div>
              )}

              {/* Phase Indicators */}
              <div className="absolute top-4 right-4">
                {phase === 'analyzing' && (
                  <Badge className="bg-gradient-hero text-white animate-pulse-glow">
                    <Activity className="h-4 w-4 animate-pulse" />
                    Analyzing
                  </Badge>
                )}
                {phase === 'complete' && (
                  <Badge className="bg-gradient-success text-success-foreground animate-scale-in">
                    <CheckCircle className="h-4 w-4" />
                    Complete
                  </Badge>
                )}
              </div>

              {/* Setup Instructions Overlay */}
              {phase === 'setup' && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center animate-fade-in">
                  <div className="text-center text-white space-y-4">
                    <Camera className="h-12 w-12 mx-auto animate-float" />
                    <p className="text-lg font-semibold font-heading">Position yourself for the test</p>
                    <p className="text-sm opacity-80">Make sure you're fully visible in the frame</p>
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="p-6 space-y-4">
              {phase === 'setup' && (
                <Button 
                  onClick={handleStartRecording} 
                  variant="hero" 
                  size="lg" 
                  className="w-full animate-fade-in-up hover:animate-pulse-glow"
                  style={{ animationDelay: '300ms' }}
                >
                  <Video className="h-5 w-5" />
                  Start Recording
                </Button>
              )}

              {phase === 'recording' && (
                <div className="space-y-4 animate-fade-in">
                  <Progress 
                    value={(recordingTime / currentTest.duration) * 100} 
                    className="w-full"
                  />
                  <Button 
                    onClick={handleStopRecording} 
                    variant="destructive" 
                    size="lg" 
                    className="w-full hover:scale-105 transition-transform duration-200"
                  >
                    <Square className="h-5 w-5" />
                    Stop Recording
                  </Button>
                </div>
              )}

              {phase === 'analyzing' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="text-center space-y-2">
                    <p className="font-medium font-heading">AI Analysis in Progress...</p>
                    <Progress value={analysisProgress} className="w-full" />
                    <p className="text-sm text-muted-foreground">
                      Processing movement patterns and performance metrics
                    </p>
                  </div>
                </div>
              )}

              {phase === 'complete' && (
                <Button 
                  onClick={handleRetry} 
                  variant="outline" 
                  size="lg" 
                  className="w-full animate-scale-in hover:scale-105 transition-transform duration-200"
                >
                  <RotateCcw className="h-5 w-5" />
                  Retry Test
                </Button>
              )}
            </div>
          </Card>

          {/* Instructions */}
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-card border-0 shadow-card animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <h3 className="text-lg font-semibold mb-4 flex items-center font-heading">
                <Eye className="h-5 w-5 mr-2" />
                Test Instructions
              </h3>
              <div className="space-y-3">
                {currentTest.instructions.map((instruction, index) => (
                  <div key={index} className="flex items-start space-x-3 animate-fade-in-up" style={{ animationDelay: `${200 + index * 50}ms` }}>
                    <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0 hover:scale-110 transition-transform duration-200">
                      {index + 1}
                    </div>
                    <p className="text-sm text-muted-foreground">{instruction}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card border-0 shadow-card animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <h3 className="text-lg font-semibold mb-4 flex items-center font-heading">
                <Timer className="h-5 w-5 mr-2" />
                Test Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between hover:bg-muted/30 p-2 rounded transition-colors duration-200">
                  <span className="text-sm text-muted-foreground">Duration:</span>
                  <span className="text-sm font-medium font-heading">{currentTest.duration} seconds</span>
                </div>
                <div className="flex justify-between hover:bg-muted/30 p-2 rounded transition-colors duration-200">
                  <span className="text-sm text-muted-foreground">Analysis:</span>
                  <span className="text-sm font-medium font-heading">Real-time AI</span>
                </div>
                <div className="flex justify-between hover:bg-muted/30 p-2 rounded transition-colors duration-200">
                  <span className="text-sm text-muted-foreground">Attempts:</span>
                  <span className="text-sm font-medium font-heading">Unlimited</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-success/10 border border-success/20 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <h3 className="text-lg font-semibold mb-2 text-success font-heading">AI Features</h3>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-success" /> Movement tracking and analysis</p>
                <p className="text-sm text-muted-foreground flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-success" /> Performance measurement</p>
                <p className="text-sm text-muted-foreground flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-success" /> Form verification</p>
                <p className="text-sm text-muted-foreground flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-success" /> Cheat detection</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestRecording;