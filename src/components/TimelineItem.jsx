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
import { formatTime } from '../utils/helpers';

function TimelineItem({ event }) {
  const iconMap = {
    start: Activity,
    catch: Fish,
    location: MapPin,
    lure: Zap,
    note: Edit2,
    end: CheckCircle2
  };
  const colorMap = {
    start: "bg-blue-100 text-blue-600",
    catch: "bg-teal-100 text-teal-600",
    location: "bg-purple-100 text-purple-600",
    lure: "bg-orange-100 text-orange-600",
    note: "bg-indigo-100 text-indigo-600",
    end: "bg-green-100 text-green-600"
  };

  const Icon = iconMap[event.type] || Activity;

  return (
    <div className="flex gap-3">
      <div className={`w-10 h-10 rounded-full ${colorMap[event.type]} flex items-center justify-center shrink-0`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 pt-1">
        <p className="text-sm font-semibold text-slate-900">{event.label}</p>
        <p className="text-xs text-slate-400">{formatTime(event.timestamp)}</p>
      </div>
    </div>
  );
}


export default TimelineItem;
