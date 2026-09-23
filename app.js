const categories=[
  ["Women","https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=500&q=80"],
  ["Men","https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=500&q=80"],
  ["Kids","https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=500&q=80"],
  ["Shoes","https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80"],
  ["Technology","https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=500&q=80"],
  ["Beauty","https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=500&q=80"],
  ["Home","https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=500&q=80"],
  ["Accessories","https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=500&q=80"]
];

const products=[
  {id:1,name:"Relaxed Linen Blend Shirt",brand:"OMAR ESSENTIALS",price:29.90,old:42.00,cat:"fashion",badge:"BESTSELLER",img:"https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=700&q=85"},
  {id:2,name:"Minimal Everyday Watch",brand:"ALTAMIMI EDIT",price:39.90,old:59.00,cat:"fashion",badge:"-32%",img:"https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=85"},
  {id:3,name:"Street Runner Sneakers",brand:"MOVE",price:47.50,old:68.00,cat:"fashion",badge:"SALE",img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85"},
  {id:4,name:"Wireless Studio Headphones",brand:"NOVA TECH",price:54.90,old:79.00,cat:"tech",badge:"HOT",img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85"},
  {id:5,name:"Classic Crossbody Bag",brand:"THE DAILY EDIT",price:35.00,old:null,cat:"fashion",badge:"NEW",img:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=85"},
  {id:6,name:"Soft Ribbed Lounge Set",brand:"OMAR HOME",price:32.90,old:45.00,cat:"fashion",badge:"-27%",img:"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=700&q=85"},
  {id:7,name:"Smart Desk Lamp",brand:"NOVA HOME",price:26.50,old:null,cat:"home",badge:"SMART PICK",img:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=85"},
  {id:8,name:"Urban Utility Backpack",brand:"MOVE",price:41.00,old:55.00,cat:"fashion",badge:"SALE",img:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85"},
  {id:9,name:"Portable Bluetooth Speaker",brand:"NOVA TECH",price:31.90,old:44.00,cat:"tech",badge:"TRENDING",img:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=700&q=85"},
  {id:10,name:"Textured Ceramic Vase",brand:"OMAR HOME",price:24.00,old:null,cat:"home",badge:"NEW",img:"https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=700&q=85"},
  {id:11,name:"Everyday Oversized Hoodie",brand:"OMAR ESSENTIALS",price:37.90,old:51.00,cat:"fashion",badge:"POPULAR",img:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=85"},
  {id:12,name:"Compact Mechanical Keyboard",brand:"NOVA TECH",price:45.00,old:64.00,cat:"tech",badge:"DEAL",img:"https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=700&q=85"},
  {id:13,name:"Cotton Throw & Cushion Set",brand:"OMAR HOME",price:28.50,old:38.00,cat:"home",badge:"HOME EDIT",img:"https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=700&q=85"},
  {id:14,name:"Modern Sunglasses",brand:"ALTAMIMI EDIT",price:19.90,old:null,cat:"fashion",badge:"NEW",img:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=85"},
  {id:15,name:"Fast Wireless Charger",brand:"NOVA TECH",price:22.00,old:29.00,cat:"tech",badge:"-24%",img:"https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=700&q=85"}
];

const flags={
  sqli:"FLAG{SQL_LOGIC_CHANGED}",xss:"FLAG{DOM_EXECUTION_CONFIRMED}",idor:"FLAG{OBJECT_AUTH_MISSING}",
  auth:"FLAG{ACCOUNT_ENUMERATION}",session:"FLAG{SESSION_ID_REUSED}",csrf:"FLAG{STATE_CHANGED_WITHOUT_TOKEN}",
  upload:"FLAG{MIME_TRUST_BROKEN}",traversal:"FLAG{PATH_LEFT_DOCS_ROOT}",cmd:"FLAG{SECOND_COMMAND_EXECUTED}",ssrf:"FLAG{INTERNAL_SERVICE_REACHED}"
};

const state={cart:JSON.parse(localStorage.getItem("oa-cart")||"[]"),wish:new Set(JSON.parse(localStorage.getItem("oa-wish")||"[]")),shown:10,filter:"all"};
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
const money=n=>"$"+Number(n).toFixed(2);
async function api(url,options={}){const r=await fetch(url,{headers:{"Content-Type":"application/json",...(options.headers||{})},...options});const data=await r.json().catch(()=>({}));if(!r.ok)throw new Error(data.error||"The store service is unavailable.");return data}
const fromDatabase=p=>({id:p.id,name:p.name,brand:p.brand,price:Number(p.price),old:p.old_price===null?null:Number(p.old_price),cat:p.category,badge:p.badge,img:p.image_url});

function productCard(p){
  return `<article class="product-card" data-cat="${p.cat}">
    <div class="product-photo" data-product="${p.id}"><img src="${p.img}" alt="${p.name}" loading="lazy"><span class="badge ${/SALE|%/.test(p.badge)?"sale":""}">${p.badge}</span>
      <button class="wish-btn ${state.wish.has(p.id)?"active":""}" data-wish="${p.id}" aria-label="Save ${p.name}">${state.wish.has(p.id)?"♥":"♡"}</button>
      <button class="quick-add" data-add="${p.id}">QUICK ADD</button></div>
    <div class="product-info"><small>${p.brand}</small><h3>${p.name}</h3><div class="price-line"><b>${money(p.price)}</b>${p.old?`<del>${money(p.old)}</del>`:""}<span class="stars">★★★★★</span></div></div>
  </article>`;
}

function renderCategories(){
  $("#categoryGrid").innerHTML=categories.map(c=>`<article class="category-card" data-category="${c[0]}"><div class="category-image"><img src="${c[1]}" alt="${c[0]}" loading="lazy"></div><b>${c[0]}</b></article>`).join("");
}
function renderProducts(){
  $("#dealGrid").innerHTML=products.slice(0,4).map(productCard).join("");
  const list=products.filter(p=>state.filter==="all"||p.cat===state.filter).slice(0,state.shown);
  $("#productGrid").innerHTML=list.map(productCard).join("");
  $("#loadMoreBtn").hidden=list.length>=products.filter(p=>state.filter==="all"||p.cat===state.filter).length;
  bindProductActions();
}
function bindProductActions(){
  $$("[data-product]").forEach(el=>el.addEventListener("click",e=>{if(!e.target.closest("button"))openProduct(Number(el.dataset.product))}));
  $$("[data-add]").forEach(b=>b.addEventListener("click",()=>addToCart(Number(b.dataset.add))));
  $$("[data-wish]").forEach(b=>b.addEventListener("click",()=>toggleWish(Number(b.dataset.wish))));
}
function saveState(){localStorage.setItem("oa-cart",JSON.stringify(state.cart));localStorage.setItem("oa-wish",JSON.stringify([...state.wish]));updateCounts()}
function updateCounts(){$("#cartCount").textContent=state.cart.length;$("#wishCount").textContent=state.wish.size}
function addToCart(id){state.cart.push(id);saveState();toast("Added to your shopping cart")}
function toggleWish(id){state.wish.has(id)?state.wish.delete(id):state.wish.add(id);saveState();renderProducts();toast(state.wish.has(id)?"Saved to wishlist":"Removed from wishlist")}

function openProduct(id){
  const p=products.find(x=>x.id===id); if(!p)return;
  $("#productModalContent").innerHTML=`<div class="modal-product"><img src="${p.img}" alt="${p.name}"><div class="modal-detail"><small>${p.brand}</small><h2 id="modalProductTitle">${p.name}</h2><div class="modal-price"><b>${money(p.price)}</b> ${p.old?`<del>${money(p.old)}</del>`:""}</div><p>Designed for everyday use with a clean finish and dependable quality. Easy to style, easy to love.</p><b>Select size</b><div class="size-row"><button>S</button><button>M</button><button>L</button><button>XL</button></div><button class="modal-add" data-modal-add="${p.id}">ADD TO CART</button><div class="review-box"><b>Write a product review</b><textarea id="reviewText" placeholder="Share your experience"></textarea><button id="reviewBtn">SUBMIT REVIEW</button><div class="form-response" id="reviewResponse"></div></div></div></div>`;
  $("#productModal").hidden=false;showOverlay();
  $("[data-modal-add]").addEventListener("click",()=>addToCart(p.id));
  $("#reviewBtn").addEventListener("click",submitReview);
}
function submitReview(){
  const text=$("#reviewText").value, out=$("#reviewResponse");
  if(/<\s*(script|img)[^>]*(onerror|alert\s*\()/i.test(text)){
    setResponse(out,"Review renderer event: onerror → alert(1) simulated\n"+flags.xss,"data");
  }else if(text.trim()) setResponse(out,`Thank you. Your review “${text.slice(0,50)}” is pending approval.`,"success");
  else setResponse(out,"Please enter your review.","error");
}

function renderCart(){
  const wrap=$("#cartItems");
  if(!state.cart.length){wrap.innerHTML='<div class="empty-state"><b>Your bag is empty</b><span>Discover something you will love.</span></div>';$("#cartTotal").textContent="$0.00";return}
  wrap.innerHTML=state.cart.map((id,i)=>{const p=products.find(x=>x.id===id);return `<article class="cart-item"><img src="${p.img}" alt=""><div><small>${p.brand}</small><h4>${p.name}</h4><b>${money(p.price)}</b></div><button data-remove="${i}">×</button></article>`}).join("");
  $("#cartTotal").textContent=money(state.cart.reduce((sum,id)=>sum+products.find(p=>p.id===id).price,0));
  $$("[data-remove]",wrap).forEach(b=>b.addEventListener("click",()=>{state.cart.splice(Number(b.dataset.remove),1);saveState();renderCart()}));
}
function showOverlay(){$("#overlay").hidden=false;document.body.style.overflow="hidden"}
function closeAll(){$$(".drawer").forEach(d=>{d.classList.remove("open");d.setAttribute("aria-hidden","true")});$("#productModal").hidden=true;$("#overlay").hidden=true;document.body.style.overflow=""}
function openDrawer(id){closeAll();const d=$(id);d.classList.add("open");d.setAttribute("aria-hidden","false");showOverlay()}
function openAccount(view="signin"){openDrawer("#accountDrawer");switchAccount(view)}
function switchAccount(view){$$("[data-panel]").forEach(p=>p.classList.toggle("active",p.dataset.panel===view));$$("[data-view]").forEach(b=>b.classList.toggle("active",b.dataset.view===view))}
function setResponse(el,text,type="success"){el.textContent=text;el.className="form-response "+type}

async function runSearch(q){
  const out=$("#productGrid"), value=q.trim();
  if(/\bor\s+1\s*=\s*1/i.test(value)){
    const hidden={id:99,name:"Internal Inventory Export",brand:"DATABASE RESPONSE",price:0,old:null,cat:"tech",badge:"PRIVATE",img:"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=80"};
    out.innerHTML=`<div class="search-status">Showing all inventory rows for <b>${escapeHtml(value)}</b><br><span class="challenge-mark">${flags.sqli}</span></div>`+[...products,hidden].map(productCard).join("");
  }else{
    let result;try{const data=await api(`/api/products?q=${encodeURIComponent(value)}`);result=data.products.map(fromDatabase)}catch{result=products.filter(p=>(p.name+" "+p.brand+" "+p.cat).toLowerCase().includes(value.toLowerCase()))}
    out.innerHTML=`<div class="search-status">${result.length} results for “${escapeHtml(value)}”</div>`+(result.length?result.map(productCard).join(""):"");
  }
  bindProductActions();location.hash="recommended";
}

async function login(e){
  e.preventDefault();const user=$("#loginUser").value.trim().toLowerCase(),pass=$("#loginPass").value,out=$("#loginResponse");
  if(user==="student"&&pass==="student123"){try{const data=await api("/api/auth/login",{method:"POST",body:JSON.stringify({email:"student@shop.local",password:pass})});setResponse(out,`Signed in successfully. Welcome back, ${data.user.name}.`,"success")}catch{setResponse(out,"Signed in successfully. Welcome back, Student.","success")}}
  else if(user==="alice@lab.local")setResponse(out,"Password reset available: registered account confirmed.\n"+flags.auth,"data");
  else setResponse(out,"Account does not exist.","error");
}
async function viewOrder(e){
  e.preventDefault();const id=$("#orderId").value.trim(),email=$("#orderEmail").value.trim(),out=$("#orderResponse");
  if(id==="1002")setResponse(out,'{"id":1002,"owner":"bob","item":"Studio Camera","total":84}\n'+flags.idor,"data");
  else try{const data=await api(`/api/orders?number=${encodeURIComponent(id)}&email=${encodeURIComponent(email)}`),order=data.order;setResponse(out,`Order #${order.order_number}\nOwner: ${order.customer_name}\nItem: ${order.order_items.map(x=>x.product_name).join(", ")}\nStatus: ${order.status}`,"data")}catch(err){setResponse(out,err.message,"error")}
}
function trackOrder(e){
  e.preventDefault();const code=$("#trackingCode").value,out=$("#trackingResponse");
  if(/;\s*echo\s+LAB_CMD_MARKER/i.test(code))setResponse(out,"TRK-1001: In transit\nLAB_CMD_MARKER\n"+flags.cmd,"data");
  else setResponse(out,`${code}: Package is in transit — estimated delivery in 3 days.`,"success");
}
async function uploadReturn(e){
  e.preventDefault();const file=$("#returnFile").files[0],out=$("#uploadResponse"),orderNumber=$("#returnOrderNumber").value.trim(),email=$("#returnEmail").value.trim();
  if(!file){setResponse(out,"Choose an attachment first.","error");return}
  let content="";try{content=await file.text()}catch{}
  if(/\.png$/i.test(file.name)&&/LAB_MARKER/i.test(content))setResponse(out,`Upload accepted as image/png: ${file.name}\n${flags.upload}`,"data");
  else if(!/\.(png|jpe?g|pdf)$/i.test(file.name))setResponse(out,"Unsupported file type.","error");
  else {try{if(file.size>2*1024*1024)throw new Error("Attachment must be smaller than 2 MB.");const raw=await file.arrayBuffer(),b64=btoa(String.fromCharCode(...new Uint8Array(raw)));await api("/api/returns",{method:"POST",body:JSON.stringify({orderNumber,email,fileName:file.name,contentType:file.type,contentBase64:b64})});setResponse(out,`${file.name} uploaded successfully. Return request opened and saved.`,"success")}catch(err){setResponse(out,err.message,"error")}}
}
function invoice(e){
  e.preventDefault();const path=$("#invoicePath").value.trim(),out=$("#invoiceResponse");
  if(/(\.\.\/|\.\.%2f)+marker\.txt/i.test(path))setResponse(out,"LAB_PATH_MARKER\nsource: /shop/marker.txt\n"+flags.traversal,"data");
  else setResponse(out,`Invoice ready: ${path}`,"success");
}
function preview(e){
  e.preventDefault();const url=$("#previewUrl").value.trim(),out=$("#previewResponse");
  if(/^http:\/\/127\.0\.0\.1:9001\/health\/?$/i.test(url))setResponse(out,'{"service":"admin-api","status":"healthy"}\n'+flags.ssrf,"data");
  else setResponse(out,"Preview generated for public product image.","success");
}
function updateEmail(e){
  e.preventDefault();const token=$("#csrfToken")?.value||"",email=$("#newEmail").value,out=$("#emailResponse");
  if(!token.trim())setResponse(out,`Email updated without a verification token: ${email}\n${flags.csrf}`,"data");
  else setResponse(out,"Email update request accepted with a valid security token.","success");
}
function restoreSession(e){
  e.preventDefault();const sid=$("#sessionCode").value.trim().toUpperCase(),out=$("#sessionResponse");
  if(sid==="LAB123")setResponse(out,"session before: LAB123\nsession after: LAB123\n"+flags.session,"data");
  else setResponse(out,`Session restored with new ID: SID${Math.random().toString(16).slice(2,10).toUpperCase()}`,"success");
}

let toastTimer;function toast(msg){const el=$("#toast");el.textContent=msg;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),2500)}
function startTimer(){let s=8*3600+24*60+18;setInterval(()=>{s=Math.max(0,s-1);const h=String(Math.floor(s/3600)).padStart(2,"0"),m=String(Math.floor(s%3600/60)).padStart(2,"0"),x=String(s%60).padStart(2,"0");$("#dealTimer").textContent=`${h} : ${m} : ${x}`},1000)}

$("#searchForm").addEventListener("submit",e=>{e.preventDefault();runSearch($("#searchInput").value)});
$("#cartBtn").addEventListener("click",()=>{renderCart();openDrawer("#cartDrawer")});
$("#accountBtn").addEventListener("click",()=>openAccount());
$("#wishlistBtn").addEventListener("click",()=>toast(`${state.wish.size} saved item${state.wish.size===1?"":"s"}`));
$("#overlay").addEventListener("click",closeAll);$$("[data-close]").forEach(b=>b.addEventListener("click",closeAll));
$("#accountTabs").addEventListener("click",e=>{const b=e.target.closest("[data-view]");if(b)switchAccount(b.dataset.view)});
$$("[data-account-view]").forEach(b=>b.addEventListener("click",()=>openAccount(b.dataset.accountView)));
$("#loginForm").addEventListener("submit",login);$("#orderForm").addEventListener("submit",viewOrder);$("#trackingForm").addEventListener("submit",trackOrder);
$("#uploadForm").addEventListener("submit",uploadReturn);$("#invoiceForm").addEventListener("submit",invoice);$("#previewForm").addEventListener("submit",preview);
$("#emailForm").insertAdjacentHTML("afterbegin",'<input id="csrfToken" type="hidden" value="SAFE_TOKEN">');
$("#emailForm").addEventListener("submit",updateEmail);$("#sessionForm").addEventListener("submit",restoreSession);
$("#returnFile").addEventListener("change",()=>$("#fileName").textContent=$("#returnFile").files[0]?.name||"Choose JPG, PNG or PDF");
$("#checkoutBtn").addEventListener("click",()=>toast("Demo checkout is ready — no real payment is collected"));
$("#newsletterForm").addEventListener("submit",async e=>{e.preventDefault();const email=e.target.querySelector("input").value;try{await api("/api/newsletter",{method:"POST",body:JSON.stringify({email})});e.target.reset();toast("Welcome to OMAR ALTAMIMI — your email was saved.")}catch(err){toast(err.message)}});
$("#mobileMenuBtn").addEventListener("click",()=>$("#categoryNav").classList.toggle("open"));
$("#filterRow").addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(!b)return;state.filter=b.dataset.filter;state.shown=10;$$("[data-filter]").forEach(x=>x.classList.toggle("active",x===b));renderProducts()});
$("#loadMoreBtn").addEventListener("click",()=>{state.shown+=5;renderProducts()});
$("#categoryGrid").addEventListener("click",e=>{const c=e.target.closest("[data-category]");if(!c)return;$("#searchInput").value=c.dataset.category;runSearch(c.dataset.category)});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeAll()});

renderCategories();renderProducts();updateCounts();startTimer();
