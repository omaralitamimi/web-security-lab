import { allow, requireDatabase, send, supabase } from "./_supabase.js";

export default async function handler(req, res) {
  if (allow(req, res)) return;
  if (req.method !== "POST") return send(res, 405, { error: "Method not allowed" });
  if (requireDatabase(res)) return;
  const email = String(req.body?.email || "").trim().toLowerCase();
  if (!/^\S+@\S+\.\S+$/.test(email)) return send(res, 400, { error: "Enter a valid email address." });
  const response = await supabase("/rest/v1/newsletter_subscribers?on_conflict=email", {
    method: "POST", headers: { "Content-Type": "application/json", Prefer: "resolution=merge-duplicates,return=representation" },
    body: JSON.stringify({ email }),
  });
  const data = await response.json();
  if (!response.ok) return send(res, response.status, { error: data.message || "Could not save email" });
  send(res, 201, { message: "You are now subscribed.", subscriber: data[0] });
}
