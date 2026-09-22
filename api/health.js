import { configured, send } from "./_supabase.js";
export default function handler(_req, res) {
  send(res, 200, { application: "OMAR ALTAMIMI Store API", databaseConnected: configured(), environment: process.env.VERCEL_ENV || "local" });
}
