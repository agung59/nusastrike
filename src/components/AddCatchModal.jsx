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


function AddCatchModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    fishType: "Kakap Merah",
    weight: "",
    length: "",
    lure: "Soft Plastic",
    notes: "",
  });
  const fileInput = useRef(null);

  const handleAdd = () => {
    if (!form.weight || !form.length) {
      alert("Silakan isi berat dan panjang ikan");
      return;
    }

    onAdd({
      fishType: form.fishType,
      weight: parseFloat(form.weight),
      length: parseFloat(form.length),
      lure: form.lure,
      notes: form.notes,
    });
  };

  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center">
      <div className="absolute inset-0 bg-slate-900/40" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md rounded-t-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white flex items-center justify-between px-5 pt-5 pb-3 border-b border-slate-100">
          <h3 className="font-bold text-lg text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Tambah Tangkapan
          </h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
            <X className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        <div className="px-5 py-6 space-y-4">
          {/* Photo Upload */}
          <div>
            <label className="text-xs text-slate-400 font-medium">Foto Tangkapan</label>
            <button
              onClick={() => fileInput.current?.click()}
              className="w-full h-28 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-1 text-slate-400 mt-1 hover:border-blue-400 hover:text-blue-400 transition"
            >
              <Camera className="w-6 h-6" />
              <span className="text-xs">Tambah Foto Tangkapan</span>
            </button>
            <input ref={fileInput} type="file" accept="image/*" className="hidden" />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-900 mb-2 block">Jenis Ikan</label>
            <input
              type="text"
              value={form.fishType}
              onChange={(e) => setForm({ ...form, fishType: e.target.value })}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Contoh: Kakap Merah"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-semibold text-slate-900 mb-2 block">Berat (kg)</label>
              <input
                type="number"
                step="0.1"
                value={form.weight}
                onChange={(e) => setForm({ ...form, weight: e.target.value })}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="3.2"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-900 mb-2 block">Panjang (cm)</label>
              <input
                type="number"
                step="0.1"
                value={form.length}
                onChange={(e) => setForm({ ...form, length: e.target.value })}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="45"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-900 mb-2 block">Lure/Umpan</label>
            <select
              value={form.lure}
              onChange={(e) => setForm({ ...form, lure: e.target.value })}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Soft Plastic</option>
              <option>Metal Jig</option>
              <option>Live Bait</option>
              <option>Popper</option>
              <option>Crankbait</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-900 mb-2 block">Catatan (Opsional)</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows="3"
              placeholder="Kondisi, lokasi, strike..."
            />
          </div>

          <button
            onClick={handleAdd}
            className="w-full bg-blue-600 text-white rounded-xl py-3 font-semibold active:scale-95 transition"
          >
            Tambah Tangkapan
          </button>
        </div>
      </div>
    </div>
  );
}


export default AddCatchModal;
