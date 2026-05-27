export default function handler(req, res) {
  const { n } = req.query;

  if (!n) {
    return res.status(400).json({ 
      error: "Parameter angka tidak ditemukan. Gunakan format: /api?n=1100" 
    });
  }

  // Menggunakan parseFloat agar mendukung string angka super panjang maupun notasi eksponensial (misal: 1.5e45)
  const num = parseFloat(n);

  if (isNaN(num)) {
    return res.status(400).json({ 
      error: "Input tidak valid. Pastikan Anda memasukkan angka." 
    });
  }

  // Jika angka absolutnya di bawah 1000, kembalikan string biasa
  if (Math.abs(num) < 1000) {
    return res.status(200).json({ 
      original: n, 
      formatted: num.toString() 
    });
  }

  // 1. Array Suffix Standar (Sampai Quetta / 10^30)
  const SI_SUFFIXES = ["", "k", "m", "b", "t", "p", "e", "z", "y", "r", "q"];

  // Menghitung tingkatan (tier) eksponen per ribuan (10^3)
  const tier = Math.floor(Math.log10(Math.abs(num)) / 3);
  
  let suffix = "";
  
  // Perhitungan skala pembagi agar presisi desimal tetap terjaga
  const scale = Math.pow(10, tier * 3);
  const scaledNum = num / scale;

  // 2. Logika Penentuan Suffix
  if (tier < SI_SUFFIXES.length) {
    // Jika masih di bawah atau sama dengan Quetta, gunakan suffix resmi
    suffix = SI_SUFFIXES[tier];
  } else {
    // Jika melampaui Quetta (> 10^30), generate suffix alphabet otomatis (aa, ab, ac... zz)
    const alphaIndex = tier - SI_SUFFIXES.length; 
    const firstChar = String.fromCharCode(97 + Math.floor(alphaIndex / 26));
    const secondChar = String.fromCharCode(97 + (alphaIndex % 26));
    suffix = firstChar + secondChar;
  }

  // Format hasil akhir: batasi 1 angka di belakang koma, buang .0 jika angka bulat
  const formattedNumber = scaledNum.toFixed(1).replace(/\.0$/, '') + suffix;

  return res.status(200).json({
    original: n,
    parsed_value: num,
    formatted: formattedNumber
  });
}
