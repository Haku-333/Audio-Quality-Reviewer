import React from "react";
import { Badge } from "./ui/Badge";
import { Play, MoreHorizontal } from "lucide-react";
import { Button } from "./ui/Button";

const getBadgeVariant = (grade) => {
  switch (grade) {
    case "Studio Grade":
      return "studio";
    case "Pro Grade":
      return "pro";
    case "Standard Grade":
      return "standard";
    case "Fail":
      return "fail";
    default:
      return "default";
  }
};

export function AudioTrackList({ tracks, onSelectTrack, selectedTrackId }) {
  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between px-2">
        <h2 className="text-lg font-semibold text-gray-200">Recent Analysis</h2>
        <Button variant="ghost" size="sm">View All</Button>
      </div>
      <div className="space-y-2">
        {tracks.map((track) => (
          <div
            key={track.id}
            onClick={() => onSelectTrack(track)}
            className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${
              selectedTrackId === track.id
                ? "bg-white/10 border-white/20 shadow-md"
                : "bg-[#18181B]/50 border-white/5 hover:bg-white/5 hover:border-white/10"
            }`}
          >
            <div className="flex items-center gap-4">
              <button className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10">
                <Play className="h-4 w-4 text-cyan-400 ml-0.5" />
              </button>
              <div>
                <p className="font-medium text-sm text-gray-200">{track.filename}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">{track.duration}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                  <span className="text-xs text-gray-500">{track.uploadTime}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant={getBadgeVariant(track.grade)}>{track.grade}</Badge>
              <Button variant="ghost" size="icon" className="text-gray-400">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
