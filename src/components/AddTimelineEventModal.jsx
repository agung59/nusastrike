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


function AddTimelineEventModal({ onClose, onAdd }) {
  const [eventType, setEventType] = useState("note");
  const [data, setData] = useState("");

  const handleAdd = () => {
    const labelMap = {
      location: `Berpindah ke ${data}`,
      lure: `Mengganti lure ke ${data}`,
      note: data
    };

    onAdd({
      type: eventType,
      label: labelMap[eventType] || data,
      data: { [eventType]: data }
    });
  };

  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center">
      <div className="absolute inset-0 bg-slate-900/40" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md rounded-t-3xl shadow-2xl max-h-[70vh] overflow-y-auto">
        <div className="sticky top-0 bg-white flex items-center justify-between px-5 pt-5 pb-3 border-b border-slate-100">
          <h3 className="font-bold text-lg text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Tambah Event
          </h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
            <X className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        <div className="px-5 py-6 space-y-4">
          <div>
            <label className="text-sm font-semibold text-slate-900 mb-2 block">Jenis Kegiatan</label>
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="note">Catatan</option>
              <option value="location">Berpindah Spot</option>
              <option value="lure">Ganti Lure</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-900 mb-2 block">
              {eventType === "note" ? "Catatan" : eventType === "location" ? "Nama Spot" : "Lure Baru"}
            </label>
            <input
              type="text"
              value={data}
              onChange={(e) => setData(e.target.value)}
              placeholder={eventType === "note" ? "Masukkan catatan..." : eventType === "location" ? "Misal: Pulau Semak Daun" : "Misal: Metal Jig"}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleAdd}
            className="w-full bg-blue-600 text-white rounded-xl py-3 font-semibold active:scale-95 transition"
          >
            Tambah Event
          </button>
        </div>
      </div>
    </div>
  );
}


export default AddTimelineEventModal;
