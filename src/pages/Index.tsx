import { useState } from "react";
import Hero from "@/components/Hero";
import Dashboard from "@/components/Dashboard";
import TestRecording from "@/components/TestRecording";
import Results from "@/components/Results";

const Index = () => {
  const [currentView, setCurrentView] = useState<'hero' | 'dashboard' | 'test' | 'results'>('hero');
  const [selectedTest, setSelectedTest] = useState<string>('');
  const [testResults, setTestResults] = useState<any>(null);

  const handleGetStarted = () => {
    setCurrentView('dashboard');
  };

  const handleStartTest = (testType: string) => {
    setSelectedTest(testType);
    setCurrentView('test');
  };

  const handleTestComplete = (results: any) => {
    setTestResults(results);
    setCurrentView('results');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setTestResults(null);
  };

  return (
    <div>
      {currentView === 'hero' && <Hero onGetStarted={handleGetStarted} />}
      {currentView === 'dashboard' && <Dashboard onStartTest={handleStartTest} />}
      {currentView === 'test' && (
        <TestRecording testType={selectedTest} onComplete={handleTestComplete} />
      )}
      {currentView === 'results' && testResults && (
        <Results results={testResults} onBackToDashboard={handleBackToDashboard} />
      )}
    </div>
  );
};

export default Index;
