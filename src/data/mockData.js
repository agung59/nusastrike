import {
  Fish, Waves, Moon, Bot, MapPin, BookOpen, Users, User, HomeIcon,
  Bell, ChevronRight, ChevronLeft, Wind, Droplet, Sun, Star, ArrowRight, X,
  Send, Gauge, Sunrise, Sunset, Eye, CloudRain, Thermometer, TrendingUp,
  TrendingDown, Compass, Sparkles, CloudSun, Cloud, Camera, Plus, Trash2,
  Loader2, CheckCircle2, Calendar, Ruler, Layers, Navigation, Minus,
  Heart, MessageCircle, Share2, Award, LogOut, Settings, HelpCircle, Info,
  Copy, Check, Clock, MapPinned, Activity, Zap, Edit2, MoreVertical,
  AlertCircle, Lightbulb, TrendingUpIcon
} from '../constants/icons';


/* ---------- MOCK DATA ---------- */

export const weatherHourly = [
  { t: "06", temp: 25, icon: "sun", rain: 0 },
  { t: "08", temp: 27, icon: "sun", rain: 0 },
  { t: "10", temp: 29, icon: "cloud-sun", rain: 10 },
  { t: "12", temp: 31, icon: "sun", rain: 0 },
  { t: "14", temp: 30, icon: "cloud", rain: 20 },
  { t: "16", temp: 28, icon: "cloud-rain", rain: 40 },
  { t: "18", temp: 27, icon: "cloud-sun", rain: 15 },
  { t: "20", temp: 26, icon: "sun", rain: 0 },
  { t: "22", temp: 25, icon: "sun", rain: 0 },
  { t: "00", temp: 24, icon: "sun", rain: 0 },
];

export const weekForecast = [
  { day: "Hari ini", icon: "sun", hi: 31, lo: 25, rain: 10 },
  { day: "Jumat", icon: "cloud-sun", hi: 30, lo: 24, rain: 20 },
  { day: "Sabtu", icon: "cloud-rain", hi: 28, lo: 24, rain: 60 },
  { day: "Minggu", icon: "cloud", hi: 29, lo: 24, rain: 30 },
  { day: "Senin", icon: "sun", hi: 31, lo: 25, rain: 5 },
  { day: "Selasa", icon: "sun", hi: 32, lo: 25, rain: 0 },
  { day: "Rabu", icon: "cloud-sun", hi: 30, lo: 24, rain: 15 },
];

export const seaWave = [
  { t: "00", h: 0.4 }, { t: "04", h: 0.5 }, { t: "08", h: 0.7 },
  { t: "12", h: 0.6 }, { t: "16", h: 0.5 }, { t: "20", h: 0.4 }, { t: "24", h: 0.3 },
];

export const tideData = [
  { t: "00", level: 0.8 }, { t: "03", level: 1.6 }, { t: "06", level: 0.9 },
  { t: "09", level: 0.3 }, { t: "12", level: 1.1 }, { t: "15", level: 1.8 },
  { t: "18", level: 1.0 }, { t: "21", level: 0.4 }, { t: "24", level: 0.7 },
];
export const tideEvents = [
  { type: "Pasang", time: "03:20", level: "1.6 m" },
  { type: "Surut", time: "09:10", level: "0.3 m" },
  { type: "Pasang", time: "15:40", level: "1.8 m" },
  { type: "Surut", time: "21:05", level: "0.4 m" },
];

export const solunarActivity = [
  { t: "00", a: 20 }, { t: "02", a: 35 }, { t: "04", a: 70 }, { t: "06", a: 90 },
  { t: "08", a: 40 }, { t: "10", a: 25 }, { t: "12", a: 20 }, { t: "14", a: 30 },
  { t: "16", a: 55 }, { t: "18", a: 95 }, { t: "20", a: 60 }, { t: "22", a: 30 },
];

export const majorMinor = [
  { type: "Major", time: "06:00 – 08:00", strength: "Kuat" },
  { type: "Minor", time: "12:00 – 13:00", strength: "Sedang" },
  { type: "Major", time: "18:00 – 20:00", strength: "Sangat Kuat" },
  { type: "Minor", time: "00:00 – 01:00", strength: "Sedang" },
];

export const community = [
  { name: "Bayu S.", fish: "Kakap Merah", weight: "3.2 kg", time: "2 jam lalu", init: "BS" },
  { name: "Rina W.", fish: "Tenggiri", weight: "1.8 kg", time: "4 jam lalu", init: "RW" },
  { name: "Doni P.", fish: "Kerapu", weight: "2.5 kg", time: "6 jam lalu", init: "DP" },
  { name: "Sarah M.", fish: "Baronang", weight: "0.9 kg", time: "8 jam lalu", init: "SM" },
];

export const notifications = [
  { id: 1, type: "solunar", title: "Major period dimulai jam 18:00", desc: "Kondisi solunar sangat kuat malam ini, saatnya berangkat.", time: "10 menit lalu", read: false },
  { id: 2, type: "community", title: "Doni P. mengomentari trip-mu", desc: "\"Mantap bro, umpannya pakai apa?\"", time: "1 jam lalu", read: false },
  { id: 3, type: "weather", title: "Peringatan gelombang naik", desc: "Gelombang diprediksi naik ke 1.2m sore ini di Kep. Seribu.", time: "3 jam lalu", read: true },
  { id: 4, type: "community", title: "Bayu S. menyukai tangkapanmu", desc: "Kakap Merah 3.2 kg mendapat 24 suka.", time: "5 jam lalu", read: true },
  { id: 5, type: "solunar", title: "Fishing Readiness hari ini: 86/100", desc: "Kondisi excellent, waktu terbaik 06:00–08:00 & 18:00–20:00.", time: "Kemarin", read: true },
];

export const notifIcon = { solunar: Moon, community: Users, weather: CloudSun };
export const notifColor = { solunar: "text-indigo-500 bg-indigo-50", community: "text-teal-600 bg-teal-50", weather: "text-amber-500 bg-amber-50" };

export const profileStats = { trips: 24, totalWeight: "58.4 kg", biggest: "5.1 kg", following: 132 };

export const achievements = [
  { key: "first10", label: "10 Trip Pertama", icon: Award, earned: true },
  { key: "kakap", label: "Kakap Hunter", icon: Fish, earned: true },
  { key: "early", label: "Early Bird", icon: Sunrise, earned: true },
  { key: "community", label: "Community Star", icon: Star, earned: false },
];

export const settingsItems = [
  { key: "account", label: "Akun Saya", icon: User },
  { key: "units", label: "Satuan (Metric)", icon: Ruler },
  { key: "notif", label: "Preferensi Notifikasi", icon: Bell },
  { key: "help", label: "Bantuan & Dukungan", icon: HelpCircle },
  { key: "about", label: "Tentang NusaStrike", icon: Info },
];

export const navItems = [
  { key: "home", label: "Beranda", icon: HomeIcon },
  { key: "map", label: "Peta", icon: MapPin },
  { key: "logbook", label: "Logbook", icon: BookOpen },
  { key: "community", label: "Feed", icon: Users },
  { key: "profile", label: "Profil", icon: User },
];

// HOTSPOTS FOR MAP
export const hotspots = [
  { id: 1, name: "Pulau Pramuka", x: 28, y: 38, depth: "8–12 m", activity: 92, fish: ["Kakap Merah", "Kerapu"], catches: 24 },
  { id: 2, name: "Pulau Semak Daun", x: 55, y: 22, depth: "10–15 m", activity: 78, fish: ["Kerapu", "Baronang"], catches: 15 },
  { id: 3, name: "Perairan Karawang", x: 76, y: 62, depth: "15–25 m", activity: 65, fish: ["Tenggiri"], catches: 9 },
  { id: 4, name: "Pulau Ayer", x: 18, y: 68, depth: "5–8 m", activity: 45, fish: ["Baronang"], catches: 6 },
];

export const communityPins = [
  { x: 32, y: 44, name: "Bayu S." },
  { x: 58, y: 28, name: "Rina W." },
  { x: 72, y: 58, name: "Doni P." },
];

// COMMUNITY DATA
export const leaderboard = [
  { name: "Bayu S.", init: "BS", weight: 12.4 },
  { name: "Doni P.", init: "DP", weight: 9.8 },
  { name: "Rina W.", init: "RW", weight: 7.2 },
];

export const initialFeed = [
  { id: 1, name: "Bayu S.", init: "BS", fish: "Kakap Merah", weight: "3.2 kg", location: "Pulau Pramuka", time: "2 jam lalu", likes: 24, liked: false, comments: [
    { name: "Doni P.", text: "Mantap, umpannya pakai apa bro?" },
    { name: "Rina W.", text: "Spot favorit nih 🔥" },
  ] },
  { id: 2, name: "Rina W.", init: "RW", fish: "Tenggiri", weight: "1.8 kg", location: "Perairan Karawang", time: "4 jam lalu", likes: 15, liked: false, comments: [
    { name: "Sarah M.", text: "Sore emang paling strike di sini" },
  ] },
  { id: 3, name: "Doni P.", init: "DP", fish: "Kerapu", weight: "2.5 kg", location: "Pulau Semak Daun", time: "6 jam lalu", likes: 31, liked: true, comments: [] },
  { id: 4, name: "Sarah M.", init: "SM", fish: "Baronang", weight: "0.9 kg", location: "Pulau Ayer", time: "8 jam lalu", likes: 8, liked: false, comments: [] },
];

export const filterTabs = [
  { key: "terbaru", label: "Terbaru" },
  { key: "trending", label: "Trending" },
  { key: "sekitar", label: "Sekitar Saya" },
];

// Initial trips data
export const initialTrips = [
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
];
