/* ---------- UTILITY FUNCTIONS ---------- */
export function formatTime(date) {
  return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

export function formatDate(date) {
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function getElapsedTime(startTime, endTime) {
  const diff = endTime - startTime;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
}

export function calculateTripScore(catches) {
  if (catches.length === 0) return 0;
  const totalWeight = catches.reduce((sum, c) => sum + (c.weight || 0), 0);
  const avgWeight = totalWeight / catches.length;
  return Math.round((catches.length * 10) + (avgWeight * 5));
}

export function calculateDistance(points) {
  if (points.length < 2) return 0;
  let total = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];
    const lat = (p2.lat - p1.lat) * 111;
    const lng = (p2.lng - p1.lng) * 111 * Math.cos((p1.lat * Math.PI) / 180);
    total += Math.sqrt(lat * lat + lng * lng);
  }
  return parseFloat(total.toFixed(1));
}
export function activityColor(a) {
  if (a >= 80) return { ring: "bg-rose-500", glow: "bg-rose-400", label: "Tinggi" };
  if (a >= 60) return { ring: "bg-amber-500", glow: "bg-amber-400", label: "Sedang" };
  return { ring: "bg-teal-500", glow: "bg-teal-400", label: "Rendah" };
}
export function aiReply(msg) {
  const m = msg.toLowerCase();
  if (m.includes("ikan") || m.includes("umpan") || m.includes("lure")) {
    return "Dengan kondisi solunar major period jam 18:00 dan suhu air 28°C, Kakap Merah dan Kerapu paling aktif. Coba lure jenis soft plastic warna gelap di kedalaman 8-12m.";
  }
  if (m.includes("lokasi") || m.includes("dimana") || m.includes("spot")) {
    return "Berdasarkan heatmap aktivitas komunitas 24 jam terakhir, area sekitar Kepulauan Seribu bagian selatan menunjukkan strike rate tertinggi hari ini.";
  }
  if (m.includes("cuaca") || m.includes("aman") || m.includes("gelombang")) {
    return "Gelombang 0.6m, angin 12 knot dari timur. Kondisi aman untuk kapal kecil-menengah. Tetap waspada perubahan cuaca sore hari.";
  }
  return "Skor kesiapan hari ini 86/100 — kondisi excellent. Waktu strike terbaik pukul 06:00-08:00 dan 18:00-20:00, bertepatan dengan major period solunar.";
}
