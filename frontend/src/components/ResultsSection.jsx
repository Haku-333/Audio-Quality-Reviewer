import React, { useState } from "react";
import { Badge } from "./ui/Badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/Card";
import { Button } from "./ui/Button";
import { 
  Play, Pause, Download, RotateCcw, AlertTriangle, 
  CheckCircle, XCircle, Sparkles, FileText, Volume2, Mic, Activity, Disc
} from "lucide-react";

const getGradeConfig = (grade) => {
  switch (grade) {
    case "Studio Grade":
      return {
        badge: "🏆 Studio Grade",
        badgeVariant: "studio",
        color: "#f59e0b", // amber
        glow: "shadow-[0_0_30px_rgba(245,158,11,0.12)] border-amber-500/20 bg-amber-500/5",
        text: "text-amber-500",
        circle: "stroke-amber-500"
      };
    case "Pro Grade":
      return {
        badge: "✅ Pro Grade",
        badgeVariant: "pro",
        color: "#10b981", // green (emerald)
        glow: "shadow-[0_0_30px_rgba(16,185,129,0.12)] border-emerald-500/20 bg-emerald-500/5",
        text: "text-emerald-500",
        circle: "stroke-emerald-500"
      };
    case "Standard Grade":
      return {
        badge: "⚠️ Standard Grade",
        badgeVariant: "standard",
        color: "#f97316", // orange
        glow: "shadow-[0_0_30px_rgba(249,115,22,0.12)] border-orange-500/20 bg-orange-500/5",
        text: "text-orange-500",
        circle: "stroke-orange-500"
      };
    case "Fail":
      return {
        badge: "❌ Fail",
        badgeVariant: "fail",
        color: "#ef4444", // red
        glow: "shadow-[0_0_30px_rgba(239,68,68,0.12)] border-red-500/20 bg-red-500/5",
        text: "text-red-500",
        circle: "stroke-red-500"
      };
    default:
      return {
        badge: "Unknown",
        badgeVariant: "default",
        color: "#9ca3af",
        glow: "shadow-none border-white/5",
        text: "text-gray-400",
        circle: "stroke-gray-400"
      };
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "green":
      return <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />;
    case "orange":
      return <AlertTriangle className="h-4 w-4 text-orange-500 shrink-0" />;
    case "red":
      return <XCircle className="h-4 w-4 text-red-500 shrink-0" />;
    default:
      return null;
  }
};

export function ResultsSection({ results, onReset }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const { filename, grade, score, verdict, metrics, duration, aiFeedback } = results;

  const config = getGradeConfig(grade);
  const isFailed = grade === "Fail";

  // Circular Score calculations
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* File Overview & Compact Waveform Header */}
      <Card className="overflow-hidden">
        <div className="h-24 bg-[#111113] relative border-b border-white/5 flex items-center justify-center overflow-hidden">
          {/* Simulated Waveform */}
          <div className="flex items-end gap-[3px] h-12 w-full px-8 opacity-40">
            {Array.from({ length: 65 }).map((_, i) => {
              const height = isPlaying 
                ? `${Math.sin(i * 0.4 + Date.now() * 0.005) * 35 + 50}%`
                : `${Math.sin(i * 0.15) * 20 + Math.random() * 20 + 35}%`;
              return (
                <div 
                  key={i} 
                  className={`w-full rounded-t-sm transition-all duration-150 ${
                    isFailed 
                      ? "bg-red-500" 
                      : "bg-gradient-to-t from-cyan-500 to-purple-500"
                  }`}
                  style={{ height }}
                />
              );
            })}
          </div>
          
          {/* Player controls */}
          <div className="absolute inset-0 bg-[#09090B]/35 flex items-center justify-between px-8">
            <Button
              variant="default"
              size="icon"
              onClick={() => setIsPlaying(!isPlaying)}
              className="h-10 w-10 rounded-full shrink-0 border-white/10 bg-[#18181B] hover:bg-[#202024] text-white"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 fill-white" />
              ) : (
                <Play className="h-4 w-4 fill-white ml-0.5" />
              )}
            </Button>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-gray-400">{isPlaying ? "PLAYING" : "PAUSED"} • 00:00 / {duration}</span>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-t border-white/5 bg-[#18181B]/10">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">{filename}</p>
            <p className="text-xs text-gray-500 mt-0.5 font-mono">Format: {filename.split('.').pop().toUpperCase()} • File size verified</p>
          </div>
          <Badge variant="outline" className="bg-[#09090B] border-white/5 text-[10px] text-gray-400 font-mono">
            ID: RES-{Math.floor(1000 + Math.random() * 9000)}
          </Badge>
        </div>
      </Card>

      {/* Main Results layout */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        
        {/* Left Column: Grade Card (Hero) */}
        <Card className={`md:col-span-2 flex flex-col items-center justify-center p-8 text-center border transition-all duration-500 ${config.glow}`}>
          <div className="w-full flex flex-col items-center gap-6">
            
            {/* Grade Badge */}
            <Badge variant={config.badgeVariant} className="px-4 py-1.5 text-xs font-semibold tracking-wide shadow-sm border rounded-full">
              {config.badge}
            </Badge>

            {/* Circular Score */}
            <div className="relative flex items-center justify-center h-44 w-44">
              <svg className="w-full h-full transform -rotate-90">
                {/* Background Ring */}
                <circle
                  cx="88"
                  cy="88"
                  r={radius}
                  stroke="rgba(255, 255, 255, 0.04)"
                  strokeWidth="8"
                  fill="transparent"
                />
                {/* Score Indicator Ring */}
                <circle
                  cx="88"
                  cy="88"
                  r={radius}
                  stroke={config.color}
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-5xl font-bold text-white tracking-tighter leading-none">{score}</span>
                <span className="text-[10px] text-gray-500 font-mono mt-1 font-medium tracking-wider uppercase">OVERALL SCORE</span>
              </div>
            </div>

            {/* Verdict */}
            <div className="space-y-1 max-w-xs">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest font-mono">VERDICT</h3>
              <p className="text-sm font-medium text-gray-200 leading-relaxed">
                {verdict}
              </p>
            </div>

          </div>
        </Card>

        {/* Right Column: Metrics Card */}
        <Card className="md:col-span-3 border border-white/5 bg-[#18181B]/40 backdrop-blur-md">
          <CardHeader className="border-b border-white/5 pb-4">
            <CardTitle className="text-md font-semibold text-white flex items-center gap-2">
              <Disc className="h-4 w-4 text-cyan-400" />
              Acoustic Analysis
            </CardTitle>
            <CardDescription className="text-xs">Individual component measures mapped against distribution standards</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-white/5">
              {metrics.map((metric, i) => (
                <div key={i} className="flex items-center justify-between px-6 py-3.5 hover:bg-white/[0.01] transition-colors">
                  <span className="text-xs font-medium text-gray-400">{metric.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-gray-200 font-mono">{metric.value}</span>
                    {getStatusIcon(metric.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>

      {/* AI Analysis Card */}
      <Card className="border border-white/5 bg-[#18181B]/50 backdrop-blur-md">
        <CardHeader className="pb-3 flex flex-row items-center gap-2">
          <Sparkles className="h-4 w-4 text-purple-400" />
          <CardTitle className="text-sm font-semibold text-white">AI Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-gray-300 leading-relaxed font-normal">
            {grade === "Studio Grade" && "This recording demonstrates professional studio-grade quality. Signal-to-noise ratio is excellent with no detectable clipping or audio artifacts. Pacing is well balanced for TTS training and podcast production. The recording is approved for professional voice AI workflows."}
            {grade === "Pro Grade" && "This recording demonstrates excellent pro-grade quality. Signal-to-noise ratio is very high with negligible clipping and minor background ambience. Pacing is optimal for standard digital publication. The recording is approved for public distribution and podcasting."}
            {grade === "Standard Grade" && "This recording demonstrates standard quality. The signal-to-noise ratio is moderate, but minor room echoes and background hum are present. Pacing is acceptable. The recording requires clean-up before production use."}
            {grade === "Fail" && "This recording fails to meet production standards. Signal-to-noise ratio is extremely low with multiple digital clipping events. Pacing is irregular and background hum is severe. The recording is not approved for production or voice AI workflows."}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-white/5">
            <div>
              <h4 className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-2 flex items-center gap-1.5 font-mono">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> Key Strengths
              </h4>
              <ul className="space-y-2">
                {aiFeedback.strengths.map((str, i) => (
                  <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
                    <span className="h-1 w-1 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    {str}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-2 flex items-center gap-1.5 font-mono">
                <AlertTriangle className={`h-3.5 w-3.5 ${isFailed ? 'text-red-500' : 'text-orange-500'}`} /> Recommendations
              </h4>
              <ul className="space-y-2">
                {aiFeedback.recommendations.map((rec, i) => (
                  <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
                    <span className={`h-1 w-1 rounded-full mt-1.5 shrink-0 ${isFailed ? 'bg-red-500' : 'bg-orange-500'}`} />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons Row */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-white/5">
        <Button 
          variant="outline" 
          className="w-full sm:w-auto gap-2 text-xs py-2.5 h-10 px-5" 
          onClick={() => {
            console.log("Downloading JSON report for", filename);
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(results, null, 2));
            const downloadAnchor = document.createElement('a');
            downloadAnchor.setAttribute("href", dataStr);
            downloadAnchor.setAttribute("download", `${filename.split('.')[0]}_quality_report.json`);
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            downloadAnchor.remove();
          }}
        >
          <Download className="h-4 w-4" />
          Download JSON Report
        </Button>
        
        <Button 
          variant="primary" 
          className="w-full sm:w-auto gap-2 text-xs py-2.5 h-10 px-5"
          onClick={() => alert("PDF report generation is in development.")}
        >
          <FileText className="h-4 w-4" />
          Download PDF Report
        </Button>
        
        <Button 
          variant="ghost" 
          className="w-full sm:w-auto gap-2 text-xs py-2.5 h-10 px-5 hover:bg-white/5 text-gray-400 hover:text-white"
          onClick={onReset}
        >
          <RotateCcw className="h-4 w-4" />
          Analyze Another File
        </Button>
      </div>
      
    </div>
  );
}
