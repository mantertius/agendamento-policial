module.exports=[22734,(e,t,r)=>{t.exports=e.x("fs",()=>require("fs"))},93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},14747,(e,t,r)=>{t.exports=e.x("path",()=>require("path"))},25372,(e,t,r)=>{t.exports=e.x("better-sqlite3",()=>require("better-sqlite3"))},23182,e=>{"use strict";var t=e.i(25372),r=e.i(14747),a=e.i(22734);let o=r.default.join(process.cwd(),"data","agendamento.db"),n=null;e.s(["default",0,function(){if(n)return n;let e=r.default.dirname(o);a.default.existsSync(e)||a.default.mkdirSync(e,{recursive:!0}),(n=new t.default(o)).pragma("journal_mode = WAL"),n.exec(`
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
  `);try{n.prepare("PRAGMA table_info(bookings)").all().some(e=>"status"===e.name)||n.prepare("ALTER TABLE bookings ADD COLUMN status TEXT DEFAULT 'confirmed'").run()}catch(e){console.error("Erro ao verificar/migrar tabela bookings:",e)}n.exec(`
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
  `),n.prepare("SELECT value FROM counters WHERE name = 'booking'").get()||n.prepare("INSERT INTO counters (name, value) VALUES ('booking', 0)").run();try{n.exec("ALTER TABLE slots ADD COLUMN is_disabled INTEGER DEFAULT 0")}catch{}try{n.exec("ALTER TABLE availability_configs ADD COLUMN lunch_break_enabled INTEGER DEFAULT 0")}catch{}try{n.exec("ALTER TABLE availability_configs ADD COLUMN lunch_break_start TEXT")}catch{}try{n.exec("ALTER TABLE availability_configs ADD COLUMN lunch_break_duration INTEGER")}catch{}try{n.exec("ALTER TABLE bookings ADD COLUMN cpf TEXT")}catch{}try{n.prepare("PRAGMA table_info(slots)").all().some(e=>"is_internal"===e.name)||n.prepare("ALTER TABLE slots ADD COLUMN is_internal INTEGER DEFAULT 0").run()}catch(e){console.error("Erro ao verificar/migrar tabela slots (is_internal):",e)}return n}])},24361,(e,t,r)=>{t.exports=e.x("util",()=>require("util"))},34096,e=>{"use strict";var t=e.i(54109),r=e.i(16167),a=e.i(80906),o=e.i(51743),n=e.i(89870),s=e.i(71397),i=e.i(6930),l=e.i(37533),d=e.i(4994),c=e.i(1822),p=e.i(65452),u=e.i(1482),E=e.i(13776),T=e.i(24703),R=e.i(14729),x=e.i(145),g=e.i(93695);e.i(31727);var A=e.i(92994),m=e.i(90010),f=e.i(23182);let N=e.i(96219).default.createTransport({service:"gmail",auth:{user:process.env.GMAIL_USER,pass:process.env.GMAIL_APP_PASSWORD}});async function h(e){try{let{bookingId:t,newSlotId:r}=await e.json();if(!t||!r)return m.NextResponse.json({error:"Booking ID e New Slot ID são obrigatórios"},{status:400});let a=(0,f.default)(),o=a.prepare("SELECT * FROM slots WHERE id = ?").get(r);if(!o)return m.NextResponse.json({error:"Slot não encontrado"},{status:404});if(o.is_booked||o.is_disabled)return m.NextResponse.json({error:"Slot indisponível"},{status:400});let n=a.prepare("SELECT * FROM bookings WHERE id = ?").get(t);if(!n)return m.NextResponse.json({error:"Agendamento não encontrado"},{status:404});let s=a.prepare("UPDATE bookings SET slot_id = ?, status = ? WHERE id = ?"),i=a.prepare("UPDATE slots SET is_booked = 1 WHERE id = ?");if(a.transaction(()=>{s.run(r,"confirmed",t),i.run(r)})(),process.env.GMAIL_USER&&process.env.GMAIL_APP_PASSWORD&&n.email)try{let e=new Date(o.date+"T12:00:00").toLocaleDateString("pt-BR");await N.sendMail({from:`"Agendamento Policial" <${process.env.GMAIL_USER}>`,to:n.email,subject:"Agendamento Realocado - Novo Horário Confirmado",html:`
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2e7d32;">Agendamento Realocado com Sucesso</h2>
              <p>Ol\xe1, <strong>${n.name}</strong>.</p>
              <p>Seu agendamento foi realocado para um novo hor\xe1rio:</p>
              <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p style="margin: 5px 0;"><strong>Data:</strong> ${e}</p>
                <p style="margin: 5px 0;"><strong>Hor\xe1rio:</strong> ${o.start_time} \xe0s ${o.end_time}</p>
                <p style="margin: 5px 0;"><strong>Local:</strong> Av. Norma Pimentel Costa s/n\xba, Benedito Bentes, Macei\xf3 - Alagoas</p>
              </div>
              <p>Por favor, compare\xe7a com 15 minutos de anteced\xeancia portando documento original com foto.</p>
              <br>
              <p>Atenciosamente,</p>
              <p><strong>Pol\xedcia Civil de Alagoas</strong></p>
            </div>
          `})}catch(e){console.error(`Erro ao enviar email para ${n.email}:`,e)}return m.NextResponse.json({success:!0})}catch(e){return console.error("Erro ao realocar agendamento:",e),m.NextResponse.json({error:"Erro ao realocar agendamento"},{status:500})}}e.s(["POST",()=>h],58873);var v=e.i(58873);let _=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/bookings/reallocate/route",pathname:"/api/bookings/reallocate",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/OneDrive/Desktop/Programming/agendamento-policial/app/api/bookings/reallocate/route.ts",nextConfigOutput:"",userland:v}),{workAsyncStorage:L,workUnitAsyncStorage:b,serverHooks:O}=_;function y(){return(0,a.patchFetch)({workAsyncStorage:L,workUnitAsyncStorage:b})}async function S(e,t,a){_.isDev&&(0,o.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let m="/api/bookings/reallocate/route";m=m.replace(/\/index$/,"")||"/";let f=await _.prepare(e,t,{srcPage:m,multiZoneDraftMode:!1});if(!f)return t.statusCode=400,t.end("Bad Request"),null==a.waitUntil||a.waitUntil.call(a,Promise.resolve()),null;let{buildId:N,params:h,nextConfig:v,parsedUrl:L,isDraftMode:b,prerenderManifest:O,routerServerContext:y,isOnDemandRevalidate:S,revalidateOnlyGenerated:C,resolvedPathname:I,clientReferenceManifest:U,serverActionsManifest:k}=f,D=(0,l.normalizeAppPath)(m),w=!!(O.dynamicRoutes[D]||O.routes[I]),P=async()=>((null==y?void 0:y.render404)?await y.render404(e,t,L,!1):t.end("This page could not be found"),null);if(w&&!b){let e=!!O.routes[I],t=O.dynamicRoutes[D];if(t&&!1===t.fallback&&!e){if(v.experimental.adapterPath)return await P();throw new g.NoFallbackError}}let M=null;!w||_.isDev||b||(M="/index"===(M=I)?"/":M);let X=!0===_.isDev||!w,F=w&&!X;k&&U&&(0,s.setReferenceManifestsSingleton)({page:m,clientReferenceManifest:U,serverActionsManifest:k,serverModuleMap:(0,i.createServerModuleMap)({serverActionsManifest:k})});let j=e.method||"GET",q=(0,n.getTracer)(),H=q.getActiveScopeSpan(),G={params:h,prerenderManifest:O,renderOpts:{experimental:{authInterrupts:!!v.experimental.authInterrupts},cacheComponents:!!v.cacheComponents,supportsDynamicResponse:X,incrementalCache:(0,o.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:v.cacheLife,waitUntil:a.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,a)=>_.onRequestError(e,t,a,y)},sharedContext:{buildId:N}},B=new d.NodeNextRequest(e),$=new d.NodeNextResponse(t),K=c.NextRequestAdapter.fromNodeNextRequest(B,(0,c.signalFromNodeResponse)(t));try{let s=async e=>_.handle(K,G).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let r=q.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==p.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let a=r.get("next.route");if(a){let t=`${j} ${a}`;e.setAttributes({"next.route":a,"http.route":a,"next.span_name":t}),e.updateName(t)}else e.updateName(`${j} ${m}`)}),i=!!(0,o.getRequestMeta)(e,"minimalMode"),l=async o=>{var n,l;let d=async({previousCacheEntry:r})=>{try{if(!i&&S&&C&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let n=await s(o);e.fetchMetrics=G.renderOpts.fetchMetrics;let l=G.renderOpts.pendingWaitUntil;l&&a.waitUntil&&(a.waitUntil(l),l=void 0);let d=G.renderOpts.collectedTags;if(!w)return await (0,E.sendResponse)(B,$,n,G.renderOpts.pendingWaitUntil),null;{let e=await n.blob(),t=(0,T.toNodeOutgoingHttpHeaders)(n.headers);d&&(t[x.NEXT_CACHE_TAGS_HEADER]=d),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==G.renderOpts.collectedRevalidate&&!(G.renderOpts.collectedRevalidate>=x.INFINITE_CACHE)&&G.renderOpts.collectedRevalidate,a=void 0===G.renderOpts.collectedExpire||G.renderOpts.collectedExpire>=x.INFINITE_CACHE?void 0:G.renderOpts.collectedExpire;return{value:{kind:A.CachedRouteKind.APP_ROUTE,status:n.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:a}}}}catch(t){throw(null==r?void 0:r.isStale)&&await _.onRequestError(e,t,{routerKind:"App Router",routePath:m,routeType:"route",revalidateReason:(0,u.getRevalidateReason)({isStaticGeneration:F,isOnDemandRevalidate:S})},y),t}},c=await _.handleResponse({req:e,nextConfig:v,cacheKey:M,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:O,isRoutePPREnabled:!1,isOnDemandRevalidate:S,revalidateOnlyGenerated:C,responseGenerator:d,waitUntil:a.waitUntil,isMinimalMode:i});if(!w)return null;if((null==c||null==(n=c.value)?void 0:n.kind)!==A.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==c||null==(l=c.value)?void 0:l.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});i||t.setHeader("x-nextjs-cache",S?"REVALIDATED":c.isMiss?"MISS":c.isStale?"STALE":"HIT"),b&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let p=(0,T.fromNodeOutgoingHttpHeaders)(c.value.headers);return i&&w||p.delete(x.NEXT_CACHE_TAGS_HEADER),!c.cacheControl||t.getHeader("Cache-Control")||p.get("Cache-Control")||p.set("Cache-Control",(0,R.getCacheControlHeader)(c.cacheControl)),await (0,E.sendResponse)(B,$,new Response(c.value.body,{headers:p,status:c.value.status||200})),null};H?await l(H):await q.withPropagatedContext(e.headers,()=>q.trace(p.BaseServerSpan.handleRequest,{spanName:`${j} ${m}`,kind:n.SpanKind.SERVER,attributes:{"http.method":j,"http.target":e.url}},l))}catch(t){if(t instanceof g.NoFallbackError||await _.onRequestError(e,t,{routerKind:"App Router",routePath:D,routeType:"route",revalidateReason:(0,u.getRevalidateReason)({isStaticGeneration:F,isOnDemandRevalidate:S})}),w)throw t;return await (0,E.sendResponse)(B,$,new Response(null,{status:500})),null}}e.s(["handler",()=>S,"patchFetch",()=>y,"routeModule",()=>_,"serverHooks",()=>O,"workAsyncStorage",()=>L,"workUnitAsyncStorage",()=>b],34096)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__1f11a0bb._.js.map