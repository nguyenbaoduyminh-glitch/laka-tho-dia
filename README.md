# LaKa — Thổ địa AI bỏ túi

Bản này giữ nguyên thiết kế HTML gốc và thêm API `/api/ai` để gọi Gemini an toàn trên Vercel.

## Deploy Vercel

1. Upload toàn bộ project lên GitHub.
2. Import repo vào Vercel.
3. Vào Settings → Environment Variables và thêm:

```txt
GEMINI_API_KEY=your_gemini_key
```

4. Redeploy.

## Google Maps

Trong `index.html`, thay `PASTE_RESTRICTED_GOOGLE_MAPS_BROWSER_KEY` bằng Google Maps Browser Key đã giới hạn domain.
Không dùng key server cho frontend.
