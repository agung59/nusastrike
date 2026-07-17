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
import { activityColor } from '../utils/helpers';

function HotspotDetailSheet({ hotspot, onClose }) {
  const c = activityColor(hotspot.activity);
  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center">
      <div className="absolute inset-0 bg-slate-900/40" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md rounded-t-3xl shadow-2xl max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-white flex items-center justify-between px-5 pt-5 pb-3 border-b border-slate-100">
          <h3 className="font-bold text-lg text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{hotspot.name}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
            <X className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        <div className="px-5 py-4 space-y-4">
          <div className="flex items-center justify-between bg-slate-50 rounded-2xl px-4 py-3">
            <div>
              <p className="text-xs text-slate-400">Skor Aktivitas Ikan</p>
              <p className="text-2xl font-bold text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{hotspot.activity}</p>
            </div>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full text-white ${c.ring}`}>{c.label}</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-xl p-3">
              <p className="text-xs text-slate-400">Kedalaman</p>
              <p className="text-sm font-semibold text-slate-900">{hotspot.depth}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3">
              <p className="text-xs text-slate-400">Tangkapan</p>
              <p className="text-sm font-semibold text-slate-900">{hotspot.catches} laporan</p>
            </div>
          </div>

          <div>
            <p className="text-xs text-slate-400 font-medium mb-2">IKAN REKOMENDASI</p>
            <div className="flex flex-wrap gap-2">
              {hotspot.fish.map((f, i) => (
                <span key={i} className="text-xs font-medium text-teal-700 bg-teal-50 px-3 py-1.5 rounded-full">{f}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default HotspotDetailSheet;
