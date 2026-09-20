const labs = [
  {
    id:"sqli", code:"01", name:"حقن قواعد البيانات", en:"SQL INJECTION", cwe:"CWE-89", risk:"HIGH",
    target:"GET /lab/products?id=1", brief:"اختبر متغير id وحدد هل يغيّر بنية الاستعلام الافتراضي.",
    objective:"اعرض أكثر من منتج بطلب واحد", flag:"FLAG{SQL_LOGIC_CHANGED}",
    hint:"جرّب إضافة شرط منطقي صحيح دائمًا إلى القيمة 1.",
    steps:["نفّذ الطلب بالقيمة الأصلية 1.","غيّر قيمة id فقط دون أي حقل آخر.","استخرج الـ Flag من الاستجابة غير الطبيعية."],
    fields:[{key:"id",label:"قيمة id",value:"1",type:"text"}],
    run:v=> /\bor\s+1\s*=\s*1/i.test(v.id) ? ok("200 OK",["[1] Keyboard — $45","[2] Security Key — $32","[3] Lab Router — $76"],"FLAG{SQL_LOGIC_CHANGED}") : normal("200 OK",["[1] Keyboard — $45"])
  },
  {
    id:"xss", code:"02", name:"البرمجة عبر المواقع", en:"CROSS SITE SCRIPTING", cwe:"CWE-79", risk:"HIGH",
    target:"GET /lab/search?q=hello", brief:"اكتشف هل قيمة البحث تدخل إلى DOM كنص أم كعنصر قابل للتنفيذ.",
    objective:"شغّل alert افتراضيًا داخل الصفحة", flag:"FLAG{DOM_EXECUTION_CONFIRMED}",
    hint:"استخدم عنصر img بحدث onerror بدل وسم نصي عادي.",
    steps:["ابحث بكلمة عادية وشاهد DOM الافتراضي.","استخدم حمولة لا تقرأ Cookies ولا ترسل طلبات.","التقط الـ Flag بعد رصد حدث JavaScript."],
    fields:[{key:"q",label:"قيمة q",value:"hello",type:"textarea"}],
    run:v=> /<\s*(script|img)[^>]*(onerror|alert\s*\()/i.test(v.q) ? ok("200 OK",["DOM node created","event: onerror","alert(1) simulated"],"FLAG{DOM_EXECUTION_CONFIRMED}") : normal("200 OK",[`Results for: ${escapeText(v.q)}`])
  },
  {
    id:"idor", code:"03", name:"الوصول المباشر غير الآمن", en:"IDOR / BOLA", cwe:"CWE-639", risk:"HIGH",
    target:"GET /lab/api/orders/1001", brief:"أنت داخل جلسة alice. اختبر هل الخادم يتحقق من مالك الطلب.",
    objective:"اعرض طلب bob الوهمي دون تعديله", flag:"FLAG{OBJECT_AUTH_MISSING}",
    hint:"غيّر رقم الطلب من 1001 إلى رقم الطلب المجاور.",
    steps:["اطلب 1001 المملوك لـ alice.","ثبّت الجلسة وغيّر رقم الكائن فقط.","سجل اسم المالك والـ Flag من JSON."],
    fields:[{key:"order",label:"رقم الطلب",value:"1001",type:"text"}],
    run:v=> v.order.trim()==="1002" ? ok("200 OK",['{"id":1002,"owner":"bob","item":"Lab Camera","total":84}'],"FLAG{OBJECT_AUTH_MISSING}") : normal("200 OK",['{"id":1001,"owner":"alice","item":"Security Key","total":32}'])
  },
  {
    id:"auth", code:"04", name:"كسر المصادقة", en:"BROKEN AUTHENTICATION", cwe:"CWE-204", risk:"HIGH",
    target:"POST /lab/reset-password", brief:"قارن رسائل الاستعادة وحدد هل تكشف وجود الحساب.",
    objective:"أكد وجود حساب تدريبي من اختلاف الرد", flag:"FLAG{ACCOUNT_ENUMERATION}",
    hint:"جرّب alice@lab.local ثم بريدًا عشوائيًا وقارن الرسالة.",
    steps:["أرسل بريدًا غير موجود وسجل الرد.","أرسل البريد التدريبي الموجود.","استخرج الـ Flag من فرق الاستجابة."],
    fields:[{key:"email",label:"البريد",value:"nobody@lab.local",type:"email"}],
    run:v=> v.email.trim().toLowerCase()==="alice@lab.local" ? ok("200 OK",["Reset link sent to registered account"],"FLAG{ACCOUNT_ENUMERATION}") : normal("404 NOT FOUND",["Account does not exist"])
  },
  {
    id:"session", code:"05", name:"تثبيت الجلسة", en:"SESSION FIXATION", cwe:"CWE-384", risk:"HIGH",
    target:"GET /lab/login?sid=LAB123", brief:"تحقق هل يتغير معرّف الجلسة بعد تسجيل الدخول الافتراضي.",
    objective:"أثبت بقاء SID الذي حدده العميل", flag:"FLAG{SESSION_ID_REUSED}",
    hint:"استخدم LAB123 كمعرّف جلسة ثم نفّذ تسجيل الدخول.",
    steps:["حدد SID قبل المصادقة.","نفّذ تسجيل الدخول بالحساب الوهمي.","قارن SID قبل الدخول وبعده."],
    fields:[{key:"sid",label:"Session ID",value:"RANDOM789",type:"text"},{key:"user",label:"المستخدم",value:"alice",type:"text"}],
    run:v=> v.sid.trim().toUpperCase()==="LAB123" ? ok("302 FOUND",["login: success","session before: LAB123","session after: LAB123"],"FLAG{SESSION_ID_REUSED}") : normal("302 FOUND",["login: success",`session after: ${randomId()}`])
  },
  {
    id:"csrf", code:"06", name:"تزوير الطلبات عبر المواقع", en:"CSRF", cwe:"CWE-352", risk:"MEDIUM",
    target:"POST /lab/profile/email", brief:"اختبر هل يقبل الخادم تغيير البريد عند غياب رمز CSRF.",
    objective:"غيّر البريد الوهمي بلا رمز حماية", flag:"FLAG{STATE_CHANGED_WITHOUT_TOKEN}",
    hint:"اترك csrf_token فارغًا وأرسل بريدًا مختلفًا.",
    steps:["نفّذ الطلب برمز SAFE_TOKEN.","احذف الرمز وأبقِ Cookie الافتراضية.","تحقق من تغير البريد واستخرج الـ Flag."],
    fields:[{key:"email",label:"البريد الجديد",value:"csrf-test@lab.local",type:"email"},{key:"token",label:"csrf_token",value:"SAFE_TOKEN",type:"text"}],
    run:v=> !v.token.trim() ? ok("200 OK",[`email updated: ${escapeText(v.email)}`],"FLAG{STATE_CHANGED_WITHOUT_TOKEN}") : normal("200 OK",["request accepted with valid token"])
  },
  {
    id:"upload", code:"07", name:"رفع الملفات غير الآمن", en:"UNRESTRICTED FILE UPLOAD", cwe:"CWE-434", risk:"HIGH",
    target:"POST /lab/avatar/upload", brief:"اختبر هل يثق الخادم في اسم الملف وContent-Type بدل المحتوى.",
    objective:"ارفع ملفًا نصيًا متنكرًا كصورة", flag:"FLAG{MIME_TRUST_BROKEN}",
    hint:"استخدم avatar.png وimage/png لكن اجعل المحتوى LAB_MARKER.",
    steps:["ثبت اسمًا وContent-Type لصورة PNG.","ضع نصًا خاملًا بدل بيانات الصورة.","تحقق هل قُبل الملف المتنكر."],
    fields:[{key:"filename",label:"اسم الملف",value:"avatar.png",type:"text"},{key:"mime",label:"Content-Type",value:"image/png",type:"text"},{key:"content",label:"المحتوى",value:"PNG_IMAGE_DATA",type:"textarea"}],
    run:v=> /\.png$/i.test(v.filename)&&/image\/png/i.test(v.mime)&&/LAB_MARKER/i.test(v.content) ? ok("201 CREATED",["upload accepted","detected by extension only"],"FLAG{MIME_TRUST_BROKEN}") : normal("201 CREATED",["valid image stored as avatar.png"])
  },
  {
    id:"traversal", code:"08", name:"اجتياز المسارات", en:"PATH TRAVERSAL", cwe:"CWE-22", risk:"HIGH",
    target:"GET /lab/view?file=guide.txt", brief:"حاول الخروج من مجلد docs وقراءة ملف marker الوهمي.",
    objective:"اقرأ marker.txt الموجود في الدليل الأب", flag:"FLAG{PATH_LEFT_DOCS_ROOT}",
    hint:"استخدم ../ قبل اسم الملف المطلوب.",
    steps:["اقرأ guide.txt أولًا.","أضف مقطع الرجوع إلى الدليل الأب.","استخرج النص والـ Flag من الملف الوهمي."],
    fields:[{key:"file",label:"قيمة file",value:"guide.txt",type:"text"}],
    run:v=> /(\.\.\/|\.\.%2f)marker\.txt/i.test(v.file) ? ok("200 OK",["LAB_PATH_MARKER","source: /lab/marker.txt"],"FLAG{PATH_LEFT_DOCS_ROOT}") : normal("200 OK",["Welcome to the lab guide."])
  },
  {
    id:"cmd", code:"09", name:"حقن أوامر النظام", en:"OS COMMAND INJECTION", cwe:"CWE-78", risk:"CRITICAL",
    target:"GET /lab/ping?host=127.0.0.1", brief:"أثبت تنفيذ أمر ثانٍ باستخدام echo خامل داخل المحاكي.",
    objective:"اطبع LAB_CMD_MARKER بعد نتيجة ping", flag:"FLAG{SECOND_COMMAND_EXECUTED}",
    hint:"افصل القيمة بفاصلة منقوطة ثم استخدم echo LAB_CMD_MARKER.",
    steps:["نفّذ ping إلى 127.0.0.1.","أضف أمر echo خاملًا فقط.","توقف بمجرد ظهور marker والـ Flag."],
    fields:[{key:"host",label:"قيمة host",value:"127.0.0.1",type:"text"}],
    run:v=> /;\s*echo\s+LAB_CMD_MARKER/i.test(v.host) ? ok("200 OK",["64 bytes from 127.0.0.1","LAB_CMD_MARKER"],"FLAG{SECOND_COMMAND_EXECUTED}") : normal("200 OK",["64 bytes from 127.0.0.1: time=0.04 ms"])
  },
  {
    id:"ssrf", code:"10", name:"تزوير الطلبات من جهة الخادم", en:"SSRF", cwe:"CWE-918", risk:"HIGH",
    target:"GET /lab/fetch?url=", brief:"استخدم خادم التطبيق للوصول إلى خدمة داخلية وهمية.",
    objective:"اقرأ /health من الخدمة 127.0.0.1:9001", flag:"FLAG{INTERNAL_SERVICE_REACHED}",
    hint:"ضع http://127.0.0.1:9001/health في قيمة url.",
    steps:["اطلب عنوانًا عامًا تجريبيًا أولًا.","غيّر الوجهة إلى خدمة loopback الوهمية.","استخرج حالة الخدمة والـ Flag."],
    fields:[{key:"url",label:"قيمة url",value:"https://example.test/public",type:"text"}],
    run:v=> /^http:\/\/127\.0\.0\.1:9001\/health\/?$/i.test(v.url.trim()) ? ok("200 OK",['{"service":"admin-api","status":"healthy"}'],"FLAG{INTERNAL_SERVICE_REACHED}") : normal("200 OK",["Public demo content loaded."])
  }
];

function ok(status,data,flag){return{status,data,flag,success:true}}
function normal(status,data){return{status,data,flag:null,success:false}}
function escapeText(s){return String(s).replace(/[<>&]/g,c=>({"<":"&lt;",">":"&gt;","&":"&amp;"}[c]))}
function randomId(){return "SID"+Math.random().toString(16).slice(2,10).toUpperCase()}

const state={current:0,completed:new Set(JSON.parse(localStorage.getItem("webRangeCompleted")||"[]"))};
const $=s=>document.querySelector(s);
const els={nav:$("#labNav"),module:$("#moduleCode"),title:$("#labTitle"),brief:$("#labBrief"),risk:$("#riskValue"),cwe:$("#cweValue"),target:$("#targetValue"),objective:$("#objectiveValue"),flagStatus:$("#flagStatus"),form:$("#labForm"),terminal:$("#terminal"),steps:$("#missionSteps"),hint:$("#hintBox"),flagInput:$("#flagInput"),flagFeedback:$("#flagFeedback"),progressText:$("#progressText"),progressBar:$("#progressBar"),toast:$("#toast")};

function renderNav(){els.nav.innerHTML=labs.map((l,i)=>`<button class="nav-item ${i===state.current?"active":""} ${state.completed.has(l.id)?"done":""}" data-index="${i}" type="button"><span class="num">${l.code}</span><span class="name">${l.name}</span><span class="dot"></span></button>`).join("");els.nav.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>selectLab(Number(b.dataset.index))))}
function updateProgress(){const n=state.completed.size;els.progressText.textContent=`${n} / ${labs.length}`;els.progressBar.style.width=`${n/labs.length*100}%`;localStorage.setItem("webRangeCompleted",JSON.stringify([...state.completed]))}
function selectLab(i){state.current=i;const l=labs[i];els.module.textContent=`MODULE ${l.code} // ${l.en}`;els.title.textContent=l.name;els.brief.textContent=l.brief;els.risk.textContent=l.risk;els.cwe.textContent=l.cwe;els.target.textContent=l.target;els.objective.textContent=l.objective;els.flagStatus.textContent=state.completed.has(l.id)?"تم التقاطه":"غير مكتشف";els.flagStatus.style.color=state.completed.has(l.id)?"var(--green)":"var(--amber)";els.form.innerHTML=l.fields.map(f=>`<div class="field"><label for="field-${f.key}">${f.label}</label>${f.type==="textarea"?`<textarea id="field-${f.key}" data-key="${f.key}">${f.value}</textarea>`:`<input id="field-${f.key}" data-key="${f.key}" type="${f.type||"text"}" value="${f.value}">`}</div>`).join("");els.steps.innerHTML=l.steps.map(s=>`<li>${s}</li>`).join("");els.hint.hidden=true;els.hint.textContent=l.hint;els.flagInput.value="";els.flagFeedback.textContent="";els.flagFeedback.className="";resetTerminal();renderNav();window.scrollTo({top:0,behavior:"smooth"})}
function resetTerminal(){els.terminal.innerHTML='<p class="muted">[system] أدخل قيمة ثم نفّذ الطلب.</p>'}
function values(){return Object.fromEntries([...els.form.querySelectorAll("[data-key]")].map(x=>[x.dataset.key,x.value]))}
function requestLine(l,v){return `${l.target.split("?")[0]}  ${JSON.stringify(v)}`}
function execute(){const l=labs[state.current],v=values(),r=l.run(v);els.terminal.innerHTML=`<p class="muted">[virtual-proxy] request captured</p><p class="request">${escapeText(requestLine(l,v))}</p><p class="status">HTTP/1.1 ${r.status}</p>${r.data.map(x=>`<p class="data">${x}</p>`).join("")}${r.flag?`<p class="flag">${r.flag}</p><p class="muted">[system] vulnerability condition matched</p>`:'<p class="muted">[system] baseline response — جرّب تعديل نقطة الإدخال.</p>'}`;els.terminal.scrollTop=els.terminal.scrollHeight;if(r.success)toast("تم الوصول إلى الاستجابة المطلوبة — التقط الـ Flag")}
function checkFlag(e){e.preventDefault();const l=labs[state.current];if(els.flagInput.value.trim()===l.flag){state.completed.add(l.id);els.flagFeedback.textContent="صحيح — تم تسجيل إنجاز المختبر.";els.flagFeedback.className="success";els.flagStatus.textContent="تم التقاطه";els.flagStatus.style.color="var(--green)";updateProgress();renderNav();toast("تم حل المختبر بنجاح")}else{els.flagFeedback.textContent="الـ Flag غير صحيح. نفّذ الاستغلال واقرأ الاستجابة بدقة.";els.flagFeedback.className="failure"}}
function resetLab(){selectLab(state.current);toast("أُعيد المختبر إلى حالته الأصلية")}
function resetAll(){if(!confirm("هل تريد حذف تقدم جميع المختبرات؟"))return;state.completed.clear();updateProgress();selectLab(0);toast("تمت إعادة ضبط جميع المختبرات")}
let toastTimer;function toast(msg){els.toast.textContent=msg;els.toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>els.toast.classList.remove("show"),2600)}
function clock(){document.querySelector("#clock").textContent=new Date().toLocaleTimeString("en-GB",{hour12:false})}

document.querySelector("#executeBtn").addEventListener("click",execute);
document.querySelector("#hintBtn").addEventListener("click",()=>els.hint.hidden=!els.hint.hidden);
document.querySelector("#resetLabBtn").addEventListener("click",resetLab);
document.querySelector("#resetAllBtn").addEventListener("click",resetAll);
document.querySelector("#flagForm").addEventListener("submit",checkFlag);
setInterval(clock,1000);clock();updateProgress();selectLab(0);

function registerModelTools(){
  const context=document.modelContext;
  if(!context?.registerTool)return;
  const lifecycle=new AbortController();
  const report=error=>console.warn("WebMCP registration failed",error);
  const register=tool=>{try{void Promise.resolve(context.registerTool(tool,{signal:lifecycle.signal})).catch(report)}catch(error){report(error)}};
  register({
    name:"list_training_labs",title:"عرض مختبرات الثغرات",
    description:"يعرض مختبرات ثغرات الويب المتاحة وحالة إنجاز كل مختبر دون تغيير التقدم.",
    inputSchema:{type:"object",properties:{},additionalProperties:false},
    annotations:{readOnlyHint:true,untrustedContentHint:false},
    execute(){return labs.map(l=>({id:l.id,name:l.name,cwe:l.cwe,completed:state.completed.has(l.id)}))}
  });
  register({
    name:"run_simulated_lab_request",title:"تنفيذ طلب مختبر محاكى",
    description:"يفتح مختبرًا محددًا، يضع قيم الإدخال، وينفذ الطلب داخل المحاكي الآمن فقط.",
    inputSchema:{type:"object",properties:{labId:{type:"string",enum:labs.map(l=>l.id)},values:{type:"object",additionalProperties:{type:"string"}}},required:["labId","values"],additionalProperties:false},
    annotations:{readOnlyHint:false,untrustedContentHint:false},
    execute(input){
      if(!input||typeof input!=="object")throw new Error("Invalid input");
      const index=labs.findIndex(l=>l.id===input.labId);
      if(index<0)throw new Error("Unknown labId");
      selectLab(index);
      for(const [key,value] of Object.entries(input.values||{})){
        const field=els.form.querySelector(`[data-key="${CSS.escape(key)}"]`);
        if(field)field.value=String(value);
      }
      const result=labs[index].run(values());
      execute();
      return {labId:input.labId,status:result.status,success:result.success,flag:result.flag,data:result.data};
    }
  });
}
registerModelTools();
