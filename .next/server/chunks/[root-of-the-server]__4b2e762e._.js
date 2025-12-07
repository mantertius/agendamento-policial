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
  `),o.prepare("SELECT value FROM counters WHERE name = 'booking'").get()||o.prepare("INSERT INTO counters (name, value) VALUES ('booking', 0)").run();try{o.exec("ALTER TABLE slots ADD COLUMN is_disabled INTEGER DEFAULT 0")}catch{}try{o.exec("ALTER TABLE availability_configs ADD COLUMN lunch_break_enabled INTEGER DEFAULT 0")}catch{}try{o.exec("ALTER TABLE availability_configs ADD COLUMN lunch_break_start TEXT")}catch{}try{o.exec("ALTER TABLE availability_configs ADD COLUMN lunch_break_duration INTEGER")}catch{}try{o.exec("ALTER TABLE bookings ADD COLUMN cpf TEXT")}catch{}try{o.prepare("PRAGMA table_info(slots)").all().some(e=>"is_internal"===e.name)||o.prepare("ALTER TABLE slots ADD COLUMN is_internal INTEGER DEFAULT 0").run()}catch(e){console.error("Erro ao verificar/migrar tabela slots (is_internal):",e)}return o}])},24361,(e,t,r)=>{t.exports=e.x("util",()=>require("util"))},69699,e=>{"use strict";var t=e.i(54109),r=e.i(16167),a=e.i(80906),n=e.i(51743),o=e.i(89870),s=e.i(71397),i=e.i(6930),l=e.i(37533),d=e.i(4994),c=e.i(1822),p=e.i(65452),u=e.i(1482),E=e.i(13776),T=e.i(24703),R=e.i(14729),m=e.i(145),x=e.i(93695);e.i(31727);var A=e.i(92994),g=e.i(90010),f=e.i(23182);let h=e.i(96219).default.createTransport({service:"gmail",auth:{user:process.env.GMAIL_USER,pass:process.env.GMAIL_APP_PASSWORD}});async function N(e){try{let{date:t}=await e.json();if(!t)return g.NextResponse.json({error:"Data é obrigatória"},{status:400});let r=(0,f.default)(),a=r.prepare("SELECT * FROM slots WHERE date = ?").all(t).map(e=>e.id);if(0===a.length)return g.NextResponse.json({message:"Nenhum slot encontrado para esta data"});let n=a.map(()=>"?").join(","),o=r.prepare(`SELECT * FROM bookings WHERE slot_id IN (${n})`).all(...a),s=r.prepare("UPDATE bookings SET status = ? WHERE id = ?"),i=r.prepare("UPDATE slots SET is_disabled = 1, is_booked = 0 WHERE id = ?");if(r.transaction(()=>{for(let e of o)s.run("pending_reallocation",e.id);for(let e of a)i.run(e)})(),process.env.GMAIL_USER&&process.env.GMAIL_APP_PASSWORD){for(let e of o)if(e.email)try{await h.sendMail({from:`"Agendamento Policial" <${process.env.GMAIL_USER}>`,to:e.email,subject:"Cancelamento de Agendamento - Necessária Realocação",html:`
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <h2 style="color: #d32f2f;">Agendamento Cancelado</h2>
                  <p>Ol\xe1, <strong>${e.name}</strong>.</p>
                  <p>Informamos que devido a imprevistos, todos os atendimentos do dia <strong>${new Date(t+"T12:00:00").toLocaleDateString("pt-BR")}</strong> precisaram ser cancelados.</p>
                  <p>Seu agendamento entrou em nossa <strong>lista de prioridade para realoca\xe7\xe3o</strong>.</p>
                  <p>Em breve entraremos em contato para definir um novo hor\xe1rio, ou voc\xea receber\xe1 um novo email com a confirma\xe7\xe3o do novo hor\xe1rio.</p>
                  <p>Pedimos desculpas pelo transtorno.</p>
                  <br>
                  <p>Atenciosamente,</p>
                  <p><strong>Pol\xedcia Civil de Alagoas</strong></p>
                </div>
              `})}catch(t){console.error(`Erro ao enviar email para ${e.email}:`,t)}}return g.NextResponse.json({success:!0,affectedBookings:o.length,affectedSlots:a.length})}catch(e){return console.error("Erro ao cancelar dia:",e),g.NextResponse.json({error:"Erro ao cancelar dia"},{status:500})}}e.s(["POST",()=>N],83946);var v=e.i(83946);let L=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/bookings/cancel-day/route",pathname:"/api/bookings/cancel-day",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/OneDrive/Desktop/Programming/agendamento-policial/app/api/bookings/cancel-day/route.ts",nextConfigOutput:"",userland:v}),{workAsyncStorage:_,workUnitAsyncStorage:b,serverHooks:O}=L;function y(){return(0,a.patchFetch)({workAsyncStorage:_,workUnitAsyncStorage:b})}async function C(e,t,a){L.isDev&&(0,n.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let g="/api/bookings/cancel-day/route";g=g.replace(/\/index$/,"")||"/";let f=await L.prepare(e,t,{srcPage:g,multiZoneDraftMode:!1});if(!f)return t.statusCode=400,t.end("Bad Request"),null==a.waitUntil||a.waitUntil.call(a,Promise.resolve()),null;let{buildId:h,params:N,nextConfig:v,parsedUrl:_,isDraftMode:b,prerenderManifest:O,routerServerContext:y,isOnDemandRevalidate:C,revalidateOnlyGenerated:I,resolvedPathname:S,clientReferenceManifest:U,serverActionsManifest:k}=f,w=(0,l.normalizeAppPath)(g),D=!!(O.dynamicRoutes[w]||O.routes[S]),P=async()=>((null==y?void 0:y.render404)?await y.render404(e,t,_,!1):t.end("This page could not be found"),null);if(D&&!b){let e=!!O.routes[S],t=O.dynamicRoutes[w];if(t&&!1===t.fallback&&!e){if(v.experimental.adapterPath)return await P();throw new x.NoFallbackError}}let M=null;!D||L.isDev||b||(M="/index"===(M=S)?"/":M);let X=!0===L.isDev||!D,F=D&&!X;k&&U&&(0,s.setReferenceManifestsSingleton)({page:g,clientReferenceManifest:U,serverActionsManifest:k,serverModuleMap:(0,i.createServerModuleMap)({serverActionsManifest:k})});let q=e.method||"GET",j=(0,o.getTracer)(),G=j.getActiveScopeSpan(),H={params:N,prerenderManifest:O,renderOpts:{experimental:{authInterrupts:!!v.experimental.authInterrupts},cacheComponents:!!v.cacheComponents,supportsDynamicResponse:X,incrementalCache:(0,n.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:v.cacheLife,waitUntil:a.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,a)=>L.onRequestError(e,t,a,y)},sharedContext:{buildId:h}},B=new d.NodeNextRequest(e),K=new d.NodeNextResponse(t),$=c.NextRequestAdapter.fromNodeNextRequest(B,(0,c.signalFromNodeResponse)(t));try{let s=async e=>L.handle($,H).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let r=j.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==p.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let a=r.get("next.route");if(a){let t=`${q} ${a}`;e.setAttributes({"next.route":a,"http.route":a,"next.span_name":t}),e.updateName(t)}else e.updateName(`${q} ${g}`)}),i=!!(0,n.getRequestMeta)(e,"minimalMode"),l=async n=>{var o,l;let d=async({previousCacheEntry:r})=>{try{if(!i&&C&&I&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let o=await s(n);e.fetchMetrics=H.renderOpts.fetchMetrics;let l=H.renderOpts.pendingWaitUntil;l&&a.waitUntil&&(a.waitUntil(l),l=void 0);let d=H.renderOpts.collectedTags;if(!D)return await (0,E.sendResponse)(B,K,o,H.renderOpts.pendingWaitUntil),null;{let e=await o.blob(),t=(0,T.toNodeOutgoingHttpHeaders)(o.headers);d&&(t[m.NEXT_CACHE_TAGS_HEADER]=d),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==H.renderOpts.collectedRevalidate&&!(H.renderOpts.collectedRevalidate>=m.INFINITE_CACHE)&&H.renderOpts.collectedRevalidate,a=void 0===H.renderOpts.collectedExpire||H.renderOpts.collectedExpire>=m.INFINITE_CACHE?void 0:H.renderOpts.collectedExpire;return{value:{kind:A.CachedRouteKind.APP_ROUTE,status:o.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:a}}}}catch(t){throw(null==r?void 0:r.isStale)&&await L.onRequestError(e,t,{routerKind:"App Router",routePath:g,routeType:"route",revalidateReason:(0,u.getRevalidateReason)({isStaticGeneration:F,isOnDemandRevalidate:C})},y),t}},c=await L.handleResponse({req:e,nextConfig:v,cacheKey:M,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:O,isRoutePPREnabled:!1,isOnDemandRevalidate:C,revalidateOnlyGenerated:I,responseGenerator:d,waitUntil:a.waitUntil,isMinimalMode:i});if(!D)return null;if((null==c||null==(o=c.value)?void 0:o.kind)!==A.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==c||null==(l=c.value)?void 0:l.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});i||t.setHeader("x-nextjs-cache",C?"REVALIDATED":c.isMiss?"MISS":c.isStale?"STALE":"HIT"),b&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let p=(0,T.fromNodeOutgoingHttpHeaders)(c.value.headers);return i&&D||p.delete(m.NEXT_CACHE_TAGS_HEADER),!c.cacheControl||t.getHeader("Cache-Control")||p.get("Cache-Control")||p.set("Cache-Control",(0,R.getCacheControlHeader)(c.cacheControl)),await (0,E.sendResponse)(B,K,new Response(c.value.body,{headers:p,status:c.value.status||200})),null};G?await l(G):await j.withPropagatedContext(e.headers,()=>j.trace(p.BaseServerSpan.handleRequest,{spanName:`${q} ${g}`,kind:o.SpanKind.SERVER,attributes:{"http.method":q,"http.target":e.url}},l))}catch(t){if(t instanceof x.NoFallbackError||await L.onRequestError(e,t,{routerKind:"App Router",routePath:w,routeType:"route",revalidateReason:(0,u.getRevalidateReason)({isStaticGeneration:F,isOnDemandRevalidate:C})}),D)throw t;return await (0,E.sendResponse)(B,K,new Response(null,{status:500})),null}}e.s(["handler",()=>C,"patchFetch",()=>y,"routeModule",()=>L,"serverHooks",()=>O,"workAsyncStorage",()=>_,"workUnitAsyncStorage",()=>b],69699)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__4b2e762e._.js.map