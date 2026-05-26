// Daftar suffix hingga centillion (10^303) dan seterusnya
const SUFFIXES = [
  '', 'k', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc',
  'UDc', 'DDc', 'TDc', 'QaDc', 'QiDc', 'SxDc', 'SpDc', 'OcDc', 'NoDc',
  'Vg', 'UVg', 'DVg', 'TVg', 'QaVg', 'QiVg', 'SxVg', 'SpVg', 'OcVg', 'NoVg',
  'Tg', 'UTg', 'DTg', 'TTg', 'QaTg', 'QiTg', 'SxTg', 'SpTg', 'OcTg', 'NoTg',
  'Qag', 'UQag', 'DQag', 'TQag', 'QaQag', 'QiQag', 'SxQag', 'SpQag', 'OcQag', 'NoQag',
  'Qig', 'UQig', 'DQig', 'TQig', 'QaQig', 'QiQig', 'SxQig', 'SpQig', 'OcQig', 'NoQig',
  'Sxg', 'USxg', 'DSxg', 'TSxg', 'QaSxg', 'QiSxg', 'SxSxg', 'SpSxg', 'OcSxg', 'NoSxg',
  'Spg', 'USpg', 'DSpg', 'TSpg', 'QaSpg', 'QiSpg', 'SxSpg', 'SpSpg', 'OcSpg', 'NoSpg',
  'Ocg', 'UOcg', 'DOcg', 'TOcg', 'QaOcg', 'QiOcg', 'SxOcg', 'SpOcg', 'OcOcg', 'NoOcg',
  'Nog', 'UNog', 'DNog', 'TNog', 'QaNog', 'QiNog', 'SxNog', 'SpNog', 'OcNog', 'NoNog',
  'Dcg', 'UDcg', 'DDcg', 'TDcg', 'QaDcg', 'QiDcg', 'SxDcg', 'SpDcg', 'OcDcg', 'NoDcg',
  // Bisa diperpanjang sampai tier berapa pun
];

function formatNumber(num) {
  if (num === 0) return '0';
  const sign = num < 0 ? '-' : '';
  let abs = Math.abs(num);
  let tier = 0;

  // Tentukan tier selama masih >= 1000 dan masih ada suffix
  while (abs >= 1000 && tier < SUFFIXES.length - 1) {
    abs /= 1000;
    tier++;
  }

  // Format angka: jika bulat tampilkan tanpa desimal, jika tidak gunakan 1 desimal
  let formatted;
  if (Number.isInteger(abs)) {
    formatted = abs.toString();
  } else {
    // Satu angka di belakang koma, lalu hapus trailing zero jika ada
    formatted = abs.toFixed(1).replace(/\.0$/, '');
  }

  return sign + formatted + SUFFIXES[tier];
}

// Handler Vercel (CommonJS)
module.exports = (req, res) => {
  const { number } = req.query;
  const num = parseFloat(number);

  if (isNaN(num)) {
    return res.status(400).json({
      error: 'Parameter "number" harus berupa angka valid.',
      example: '/api/numapi?number=1100'
    });
  }

  const result = formatNumber(num);
  res.status(200).json({ result });
};
