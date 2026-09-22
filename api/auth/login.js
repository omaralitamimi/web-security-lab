import crypto from "node:crypto";
import { allow, requireDatabase, send, supabase } from "../_supabase.js";

export default async function handler(req, res) {
  if (allow(req, res)) return;
  if (req.method !== "POST") return send(res, 405, { error: "Method not allowed" });
  if (requireDatabase(res)) return;
  const email = String(req.body?.email || "").trim().toLowerCase();
  const password = String(req.body?.password || "");
  const response = await supabase(`/rest/v1/lab_users?email=eq.${encodeURIComponent(email)}&select=id,display_name,email,password_salt,password_hash`);
  const users = await response.json();
  if (!response.ok || !users.length) return send(res, 401, { error: "Email or password is incorrect." });
  const user = users[0];
  const actual = crypto.scryptSync(password, user.password_salt, 64).toString("hex");
  if (!crypto.timingSafeEqual(Buffer.from(actual, "hex"), Buffer.from(user.password_hash, "hex"))) return send(res, 401, { error: "Email or password is incorrect." });
  send(res, 200, { user: { id: user.id, name: user.display_name, email: user.email } });
}
