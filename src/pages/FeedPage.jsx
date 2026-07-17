import React, { useState } from 'react';
import {
  Fish, Waves, Moon, Bot, MapPin, BookOpen, Users, User, Home as HomeIcon,
  Bell, ChevronRight, ChevronLeft, Wind, Droplet, Sun, Star, ArrowRight, X,
  Send, Gauge, Sunrise, Sunset, Eye, CloudRain, Thermometer, TrendingUp,
  TrendingDown, Compass, Sparkles, CloudSun, Cloud, Camera, Plus, Trash2,
  Loader2, CheckCircle2, Calendar, Ruler, Layers, Navigation, Minus,
  Heart, MessageCircle, Share2, Award, LogOut, Settings, HelpCircle, Info,
  Copy, Check, Clock, MapPinned, Activity, Zap, Edit2, MoreVertical,
  AlertCircle, Lightbulb, TrendingUp as TrendingUpIcon, ImagePlus, LocateFixed
} from 'lucide-react';
import PostDetailSheet from '../components/PostDetailSheet';
import { filterTabs, initialFeed, leaderboard } from '../data/mockData';

/* ---------- Composer sheet: bikin post baru ---------- */
function ComposerSheet({ onClose, onSubmit }) {
  const [image, setImage] = useState(null);
  const [fish, setFish] = useState("");
  const [weight, setWeight] = useState("");
  const [caption, setCaption] = useState("");
  const [coords, setCoords] = useState(null);
  const [locLoading, setLocLoading] = useState(false);
  const [locError, setLocError] = useState("");

  const pickImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocError("Geolocation tidak didukung browser ini");
      return;
    }
    setLocLoading(true);
    setLocError("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocLoading(false);
      },
      () => {
        setLocError("Gagal ambil lokasi — cek izin GPS browser");
        setLocLoading(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const canSubmit = fish.trim().length > 0;

  const submit = () => {
    if (!canSubmit) return;
    onSubmit({
      id: Date.now(),
      init: "KA",
      name: "Kapten Arya",
      location: coords ? `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}` : "Lokasi tidak diset",
      coords,
      time: "Baru saja",
      fish: fish.trim(),
      weight: weight.trim() ? `${weight.trim()} kg` : "-",
      caption: caption.trim(),
      image,
      liked: false,
      likes: 0,
      comments: [],
    });
  };

  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center">
      <div className="absolute inset-0 bg-slate-900/40" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md rounded-t-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white flex items-center justify-between px-5 pt-5 pb-3 border-b border-slate-100 z-10">
          <h3 className="font-bold text-lg text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Post Baru</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
            <X className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        <div className="px-5 py-4 space-y-4">
          <label className="block">
            {image ? (
              <div className="relative">
                <img src={image} alt="preview" className="w-full h-48 object-cover rounded-2xl" />
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); setImage(null); }}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-slate-900/70 flex items-center justify-center"
                >
                  <X className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            ) : (
              <div className="w-full h-40 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center gap-2 cursor-pointer">
                <ImagePlus className="w-7 h-7 text-slate-300" />
                <span className="text-xs text-slate-400">Tap buat upload foto tangkapan</span>
              </div>
            )}
            <input type="file" accept="image/*" onChange={pickImage} className="hidden" />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 font-medium">Nama Ikan</label>
              <input
                value={fish}
                onChange={(e) => setFish(e.target.value)}
                placeholder="Kakap Merah"
                className="w-full mt-1 px-3 py-2.5 rounded-xl bg-slate-50 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 font-medium">Berat (kg)</label>
              <input
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="2.5"
                inputMode="decimal"
                className="w-full mt-1 px-3 py-2.5 rounded-xl bg-slate-50 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium">Cerita Singkat</label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Strike jam berapa, umpan apa, kondisi gimana..."
              rows={3}
              className="w-full mt-1 px-3 py-2.5 rounded-xl bg-slate-50 text-sm text-slate-900 outline-none resize-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium">Titik Lokasi</label>
            <button
              onClick={useCurrentLocation}
              disabled={locLoading}
              className="w-full mt-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-blue-50 text-blue-900 text-sm font-medium"
            >
              <LocateFixed className={`w-4 h-4 ${locLoading ? "animate-pulse" : ""}`} />
              {locLoading ? "Mengambil lokasi..." : coords ? `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}` : "Gunakan Lokasi Saat Ini"}
            </button>
            {locError && <p className="text-xs text-rose-500 mt-1">{locError}</p>}
          </div>

          <button
            onClick={submit}
            disabled={!canSubmit}
            className={`w-full font-semibold rounded-2xl py-3.5 transition ${canSubmit ? "bg-blue-900 text-white" : "bg-slate-100 text-slate-400"}`}
          >
            Posting
          </button>
        </div>
      </div>
    </div>
  );
}

function FeedPage() {
  const [feed, setFeed] = useState(initialFeed);
  const [filter, setFilter] = useState("terbaru");
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState(null);
  const [showComposer, setShowComposer] = useState(false);

  const toggleLike = (id) => {
    setFeed((prev) => prev.map((p) => p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p));
    setSelected((s) => s && s.id === id ? { ...s, liked: !s.liked, likes: s.liked ? s.likes - 1 : s.likes + 1 } : s);
  };

  const sharePost = async (post) => {
    const text = `${post.name} menangkap ${post.fish} (${post.weight}) di ${post.location} — via NusaStrike`;
    try {
      if (navigator.share) {
        await navigator.share({ text });
      } else {
        await navigator.clipboard.writeText(text);
        setToast("Teks trip disalin ke clipboard");
        setTimeout(() => setToast(null), 2000);
      }
    } catch {
      // user batal share sheet, no-op
    }
  };

  const addPost = (post) => {
    setFeed((prev) => [post, ...prev]);
    setShowComposer(false);
    setToast("Post berhasil diunggah");
    setTimeout(() => setToast(null), 2000);
  };

  const displayedFeed = filter === "trending"
    ? [...feed].sort((a, b) => b.likes - a.likes)
    : feed;

  return (
    <div className="pb-2">
      <div className="flex items-center justify-between mt-3 mb-4">
        <h2 className="font-bold text-slate-900 text-2xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Feed</h2>
      </div>

      {/* COMPOSER TRIGGER */}
      <button
        onClick={() => setShowComposer(true)}
        className="w-full bg-white rounded-2xl shadow-sm px-4 py-3 flex items-center gap-3 mb-5 text-left"
      >
        <span className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-900 to-teal-500 text-white text-xs flex items-center justify-center font-semibold shrink-0">KA</span>
        <span className="text-sm text-slate-400 flex-1">Bagikan tangkapan hari ini...</span>
        <span className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center">
          <ImagePlus className="w-4 h-4 text-teal-600" />
        </span>
      </button>

      <div>
        <p className="text-xs text-slate-400 mb-2 font-medium">TOP ANGLER MINGGU INI</p>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {leaderboard.map((l, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm p-3 flex items-center gap-2 shrink-0 min-w-[150px]">
              <div className="relative">
                <span className="w-9 h-9 rounded-full bg-slate-800 text-white text-xs flex items-center justify-center font-semibold">{l.init}</span>
                {i === 0 && (
                  <Award className="w-4 h-4 text-amber-400 absolute -top-1.5 -right-1.5 fill-amber-400" />
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">{l.name}</p>
                <p className="text-xs text-slate-400">{l.weight} kg minggu ini</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-5 mb-3">
        {filterTabs.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
              filter === f.key ? "bg-blue-900 text-white" : "bg-white text-slate-400 shadow-sm"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {displayedFeed.map((post) => (
          <div key={post.id} className="bg-white rounded-3xl shadow-md overflow-hidden">
            <button onClick={() => setSelected(post)} className="w-full text-left">
              <div className="flex items-center gap-2 px-4 pt-4">
                <span className="w-8 h-8 rounded-full bg-slate-800 text-white text-xs flex items-center justify-center font-semibold shrink-0">{post.init}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-900">{post.name}</p>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    {post.coords && <MapPin className="w-3 h-3 shrink-0" />}
                    <span className="truncate">{post.location}</span> · {post.time}
                  </p>
                </div>
              </div>
              {post.image ? (
                <img src={post.image} alt={post.fish} className="w-full h-36 object-cover mt-3" />
              ) : (
                <div className="h-36 mx-4 mt-3 rounded-2xl bg-gradient-to-br from-teal-400 to-blue-600 flex items-center justify-center">
                  <Fish className="w-10 h-10 text-white/90" />
                </div>
              )}
              <div className="px-4 pt-3">
                <p className="text-sm font-semibold text-slate-900">{post.fish} · {post.weight}</p>
                {post.caption && <p className="text-xs text-slate-500 mt-1">{post.caption}</p>}
              </div>
            </button>
            <div className="flex items-center gap-4 px-4 py-3">
              <button onClick={() => toggleLike(post.id)} className="flex items-center gap-1 active:scale-90 transition">
                <Heart className={`w-4.5 h-4.5 ${post.liked ? "fill-rose-500 text-rose-500" : "text-slate-400"}`} />
                <span className={`text-xs font-medium ${post.liked ? "text-rose-500" : "text-slate-500"}`}>{post.likes}</span>
              </button>
              <button onClick={() => setSelected(post)} className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4 text-slate-400" />
                <span className="text-xs text-slate-500">{post.comments.length}</span>
              </button>
              <button onClick={() => sharePost(post)} className="flex items-center gap-1 ml-auto active:scale-90 transition">
                <Share2 className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <PostDetailSheet post={selected} onClose={() => setSelected(null)} onLike={() => toggleLike(selected.id)} onShare={() => sharePost(selected)} />
      )}

      {showComposer && (
        <ComposerSheet onClose={() => setShowComposer(false)} onSubmit={addPost} />
      )}

      {toast && (
        <div className="fixed bottom-24 left-0 right-0 flex justify-center z-40">
          <div className="bg-slate-900 text-white text-xs font-medium px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-teal-400" /> {toast}
          </div>
        </div>
      )}
    </div>
  );
}

export default FeedPage;
