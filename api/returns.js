import { allow, requireDatabase, send, supabase } from "./_supabase.js";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const types = new Set(["image/jpeg", "image/png", "application/pdf"]);

export default async function handler(req, res) {
  if (allow(req, res)) return;
  if (req.method !== "POST") return send(res, 405, { error: "Method not allowed" });
  if (requireDatabase(res)) return;
  const { orderNumber, email, fileName, contentType, contentBase64 } = req.body || {};
  const safeName = String(fileName || "").replace(/[^a-zA-Z0-9._-]/g, "_");
  if (!/^\d+$/.test(String(orderNumber || "")) || !/^\S+@\S+\.\S+$/.test(String(email || "")) || !safeName || !types.has(contentType)) return send(res, 400, { error: "Enter a valid order, email and JPG, PNG or PDF attachment." });
  const bytes = Buffer.from(String(contentBase64 || ""), "base64");
  if (!bytes.length || bytes.length > MAX_FILE_SIZE) return send(res, 400, { error: "Attachment must be smaller than 2 MB." });
  const record = await supabase("/rest/v1/return_requests", {
    method: "POST",
    headers: { "Content-Type": "application/json", Prefer: "return=representation" },
    body: JSON.stringify({
      order_number: String(orderNumber),
      customer_email: String(email).toLowerCase(),
      attachment_name: safeName,
      attachment_type: contentType,
      attachment_size: bytes.length,
      attachment_base64: String(contentBase64),
      status: "received"
    })
  });
  const data = await record.json();
  if (!record.ok) return send(res, record.status, { error: data.message || "Attachment saved but return could not be opened." });
  send(res, 201, { message: "Attachment uploaded and return request created.", request: data[0] });
}
