// ============================================================
// SAVCEL HUB — Main Server File
// This is the entry point of the entire application.
// ============================================================

require('dotenv').config();
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// ---------- Basic security headers ----------
app.use(helmet({
  contentSecurityPolicy: false // will be tightened in later stages
}));

// ---------- Request logging ----------
app.use(morgan('dev'));

// ---------- Body parsers ----------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------- Static files (css, images, js) ----------
app.use(express.static(path.join(__dirname, '..', 'public')));

// ---------- View engine (EJS) ----------
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// ---------- Temporary placeholder page ----------
// This will be replaced by the real homepage in Stage 4.
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>SAVCEL HUB</title>
        <style>
          body {
            margin: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #6B21A8 0%, #0066FF 100%);
            color: #fff;
            text-align: center;
            padding: 20px;
          }
          .card {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            padding: 40px 30px;
            max-width: 420px;
            backdrop-filter: blur(10px);
          }
          h1 {
            font-size: 2.2rem;
            margin: 0 0 12px;
            letter-spacing: 1px;
          }
          p {
            margin: 8px 0;
            opacity: 0.9;
            font-size: 1rem;
            line-height: 1.5;
          }
          .badge {
            display: inline-block;
            margin-top: 20px;
            padding: 8px 16px;
            background: rgba(255, 255, 255, 0.15);
            border-radius: 999px;
            font-size: 0.85rem;
            letter-spacing: 0.5px;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>SAVCEL HUB</h1>
          <p>Digital Marketplace &middot; Ecommerce &middot; Reseller Platform</p>
          <p>The platform is being built.</p>
          <div class="badge">STAGE 2 &middot; SERVER RUNNING</div>
        </div>
      </body>
    </html>
  `);
});

// ---------- Health check (useful for Render later) ----------
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'savcel-hub', time: new Date().toISOString() });
});

// ---------- 404 handler ----------
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// ---------- Global error handler ----------
app.use((err, req, res, next) => {
  console.error('[ERROR]', err.message);
  res.status(500).send('Something went wrong');
});

// ---------- Start server ----------
app.listen(PORT, () => {
  console.log(`✅ SAVCEL HUB server running on port ${PORT}`);
});
