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
import PremiumCard from '../components/PremiumCard';
import { community } from '../data/mockData';
import { getElapsedTime, calculateDistance } from '../utils/helpers';

function HomePage({ activeTrip, startTrip, finishTrip, setShowAddCatch, setShowAddEvent, setDetail, setSheet }) {
  return (
          <>
            {/* ACTIVE TRIP CARD */}
            {activeTrip && (
              <div className="mt-3 mb-5 bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl p-5 text-white shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs opacity-80 mb-1">TRIP AKTIF</p>
                    <h3 className="text-xl font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {activeTrip.name}
                    </h3>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Navigation className="w-6 h-6" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div className="bg-white/10 rounded-xl p-3">
                    <p className="text-xs opacity-70 mb-1">Durasi</p>
                    <p className="font-semibold">
                      {getElapsedTime(activeTrip.startTime, new Date())}
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3">
                    <p className="text-xs opacity-70 mb-1">Jarak</p>
                    <p className="font-semibold">{calculateDistance(activeTrip.trackingPath.map(p => ({ lat: parseFloat(p.lat), lng: parseFloat(p.lng) }))) || 0} km</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3">
                    <p className="text-xs opacity-70 mb-1">Tangkapan</p>
                    <p className="font-semibold">{activeTrip.catches.length} Ikan</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3">
                    <p className="text-xs opacity-70 mb-1">Lokasi</p>
                    <p className="font-semibold text-xs truncate">{activeTrip.location}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setShowAddCatch(true)}
                    className="flex-1 bg-white/90 text-blue-700 rounded-xl py-3 font-semibold flex items-center justify-center gap-2 active:scale-95 transition"
                  >
                    <Plus className="w-4 h-4" /> Add Catch
                  </button>
                  <button
                    onClick={() => {
                      setShowAddEvent(true);
                    }}
                    className="flex-1 bg-white/20 border border-white/30 text-white rounded-xl py-3 font-semibold active:scale-95 transition text-xs"
                  >
                    + Event
                  </button>
                  <button
                    onClick={finishTrip}
                    className="flex-1 bg-white/20 border border-white/30 text-white rounded-xl py-3 font-semibold active:scale-95 transition text-xs"
                  >
                    Selesai
                  </button>
                </div>
              </div>
            )}

            {/* ORIGINAL DASHBOARD CONTENT */}
            <div className="relative mt-3 rounded-3xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-800 to-teal-500" />
              <svg className="absolute bottom-0 left-0 w-full opacity-30" viewBox="0 0 400 80" preserveAspectRatio="none">
                <path d="M0,40 C100,80 300,0 400,40 L400,80 L0,80 Z" fill="white" />
              </svg>
              <div className="relative p-6 backdrop-blur-sm bg-white/5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/70 text-xs tracking-wide uppercase">Fishing Readiness</span>
                  <span className="flex items-center gap-1 text-amber-300 text-xs font-semibold">
                    <MapPin className="w-3 h-3" /> Kep. Seribu
                  </span>
                </div>
                <div className="flex items-end gap-3">
                  <span className="text-white font-extrabold text-6xl leading-none" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    86
                  </span>
                  <span className="text-white/60 text-lg mb-1">/100</span>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-300 text-amber-300" />
                  ))}
                  <span className="text-white font-semibold text-sm ml-2 tracking-wide">TODAY IS EXCELLENT</span>
                </div>
                <div className="mt-5 flex items-center justify-between bg-white/10 rounded-2xl px-4 py-3">
                  <div>
                    <p className="text-white/60 text-xs">Best Strike Time</p>
                    <p className="text-white font-semibold">18:00 – 20:00</p>
                  </div>
                  <button
                    onClick={() => !activeTrip && startTrip()}
                    className="flex items-center gap-1 bg-white text-blue-900 font-semibold text-sm px-4 py-2 rounded-full shadow-md active:scale-95 transition"
                  >
                    {activeTrip ? "Fishing" : "Mulai Fishing"} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-5">
              <PremiumCard icon={<Sun className="w-5 h-5 text-amber-500" />} label="Weather" value="28°C" sub="Sunny" onClick={() => setDetail("weather")} />
              <PremiumCard icon={<Waves className="w-5 h-5 text-teal-500" />} label="Sea Conditions" value="0.6m" sub="Safe to fish" onClick={() => setDetail("sea")} />
              <PremiumCard icon={<Moon className="w-5 h-5 text-indigo-500" />} label="Solunar" value="Major" sub="Waxing Gibbous" onClick={() => setDetail("solunar")} />
              <PremiumCard icon={<Bot className="w-5 h-5 text-blue-500" />} label="AI Captain" value="Kakap Merah" sub="92% confidence" onClick={() => setSheet("ai")} />
            </div>

            <div className="mt-7">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Aktivitas Komunitas</h3>
                <span className="text-teal-600 text-sm font-medium flex items-center">Lihat semua <ChevronRight className="w-4 h-4" /></span>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
                {community.map((c, i) => (
                  <div key={i} className="min-w-[150px] bg-white rounded-2xl shadow-md p-3 shrink-0">
                    <div className="h-20 rounded-xl bg-gradient-to-br from-teal-400 to-blue-600 flex items-center justify-center mb-2">
                      <Fish className="w-8 h-8 text-white/90" />
                    </div>
                    <p className="text-sm font-semibold text-slate-900">{c.fish}</p>
                    <p className="text-xs text-slate-500">{c.weight} · {c.time}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-white text-[10px] flex items-center justify-center font-semibold">{c.init}</span>
                      <span className="text-xs text-slate-500">{c.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
  );
}

export default HomePage;
