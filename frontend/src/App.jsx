import React, { useState } from "react";
import { Header } from "./components/Header";
import { UploadSection } from "./components/UploadSection";
import { ResultsSection } from "./components/ResultsSection";
import { Footer } from "./components/Footer";
import { Button } from "./components/ui/Button";
import { Activity, Sparkles } from "lucide-react";

export function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState("");
  const [results, setResults] = useState(null);

  const handleFileSelected = (file) => {
    setSelectedFile(file);
    setResults(null);
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setResults(null);
  };

  const simulateAnalysis = () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    
    const steps = [
      "Initializing Librosa analysis pipeline...",
      "Extracting Mel-Spectrogram & MFCCs...",
      "Estimating noise floor & signal-to-noise ratio...",
      "Detecting clipping events & vocal distortion...",
      "Running Groq Whisper transcription alignment...",
      "Querying Gemini Flash quality assessor...",
      "Finalizing quality report..."
    ];

    let currentStep = 0;
    setAnalysisProgress(steps[currentStep]);

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setAnalysisProgress(steps[currentStep]);
      } else {
        clearInterval(interval);
        generateResults();
      }
    }, 450);
  };

  const generateResults = () => {
    const filename = selectedFile.name.toLowerCase();
    
    let mockResults;

    if (filename.includes("bad") || filename.includes("fail") || filename.includes("poor") || filename.includes("noise")) {
      mockResults = {
        filename: selectedFile.name,
        duration: "00:22",
        grade: "Fail",
        score: 42,
        verdict: "Unacceptable background hum and digital clipping. Not suitable for voice AI.",
        metrics: [
          { name: "Signal-to-Noise Ratio", value: "42 dB", status: "red" },
          { name: "Background Noise", value: "-32 dB", status: "red" },
          { name: "Clipping", value: "18 events", status: "red" },
          { name: "Room Reverb", value: "Moderate (Echo)", status: "orange" },
          { name: "Artifacts", value: "Pops / Clicks", status: "red" },
          { name: "Pacing", value: "110 WPM (Slow)", status: "orange" },
          { name: "Filler Words", value: "4.5% (High)", status: "orange" }
        ],
        aiFeedback: {
          summary: "This audio fails distribution requirements due to severe room reflection, a high noise floor, and visible digital clipping. The speaker's voice is buried in background hum.",
          strengths: [
            "Voice matches target gender and age profile.",
            "Articulation is relatively clean despite distortion."
          ],
          recommendations: [
            "Reduce input preamp gain by 4-6 dB to prevent digital clipping.",
            "Apply acoustic treatment (panels or sound shields) to reduce room echo.",
            "Use a low-cut/high-pass filter at 80Hz to filter out sub-bass rumble."
          ]
        }
      };
    } else if (filename.includes("standard") || filename.includes("low") || filename.includes("average")) {
      mockResults = {
        filename: selectedFile.name,
        duration: "00:45",
        grade: "Standard Grade",
        score: 68,
        verdict: "Audio quality is adequate but requires noise reduction and equalization.",
        metrics: [
          { name: "Signal-to-Noise Ratio", value: "62 dB", status: "orange" },
          { name: "Background Noise", value: "-48 dB", status: "orange" },
          { name: "Clipping", value: "3 events", status: "orange" },
          { name: "Room Reverb", value: "Mild Reverb", status: "orange" },
          { name: "Artifacts", value: "None Detected", status: "green" },
          { name: "Pacing", value: "130 WPM (Optimal)", status: "green" },
          { name: "Filler Words", value: "2.1% (Moderate)", status: "orange" }
        ],
        aiFeedback: {
          summary: "Standard quality audio. The recording is intelligible, but minor background hum and reverb will limit its use in high-end voice synthesis or distribution.",
          strengths: [
            "Consistent vocal volume.",
            "Good pronunciation and speed."
          ],
          recommendations: [
            "Use a gate expander to suppress room ambience during silence.",
            "De-reverb the mid frequencies (500Hz - 2kHz)."
          ]
        }
      };
    } else if (filename.includes("pro") || filename.includes("podcast") || filename.includes("high")) {
      mockResults = {
        filename: selectedFile.name,
        duration: "01:15",
        grade: "Pro Grade",
        score: 88,
        verdict: "Ready for podcast release and standard distribution.",
        metrics: [
          { name: "Signal-to-Noise Ratio", value: "76 dB", status: "green" },
          { name: "Background Noise", value: "-65 dB", status: "green" },
          { name: "Clipping", value: "0 events", status: "green" },
          { name: "Room Reverb", value: "Negligible", status: "green" },
          { name: "Artifacts", value: "None Detected", status: "green" },
          { name: "Pacing", value: "142 WPM (Optimal)", status: "green" },
          { name: "Filler Words", value: "1.2% (Low)", status: "green" }
        ],
        aiFeedback: {
          summary: "Pro Grade quality. Fully ready for digital distribution. Minimal room reflection and good dynamic balance.",
          strengths: [
            "Zero digital clipping.",
            "Dynamic range sits comfortably inside publication standards."
          ],
          recommendations: [
            "A slight de-esser around 6.5kHz could smooth out sibilant consonants."
          ]
        }
      };
    } else {
      mockResults = {
        filename: selectedFile.name,
        duration: "01:05",
        grade: "Studio Grade",
        score: 96,
        verdict: "Perfect recording quality. Ready for high-fidelity voice AI model training.",
        metrics: [
          { name: "Signal-to-Noise Ratio", value: "88 dB", status: "green" },
          { name: "Background Noise", value: "-75 dB", status: "green" },
          { name: "Clipping", value: "0 events", status: "green" },
          { name: "Room Reverb", value: "None Detected", status: "green" },
          { name: "Artifacts", value: "None Detected", status: "green" },
          { name: "Pacing", value: "138 WPM (Optimal)", status: "green" },
          { name: "Filler Words", value: "0.4% (Minimal)", status: "green" }
        ],
        aiFeedback: {
          summary: "Perfect recording quality. Meets all ACX, podcast distribution, and voice AI dataset compliance rules. The audio exhibits perfect dynamics and a silent noise floor.",
          strengths: [
            "Perfect noise floor suitable for professional TTS training.",
            "Zero clipping events detected.",
            "Warm, natural frequency response across mid-ranges."
          ],
          recommendations: [
            "No adjustments needed. Direct ingestion recommended."
          ]
        }
      };
    }

    setResults(mockResults);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-[#09090B] flex flex-col items-center justify-between px-4 sm:px-6 lg:px-8 py-10">
      <div className="w-full max-w-[1000px] flex-1 flex flex-col gap-10 items-center justify-start">
        
        {/* Header */}
        <Header />

        {/* Upload & Action Panel */}
        {!results && (
          <div className="w-full space-y-6">
            <UploadSection 
              onFileSelected={handleFileSelected} 
              selectedFile={selectedFile} 
              onClearFile={handleClearFile} 
              isAnalyzing={isAnalyzing}
              onAnalyze={simulateAnalysis}
            />
            {isAnalyzing && (
              <div className="text-center font-mono text-xs text-gray-500 animate-pulse transition-all duration-300">
                {analysisProgress}
              </div>
            )}
          </div>
        )}

        {/* Results view */}
        {results && (
          <ResultsSection 
            results={results} 
            onReset={handleClearFile} 
          />
        )}

      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
