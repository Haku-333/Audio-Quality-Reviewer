import React from "react";
import { AudioLines } from "lucide-react";
import { Badge } from "./ui/Badge";

export function Header() {
  return (
    <header className="glass-panel w-full p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 md:gap-6">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 text-cyan-400 shrink-0">
          <AudioLines className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-white tracking-tight leading-none mb-1.5">
            Audio Quality Reviewer
          </h1>
          <p className="text-xs md:text-sm text-gray-400 font-normal">
            AI-powered audio grading for voice AI and podcast production
          </p>
        </div>
      </div>
      <div className="shrink-0 self-end sm:self-center">
        <Badge variant="outline" className="px-3 py-1 bg-white/5 border-white/10 text-gray-300 font-medium tracking-wide text-xs">
          MVP v1.0
        </Badge>
      </div>
    </header>
  );
}
