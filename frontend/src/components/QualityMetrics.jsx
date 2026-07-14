import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Activity, AlertTriangle, CheckCircle2, Mic, Settings, Volume2 } from "lucide-react";

export function QualityMetrics({ track }) {
  if (!track) {
    return (
      <Card className="h-full min-h-[400px] flex items-center justify-center">
        <p className="text-gray-500">Select a track to view detailed metrics</p>
      </Card>
    );
  }

  const isFailed = track.grade === "Fail";

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="h-32 bg-[#111113] relative border-b border-white/5 flex items-center justify-center overflow-hidden">
          {/* Simulated Waveform using CSS blocks */}
          <div className="flex items-end gap-[2px] h-16 w-full px-4 opacity-50">
            {Array.from({ length: 40 }).map((_, i) => (
              <div 
                key={i} 
                className="w-full bg-gradient-to-t from-purple-500 to-cyan-500 rounded-t-sm"
                style={{ height: `${Math.random() * 80 + 10}%` }}
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
        </div>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl mb-1">{track.filename}</CardTitle>
              <CardDescription>ID: {track.id} • {track.duration}</CardDescription>
            </div>
            <Badge variant="outline" className="px-3 py-1 bg-[#09090B]">{track.status}</Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-[#18181B]/40">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <Activity className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Signal-to-Noise (SNR)</p>
              <p className="text-lg font-semibold text-gray-100">{track.metrics.snr}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#18181B]/40">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
              <Mic className="h-5 w-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Background Noise</p>
              <p className="text-lg font-semibold text-gray-100">{track.metrics.backgroundNoise}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#18181B]/40">
          <CardContent className="p-4 flex items-center gap-4">
            <div className={`p-3 rounded-xl ${track.metrics.clippingEvents > 0 ? 'bg-red-500/10 border border-red-500/20' : 'bg-emerald-500/10 border border-emerald-500/20'}`}>
              <AlertTriangle className={`h-5 w-5 ${track.metrics.clippingEvents > 0 ? 'text-red-400' : 'text-emerald-400'}`} />
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Clipping Events</p>
              <p className="text-lg font-semibold text-gray-100">{track.metrics.clippingEvents}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#18181B]/40">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <Volume2 className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Loudness (LUFS)</p>
              <p className="text-lg font-semibold text-gray-100">{track.metrics.lufs}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {track.flags.length > 0 && (
        <Card className={`border ${isFailed ? 'border-red-500/30 bg-red-500/5' : 'border-orange-500/30 bg-orange-500/5'}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <AlertTriangle className={`h-4 w-4 ${isFailed ? 'text-red-400' : 'text-orange-400'}`} />
              Detected Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 mt-2">
              {track.flags.map((flag, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-current opacity-50 shrink-0" />
                  {flag}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {track.flags.length === 0 && (
        <Card className="border border-emerald-500/30 bg-emerald-500/5">
          <CardContent className="p-4 flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            <p className="text-sm text-emerald-200/90">No issues detected. Audio meets all quality standards.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
