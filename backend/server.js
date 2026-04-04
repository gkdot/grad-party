import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fs from 'fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const ADMIN_SESSION_TOKEN = process.env.ADMIN_SESSION_TOKEN || 'change-this-token';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

console.log('ENV PATH:', path.join(__dirname, '.env'));
console.log('ADMIN_PAGE_PASSWORD loaded:', Boolean(process.env.ADMIN_PAGE_PASSWORD));

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_DIR = path.join(__dirname, 'data');
const RSVP_FILE = path.join(DATA_DIR, 'rsvps.json');

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://gkdot.github.io'],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

async function ensureStore() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(RSVP_FILE);
  } catch {
    await fs.writeFile(RSVP_FILE, '[]', 'utf8');
  }
}

async function readRsvps() {
  await ensureStore();
  const raw = await fs.readFile(RSVP_FILE, 'utf8');
  return JSON.parse(raw);
}

async function writeRsvps(items) {
  await ensureStore();
  await fs.writeFile(RSVP_FILE, JSON.stringify(items, null, 2), 'utf8');
}

function isAdminAuthorized(req) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice('Bearer '.length)
    : null;

  return token === ADMIN_SESSION_TOKEN;
}

function requireAdmin(req, res, next) {
  if (!isAdminAuthorized(req)) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/rsvps', requireAdmin, async (_req, res) => {
  const items = await readRsvps();
  const sorted = [...items].sort(
    (a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime()
  );
  res.json(sorted);
});

app.post('/api/rsvps', async (req, res) => {
  const body = req.body || {};

  if (!body.guest_name || !body.email || !body.attendance) {
    return res.status(400).json({ message: 'guest_name, email, and attendance are required.' });
  }

  const items = await readRsvps();

  const newItem = {
    id: crypto.randomUUID(),
    guest_name: body.guest_name,
    email: body.email,
    phone: body.phone || '',
    attendance: body.attendance,
    plus_one: Boolean(body.plus_one),
    plus_one_name: body.plus_one_name || '',
    dietary_restrictions: body.dietary_restrictions || 'none',
    dietary_notes: body.dietary_notes || '',
    message: body.message || '',
    created_date: new Date().toISOString(),
  };

  items.push(newItem);
  await writeRsvps(items);

  res.status(201).json(newItem);
});

app.delete('/api/rsvps/:id', requireAdmin, async (req, res) => {
  const items = await readRsvps();
  const next = items.filter((item) => item.id !== req.params.id);

  if (next.length === items.length) {
    return res.status(404).json({ message: 'RSVP not found.' });
  }

  await writeRsvps(next);
  res.json({ success: true });
});

app.post('/api/admin/login', (req, res) => {
  const { password } = req.body || {};

  if (!process.env.ADMIN_PAGE_PASSWORD) {
    return res.status(500).json({ message: 'Admin password is not configured.' });
  }

  if (password !== process.env.ADMIN_PAGE_PASSWORD) {
    return res.status(401).json({ message: 'Incorrect password.' });
  }

  res.json({
    success: true,
    token: ADMIN_SESSION_TOKEN,
  });
});

app.post('/api/admin/logout', (_req, res) => {
  res.json({ success: true });
});

app.get('/api/admin/session', (req, res) => {
  const authenticated = isAdminAuthorized(req);
  res.json({ authenticated });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});