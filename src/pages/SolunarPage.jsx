import React from 'react';
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
import { solunarActivity, majorMinor } from '../data/mockData';

function SolunarPage({ onBack }) {
  return (
    <div className="pb-2">
      <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b px-5 py-4 flex items-center gap-3 z-10">
        <button onClick={onBack} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>
        <h2 className="font-bold text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Solunar</h2>
      </div>

      <div className="px-5 pt-6 space-y-5">
        {/* HERO */}
        <div className="relative rounded-[28px] overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-indigo-800 to-blue-600" />
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-indigo-400/10 blur-3xl" />
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white/70 text-[11px] tracking-widest uppercase font-medium">Fase Bulan</span>
              <span className="flex items-center gap-1 text-indigo-200 text-xs font-semibold">
                <Moon className="w-3 h-3" /> Waxing Gibbous
              </span>
            </div>
            <div className="flex items-center gap-5">
              {/* Moon phase — CSS crescent */}
              <div className="relative w-16 h-16 rounded-full bg-slate-100 shrink-0 shadow-lg overflow-hidden">
                <div className="absolute inset-0 rounded-full bg-indigo-950" style={{ clipPath: "ellipse(35% 50% at 25% 50%)" }} />
              </div>
              <div>
                <div className="flex items-end gap-2">
                  <span className="text-white font-extrabold text-6xl leading-none tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    86
                  </span>
                  <span className="text-white/60 text-sm mb-1.5">/100</span>
                </div>
                <p className="text-indigo-200 text-xs font-medium mt-1">Aktivitas ikan Excellent hari ini</p>
              </div>
            </div>
            <div className="mt-5 bg-white/10 rounded-2xl px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-white/60 text-xs">Major Period Berikutnya</p>
                <p className="text-white font-semibold">18:00 – 20:00</p>
              </div>
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
          </div>
        </div>

        {/* CHART */}
        <div>
          <h3 className="font-bold text-slate-900 mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Tren Aktivitas 24 Jam</h3>
          <div className="bg-white rounded-3xl shadow-md p-5">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={solunarActivity}>
                <defs>
                  <linearGradient id="solunarGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="t" stroke="#cbd5e1" />
                <YAxis stroke="#cbd5e1" />
                <Area type="monotone" dataKey="a" stroke="#6366f1" strokeWidth={2.5} fill="url(#solunarGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* MAJOR / MINOR */}
        <div>
          <h3 className="font-bold text-slate-900 mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Major & Minor Period</h3>
          <div className="bg-white rounded-3xl shadow-md p-5 space-y-2">
            {majorMinor.map((mm, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${mm.type === "Major" ? "bg-indigo-100" : "bg-blue-100"}`}>
                  <Sparkles className={`w-4 h-4 ${mm.type === "Major" ? "text-indigo-600" : "text-blue-600"}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900">{mm.type}</p>
                  <p className="text-xs text-slate-400">{mm.time}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${mm.type === "Major" ? "bg-indigo-100 text-indigo-700" : "bg-blue-100 text-blue-700"}`}>
                  {mm.strength}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* AI TIP */}
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl p-5 flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
            <Bot className="w-4.5 h-4.5 text-indigo-700" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Tips AI Captain</p>
            <p className="text-xs text-slate-500 mt-1">Waxing Gibbous mendekati purnama — aktivitas makan ikan predator biasanya meningkat saat major period.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SolunarPage;
