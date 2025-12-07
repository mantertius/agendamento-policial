module.exports=[22734,(e,t,r)=>{t.exports=e.x("fs",()=>require("fs"))},93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},14747,(e,t,r)=>{t.exports=e.x("path",()=>require("path"))},25372,(e,t,r)=>{t.exports=e.x("better-sqlite3",()=>require("better-sqlite3"))},23182,e=>{"use strict";var t=e.i(25372),r=e.i(14747),a=e.i(22734);let n=r.default.join(process.cwd(),"data","agendamento.db"),o=null;e.s(["default",0,function(){if(o)return o;let e=r.default.dirname(n);a.default.existsSync(e)||a.default.mkdirSync(e,{recursive:!0}),(o=new t.default(n)).pragma("journal_mode = WAL"),o.exec(`
    CREATE TABLE IF NOT EXISTS slots (
      id TEXT PRIMARY KEY,
      date TEXT NOT NULL,
      start_time TEXT NOT NULL,
      end_time TEXT NOT NULL,
      is_booked INTEGER DEFAULT 0,
      is_disabled INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      slot_id TEXT NOT NULL,
      name TEXT NOT NULL,
      cpf TEXT,
      phone TEXT,
      email TEXT,
      description TEXT,
      created_at TEXT NOT NULL,
      status TEXT DEFAULT 'confirmed',
      FOREIGN KEY (slot_id) REFERENCES slots(id)
    );
    
    -- Migra\xe7\xe3o: Adicionar coluna status se n\xe3o existir (para bancos existentes)
    PRAGMA user_version;
  `);try{o.prepare("PRAGMA table_info(bookings)").all().some(e=>"status"===e.name)||o.prepare("ALTER TABLE bookings ADD COLUMN status TEXT DEFAULT 'confirmed'").run()}catch(e){console.error("Erro ao verificar/migrar tabela bookings:",e)}o.exec(`
    CREATE TABLE IF NOT EXISTS availability_configs (
      id TEXT PRIMARY KEY,
      start_date TEXT NOT NULL,

    CREATE TABLE IF NOT EXISTS availability_configs (
      id TEXT PRIMARY KEY,
      start_date TEXT NOT NULL,
      end_date TEXT NOT NULL,
      start_time TEXT NOT NULL,
      end_time TEXT NOT NULL,
      slot_duration INTEGER NOT NULL,
      days_of_week TEXT NOT NULL,
      lunch_break_enabled INTEGER DEFAULT 0,
      lunch_break_start TEXT,
      lunch_break_duration INTEGER
    );

    CREATE TABLE IF NOT EXISTS counters (
      name TEXT PRIMARY KEY,
      value INTEGER DEFAULT 0
    );

    CREATE INDEX IF NOT EXISTS idx_slots_date ON slots(date);
    CREATE INDEX IF NOT EXISTS idx_bookings_slot_id ON bookings(slot_id);
  `),o.prepare("SELECT value FROM counters WHERE name = 'booking'").get()||o.prepare("INSERT INTO counters (name, value) VALUES ('booking', 0)").run();try{o.exec("ALTER TABLE slots ADD COLUMN is_disabled INTEGER DEFAULT 0")}catch{}try{o.exec("ALTER TABLE availability_configs ADD COLUMN lunch_break_enabled INTEGER DEFAULT 0")}catch{}try{o.exec("ALTER TABLE availability_configs ADD COLUMN lunch_break_start TEXT")}catch{}try{o.exec("ALTER TABLE availability_configs ADD COLUMN lunch_break_duration INTEGER")}catch{}try{o.exec("ALTER TABLE bookings ADD COLUMN cpf TEXT")}catch{}try{o.prepare("PRAGMA table_info(slots)").all().some(e=>"is_internal"===e.name)||o.prepare("ALTER TABLE slots ADD COLUMN is_internal INTEGER DEFAULT 0").run()}catch(e){console.error("Erro ao verificar/migrar tabela slots (is_internal):",e)}return o}])},24361,(e,t,r)=>{t.exports=e.x("util",()=>require("util"))},50599,e=>{"use strict";var t=e.i(90010);let r=e.i(96219).default.createTransport({service:"gmail",auth:{user:process.env.GMAIL_USER,pass:process.env.GMAIL_APP_PASSWORD}});async function a({to:e,subject:t,html:a}){let n={from:process.env.GMAIL_USER,to:e,subject:t,html:a};return r.sendMail(n)}async function n(e){try{let{to:a,subject:n,html:o}=await e.json();if(!a||!n||!o)return t.NextResponse.json({error:"Campos obrigatórios: to, subject, html"},{status:400});if(!process.env.GMAIL_USER||!process.env.GMAIL_APP_PASSWORD)return console.warn("Credenciais do Gmail não configuradas. Email não enviado."),t.NextResponse.json({success:!0,message:"Email não enviado (credenciais não configuradas)",emailSent:!1});return await r.sendMail({from:`"Agendamento Policial" <${process.env.GMAIL_USER}>`,to:a,subject:n,html:o}),t.NextResponse.json({success:!0,emailSent:!0})}catch(e){return console.error("Erro ao enviar email:",e),t.NextResponse.json({error:"Erro ao enviar email",details:String(e)},{status:500})}}e.s(["POST",()=>n,"sendEmail",()=>a])},60139,e=>{"use strict";var t=e.i(54109),r=e.i(16167),a=e.i(80906),n=e.i(51743),o=e.i(89870),s=e.i(71397),i=e.i(6930),l=e.i(37533),d=e.i(4994),c=e.i(1822),u=e.i(65452),p=e.i(1482),E=e.i(13776),T=e.i(24703),R=e.i(14729),m=e.i(145),x=e.i(93695);e.i(31727);var g=e.i(92994),A=e.i(90010),f=e.i(23182),N=e.i(50599);async function h(e){try{let t,{date:r,startTime:a,endTime:n,name:o,email:s,phone:i,cpf:l,description:d}=await e.json();if(!r||!a||!n||!o)return A.NextResponse.json({error:"Dados incompletos"},{status:400});let c=(0,f.default)(),u=c.prepare("SELECT * FROM slots WHERE date = ? AND start_time = ?").get(r,a);if(u){if(u.is_booked)return A.NextResponse.json({error:"Já existe um agendamento neste horário."},{status:409});t=u.id,c.prepare("UPDATE slots SET is_booked = 1, is_internal = 1 WHERE id = ?").run(t)}else t=crypto.randomUUID(),c.prepare(`
        INSERT INTO slots (id, date, start_time, end_time, is_booked, is_disabled, is_internal)
        VALUES (?, ?, ?, ?, 1, 0, 1)
      `).run(t,r,a,n);let p=c.transaction(()=>(c.prepare("UPDATE counters SET value = value + 1 WHERE name = 'booking'").run(),c.prepare("SELECT value FROM counters WHERE name = 'booking'").get().value))().toString(),E=new Date().toISOString();if(c.prepare(`
      INSERT INTO bookings (id, slot_id, name, cpf, phone, email, description, created_at, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'confirmed')
    `).run(p,t,o,l,i,s,d,E),s)try{await (0,N.sendEmail)({to:s,subject:"Agendamento Interno Confirmado - Polícia Civil AL",html:`
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1e3a8a;">Agendamento Confirmado</h2>
              <p>Ol\xe1 <strong>${o}</strong>,</p>
              <p>Seu agendamento foi realizado com sucesso pela administra\xe7\xe3o.</p>
              
              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 5px 0;"><strong>Data:</strong> ${new Date(r+"T00:00:00").toLocaleDateString("pt-BR")}</p>
                <p style="margin: 5px 0;"><strong>Hor\xe1rio:</strong> ${a} - ${n}</p>
                <p style="margin: 5px 0;"><strong>Protocolo:</strong> #${p}</p>
              </div>

              <p>Por favor, compare\xe7a com documento de identifica\xe7\xe3o original.</p>
              
              <hr style="border: 1px solid #e5e7eb; margin: 20px 0;" />
              <p style="color: #6b7280; font-size: 12px;">Este \xe9 um e-mail autom\xe1tico, n\xe3o responda.</p>
            </div>
          `})}catch(e){console.error("Erro ao enviar email:",e)}return A.NextResponse.json({success:!0,booking:{id:p,slotId:t,name:o,date:r,startTime:a,endTime:n}})}catch(e){return console.error("Erro ao criar agendamento interno:",e),A.NextResponse.json({error:"Erro interno do servidor"},{status:500})}}e.s(["POST",()=>h],13325);var v=e.i(13325);let _=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/bookings/internal/route",pathname:"/api/bookings/internal",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/OneDrive/Desktop/Programming/agendamento-policial/app/api/bookings/internal/route.ts",nextConfigOutput:"",userland:v}),{workAsyncStorage:L,workUnitAsyncStorage:b,serverHooks:S}=_;function y(){return(0,a.patchFetch)({workAsyncStorage:L,workUnitAsyncStorage:b})}async function O(e,t,a){_.isDev&&(0,n.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let A="/api/bookings/internal/route";A=A.replace(/\/index$/,"")||"/";let f=await _.prepare(e,t,{srcPage:A,multiZoneDraftMode:!1});if(!f)return t.statusCode=400,t.end("Bad Request"),null==a.waitUntil||a.waitUntil.call(a,Promise.resolve()),null;let{buildId:N,params:h,nextConfig:v,parsedUrl:L,isDraftMode:b,prerenderManifest:S,routerServerContext:y,isOnDemandRevalidate:O,revalidateOnlyGenerated:I,resolvedPathname:C,clientReferenceManifest:U,serverActionsManifest:k}=f,w=(0,l.normalizeAppPath)(A),D=!!(S.dynamicRoutes[w]||S.routes[C]),P=async()=>((null==y?void 0:y.render404)?await y.render404(e,t,L,!1):t.end("This page could not be found"),null);if(D&&!b){let e=!!S.routes[C],t=S.dynamicRoutes[w];if(t&&!1===t.fallback&&!e){if(v.experimental.adapterPath)return await P();throw new x.NoFallbackError}}let M=null;!D||_.isDev||b||(M="/index"===(M=C)?"/":M);let X=!0===_.isDev||!D,j=D&&!X;k&&U&&(0,s.setReferenceManifestsSingleton)({page:A,clientReferenceManifest:U,serverActionsManifest:k,serverModuleMap:(0,i.createServerModuleMap)({serverActionsManifest:k})});let F=e.method||"GET",q=(0,o.getTracer)(),G=q.getActiveScopeSpan(),H={params:h,prerenderManifest:S,renderOpts:{experimental:{authInterrupts:!!v.experimental.authInterrupts},cacheComponents:!!v.cacheComponents,supportsDynamicResponse:X,incrementalCache:(0,n.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:v.cacheLife,waitUntil:a.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,a)=>_.onRequestError(e,t,a,y)},sharedContext:{buildId:N}},B=new d.NodeNextRequest(e),$=new d.NodeNextResponse(t),K=c.NextRequestAdapter.fromNodeNextRequest(B,(0,c.signalFromNodeResponse)(t));try{let s=async e=>_.handle(K,H).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let r=q.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==u.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let a=r.get("next.route");if(a){let t=`${F} ${a}`;e.setAttributes({"next.route":a,"http.route":a,"next.span_name":t}),e.updateName(t)}else e.updateName(`${F} ${A}`)}),i=!!(0,n.getRequestMeta)(e,"minimalMode"),l=async n=>{var o,l;let d=async({previousCacheEntry:r})=>{try{if(!i&&O&&I&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let o=await s(n);e.fetchMetrics=H.renderOpts.fetchMetrics;let l=H.renderOpts.pendingWaitUntil;l&&a.waitUntil&&(a.waitUntil(l),l=void 0);let d=H.renderOpts.collectedTags;if(!D)return await (0,E.sendResponse)(B,$,o,H.renderOpts.pendingWaitUntil),null;{let e=await o.blob(),t=(0,T.toNodeOutgoingHttpHeaders)(o.headers);d&&(t[m.NEXT_CACHE_TAGS_HEADER]=d),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==H.renderOpts.collectedRevalidate&&!(H.renderOpts.collectedRevalidate>=m.INFINITE_CACHE)&&H.renderOpts.collectedRevalidate,a=void 0===H.renderOpts.collectedExpire||H.renderOpts.collectedExpire>=m.INFINITE_CACHE?void 0:H.renderOpts.collectedExpire;return{value:{kind:g.CachedRouteKind.APP_ROUTE,status:o.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:a}}}}catch(t){throw(null==r?void 0:r.isStale)&&await _.onRequestError(e,t,{routerKind:"App Router",routePath:A,routeType:"route",revalidateReason:(0,p.getRevalidateReason)({isStaticGeneration:j,isOnDemandRevalidate:O})},y),t}},c=await _.handleResponse({req:e,nextConfig:v,cacheKey:M,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:S,isRoutePPREnabled:!1,isOnDemandRevalidate:O,revalidateOnlyGenerated:I,responseGenerator:d,waitUntil:a.waitUntil,isMinimalMode:i});if(!D)return null;if((null==c||null==(o=c.value)?void 0:o.kind)!==g.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==c||null==(l=c.value)?void 0:l.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});i||t.setHeader("x-nextjs-cache",O?"REVALIDATED":c.isMiss?"MISS":c.isStale?"STALE":"HIT"),b&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let u=(0,T.fromNodeOutgoingHttpHeaders)(c.value.headers);return i&&D||u.delete(m.NEXT_CACHE_TAGS_HEADER),!c.cacheControl||t.getHeader("Cache-Control")||u.get("Cache-Control")||u.set("Cache-Control",(0,R.getCacheControlHeader)(c.cacheControl)),await (0,E.sendResponse)(B,$,new Response(c.value.body,{headers:u,status:c.value.status||200})),null};G?await l(G):await q.withPropagatedContext(e.headers,()=>q.trace(u.BaseServerSpan.handleRequest,{spanName:`${F} ${A}`,kind:o.SpanKind.SERVER,attributes:{"http.method":F,"http.target":e.url}},l))}catch(t){if(t instanceof x.NoFallbackError||await _.onRequestError(e,t,{routerKind:"App Router",routePath:w,routeType:"route",revalidateReason:(0,p.getRevalidateReason)({isStaticGeneration:j,isOnDemandRevalidate:O})}),D)throw t;return await (0,E.sendResponse)(B,$,new Response(null,{status:500})),null}}e.s(["handler",()=>O,"patchFetch",()=>y,"routeModule",()=>_,"serverHooks",()=>S,"workAsyncStorage",()=>L,"workUnitAsyncStorage",()=>b],60139)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__eaae6462._.js.map