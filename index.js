const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const SUPABASE_URL = 'https://gmiugowuyzpzezshrkse.supabase.co';

// CORS Headers အားလုံးအတွက် ခွင့်ပြုပေးရန်
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.use('/', createProxyMiddleware({
  target: SUPABASE_URL,
  changeOrigin: true,
  ws: true, // Realtime WebSocket ပါ အလုပ်လုပ်ရန်
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.setHeader('Host', 'gmiugowuyzpzezshrkse.supabase.co');
  }
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});