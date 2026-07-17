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

/**
 * Calculate distance between geographic points using Haversine formula
 * @param {Array} points - Array of {lat, lng} coordinates
 * @returns {number} - Distance in kilometers (fixed to 1 decimal place)
 */
export function calculateDistance(points) {
  if (!points || points.length < 2) return 0;
  
  let total = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];
    
    // Validate point data
    if (!p1 || !p2 || typeof p1.lat !== 'number' || typeof p1.lng !== 'number' || 
        typeof p2.lat !== 'number' || typeof p2.lng !== 'number') {
      console.warn('Invalid point data:', p1, p2);
      continue;
    }
    
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

/**
 * Calculate fishing readiness score (0-100) based on conditions
 * @param {Object} conditions - {weather: 0-100, sea: 0-100, solunar: 0-100}
 * @returns {number} - Readiness score
 */
export function calculateFishingReadiness(conditions = {}) {
  const weather = Math.min(100, Math.max(0, conditions.weather || 70));
  const sea = Math.min(100, Math.max(0, conditions.sea || 75));
  const solunar = Math.min(100, Math.max(0, conditions.solunar || 85));
  
  // Weighted calculation: 30% weather, 30% sea, 40% solunar
  const score = Math.round((weather * 0.3) + (sea * 0.3) + (solunar * 0.4));
  return Math.min(100, Math.max(0, score));
}

/**
 * Get fishing readiness description
 * @param {number} score - Readiness score (0-100)
 * @returns {Object} - {level: string, label: string}
 */
export function getReadinessLevel(score) {
  if (score >= 80) return { level: "excellent", label: "EXCELLENT", color: "text-green-600" };
  if (score >= 60) return { level: "good", label: "GOOD", color: "text-blue-600" };
  if (score >= 40) return { level: "fair", label: "FAIR", color: "text-amber-600" };
  return { level: "poor", label: "POOR", color: "text-red-600" };
}

/**
 * AI Reply with improved pattern matching
 * @param {string} msg - User message
 * @returns {string} - AI response
 */
export function aiReply(msg) {
  if (!msg || typeof msg !== 'string') {
    return "Skor kesiapan hari ini 86/100 — kondisi excellent. Waktu strike terbaik pukul 06:00-08:00 dan 18:00-20:00.";
  }
  
  const m = msg.toLowerCase();
  
  // Fish and lure questions
  if (m.includes("ikan") || m.includes("umpan") || m.includes("lure") || m.includes("target")) {
    return "Dengan kondisi solunar major period jam 18:00 dan suhu air 28°C, Kakap Merah dan Kerapu paling aktif. Coba lure jenis soft plastic warna gelap di kedalaman 8-12m.";
  }
  
  // Location questions
  if (m.includes("lokasi") || m.includes("dimana") || m.includes("spot") || m.includes("area")) {
    return "Berdasarkan heatmap aktivitas komunitas 24 jam terakhir, area sekitar Kepulauan Seribu bagian selatan menunjukkan strike rate tertinggi hari ini.";
  }
  
  // Weather and safety questions
  if (m.includes("cuaca") || m.includes("aman") || m.includes("gelombang") || m.includes("angin")) {
    return "Gelombang 0.6m, angin 12 knot dari timur. Kondisi aman untuk kapal kecil-menengah. Tetap waspada perubahan cuaca sore hari.";
  }
  
  // Equipment/preparation questions
  if (m.includes("peralatan") || m.includes("persiapan") || m.includes("bawa") || m.includes("packing")) {
    return "Bawa: life jacket, 3-4 jenis lure berbeda, rod medium-heavy, coolbox untuk ikan. Jangan lupa sunscreen dan air minum cukup.";
  }
  
  // Default response
  return "Skor kesiapan hari ini 86/100 — kondisi excellent. Waktu strike terbaik pukul 06:00-08:00 dan 18:00-20:00, bertepatan dengan major period solunar.";
}
