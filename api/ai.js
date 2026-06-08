export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: "Missing GEMINI_API_KEY. Add it in Vercel Environment Variables."
      });
    }

    const { prompt, city, vibe, days, budget } = req.body || {};

    const finalPrompt = prompt || `
Bạn là LaKa - AI travel companion cho giới trẻ Việt Nam.
Tạo lịch trình ${days || 3} ngày tại ${city || "Đà Lạt"}, vibe ${vibe || "CHILL"}, ngân sách ${budget || "vừa phải"}.
Trả về JSON thuần, không markdown:
{
  "title":"Tên thành phố · Vibe",
  "subtitle":"Số ngày · số địa điểm",
  "days":[
    {
      "day":1,
      "places":[
        {
          "time":"07:30-09:00",
          "name":"tên địa điểm thật",
          "emoji":"☕",
          "desc":"mô tả ngắn",
          "cost":"~50K",
          "address":"địa chỉ thật"
        }
      ]
    }
  ]
}`;

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: finalPrompt }] }],
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 4096,
            responseMimeType: "application/json"
          }
        })
      }
    );

    const data = await geminiRes.json();

    if (!geminiRes.ok) {
      return res.status(geminiRes.status).json({
        error: data?.error?.message || "Gemini API error"
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}
