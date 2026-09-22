const const required = ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"];

export function configured() {
  return required.every((key) => Boolean(process.env[key]));
}

export function send(res, status, body) {
  res.status(status).json(body);
}

export async function supabase(path, options = {}) {
  const headers = {
    apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
    ...options.headers,
  };
  return fetch(`${process.env.SUPABASE_URL}${path}`, { ...options, headers });
}

export function requireDatabase(res) {
  if (configured()) return false;
  send(res, 503, { error: "Database is not connected yet." });
  return true;
}

export function allow(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  if (req.method === "OPTIONS") { res.status(204).end(); return true; }
  return false;
}required = ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"];

export function configured() {
  return required.every((key) => Boolean(process.env[key]));
}

export function send(res, status, body) {
  res.status(status).json(body);
}

export async function supabase(path, options = {}) {
  const headers = {
    apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
    ...options.headers,
  };
  return fetch(`${process.env.SUPABASE_URL}${path}`, { ...options, headers });
}

export function requireDatabase(res) {
  if (configured()) return false;
  send(res, 503, { error: "Database is not connected yet." });
  return true;
}

export function allow(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  if (req.method === "OPTIONS") { res.status(204).end(); return true; }
  return false;
}
