import React from 'react';
import { ChevronRight } from 'lucide-react';
export default
function PremiumCard({ icon, label, value, sub, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-2xl shadow-md p-4 text-left active:scale-95 transition"
    >
      <div className="flex items-start justify-between mb-3">
        {icon}
        <ChevronRight className="w-4 h-4 text-slate-300" />
      </div>
      <p className="text-xs text-slate-400 font-medium">{label}</p>
      <p className="text-xl font-bold text-slate-900 mt-1">{value}</p>
      <p className="text-xs text-slate-500 mt-1">{sub}</p>
    </button>
  );
}

