const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

const DATA_DIR = path.join(__dirname, "data");
const RSVP_FILE = path.join(DATA_DIR, "rsvps.json");

async function ensureStore() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(RSVP_FILE);
  } catch {
    await fs.writeFile(RSVP_FILE, "[]", "utf8");
  }
}

async function readRsvps() {
  await ensureStore();
  const raw = await fs.readFile(RSVP_FILE, "utf8");
  return JSON.parse(raw);
}

async function writeRsvps(items) {
  await ensureStore();
  await fs.writeFile(RSVP_FILE, JSON.stringify(items, null, 2), "utf8");
}

function isAdminAuthorized(req) {
  return req.cookies?.admin_access === "granted";
}

function requireAdmin(req, res, next) {
  if (!isAdminAuthorized(req)) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/rsvps", requireAdmin, async (_req, res) => {
  const items = await readRsvps();
  const sorted = [...items].sort(
    (a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime()
  );
  res.json(sorted);
});

app.post("/rsvps", async (req, res) => {
  const body = req.body || {};

  if (!body.guest_name || !body.email || !body.attendance) {
    return res.status(400).json({ message: "guest_name, email, and attendance are required." });
  }

  const items = await readRsvps();

  const newItem = {
    id: crypto.randomUUID(),
    guest_name: body.guest_name,
    email: body.email,
    phone: body.phone || "",
    attendance: body.attendance,
    plus_one: Boolean(body.plus_one),
    plus_one_name: body.plus_one_name || "",
    dietary_restrictions: body.dietary_restrictions || "none",
    dietary_notes: body.dietary_notes || "",
    message: body.message || "",
    created_date: new Date().toISOString(),
  };

  items.push(newItem);
  await writeRsvps(items);

  res.status(201).json(newItem);
});

app.delete("/rsvps/:id", requireAdmin, async (req, res) => {
  const items = await readRsvps();
  const next = items.filter((item) => item.id !== req.params.id);

  if (next.length === items.length) {
    return res.status(404).json({ message: "RSVP not found." });
  }

  await writeRsvps(next);
  res.json({ success: true });
});

app.post("/admin/login", (req, res) => {
  const { password } = req.body || {};

  if (!process.env.ADMIN_PAGE_PASSWORD) {
    return res.status(500).json({ message: "Admin password is not configured." });
  }

  if (password !== process.env.ADMIN_PAGE_PASSWORD) {
    return res.status(401).json({ message: "Incorrect password." });
  }

  res.cookie("admin_access", "granted", {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    maxAge: 1000 * 60 * 60 * 8,
    path: "/",
  });

  res.json({ success: true });
});

app.post("/admin/logout", (_req, res) => {
  res.clearCookie("admin_access", {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
  });

  res.json({ success: true });
});

app.get("/admin/session", (req, res) => {
  const authenticated = req.cookies?.admin_access === "granted";
  res.json({ authenticated });
});

exports.api = onRequest({ region: "us-east4" }, app);