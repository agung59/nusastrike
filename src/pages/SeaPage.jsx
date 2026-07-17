import React from 'react';
import {
  ChevronLeft, Wind, Compass, Clock, CheckCircle2, AlertCircle, Info, Bot
} from '../constants/icons';
import {
  ResponsiveContainer, AreaChart, Area,
  XAxis, YAxis
} from 'recharts';
import { seaWave } from '../data/mockData';

function SeaPage({ onBack }) {
  const currentHeight = seaWave[0]?.h ?? 0.6;
  const isSafe = currentHeight < 1.0;

  return (
    <div className="pb-2">
      <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b px-5 py-4 flex items-center gap-3 z-10">
        <button onClick={onBack} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>
        <h2 className="font-bold text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Kondisi Laut</h2>
      </div>

      <div className="px-5 pt-6 space-y-5">
        {/* HERO */}
        <div className="relative rounded-[28px] overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-teal-700 to-teal-400" />
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/70 text-[11px] tracking-widest uppercase font-medium">Tinggi Gelombang</span>
              <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${isSafe ? "bg-emerald-400/20 text-emerald-300" : "bg-rose-400/20 text-rose-300"}`}>
                {isSafe ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                {isSafe ? "Aman untuk Mancing" : "Waspada"}
              </span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-white font-extrabold text-7xl leading-none tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {currentHeight}
              </span>
              <span className="text-white/60 text-lg mb-2">meter</span>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-5">
              <div className="bg-white/10 rounded-2xl p-3 text-center">
                <Wind className="w-4 h-4 text-white/70 mx-auto mb-1" />
                <p className="text-white font-semibold text-sm">12 kt</p>
                <p className="text-white/50 text-[10px]">Angin</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-3 text-center flex flex-col items-center">
                <Compass className="w-4 h-4 text-white/70 mb-1 rotate-45" />
                <p className="text-white font-semibold text-sm">Timur</p>
                <p className="text-white/50 text-[10px]">Arah Angin</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-3 text-center">
                <Clock className="w-4 h-4 text-white/70 mx-auto mb-1" />
                <p className="text-white font-semibold text-sm">6 dtk</p>
                <p className="text-white/50 text-[10px]">Periode Swell</p>
              </div>
            </div>
          </div>
        </div>

        {/* CHART */}
        <div>
          <h3 className="font-bold text-slate-900 mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Tren 24 Jam</h3>
          <div className="bg-white rounded-3xl shadow-md p-5">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={seaWave}>
                <defs>
                  <linearGradient id="seaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#14b8a6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="t" stroke="#cbd5e1" />
                <YAxis stroke="#cbd5e1" />
                <Area type="monotone" dataKey="h" stroke="#14b8a6" strokeWidth={2.5} fill="url(#seaGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SAFETY NOTE */}
        <div className="bg-white rounded-3xl shadow-md p-5">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
              <Info className="w-4 h-4 text-teal-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Rekomendasi</p>
              <p className="text-xs text-slate-500 mt-1">
                Kondisi laut {isSafe ? "tenang dan aman" : "cukup tinggi"} untuk kapal kecil-menengah. Tetap pantau perubahan cuaca sore hari.
              </p>
            </div>
          </div>
        </div>

        {/* AI TIP */}
        <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-3xl p-5 flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
            <Bot className="w-4.5 h-4.5 text-teal-700" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Tips AI Captain</p>
            <p className="text-xs text-slate-500 mt-1">Swell rendah dan stabil — waktu bagus buat eksplor spot yang lebih jauh dari biasanya.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeaPage;
