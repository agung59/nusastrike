import React, { useState } from 'react';
import {
  Fish, Waves, Moon, Bot, MapPin, BookOpen, Users, User, Home as HomeIcon,
  Bell, ChevronRight, ChevronLeft, Wind, Droplet, Sun, Star, ArrowRight, X,
  Send, Gauge, Sunrise, Sunset, Eye, CloudRain, Thermometer, TrendingUp,
  TrendingDown, Compass, Sparkles, CloudSun, Cloud, Camera, Plus, Trash2,
  Loader2, CheckCircle2, Calendar, Ruler, Layers, Navigation, Minus,
  Heart, MessageCircle, Share2, Award, LogOut, Settings, HelpCircle, Info,
  Copy, Check, Clock, MapPinned, Activity, Zap, Edit2, MoreVertical,
  AlertCircle, Lightbulb, TrendingUp as TrendingUpIcon
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, Tooltip
} from 'recharts';
import HotspotDetailSheet from '../components/HotspotDetailSheet';
import { activityColor } from '../utils/helpers';
import { community, communityPins, hotspots } from '../data/mockData';

function MapPage() {
  const [layers, setLayers] = useState({ contour: true, heatmap: true, community: true });
  const [selected, setSelected] = useState(null);

  const toggleLayer = (key) => setLayers((l) => ({ ...l, [key]: !l[key] }));

  return (
    <div className="pb-2">
      <div className="flex items-center justify-between mt-3 mb-3">
        <h2 className="font-bold text-slate-900 text-2xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Peta</h2>
        <span className="flex items-center gap-1 text-slate-400 text-xs">
          <Navigation className="w-3.5 h-3.5" /> Kep. Seribu
        </span>
      </div>

      <div className="flex gap-2 mb-3 overflow-x-auto">
        {[
          { key: "contour", label: "Kontur Kedalaman" },
          { key: "heatmap", label: "Aktivitas Ikan" },
          { key: "community", label: "Komunitas" },
        ].map((l) => (
          <button
            key={l.key}
            onClick={() => toggleLayer(l.key)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium shrink-0 transition ${
              layers[l.key] ? "bg-blue-900 text-white" : "bg-white text-slate-400 shadow-sm"
            }`}
          >
            <Layers className="w-3 h-3" /> {l.label}
          </button>
        ))}
      </div>

      <div className="relative rounded-3xl overflow-hidden shadow-xl" style={{ height: "420px" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-800 to-teal-600" />

        {layers.contour && (
          <svg className="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M-5,20 Q30,5 60,18 T105,15" stroke="white" fill="none" strokeWidth="0.4" />
            <path d="M-5,40 Q30,25 60,38 T105,35" stroke="white" fill="none" strokeWidth="0.4" />
            <path d="M-5,60 Q30,48 60,58 T105,55" stroke="white" fill="none" strokeWidth="0.4" />
            <path d="M-5,80 Q30,70 60,78 T105,75" stroke="white" fill="none" strokeWidth="0.4" />
            <text x="3" y="18" fill="white" fontSize="3">10m</text>
            <text x="3" y="38" fill="white" fontSize="3">25m</text>
            <text x="3" y="58" fill="white" fontSize="3">40m</text>
          </svg>
        )}

        {layers.heatmap && hotspots.map((h) => {
          const c = activityColor(h.activity);
          return (
            <div
              key={`glow-${h.id}`}
              className={`absolute rounded-full ${c.glow} opacity-30 blur-xl`}
              style={{
                left: `${h.x}%`, top: `${h.y}%`,
                width: `${h.activity * 0.9}px`, height: `${h.activity * 0.9}px`,
                transform: "translate(-50%, -50%)",
              }}
            />
          );
        })}

        {layers.community && communityPins.map((p, i) => (
          <div
            key={i}
            className="absolute w-2.5 h-2.5 rounded-full bg-white border-2 border-teal-400"
            style={{ left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%, -50%)" }}
            title={p.name}
          />
        ))}

        {hotspots.map((h) => {
          const c = activityColor(h.activity);
          return (
            <button
              key={h.id}
              onClick={() => setSelected(h)}
              className="absolute flex flex-col items-center"
              style={{ left: `${h.x}%`, top: `${h.y}%`, transform: "translate(-50%, -100%)" }}
            >
              <div className={`w-8 h-8 rounded-full ${c.ring} border-2 border-white shadow-lg flex items-center justify-center active:scale-90 transition`}>
                <Fish className="w-4 h-4 text-white" />
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-white/80 mt-0.5" />
            </button>
          );
        })}

        <div className="absolute bottom-3 right-3 bg-white/95 rounded-2xl px-3 py-2 shadow-md">
          <p className="text-[10px] text-slate-400 font-medium mb-1">AKTIVITAS</p>
          <div className="flex items-center gap-2 text-[10px] text-slate-600">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500" />Tinggi</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" />Sedang</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-teal-500" />Rendah</span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs text-slate-400 mb-2 font-medium">SEMUA HOTSPOT</p>
        <div className="space-y-2">
          {hotspots.map((h) => {
            const c = activityColor(h.activity);
            return (
              <button
                key={h.id}
                onClick={() => setSelected(h)}
                className="w-full bg-white rounded-2xl shadow-sm p-3 flex items-center gap-3 text-left active:scale-[0.98] transition"
              >
                <div className={`w-2.5 h-2.5 rounded-full ${c.ring} shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900">{h.name}</p>
                  <p className="text-xs text-slate-400">{h.depth} · {h.catches} tangkapan</p>
                </div>
                <span className="text-xs font-semibold text-slate-600">{h.activity}</span>
              </button>
            );
          })}
        </div>
      </div>

      {selected && <HotspotDetailSheet hotspot={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}


export default MapPage;
