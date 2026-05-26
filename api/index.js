export default function handler(req, res) {
  // Ambil parameter 'n' dari query URL (contoh: /api?n=1500)
  const { n } = req.query;

  if (!n) {
    return res.status(400).json({ 
      error: "Parameter angka tidak ditemukan. Gunakan format: /api?n=1100" 
    });
  }

  // Ubah input string menjadi tipe data number
  const num = parseFloat(n);

  if (isNaN(num)) {
    return res.status(400).json({ 
      error: "Input tidak valid. Pastikan Anda memasukkan angka." 
    });
  }

  // Gunakan API bawaan JS untuk memformat angka secara otomatis
  const formatter = new Intl.NumberFormat('en-US', {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1 // Mengatur batas 1 angka di belakang koma (contoh: 1.1k)
  });

  // Intl akan menghasilkan huruf kapital (K, M, B, T). 
  // Kita ubah ke lowercase agar sesuai permintaan (k, m, b, t).
  const formattedNumber = formatter.format(num).toLowerCase();

  // Kembalikan respon
  return res.status(200).json({
    original: num,
    formatted: formattedNumber
  });
}
