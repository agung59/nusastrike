import React, { useState } from 'react';
import {
  Fish, Waves, Moon, Bot, MapPin, BookOpen, Users, User, HomeIcon,
  Bell, ChevronRight, ChevronLeft, Wind, Droplet, Sun, Star, ArrowRight, X,
  Send, Gauge, Sunrise, Sunset, Eye, CloudRain, Thermometer, TrendingUp,
  TrendingDown, Compass, Sparkles, CloudSun, Cloud, Camera, Plus, Trash2,
  Loader2, CheckCircle2, Calendar, Ruler, Layers, Navigation, Minus,
  Heart, MessageCircle, Share2, Award, LogOut, Settings, HelpCircle, Info,
  Copy, Check, Clock, MapPinned, Activity, Zap, Edit2, MoreVertical,
  AlertCircle, Lightbulb, TrendingUpIcon
} from './constants/icons';

import PremiumCard from './components/PremiumCard';
import TripDetailView from './components/TripDetailView';
import AddCatchModal from './components/AddCatchModal';
import AddTimelineEventModal from './components/AddTimelineEventModal';
import TripSummarySheet from './components/TripSummarySheet';
import NotificationSheet from './components/NotificationSheet';

import HomePage from './pages/HomePage';
import WeatherPage from './pages/WeatherPage';
import SeaPage from './pages/SeaPage';
import SolunarPage from './pages/SolunarPage';
import LogbookPage from './pages/LogbookPage';
import MapPage from './pages/MapPage';
import FeedPage from './pages/FeedPage';
import ProfilePage from './pages/ProfilePage';

import { navItems, notifications, initialTrips } from './data/mockData';
import { formatTime, getElapsedTime, calculateDistance, aiReply, calculateFishingReadiness, getReadinessLevel } from './utils/helpers';

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap');
`;

// Toast notification component
const Toast = ({ message, type = 'info', onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = {
    error: 'bg-red-500',
    success: 'bg-green-500',
    info: 'bg-blue-500',
    warning: 'bg-amber-500'
  }[type] || 'bg-blue-500';

  return (
    <div className={`fixed bottom-32 left-1/2 transform -translate-x-1/2 ${bgColor} text-white px-4 py-3 rounded-lg shadow-lg text-sm z-50 animate-fade-in`}>
      {message}
    </div>
  );
};

function NusaStrike() {
  const [activeTab, setActiveTab] = useState("home");
  const [detail, setDetail] = useState(null);
  const [sheet, setSheet] = useState(null);
  const [chat, setChat] = useState([
    { role: "ai", text: "Halo Kapten! Aku sudah analisa cuaca, laut, dan solunar hari ini. Ada yang ingin ditanyakan?" },
  ]);
  const [input, setInput] = useState("");
  const [toast, setToast] = useState(null);
  
  /* ===== TRIP STATE MANAGEMENT ===== */
  const [activeTrip, setActiveTrip] = useState(null);
  const [tripsHistory, setTripsHistory] = useState(initialTrips);
  const [showAddCatch, setShowAddCatch] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showTripSummary, setShowTripSummary] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

  // Toast helper
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  /* ===== TRIP FUNCTIONS ===== */
  const startTrip = () => {
    if (activeTrip) {
      showToast('Trip sudah aktif! Selesaikan terlebih dahulu.', 'warning');
      return;
    }

    const now = new Date();
    const newTrip = {
      id: `trip_${Date.now()}`,
      name: "Trip Baru",
      date: now,
      location: "Kepulauan Seribu, Jakarta",
      startTime: now,
      endTime: null,
      catches: [],
      timeline: [
        { id: `tl_${Date.now()}`, type: "start", label: "Trip Dimulai", timestamp: now, data: {} }
      ],
      trackingPath: [{ lat: -6.12, lng: 106.85, time: formatTime(now) }],
      distance: 0,
      status: "active",
    };
    setActiveTrip(newTrip);
    showToast('Trip dimulai! Semoga dapat ikan banyak.', 'success');
  };

  const addCatchToTrip = (catchData) => {
    if (!activeTrip) {
      showToast('Mulai trip terlebih dahulu!', 'warning');
      return;
    }
    
    // Validate catch data
    if (!catchData.fishType || !catchData.weight) {
      showToast('Data ikan tidak lengkap!', 'error');
      return;
    }

    if (catchData.weight <= 0) {
      showToast('Berat ikan harus lebih dari 0 kg!', 'error');
      return;
    }
    
    const timestamp = new Date();
    const newCatch = {
      id: `catch_${Date.now()}`,
      ...catchData,
      timestamp,
      location: { lat: -6.12 + (Math.random() * 0.05), lng: 106.85 + (Math.random() * 0.05) },
      photo: null
    };

    const updatedTrip = {
      ...activeTrip,
      catches: [...activeTrip.catches, newCatch],
      timeline: [
        ...activeTrip.timeline,
        {
          id: `tl_${Date.now()}`,
          type: "catch",
          label: `Mendapat ${catchData.fishType} (${catchData.weight} kg)`,
          timestamp,
          data: { fishType: catchData.fishType, weight: catchData.weight }
        }
      ]
    };

    setActiveTrip(updatedTrip);
    setShowAddCatch(false);
    showToast(`Berhasil mencatat ${catchData.fishType}!`, 'success');
  };

  const addTimelineEvent = (eventData) => {
    if (!activeTrip) {
      showToast('Mulai trip terlebih dahulu!', 'warning');
      return;
    }

    if (!eventData.label) {
      showToast('Deskripsi event tidak boleh kosong!', 'error');
      return;
    }

    const timestamp = new Date();
    const newEvent = {
      id: `tl_${Date.now()}`,
      type: eventData.type,
      label: eventData.label,
      timestamp,
      data: eventData.data
    };

    const updatedTrip = {
      ...activeTrip,
      timeline: [...activeTrip.timeline, newEvent]
    };

    setActiveTrip(updatedTrip);
    setShowAddEvent(false);
    showToast('Event berhasil ditambahkan!', 'success');
  };

  const finishTrip = () => {
    if (!activeTrip) {
      showToast('Tidak ada trip yang aktif!', 'warning');
      return;
    }

    const endTime = new Date();
    const trackingPoints = activeTrip.trackingPath.map(p => ({
      lat: typeof p.lat === 'number' ? p.lat : parseFloat(p.lat || 0),
      lng: typeof p.lng === 'number' ? p.lng : parseFloat(p.lng || 0)
    }));
    const distance = calculateDistance(trackingPoints) || 0;

    const completedTrip = {
      ...activeTrip,
      endTime,
      status: "completed",
      distance,
      timeline: [
        ...activeTrip.timeline,
        {
          id: `tl_${Date.now()}`,
          type: "end",
          label: "Trip Selesai",
          timestamp: endTime,
          data: {}
        }
      ]
    };

    setTripsHistory([completedTrip, ...tripsHistory]);
    setSelectedTrip(completedTrip);
    setShowTripSummary(true);
    setActiveTrip(null);
    showToast(`Trip selesai! Tangkapan: ${completedTrip.catches.length} ikan.`, 'success');
  };

  const sendMsg = () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    const reply = { role: "ai", text: aiReply(input) };
    setChat((c) => [...c, userMsg, reply]);
    setInput("");
  };

  // Calculate fishing readiness
  const fishingReadiness = calculateFishingReadiness({
    weather: 70,
    sea: 75,
    solunar: 85
  });
  const readinessLevel = getReadinessLevel(fishingReadiness);

  return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily: "Inter, sans-serif" }}>
      <style>{FONT_IMPORT}</style>

      {activeTab === "home" && !detail && (
        <div className="sticky top-0 z-20 bg-slate-50/80 backdrop-blur-md px-5 pt-5 pb-2 flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs">Selamat pagi,</p>
            <p className="text-slate-900 font-semibold text-lg" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Kapten Arya
            </p>
          </div>
          <button onClick={() => setSheet("notif")} className="relative w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center active:scale-95 transition">
            <Bell className="w-5 h-5 text-slate-600" />
            {notifications.some((n) => !n.read) && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 border border-white" />
            )}
          </button>
        </div>
      )}

      <div className={`max-w-md mx-auto ${detail ? "" : "px-5"} pb-28`}>
        {/* HOME TAB */}
        {activeTab === "home" && !detail && (
          <HomePage
            activeTrip={activeTrip}
            startTrip={startTrip}
            finishTrip={finishTrip}
            setShowAddCatch={setShowAddCatch}
            setShowAddEvent={setShowAddEvent}
            setDetail={setDetail}
            setSheet={setSheet}
            fishingReadiness={fishingReadiness}
            readinessLevel={readinessLevel}
          />
        )}

        {activeTab === "home" && detail === "weather" && <WeatherPage onBack={() => setDetail(null)} />}
        {activeTab === "home" && detail === "sea" && <SeaPage onBack={() => setDetail(null)} />}
        {activeTab === "home" && detail === "solunar" && <SolunarPage onBack={() => setDetail(null)} />}

        {/* LOGBOOK TAB */}
        {activeTab === "logbook" && (
          <LogbookPage 
            trips={tripsHistory} 
            activeTrip={activeTrip} 
            startTrip={startTrip} 
            onSelectTrip={(trip) => {
              setSelectedTrip(trip);
              setDetail("tripDetail");
            }} 
          />
        )}

        {/* MAP TAB */}
        {activeTab === "map" && <MapPage />}

        {/* COMMUNITY TAB */}
        {activeTab === "community" && <FeedPage />}

        {/* PROFILE TAB */}
        {activeTab === "profile" && <ProfilePage />}

        {/* TRIP DETAIL VIEW */}
        {activeTab === "logbook" && detail === "tripDetail" && selectedTrip && (
          <TripDetailView trip={selectedTrip} onClose={() => {
            setDetail(null);
            setSelectedTrip(null);
          }} />
        )}
      </div>

      {/* BOTTOM NAVIGATION */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 shadow-2xl max-w-md mx-auto">
        <div className="grid grid-cols-5 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.key;
            return (
              <button key={item.key} onClick={() => { setActiveTab(item.key); setDetail(null); }} className="flex flex-col items-center gap-1 py-1">
                <Icon className={`w-5 h-5 ${active ? "text-teal-600" : "text-slate-400"}`} />
                <span className={`text-[10px] ${active ? "text-teal-600 font-semibold" : "text-slate-400"}`}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SHEETS & MODALS */}
      {sheet === "ai" && (
        <div className="fixed inset-0 z-30 flex items-end justify-center">
          <div className="absolute inset-0 bg-slate-900/40" onClick={() => setSheet(null)} />
          <div className="relative bg-white w-full max-w-md rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-white flex items-center justify-between px-5 pt-5 pb-3 border-b border-slate-100">
              <h3 className="font-bold text-lg text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>AI Captain</h3>
              <button onClick={() => setSheet(null)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                <X className="w-4 h-4 text-slate-600" />
              </button>
            </div>
            <div className="px-5 py-4">
              <div className="space-y-4">
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {chat.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                          msg.role === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-900"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMsg()}
                    placeholder="Tanya sesuatu..."
                    className="flex-1 bg-slate-100 border border-slate-200 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={sendMsg}
                    className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white active:scale-90 transition"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {sheet === "notif" && <NotificationSheet onClose={() => setSheet(null)} />}

      {showAddCatch && <AddCatchModal onClose={() => setShowAddCatch(false)} onAdd={addCatchToTrip} />}
      {showAddEvent && <AddTimelineEventModal onClose={() => setShowAddEvent(false)} onAdd={addTimelineEvent} />}
      {showTripSummary && selectedTrip && (
        <TripSummarySheet 
          trip={selectedTrip} 
          onClose={() => {
            setShowTripSummary(false);
            setSelectedTrip(null);
          }} 
        />
      )}

      {/* TOAST NOTIFICATIONS */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default NusaStrike;
