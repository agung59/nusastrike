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
import { calculateTripScore, getElapsedTime } from '../utils/helpers';

function TripSummarySheet({ trip, onClose }) {
  const totalWeight = trip.catches.reduce((sum, c) => sum + (c.weight || 0), 0);
  const speciesCount = new Set(trip.catches.map(c => c.fishType)).size;
  const duration = getElapsedTime(trip.startTime, trip.endTime);
  const score = calculateTripScore(trip.catches);

  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center">
      <div className="absolute inset-0 bg-slate-900/40" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md rounded-t-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white flex items-center justify-between px-5 pt-5 pb-3 border-b border-slate-100">
          <h3 className="font-bold text-lg text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Ringkasan Trip
          </h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
            <X className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        <div className="px-5 py-6 space-y-4">
          <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl p-6 text-white text-center">
            <p className="text-sm opacity-80 mb-2">SKOR TRIP</p>
            <p className="text-4xl font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {score}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-2xl p-4 text-center">
              <p className="text-xs text-slate-400 mb-2">Durasi</p>
              <p className="text-lg font-bold text-slate-900">{duration}</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4 text-center">
              <p className="text-xs text-slate-400 mb-2">Jarak</p>
              <p className="text-lg font-bold text-slate-900">{trip.distance} km</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4 text-center">
              <p className="text-xs text-slate-400 mb-2">Total Ikan</p>
              <p className="text-lg font-bold text-slate-900">{trip.catches.length}</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4 text-center">
              <p className="text-xs text-slate-400 mb-2">Jenis Ikan</p>
              <p className="text-lg font-bold text-slate-900">{speciesCount}</p>
            </div>
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-2xl p-4">
            <p className="text-sm text-slate-400 mb-2">Total Berat</p>
            <p className="text-2xl font-bold text-slate-900">{totalWeight.toFixed(1)} kg</p>
          </div>

          {trip.catches.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-slate-900 mb-3">Daftar Tangkapan</p>
              <div className="space-y-2">
                {trip.catches.map((c, i) => (
                  <div key={i} className="bg-slate-50 rounded-xl p-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{c.fishType}</p>
                      <p className="text-xs text-slate-400">{c.weight} kg • {c.lure}</p>
                    </div>
                    <Fish className="w-4 h-4 text-teal-500" />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <button
              onClick={onClose}
              className="flex-1 bg-blue-600 text-white rounded-xl py-3 font-semibold active:scale-95 transition"
            >
              Kembali ke Logbook
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-slate-100 text-slate-900 rounded-xl py-3 font-semibold active:scale-95 transition flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" /> Bagikan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default TripSummarySheet;
