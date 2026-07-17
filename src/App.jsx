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

import { navItems, notifications, community } from './data/mockData';
import { formatTime, getElapsedTime, calculateDistance, aiReply } from './utils/helpers';

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap');
`;

function NusaStrike() {
  const [activeTab, setActiveTab] = useState("home");
  const [detail, setDetail] = useState(null);
  const [sheet, setSheet] = useState(null);
  const [chat, setChat] = useState([
    { role: "ai", text: "Halo Kapten! Aku sudah analisa cuaca, laut, dan solunar hari ini. Ada yang ingin ditanyakan?" },
  ]);
  const [input, setInput] = useState("");
  
  /* ===== TRIP STATE MANAGEMENT ===== */
  const [activeTrip, setActiveTrip] = useState(null);
  const [tripsHistory, setTripsHistory] = useState([
    {
      id: "trip_001",
      name: "Trip Kepulauan Seribu",
      date: new Date("2024-01-15"),
      location: "Kepulauan Seribu, Jakarta",
      startTime: new Date("2024-01-15T06:00:00"),
      endTime: new Date("2024-01-15T14:30:00"),
      catches: [
        { id: "c1", fishType: "Kakap Merah", weight: 3.2, length: 45, lure: "Soft Plastic", notes: "Dapat di area batu", timestamp: new Date("2024-01-15T07:15:00"), location: { lat: -6.12, lng: 106.85 }, photo: null },
        { id: "c2", fishType: "Tenggiri", weight: 2.8, length: 40, lure: "Metal Jig", notes: "", timestamp: new Date("2024-01-15T09:45:00"), location: { lat: -6.14, lng: 106.87 }, photo: null },
        { id: "c3", fishType: "Kerapu", weight: 2.1, length: 35, lure: "Live Bait", notes: "Strike kuat", timestamp: new Date("2024-01-15T12:20:00"), location: { lat: -6.10, lng: 106.83 }, photo: null },
      ],
      timeline: [
        { id: "tl1", type: "start", label: "Trip Dimulai", timestamp: new Date("2024-01-15T06:00:00"), data: {} },
        { id: "tl2", type: "catch", label: "Mendapat Kakap Merah (3.2 kg)", timestamp: new Date("2024-01-15T07:15:00"), data: { fishType: "Kakap Merah", weight: 3.2 } },
        { id: "tl3", type: "location", label: "Berpindah ke Pulau Semak Daun", timestamp: new Date("2024-01-15T08:30:00"), data: { location: "Pulau Semak Daun" } },
        { id: "tl4", type: "lure", label: "Mengganti lure ke Metal Jig", timestamp: new Date("2024-01-15T09:00:00"), data: { lure: "Metal Jig" } },
        { id: "tl5", type: "catch", label: "Mendapat Tenggiri (2.8 kg)", timestamp: new Date("2024-01-15T09:45:00"), data: { fishType: "Tenggiri", weight: 2.8 } },
        { id: "tl6", type: "note", label: "Semakin ramai nelayan lain mampir", timestamp: new Date("2024-01-15T11:00:00"), data: { note: "Semakin ramai nelayan lain mampir" } },
        { id: "tl7", type: "catch", label: "Mendapat Kerapu (2.1 kg)", timestamp: new Date("2024-01-15T12:20:00"), data: { fishType: "Kerapu", weight: 2.1 } },
        { id: "tl8", type: "end", label: "Trip Selesai", timestamp: new Date("2024-01-15T14:30:00"), data: {} },
      ],
      trackingPath: [
        { lat: -6.12, lng: 106.85, time: "06:00" },
        { lat: -6.13, lng: 106.86, time: "07:30" },
        { lat: -6.14, lng: 106.87, time: "09:00" },
        { lat: -6.13, lng: 106.88, time: "11:00" },
        { lat: -6.12, lng: 106.85, time: "14:30" },
      ],
      distance: 8.5,
      status: "completed",
    }
  ]);
  const [showAddCatch, setShowAddCatch] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showTripSummary, setShowTripSummary] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

  /* ===== TRIP FUNCTIONS ===== */
  const startTrip = () => {
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
  };

  const addCatchToTrip = (catchData) => {
    if (!activeTrip) return;
    
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
  };

  const addTimelineEvent = (eventData) => {
    if (!activeTrip) return;

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
  };

  const finishTrip = () => {
    if (!activeTrip) return;

    const endTime = new Date();
    const distance = calculateDistance(activeTrip.trackingPath.map(p => ({ lat: parseFloat(p.lat), lng: parseFloat(p.lng) })));

    const completedTrip = {
      ...activeTrip,
      endTime,
      status: "completed",
      distance: distance || 12.5,
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
  };

  const sendMsg = () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    const reply = { role: "ai", text: aiReply(input) };
    setChat((c) => [...c, userMsg, reply]);
    setInput("");
  };

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
          />
        )}


        {activeTab === "home" && detail === "weather" && <WeatherPage onBack={() => setDetail(null)} />}
        {activeTab === "home" && detail === "sea" && <SeaPage onBack={() => setDetail(null)} />}
        {activeTab === "home" && detail === "solunar" && <SolunarPage onBack={() => setDetail(null)} />}

        {/* LOGBOOK TAB */}
        {activeTab === "logbook" && <LogbookPage trips={tripsHistory} activeTrip={activeTrip} startTrip={startTrip} onSelectTrip={(trip) => {
          setSelectedTrip(trip);
          setDetail("tripDetail");
        }} />}

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
    </div>
  );
}

/* ===== COMPONENTS ===== */


export default NusaStrike;
