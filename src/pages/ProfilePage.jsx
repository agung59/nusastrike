import React, { useState } from 'react';
import {
  Fish, Waves, Moon, Bot, MapPin, BookOpen, Users, User, Home as HomeIcon,
  Bell, ChevronRight, ChevronLeft, Wind, Droplet, Sun, Star, ArrowRight, X,
  Send, Gauge, Sunrise, Sunset, Eye, CloudRain, Thermometer, TrendingUp,
  TrendingDown, Compass, Sparkles, CloudSun, Cloud, Camera, Plus, Trash2,
  Loader2, CheckCircle2, Calendar, Ruler, Layers, Navigation, Minus,
  Heart, MessageCircle, Share2, Award, LogOut, Settings, HelpCircle, Info,
  Copy, Check, Clock, MapPinned, Activity, Zap, Edit2, MoreVertical,
  AlertCircle, Lightbulb, TrendingUp as TrendingUpIcon, Mail, Phone, ChevronDown
} from 'lucide-react';
import { achievements, profileStats, settingsItems } from '../data/mockData';

/* ---------- Reusable toggle switch ---------- */
function Switch({ on, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`w-11 h-6 rounded-full transition relative shrink-0 ${on ? "bg-teal-500" : "bg-slate-200"}`}
    >
      <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition ${on ? "left-5" : "left-0.5"}`} />
    </button>
  );
}

/* ---------- Sub-page shell ---------- */
function SubPage({ title, onBack, children }) {
  return (
    <div className="pb-2 -mx-5">
      <div className="sticky top-0 bg-white border-b px-5 py-4 flex items-center gap-3 z-10">
        <button onClick={onBack} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>
        <h2 className="font-bold text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{title}</h2>
      </div>
      <div className="px-5 pt-5 space-y-4">{children}</div>
    </div>
  );
}

/* ---------- Akun Saya ---------- */
function AkunSayaPage({ onBack, profile, setProfile }) {
  const [form, setForm] = useState(profile);
  const [saved, setSaved] = useState(false);

  const save = () => {
    setProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <SubPage title="Akun Saya" onBack={onBack}>
      <div className="flex justify-center py-2">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-900 to-teal-500 text-white flex items-center justify-center font-bold text-2xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {form.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()}
          </div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white shadow flex items-center justify-center">
            <Camera className="w-3.5 h-3.5 text-slate-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-md p-5 space-y-4">
        <div>
          <label className="text-xs text-slate-400 font-medium">Nama Lengkap</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full mt-1 px-3 py-2.5 rounded-xl bg-slate-50 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>
        <div>
          <label className="text-xs text-slate-400 font-medium">Lokasi</label>
          <input
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="w-full mt-1 px-3 py-2.5 rounded-xl bg-slate-50 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>
        <div>
          <label className="text-xs text-slate-400 font-medium">Email</label>
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full mt-1 px-3 py-2.5 rounded-xl bg-slate-50 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>
      </div>

      <button
        onClick={save}
        className="w-full bg-blue-900 text-white font-semibold rounded-2xl py-3.5 flex items-center justify-center gap-2"
      >
        {saved ? <><CheckCircle2 className="w-4 h-4" /> Tersimpan</> : "Simpan Perubahan"}
      </button>
    </SubPage>
  );
}

/* ---------- Satuan ---------- */
function SatuanPage({ onBack, unit, setUnit }) {
  const options = [
    { key: "metric", label: "Metric", desc: "Kilogram (kg), Meter (m), °C" },
    { key: "imperial", label: "Imperial", desc: "Pound (lb), Feet (ft), °F" },
  ];
  return (
    <SubPage title="Satuan" onBack={onBack}>
      <div className="bg-white rounded-3xl shadow-md overflow-hidden">
        {options.map((o, i) => (
          <button
            key={o.key}
            onClick={() => setUnit(o.key)}
            className={`w-full px-5 py-4 flex items-center justify-between text-left ${i === 0 ? "border-b border-slate-100" : ""}`}
          >
            <div>
              <p className="text-sm font-semibold text-slate-900">{o.label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{o.desc}</p>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${unit === o.key ? "border-teal-500" : "border-slate-300"}`}>
              {unit === o.key && <div className="w-2.5 h-2.5 rounded-full bg-teal-500" />}
            </div>
          </button>
        ))}
      </div>
      <p className="text-xs text-slate-400 px-1">Catatan: perubahan satuan baru berlaku di layar Profile & Logbook. Halaman lain masih pakai satuan default.</p>
    </SubPage>
  );
}

/* ---------- Preferensi Notifikasi ---------- */
function NotifikasiPage({ onBack, notifPrefs, setNotifPrefs }) {
  const items = [
    { key: "solunar", label: "Solunar & Waktu Terbaik", desc: "Pengingat major/minor period" },
    { key: "weather", label: "Cuaca & Kondisi Laut", desc: "Peringatan cuaca buruk" },
    { key: "community", label: "Komunitas", desc: "Like, komentar, dan trending post" },
  ];
  const toggle = (key) => setNotifPrefs((p) => ({ ...p, [key]: !p[key] }));

  return (
    <SubPage title="Preferensi Notifikasi" onBack={onBack}>
      <div className="bg-white rounded-3xl shadow-md overflow-hidden">
        {items.map((item, i) => (
          <div key={item.key} className={`px-5 py-4 flex items-center gap-3 ${i < items.length - 1 ? "border-b border-slate-100" : ""}`}>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900">{item.label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
            </div>
            <Switch on={notifPrefs[item.key]} onToggle={() => toggle(item.key)} />
          </div>
        ))}
      </div>
    </SubPage>
  );
}

/* ---------- Bantuan & Dukungan ---------- */
function BantuanPage({ onBack }) {
  const [openFaq, setOpenFaq] = useState(null);
  const faqs = [
    { q: "Bagaimana cara mencatat trip baru?", a: "Tekan tombol \"Mulai Fishing\" di Home, lalu tambahkan tangkapan lewat tombol Plus selama trip berlangsung." },
    { q: "Kenapa data cuaca belum akurat?", a: "Saat ini NusaStrike masih memakai data contoh (dummy). Integrasi data cuaca real-time sedang dalam pengembangan." },
    { q: "Bagaimana cara menghapus akun?", a: "Hubungi tim support lewat email di bawah, permintaan penghapusan akan diproses dalam 3x24 jam." },
  ];

  return (
    <SubPage title="Bantuan & Dukungan" onBack={onBack}>
      <div className="bg-white rounded-3xl shadow-md overflow-hidden">
        {faqs.map((f, i) => (
          <div key={i} className={i < faqs.length - 1 ? "border-b border-slate-100" : ""}>
            <button
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="w-full px-5 py-4 flex items-center justify-between text-left"
            >
              <span className="text-sm font-medium text-slate-900 pr-3">{f.q}</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition ${openFaq === i ? "rotate-180" : ""}`} />
            </button>
            {openFaq === i && <p className="text-xs text-slate-500 px-5 pb-4 -mt-1">{f.a}</p>}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-md p-5 space-y-3">
        <p className="text-xs text-slate-400 font-medium">HUBUNGI KAMI</p>
        <div className="flex items-center gap-3">
          <Mail className="w-4 h-4 text-slate-400" />
          <span className="text-sm text-slate-900">support@nusastrike.app</span>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="w-4 h-4 text-slate-400" />
          <span className="text-sm text-slate-900">+62 812-0000-0000</span>
        </div>
      </div>
    </SubPage>
  );
}

/* ---------- Tentang NusaStrike ---------- */
function TentangPage({ onBack }) {
  return (
    <SubPage title="Tentang NusaStrike" onBack={onBack}>
      <div className="flex flex-col items-center py-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-900 to-teal-500 flex items-center justify-center mb-3">
          <Fish className="w-8 h-8 text-white" />
        </div>
        <p className="font-bold text-slate-900 text-lg" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>NusaStrike</p>
        <p className="text-xs text-slate-400 mt-1">Versi 0.1.0 (Beta)</p>
      </div>
      <div className="bg-white rounded-3xl shadow-md p-5">
        <p className="text-sm text-slate-600 leading-relaxed">
          NusaStrike adalah aplikasi teman mancing untuk perairan Indonesia — menggabungkan info cuaca, kondisi laut, solunar, peta hotspot, logbook trip, dan komunitas pemancing dalam satu tempat.
        </p>
      </div>
      <div className="bg-white rounded-3xl shadow-md overflow-hidden">
        <div className="px-5 py-4 flex items-center justify-between border-b border-slate-100">
          <span className="text-sm text-slate-900">Syarat & Ketentuan</span>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>
        <div className="px-5 py-4 flex items-center justify-between">
          <span className="text-sm text-slate-900">Kebijakan Privasi</span>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>
      </div>
    </SubPage>
  );
}

/* ---------- Main ProfilePage ---------- */
function ProfilePage() {
  const [view, setView] = useState(null);
  const [profile, setProfile] = useState({ name: "Kapten Arya", location: "Kepulauan Seribu", email: "kapten.arya@email.com" });
  const [unit, setUnit] = useState("metric");
  const [notifPrefs, setNotifPrefs] = useState({ solunar: true, weather: true, community: false });

  const initials = profile.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  if (view === "akun") return <AkunSayaPage onBack={() => setView(null)} profile={profile} setProfile={setProfile} />;
  if (view === "satuan") return <SatuanPage onBack={() => setView(null)} unit={unit} setUnit={setUnit} />;
  if (view === "notifikasi") return <NotifikasiPage onBack={() => setView(null)} notifPrefs={notifPrefs} setNotifPrefs={setNotifPrefs} />;
  if (view === "bantuan") return <BantuanPage onBack={() => setView(null)} />;
  if (view === "tentang") return <TentangPage onBack={() => setView(null)} />;

  const settingsRoutes = { "Akun Saya": "akun", "Satuan (Metric)": "satuan", "Preferensi Notifikasi": "notifikasi", "Bantuan & Dukungan": "bantuan", "Tentang NusaStrike": "tentang" };

  return (
    <div className="pb-2">
      <div className="flex items-center justify-between mt-3 mb-5">
        <h2 className="font-bold text-slate-900 text-2xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Profil</h2>
        <button onClick={() => setView("akun")} className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
          <Settings className="w-4.5 h-4.5 text-slate-500" />
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-md p-5 flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-900 to-teal-500 text-white flex items-center justify-center font-bold text-xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          {initials}
        </div>
        <div>
          <p className="font-bold text-slate-900 text-lg" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{profile.name}</p>
          <p className="text-slate-400 text-xs flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3" /> {profile.location}
          </p>
          <p className="text-teal-600 text-xs font-medium mt-1">{profileStats.following} pengikut</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-white rounded-2xl shadow-sm p-3 text-center">
          <p className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{profileStats.trips}</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Total Trip</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-3 text-center">
          <p className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{profileStats.totalWeight}</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Total Tangkapan</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-3 text-center">
          <p className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{profileStats.biggest}</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Terbesar</p>
        </div>
      </div>

      <p className="text-xs text-slate-400 font-medium mb-2">PENCAPAIAN</p>
      <div className="grid grid-cols-2 gap-2 mb-5">
        {achievements.map((a) => {
          const Icon = a.icon;
          return (
            <div
              key={a.key}
              className={`rounded-2xl shadow-sm p-3 text-center transition ${a.earned ? "bg-white" : "bg-slate-100"}`}
            >
              <Icon className={`w-5 h-5 mx-auto mb-1 ${a.earned ? "text-amber-500" : "text-slate-300"}`} />
              <p className={`text-[10px] font-medium ${a.earned ? "text-slate-900" : "text-slate-400"}`}>{a.label}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-3xl shadow-md overflow-hidden">
        <p className="text-xs text-slate-400 font-medium px-5 pt-5 pb-3">PENGATURAN</p>
        {settingsItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              onClick={() => setView(settingsRoutes[item.label] || null)}
              className={`w-full px-5 py-4 flex items-center gap-3 text-left hover:bg-slate-50 transition ${
                i < settingsItems.length - 1 ? "border-b border-slate-100" : ""
              }`}
            >
              <Icon className="w-5 h-5 text-slate-400" />
              <span className="text-sm font-medium text-slate-900 flex-1">{item.label}</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          );
        })}
      </div>

      <button className="w-full mt-4 flex items-center justify-center gap-2 text-rose-500 text-sm font-semibold py-3">
        <LogOut className="w-4 h-4" /> Keluar
      </button>
    </div>
  );
}

export default ProfilePage;
