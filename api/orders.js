import { allow, requireDatabase, send, supabase } from "./_supabase.js";

export default async function handler(req, res) {
  if (allow(req, res)) return;
  if (req.method !== "GET") return send(res, 405, { error: "Method not allowed" });
  if (requireDatabase(res)) return;
  const orderNumber = String(req.query.number || "").trim();
  const email = String(req.query.email || "").trim().toLowerCase();
  if (!/^\d+$/.test(orderNumber) || !email) return send(res, 400, { error: "Order number and email are required." });
  const query = `/rest/v1/orders?order_number=eq.${encodeURIComponent(orderNumber)}&customer_email=eq.${encodeURIComponent(email)}&select=order_number,customer_name,customer_email,status,total,created_at,order_items(product_name,quantity,unit_price)`;
  const response = await supabase(query);
  const data = await response.json();
  if (!response.ok) return send(res, response.status, { error: data.message || "Could not look up order" });
  if (!data.length) return send(res, 404, { error: "No order was found for these details." });
  send(res, 200, { order: data[0] });
}
