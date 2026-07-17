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
import TimelineItem from './TimelineItem';
import { calculateTripScore, formatDate, formatTime, getElapsedTime } from '../utils/helpers';

function TripDetailView({ trip, onClose }) {
  const totalWeight = trip.catches.reduce((sum, c) => sum + (c.weight || 0), 0);
  const score = calculateTripScore(trip.catches);

  // AI INSIGHTS
  const bestTime = trip.timeline.filter(t => t.type === "catch").sort((a, b) => {
    const aHour = a.timestamp.getHours();
    const bHour = b.timestamp.getHours();
    return aHour - bHour;
  })[0];
  
  const lureStats = {};
  trip.catches.forEach(c => {
    lureStats[c.lure] = (lureStats[c.lure] || 0) + 1;
  });
  const bestLure = Object.entries(lureStats).sort((a, b) => b[1] - a[1])[0];

  const fishStats = {};
  trip.catches.forEach(c => {
    if (!fishStats[c.fishType]) fishStats[c.fishType] = { count: 0, totalWeight: 0 };
    fishStats[c.fishType].count++;
    fishStats[c.fishType].totalWeight += c.weight;
  });
  const bestFish = Object.entries(fishStats).sort((a, b) => b[1].count - a[1].count)[0];

  return (
    <div className="min-h-screen bg-slate-50 pb-6">
      <div className="sticky top-0 z-20 bg-white border-b border-slate-200 px-5 py-4 flex items-center justify-between">
        <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>
        <h2 className="font-bold text-slate-900 text-lg" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          {trip.name}
        </h2>
        <div className="w-8" />
      </div>

      {/* TRIP INFO */}
      <div className="px-5 pt-4 pb-3">
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl p-5 text-white">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <p className="text-xs opacity-70 mb-1">Tanggal</p>
              <p className="font-semibold">{formatDate(trip.date)}</p>
            </div>
            <div>
              <p className="text-xs opacity-70 mb-1">Lokasi</p>
              <p className="font-semibold text-sm">{trip.location}</p>
            </div>
            <div>
              <p className="text-xs opacity-70 mb-1">Durasi</p>
              <p className="font-semibold">{getElapsedTime(trip.startTime, trip.endTime)}</p>
            </div>
            <div>
              <p className="text-xs opacity-70 mb-1">Jarak</p>
              <p className="font-semibold">{trip.distance} km</p>
            </div>
          </div>
        </div>
      </div>

      {/* TRACKING MAP PLACEHOLDER */}
      <div className="px-5 pt-4 pb-3">
        <p className="text-xs text-slate-400 font-medium mb-3">TRACKING PERJALANAN</p>
        <div className="bg-white rounded-3xl shadow-md p-5 h-48 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-slate-400 text-sm">Visualisasi peta</p>
            <p className="text-slate-300 text-xs mt-1">{trip.trackingPath.length} waypoints tracked</p>
          </div>
        </div>
      </div>

      {/* TIMELINE */}
      <div className="px-5 pt-4 pb-3">
        <p className="text-xs text-slate-400 font-medium mb-3">TIMELINE AKTIVITAS</p>
        <div className="bg-white rounded-3xl shadow-md p-4 space-y-3">
          {trip.timeline.map((event, i) => (
            <TimelineItem key={event.id} event={event} />
          ))}
        </div>
      </div>

      {/* CATCHES */}
      <div className="px-5 pt-4 pb-3">
        <p className="text-xs text-slate-400 font-medium mb-3">TANGKAPAN ({trip.catches.length})</p>
        {trip.catches.length === 0 ? (
          <div className="text-center py-6 text-slate-400">Belum ada tangkapan</div>
        ) : (
          <div className="space-y-2">
            {trip.catches.map((c) => (
              <div key={c.id} className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-blue-600 flex items-center justify-center">
                  <Fish className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">{c.fishType}</p>
                  <p className="text-xs text-slate-400">{c.weight} kg • {formatTime(c.timestamp)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-600">{c.lure}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AI INSIGHTS */}
      <div className="px-5 pt-4 pb-3">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          <p className="text-xs text-slate-400 font-medium">AI INSIGHTS</p>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl shadow-md p-4 space-y-3">
          {bestTime && (
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Waktu Strike Terbaik</p>
                <p className="text-xs text-slate-600">Jam {bestTime.timestamp.getHours()}:00 - {bestTime.data.fishType}</p>
              </div>
            </div>
          )}
          {bestLure && (
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Lure Paling Efektif</p>
                <p className="text-xs text-slate-600">{bestLure[0]} ({bestLure[1]} catches)</p>
              </div>
            </div>
          )}
          {bestFish && (
            <div className="flex items-start gap-3">
              <TrendingUpIcon className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Spesies Terbaik</p>
                <p className="text-xs text-slate-600">{bestFish[0]} - {bestFish[1].count} ekor, total {bestFish[1].totalWeight.toFixed(1)}kg</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SUMMARY */}
      <div className="px-5 pt-4 pb-3">
        <p className="text-xs text-slate-400 font-medium mb-3">RINGKASAN</p>
        <div className="bg-white rounded-3xl shadow-md p-5 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-slate-600">Total Berat</span>
            <span className="font-bold text-slate-900">{totalWeight.toFixed(1)} kg</span>
          </div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-slate-600">Jenis Ikan</span>
            <span className="font-bold text-slate-900">{new Set(trip.catches.map(c => c.fishType)).size}</span>
          </div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-slate-600">Rata-rata Berat</span>
            <span className="font-bold text-slate-900">
              {trip.catches.length > 0 ? (totalWeight / trip.catches.length).toFixed(1) : 0} kg
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600 font-medium">Skor Trip</span>
            <span className="text-lg font-bold text-amber-500">{score}</span>
          </div>
        </div>
      </div>
    </div>
  );
}


export default TripDetailView;
