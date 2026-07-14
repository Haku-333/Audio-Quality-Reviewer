import React, { useRef, useState } from "react";
import { Upload, FileAudio, X, Sparkles, Loader2, AudioLines } from "lucide-react";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { Card } from "./ui/Card";

export function UploadSection({ 
  onFileSelected, 
  selectedFile, 
  onClearFile,
  isAnalyzing,
  onAnalyze 
}) {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const ext = file.name.toLowerCase().split('.').pop();
      if (file.type.startsWith("audio/") || ["mp3", "wav", "flac"].includes(ext)) {
        onFileSelected(file);
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onFileSelected(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = 2;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border border-white/5 bg-[#18181B]/40 backdrop-blur-md overflow-hidden p-8 flex flex-col items-center gap-6">
      
      {/* Header of the Card */}
      <div className="flex flex-col items-center text-center gap-2">
        <div className="p-4 rounded-full bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-white/5 text-cyan-400 mb-2">
          <AudioLines className="h-10 w-10 animate-pulse" />
        </div>
        <h2 className="text-xl font-semibold text-white tracking-tight">Upload Audio Sample</h2>
        <p className="text-sm text-gray-400 max-w-md font-normal leading-relaxed">
          Analyze your recording using AI-powered audio intelligence.
        </p>
      </div>

      {/* Upload Area Drop-Zone */}
      {!selectedFile && (
        <div 
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={onButtonClick}
          className={`w-full rounded-2xl border-2 border-dashed p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group ${
            isDragActive 
              ? "border-cyan-500 bg-cyan-500/5 shadow-[0_0_20px_rgba(6,182,212,0.15)] scale-[1.01]" 
              : "border-white/10 bg-[#111113]/30 hover:border-white/20 hover:bg-[#111113]/50 hover:shadow-[0_0_15px_rgba(255,255,255,0.02)]"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="audio/*,.mp3,.wav,.flac"
            onChange={handleChange}
          />
          
          <Upload className="h-8 w-8 text-gray-500 group-hover:text-gray-300 transition-colors mb-3" />
          
          <p className="text-sm font-medium text-gray-200 mb-0.5">Drop your audio file here</p>
          <p className="text-xs text-gray-500 mb-4">or click to browse</p>
          
          <div className="flex items-center gap-2 mb-6">
            <Badge variant="outline" className="bg-[#09090B] border-white/5 rounded-full px-3 py-0.5 text-[10px] font-mono text-gray-400">MP3</Badge>
            <Badge variant="outline" className="bg-[#09090B] border-white/5 rounded-full px-3 py-0.5 text-[10px] font-mono text-gray-400">WAV</Badge>
            <Badge variant="outline" className="bg-[#09090B] border-white/5 rounded-full px-3 py-0.5 text-[10px] font-mono text-gray-400">FLAC</Badge>
          </div>

          <div className="w-full border-t border-white/5 pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-2">
            <span>Maximum file size: <strong className="text-gray-400">50MB</strong></span>
            <span className="hidden sm:inline">•</span>
            <span>Accepted extensions: <strong className="text-gray-400">.mp3, .wav, .flac</strong></span>
          </div>
        </div>
      )}

      {/* Uploaded File display */}
      {selectedFile && (
        <div className="w-full flex items-center justify-between p-4 rounded-xl border border-white/5 bg-[#111113]/50 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
              <FileAudio className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-200 truncate">{selectedFile.name}</p>
              <p className="text-[10px] text-gray-500 mt-0.5 font-mono">{formatBytes(selectedFile.size)}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onClearFile();
            }}
            className="h-8 w-8 text-gray-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Analyze Button */}
      <Button
        variant="primary"
        className="w-full py-3 h-11 text-sm font-semibold tracking-wide gap-2 mt-2 shrink-0"
        onClick={onAnalyze}
        disabled={!selectedFile || isAnalyzing}
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Analyzing audio...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            Analyze Audio Quality
          </>
        )}
      </Button>
    </Card>
  );
}
