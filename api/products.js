import { allow, requireDatabase, send, supabase } from "./_supabase.js";

export default async function handler(req, res) {
  if (allow(req, res)) return;
  if (req.method !== "GET") return send(res, 405, { error: "Method not allowed" });
  if (requireDatabase(res)) return;
  const q = String(req.query.q || "").trim();
  const category = String(req.query.category || "").trim();
  const filters = ["select=id,name,brand,price,old_price,category,badge,image_url"];
  if (q) filters.push(`or=(name.ilike.*${encodeURIComponent(q)}*,brand.ilike.*${encodeURIComponent(q)}*,category.ilike.*${encodeURIComponent(q)}*)`);
  if (category) filters.push(`category=eq.${encodeURIComponent(category)}`);
  filters.push("order=id.asc");
  const response = await supabase(`/rest/v1/products?${filters.join("&")}`);
  const data = await response.json();
  if (!response.ok) return send(res, response.status, { error: data.message || "Could not load products" });
  send(res, 200, { products: data });
}
