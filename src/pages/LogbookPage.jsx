import React from 'react';
import { BookOpen } from '../constants/icons';
import TripCard from '../components/TripCard';

function LogbookPage({ trips, onSelectTrip }) {
  const totalWeight = trips.reduce((sum, t) => sum + t.catches.reduce((s, c) => s + (c.weight || 0), 0), 0).toFixed(1);
  const biggest = trips.length > 0 ? Math.max(...trips.flatMap(t => t.catches.map(c => c.weight))) : 0;

  return (
    <div className="pb-2">
      <div className="flex items-center justify-between mt-3 mb-4">
        <h2 className="font-bold text-slate-900 text-2xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Logbook
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-2xl shadow-sm p-3 text-center">
          <p className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{trips.length}</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Total Trip</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-3 text-center">
          <p className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{totalWeight} kg</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Total Tangkapan</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-3 text-center">
          <p className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{biggest.toFixed(1)}</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Terbesar</p>
        </div>
      </div>

      {trips.length === 0 ? (
        <div className="text-center py-16">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-400 text-sm">Belum ada trip tercatat.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} onClick={() => onSelectTrip(trip)} />
          ))}
        </div>
      )}
    </div>
  );
}

export default LogbookPage;
