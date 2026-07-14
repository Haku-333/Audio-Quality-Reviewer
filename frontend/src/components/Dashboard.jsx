import React, { useState } from "react";
import { AudioTrackList } from "./AudioTrackList";
import { QualityMetrics } from "./QualityMetrics";
import { mockTracks, summaryStats } from "@/data/mockData";
import { Mic2, LayoutDashboard, Settings, History, HelpCircle, Bell, Search, Upload } from "lucide-react";
import { Button } from "./ui/Button";

export function Dashboard() {
  const [selectedTrack, setSelectedTrack] = useState(mockTracks[0]);

  return (
    <div className="flex h-screen w-full bg-[#09090B] text-gray-200 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#111113] flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 text-white">
              <Mic2 className="h-5 w-5" />
            </div>
            <span className="font-semibold text-lg tracking-tight">AudioReview</span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1">
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 text-gray-100 font-medium">
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-gray-200 transition-colors">
            <History className="h-4 w-4" />
            History
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-gray-200 transition-colors">
            <Settings className="h-4 w-4" />
            Settings
          </a>
        </nav>
        
        <div className="p-4 border-t border-white/5">
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-gray-200 transition-colors">
            <HelpCircle className="h-4 w-4" />
            Help & Support
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-white/5 bg-[#09090B]/80 backdrop-blur-md flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center bg-[#18181B] border border-white/5 rounded-full px-4 py-1.5 w-96">
            <Search className="h-4 w-4 text-gray-500 mr-2" />
            <input 
              type="text" 
              placeholder="Search tracks, projects..." 
              className="bg-transparent border-none outline-none text-sm w-full text-gray-200 placeholder:text-gray-500"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-200 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-purple-500"></span>
            </button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-500 border border-white/10"></div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Header Section */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-white mb-1">Overview</h1>
                <p className="text-gray-400">Review and analyze audio quality metrics.</p>
              </div>
              <Button variant="primary" className="gap-2">
                <Upload className="h-4 w-4" />
                Upload Audio
              </Button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="glass-card p-5">
                <p className="text-sm font-medium text-gray-400 mb-1">Total Analyzed</p>
                <p className="text-3xl font-semibold text-white">{summaryStats.totalAnalyzed}</p>
              </div>
              <div className="glass-card p-5">
                <p className="text-sm font-medium text-gray-400 mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  Studio Grade
                </p>
                <p className="text-3xl font-semibold text-amber-500">{summaryStats.studioGrade}</p>
              </div>
              <div className="glass-card p-5">
                <p className="text-sm font-medium text-gray-400 mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Pro Grade
                </p>
                <p className="text-3xl font-semibold text-emerald-500">{summaryStats.proGrade}</p>
              </div>
              <div className="glass-card p-5">
                <p className="text-sm font-medium text-gray-400 mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  Failed QA
                </p>
                <p className="text-3xl font-semibold text-red-500">{summaryStats.fail}</p>
              </div>
            </div>

            {/* Main Layout: List + Detail */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 glass-panel p-4 h-[600px] overflow-y-auto">
                <AudioTrackList 
                  tracks={mockTracks} 
                  selectedTrackId={selectedTrack?.id} 
                  onSelectTrack={setSelectedTrack} 
                />
              </div>
              <div className="lg:col-span-2">
                <QualityMetrics track={selectedTrack} />
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
