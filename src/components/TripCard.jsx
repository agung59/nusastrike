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
import { calculateTripScore, formatDate, getElapsedTime } from '../utils/helpers';

function TripCard({ trip, onClick }) {
  const duration = trip.status === "completed" ? getElapsedTime(trip.startTime, trip.endTime) : "Aktif";
  const score = calculateTripScore(trip.catches);
  
  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-3xl shadow-md overflow-hidden active:scale-95 transition text-left"
    >
      <div className="flex items-center gap-4 p-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shrink-0">
          <Navigation className="w-8 h-8 text-white" />
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="font-bold text-slate-900 text-lg" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {trip.name}
          </p>
          <p className="text-xs text-slate-400 mb-2">{formatDate(trip.date)}</p>
          
          <div className="flex items-center gap-3 text-xs text-slate-600">
            <span className="flex items-center gap-1">
              <MapPinned className="w-3.5 h-3.5" /> {trip.location.split(",")[0]}
            </span>
            <span className="flex items-center gap-1">
              <Fish className="w-3.5 h-3.5" /> {trip.catches.length} ikan
            </span>
          </div>
        </div>

        <div className="text-right shrink-0">
          <p className="text-sm font-bold text-slate-900">{duration}</p>
          <p className="text-xs text-amber-500 font-semibold">Score {score}</p>
        </div>
      </div>
    </button>
  );
}


export default TripCard;
