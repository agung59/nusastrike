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
import WeatherIcon from '../components/WeatherIcon';
import { weatherHourly, weekForecast } from '../data/mockData';

function WeatherPage({ onBack }) {
  return (
    <div className="pb-2">
      <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b px-5 py-4 flex items-center gap-3 z-10">
        <button onClick={onBack} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>
        <h2 className="font-bold text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Cuaca</h2>
      </div>

      <div className="px-5 pt-6 space-y-5">
        {/* HERO */}
        <div className="relative rounded-[28px] overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-800 to-teal-500" />
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-amber-300/20 blur-2xl" />
          <div className="absolute -bottom-16 -left-10 w-48 h-48 rounded-full bg-teal-300/20 blur-2xl" />
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/70 text-[11px] tracking-widest uppercase font-medium">Kondisi Saat Ini</span>
              <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-full text-amber-300 text-xs font-semibold">
                <MapPin className="w-3 h-3" /> Kep. Seribu
              </span>
            </div>
            <div className="flex items-end gap-3">
              <Sun className="w-12 h-12 text-amber-300 drop-shadow-lg" />
              <span className="text-white font-extrabold text-7xl leading-none tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                28°
              </span>
              <div className="mb-2">
                <p className="text-white text-sm font-semibold">Cerah</p>
                <p className="text-white/50 text-xs">Terasa 31°</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-5">
              <div className="bg-white/10 rounded-2xl p-3 text-center">
                <Droplet className="w-4 h-4 text-white/70 mx-auto mb-1" />
                <p className="text-white font-semibold text-sm">68%</p>
                <p className="text-white/50 text-[10px]">Kelembaban</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-3 text-center">
                <Wind className="w-4 h-4 text-white/70 mx-auto mb-1" />
                <p className="text-white font-semibold text-sm">12 kt</p>
                <p className="text-white/50 text-[10px]">Angin Timur</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-3 text-center">
                <Eye className="w-4 h-4 text-white/70 mx-auto mb-1" />
                <p className="text-white font-semibold text-sm">10 km</p>
                <p className="text-white/50 text-[10px]">Jarak Pandang</p>
              </div>
            </div>

            {/* SUNRISE / SUNSET */}
            <div className="mt-4 bg-white/10 rounded-2xl px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sunrise className="w-4 h-4 text-amber-300" />
                <div>
                  <p className="text-white text-sm font-semibold">05:42</p>
                  <p className="text-white/50 text-[10px]">Matahari Terbit</p>
                </div>
              </div>
              <div className="flex-1 mx-3 h-px bg-white/20" />
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="text-white text-sm font-semibold">17:58</p>
                  <p className="text-white/50 text-[10px]">Matahari Terbenam</p>
                </div>
                <Sunset className="w-4 h-4 text-orange-300" />
              </div>
            </div>
          </div>
        </div>

        {/* UV INDEX */}
        <div className="bg-white rounded-3xl shadow-md p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-amber-500" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-900">Indeks UV: 8 (Sangat Tinggi)</p>
            <p className="text-xs text-slate-400">Gunakan pelindung matahari saat mancing siang hari</p>
          </div>
        </div>

        {/* HOURLY */}
        <div>
          <h3 className="font-bold text-slate-900 mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Per Jam</h3>
          <div className="flex gap-2.5 overflow-x-auto pb-1 -mx-5 px-5">
            {weatherHourly.map((h, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm px-4 py-3.5 text-center shrink-0 min-w-[68px]">
                <p className="text-xs text-slate-400 font-medium">{h.t}:00</p>
                <WeatherIcon name={h.icon} className="w-6 h-6 text-slate-400 mx-auto my-2.5" />
                <p className="text-sm font-bold text-slate-900">{h.temp}°</p>
              </div>
            ))}
          </div>
        </div>

        {/* 7 DAY */}
        <div>
          <h3 className="font-bold text-slate-900 mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>7 Hari Kedepan</h3>
          <div className="bg-white rounded-3xl shadow-md overflow-hidden">
            {weekForecast.map((d, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-5 py-3.5 ${i < weekForecast.length - 1 ? "border-b border-slate-100" : ""}`}
              >
                <span className="text-sm font-medium text-slate-900 w-24">{d.day}</span>
                <WeatherIcon name={d.icon} className="w-5 h-5 text-slate-400" />
                <span className="flex items-center gap-1 text-xs text-sky-500 w-14">
                  <Droplet className="w-3 h-3" /> {d.rain}%
                </span>
                <span className="text-sm text-slate-400 w-8 text-right">{d.lo}°</span>
                <span className="text-sm font-semibold text-slate-900 w-8 text-right">{d.hi}°</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI TIP */}
        <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-3xl p-5 flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
            <Bot className="w-4.5 h-4.5 text-blue-900" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Tips AI Captain</p>
            <p className="text-xs text-slate-500 mt-1">Cuaca cerah dan angin sedang — kondisi ideal buat trolling di perairan terbuka pagi ini.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherPage;
