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


function PostDetailSheet({ post, onClose, onLike, onShare }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post.comments);

  const send = () => {
    if (!comment.trim()) return;
    setComments((c) => [...c, { name: "Kapten Arya", text: comment }]);
    setComment("");
  };

  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center">
      <div className="absolute inset-0 bg-slate-900/40" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 bg-white flex items-center justify-between px-5 pt-5 pb-3 border-b border-slate-100">
          <h3 className="font-bold text-lg text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{post.fish}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
            <X className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        <div className="px-5 py-4 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-full bg-slate-800 text-white text-xs flex items-center justify-center font-semibold">{post.init}</span>
            <div>
              <p className="text-sm font-semibold text-slate-900">{post.name}</p>
              <p className="text-xs text-slate-400">{post.location} · {post.time}</p>
            </div>
          </div>

          {post.image ? (
            <img src={post.image} alt={post.fish} className="w-full h-44 object-cover rounded-2xl" />
          ) : (
            <div className="h-44 rounded-2xl bg-gradient-to-br from-teal-400 to-blue-600 flex items-center justify-center">
              <Fish className="w-12 h-12 text-white/90" />
            </div>
          )}

          {post.caption && <p className="text-sm text-slate-600">{post.caption}</p>}

          {post.coords && (
            <a
              href={`https://www.openstreetmap.org/?mlat=${post.coords.lat}&mlon=${post.coords.lng}#map=14/${post.coords.lat}/${post.coords.lng}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2 text-xs text-slate-500"
            >
              <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              {post.coords.lat.toFixed(4)}, {post.coords.lng.toFixed(4)} — buka di peta
            </a>
          )}

          <div className="flex items-center gap-4">
            <button onClick={onLike} className="flex items-center gap-1 active:scale-90 transition">
              <Heart className={`w-5 h-5 ${post.liked ? "fill-rose-500 text-rose-500" : "text-slate-400"}`} />
              <span className={`text-sm font-medium ${post.liked ? "text-rose-500" : "text-slate-500"}`}>{post.likes} suka</span>
            </button>
            <button onClick={onShare} className="flex items-center gap-1 ml-auto active:scale-90 transition">
              <Share2 className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-500">Bagikan</span>
            </button>
          </div>

          <div>
            <p className="text-xs text-slate-400 font-medium mb-2">KOMENTAR</p>
            <div className="space-y-2 mb-3">
              {comments.length === 0 && <p className="text-sm text-slate-400">Belum ada komentar.</p>}
              {comments.map((c, i) => (
                <div key={i} className="bg-slate-50 rounded-xl px-3 py-2">
                  <p className="text-xs font-semibold text-slate-800">{c.name}</p>
                  <p className="text-sm text-slate-600">{c.text}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Tulis komentar..."
                className="flex-1 bg-slate-100 rounded-full px-4 py-2 text-sm outline-none"
              />
              <button onClick={send} className="w-9 h-9 rounded-full bg-blue-900 flex items-center justify-center shrink-0">
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default PostDetailSheet;
