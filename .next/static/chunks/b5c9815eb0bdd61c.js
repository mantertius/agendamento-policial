(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,85698,e=>{e.v({name:"agendamento-policial",version:"0.1.0",private:!0,scripts:{dev:"next dev",build:"next build",start:"next start",lint:"eslint"},dependencies:{"better-sqlite3":"^12.4.6",next:"16.0.5",nodemailer:"^7.0.11",react:"19.2.0","react-dom":"19.2.0",sharp:"^0.34.5"},devDependencies:{"@tailwindcss/postcss":"^4","@types/better-sqlite3":"^7.6.13","@types/node":"^20","@types/nodemailer":"^7.0.4","@types/react":"^19","@types/react-dom":"^19",eslint:"^9","eslint-config-next":"16.0.5",tailwindcss:"^4",typescript:"^5"}})},73835,e=>{"use strict";e.i(55389);var s=e.i(71811),t=e.i(65029),a=e.i(94300);function r({slot:e,onClose:r}){let{addBooking:l}=(0,a.useApp)(),[o,i]=(0,t.useState)(""),[n,d]=(0,t.useState)(""),[c,m]=(0,t.useState)(""),[x,p]=(0,t.useState)(""),[g,h]=(0,t.useState)(""),[u,b]=(0,t.useState)(!1),[f,v]=(0,t.useState)(""),[j,y]=(0,t.useState)(null),[N,w]=(0,t.useState)(null),C="(82) 3315-7917",k="Av. Norma Pimentel Costa s/nº, Benedito Bentes, Maceió - Alagoas",$="8dp@pc.al.gov.br",D=async e=>{try{w("pending");let s=await fetch("/api/send-email",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({to:e.email,subject:`Confirma\xe7\xe3o de Agendamento - ${T(e.date)} \xe0s ${e.startTime}`,html:`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Comprovante de Agendamento</title>
        </head>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; border-bottom: 2px solid #1e40af; padding-bottom: 20px; margin-bottom: 30px;">
            <h1 style="margin: 0; color: #1e40af;">🛡️ Agendamento Policial</h1>
            <p style="margin: 5px 0 0; color: #666;">Comprovante de Agendamento</p>
          </div>

          <div style="background: #dbeafe; border: 2px solid #1e40af; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
            <p style="margin: 0; color: #1e3a8a; font-weight: bold; text-align: center;">📍 Este agendamento \xe9 v\xe1lido apenas para:</p>
            <ul style="margin: 10px 0 0; color: #1e3a8a; padding-left: 20px;">
              <li><strong>8\xba Distrito Policial da Capital</strong></li>
              <li><strong>21\xba Distrito Policial da Capital</strong></li>
            </ul>
          </div>
          
          <div style="background: #f0f9ff; border: 2px solid #1e40af; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 30px;">
            <div style="font-size: 18px; font-weight: bold; color: #1e40af;">${T(e.date)}</div>
            <div style="font-size: 24px; font-weight: bold; color: #333; margin-top: 10px;">${e.startTime} - ${e.endTime}</div>
          </div>

          <div style="margin-bottom: 25px;">
            <div style="font-weight: bold; color: #333; margin-bottom: 10px; font-size: 14px; text-transform: uppercase;">Dados do Agendamento</div>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555; width: 120px;">Nome:</td>
                <td style="padding: 8px 0; color: #333;">${e.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">CPF:</td>
                <td style="padding: 8px 0; color: #333;">${e.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,"$1.$2.$3-$4")}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Telefone:</td>
                <td style="padding: 8px 0; color: #333;">${e.phone.replace(/(\d{2})(\d{5})(\d{4})/,"($1) $2-$3")}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">E-mail:</td>
                <td style="padding: 8px 0; color: #333;">${e.email}</td>
              </tr>
              ${e.description?`
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Descri\xe7\xe3o:</td>
                <td style="padding: 8px 0; color: #333;">${e.description}</td>
              </tr>
              `:""}
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">C\xf3digo:</td>
                <td style="padding: 8px 0; color: #333; font-family: monospace;">${e.id}</td>
              </tr>
            </table>
          </div>

          <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 15px; margin-top: 30px;">
            <h3 style="color: #b45309; margin: 0 0 10px 0; font-size: 14px;">⚠️ IMPORTANTE - LEVE NO DIA DO ATENDIMENTO:</h3>
            <ul style="margin: 0; padding-left: 20px; color: #92400e;">
              <li style="margin-bottom: 8px;"><strong>Documento de identifica\xe7\xe3o com foto</strong> (RG, CNH ou outro documento oficial)</li>
              <li style="margin-bottom: 8px;"><strong>Provas e evid\xeancias relacionadas ao relato:</strong>
                <ul style="margin-top: 5px;">
                  <li>Mensagens de texto (prints de WhatsApp, SMS, etc.)</li>
                  <li>\xc1udios e v\xeddeos relevantes</li>
                  <li>Fotos e imagens</li>
                  <li>Documentos e artefatos relacionados</li>
                </ul>
              </li>
            </ul>
          </div>

          <div style="margin-top: 40px; text-align: center; color: #666; font-size: 12px; border-top: 1px solid #ddd; padding-top: 20px;">
            <p style="margin-bottom: 10px;"><strong>📍 Endere\xe7o:</strong> ${k}</p>
            <p><strong>📞 Telefone:</strong> ${C} | <strong>📧 E-mail:</strong> ${$}</p>
            <p style="margin-top: 15px; font-size: 11px;">Agendamento realizado em: ${new Date(e.createdAt).toLocaleString("pt-BR")}</p>
            <p style="font-size: 11px;">Em caso de necessidade de cancelamento ou d\xfavidas, entre em contato conosco.</p>
          </div>
        </body>
      </html>
    `})}),t=await s.json();t.success&&t.emailSent?w("sent"):w("failed")}catch(e){console.error("Erro ao enviar email:",e),w("failed")}},A=async s=>{if(s.preventDefault(),v(""),!o.trim())return void v("Nome é obrigatório");if(!n.trim())return void v("CPF é obrigatório");let t=n.replace(/\D/g,"");if(11!==t.length)return void v("CPF inválido. Digite os 11 dígitos.");if(/^(\d)\1{10}$/.test(t))return void v("CPF inválido.");let a=0;for(let e=0;e<9;e++)a+=parseInt(t.charAt(e))*(10-e);let r=10*a%11;if((10===r||11===r)&&(r=0),r!==parseInt(t.charAt(9)))return void v("CPF inválido.");a=0;for(let e=0;e<10;e++)a+=parseInt(t.charAt(e))*(11-e);if((10==(r=10*a%11)||11===r)&&(r=0),r!==parseInt(t.charAt(10)))return void v("CPF inválido.");if(!c.trim())return void v("Celular é obrigatório");let i=c.replace(/\D/g,"");if(!/^[1-9]{2}9[0-9]{8}$/.test(i))return void v("Celular inválido. Use o formato (XX) 9XXXX-XXXX");if(!x.trim())return void v("E-mail é obrigatório");if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x.trim()))return void v("E-mail inválido");b(!0);try{let s={id:"",slotId:e.id,name:o.trim(),cpf:n.replace(/\D/g,""),phone:c.replace(/\D/g,""),email:x.trim(),description:g.trim()||void 0,createdAt:new Date().toISOString()},t=await l(s);if(t){let s={...t,cpf:t.cpf||"",phone:t.phone||"",email:t.email||"",date:e.date,startTime:e.startTime,endTime:e.endTime};y(s),D(s)}else v("Erro ao fazer agendamento. Tente novamente.")}catch{v("Erro ao fazer agendamento. Tente novamente.")}finally{b(!1)}},T=e=>new Date(e+"T12:00:00").toLocaleDateString("pt-BR",{weekday:"long",day:"numeric",month:"long",year:"numeric"}),P=e=>e.replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,"$1.$2.$3-$4"),S=e=>{let s=e.replace(/\D/g,"");return 11===s.length?s.replace(/(\d{2})(\d{5})(\d{4})/,"($1) $2-$3"):e};return j?(0,s.jsx)("div",{className:"fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4 z-50",children:(0,s.jsxs)("div",{className:"bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-lg overflow-hidden max-h-[95vh] sm:max-h-[90vh] overflow-y-auto",children:[(0,s.jsx)("div",{className:"bg-gradient-to-r from-green-600 to-green-700 p-4 sm:p-6 text-white sticky top-0",children:(0,s.jsxs)("div",{className:"flex items-center gap-3",children:[(0,s.jsx)("div",{className:"w-12 h-12 bg-white/20 rounded-full flex items-center justify-center",children:(0,s.jsx)("svg",{className:"w-7 h-7",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 13l4 4L19 7"})})}),(0,s.jsxs)("div",{children:[(0,s.jsx)("h2",{className:"text-xl font-semibold",children:"Agendamento Confirmado!"}),(0,s.jsx)("p",{className:"text-green-100 text-sm",children:"Seu atendimento foi agendado com sucesso"})]})]})}),(0,s.jsxs)("div",{className:"p-4 sm:p-6 space-y-4",children:[(0,s.jsxs)("div",{className:"bg-blue-100 border-2 border-blue-400 rounded-xl p-4",children:[(0,s.jsxs)("p",{className:"text-blue-800 font-bold text-center mb-2 flex items-center justify-center gap-2",children:[(0,s.jsx)("span",{children:"📍"})," Este agendamento é válido apenas para:"]}),(0,s.jsxs)("ul",{className:"text-blue-900 text-sm space-y-1 ml-4",children:[(0,s.jsx)("li",{children:(0,s.jsx)("strong",{children:"• 8º Distrito Policial da Capital"})}),(0,s.jsx)("li",{children:(0,s.jsx)("strong",{children:"• 21º Distrito Policial da Capital"})})]})]}),(0,s.jsxs)("div",{className:"bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-center",children:[(0,s.jsx)("p",{className:"text-blue-800 font-medium",children:T(j.date)}),(0,s.jsxs)("p",{className:"text-2xl font-bold text-blue-900 mt-1",children:[j.startTime," - ",j.endTime]})]}),(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsx)("h3",{className:"font-semibold text-gray-800 text-sm uppercase",children:"Seus Dados"}),(0,s.jsxs)("div",{className:"bg-gray-50 rounded-lg p-3 space-y-1 text-sm",children:[(0,s.jsxs)("p",{children:[(0,s.jsx)("span",{className:"font-medium text-gray-600",children:"Nome:"})," ",j.name]}),j.cpf&&(0,s.jsxs)("p",{children:[(0,s.jsx)("span",{className:"font-medium text-gray-600",children:"CPF:"})," ",P(j.cpf)]}),j.phone&&(0,s.jsxs)("p",{children:[(0,s.jsx)("span",{className:"font-medium text-gray-600",children:"Telefone:"})," ",S(j.phone)]}),j.email&&(0,s.jsxs)("p",{children:[(0,s.jsx)("span",{className:"font-medium text-gray-600",children:"E-mail:"})," ",j.email]}),j.description&&(0,s.jsxs)("p",{children:[(0,s.jsx)("span",{className:"font-medium text-gray-600",children:"Descrição:"})," ",j.description]})]})]}),(0,s.jsxs)("div",{className:"bg-amber-50 border border-amber-300 rounded-xl p-4",children:[(0,s.jsxs)("h3",{className:"font-bold text-amber-800 flex items-center gap-2 mb-3",children:[(0,s.jsx)("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"})}),"Importante - Leve no dia:"]}),(0,s.jsxs)("ul",{className:"text-amber-900 text-sm space-y-2",children:[(0,s.jsxs)("li",{className:"flex items-start gap-2",children:[(0,s.jsx)("span",{className:"text-amber-600 mt-0.5",children:"📄"}),(0,s.jsxs)("span",{children:[(0,s.jsx)("strong",{children:"Documento de identificação com foto"})," (RG, CNH ou outro documento oficial)"]})]}),(0,s.jsxs)("li",{className:"flex items-start gap-2",children:[(0,s.jsx)("span",{className:"text-amber-600 mt-0.5",children:"📱"}),(0,s.jsxs)("span",{children:[(0,s.jsx)("strong",{children:"Mensagens de texto"})," (prints de WhatsApp, SMS, redes sociais)"]})]}),(0,s.jsxs)("li",{className:"flex items-start gap-2",children:[(0,s.jsx)("span",{className:"text-amber-600 mt-0.5",children:"🎵"}),(0,s.jsxs)("span",{children:[(0,s.jsx)("strong",{children:"Áudios e vídeos"})," relevantes ao caso"]})]}),(0,s.jsxs)("li",{className:"flex items-start gap-2",children:[(0,s.jsx)("span",{className:"text-amber-600 mt-0.5",children:"📷"}),(0,s.jsxs)("span",{children:[(0,s.jsx)("strong",{children:"Fotos e imagens"})," relacionadas"]})]}),(0,s.jsxs)("li",{className:"flex items-start gap-2",children:[(0,s.jsx)("span",{className:"text-amber-600 mt-0.5",children:"📁"}),(0,s.jsxs)("span",{children:[(0,s.jsx)("strong",{children:"Documentos e artefatos"})," que comprovem o relato"]})]})]})]}),(0,s.jsxs)("div",{className:"text-center text-xs text-gray-500 space-y-2 bg-gray-50 rounded-lg p-3",children:[(0,s.jsxs)("p",{className:"text-gray-700",children:[(0,s.jsx)("strong",{children:"📍 Endereço:"})," ",k]}),(0,s.jsxs)("p",{children:[(0,s.jsx)("strong",{children:"📞"})," ",C," | ",(0,s.jsx)("strong",{children:"📧"})," ",$]}),(0,s.jsxs)("p",{className:"pt-1 border-t border-gray-200",children:["Código: ",(0,s.jsx)("span",{className:"font-mono",children:j.id})]})]}),(0,s.jsxs)("div",{className:`p-3 rounded-lg text-sm flex items-center gap-2 ${"pending"===N?"bg-blue-50 text-blue-700":"sent"===N?"bg-green-50 text-green-700":"failed"===N?"bg-red-50 text-red-700":"bg-gray-50 text-gray-600"}`,children:["pending"===N&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("svg",{className:"animate-spin h-4 w-4",viewBox:"0 0 24 24",children:[(0,s.jsx)("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4",fill:"none"}),(0,s.jsx)("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),(0,s.jsxs)("span",{children:["Enviando comprovante para ",j.email,"..."]})]}),"sent"===N&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 13l4 4L19 7"})}),(0,s.jsxs)("span",{children:["Comprovante enviado para ",j.email]})]}),"failed"===N&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"})}),(0,s.jsx)("span",{children:"Não foi possível enviar o email. Use o botão Imprimir."})]})]}),(0,s.jsxs)("div",{className:"flex gap-3 pt-2",children:[(0,s.jsxs)("button",{onClick:()=>{if(!j)return;let e=window.open("","_blank");if(!e)return;let s=j.cpf?`<div class="info-row"><span class="info-label">CPF:</span><span class="info-value">${P(j.cpf)}</span></div>`:"",t=j.phone?`<div class="info-row"><span class="info-label">Telefone:</span><span class="info-value">${S(j.phone)}</span></div>`:"",a=j.email?`<div class="info-row"><span class="info-label">E-mail:</span><span class="info-value">${j.email}</span></div>`:"",r=j.description?`<div class="info-row"><span class="info-label">Descri\xe7\xe3o:</span><span class="info-value">${j.description}</span></div>`:"";e.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Comprovante de Agendamento</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              max-width: 600px;
              margin: 0 auto;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #333;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .header h1 {
              margin: 0;
              color: #1e40af;
            }
            .header p {
              margin: 5px 0 0;
              color: #666;
            }
            .section {
              margin-bottom: 25px;
            }
            .section-title {
              font-weight: bold;
              color: #333;
              margin-bottom: 10px;
              font-size: 14px;
              text-transform: uppercase;
            }
            .info-row {
              display: flex;
              margin-bottom: 8px;
            }
            .info-label {
              font-weight: bold;
              width: 120px;
              color: #555;
            }
            .info-value {
              color: #333;
            }
            .highlight-box {
              background: #f0f9ff;
              border: 2px solid #1e40af;
              border-radius: 8px;
              padding: 20px;
              text-align: center;
              margin-bottom: 30px;
            }
            .highlight-box .date {
              font-size: 18px;
              font-weight: bold;
              color: #1e40af;
            }
            .highlight-box .time {
              font-size: 24px;
              font-weight: bold;
              color: #333;
              margin-top: 10px;
            }
            .warning-box {
              background: #fef3c7;
              border: 1px solid #f59e0b;
              border-radius: 8px;
              padding: 15px;
              margin-top: 30px;
            }
            .warning-box h3 {
              color: #b45309;
              margin: 0 0 10px 0;
              font-size: 14px;
            }
            .warning-box ul {
              margin: 0;
              padding-left: 20px;
              color: #92400e;
            }
            .warning-box li {
              margin-bottom: 8px;
            }
            .warning-box ul ul {
              margin-top: 5px;
            }
            .footer {
              margin-top: 40px;
              text-align: center;
              color: #666;
              font-size: 12px;
              border-top: 1px solid #ddd;
              padding-top: 20px;
            }
            @media print {
              body { padding: 20px; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🛡️ Agendamento Policial</h1>
            <p>Comprovante de Agendamento</p>
          </div>

          <div style="background: #dbeafe; border: 2px solid #1e40af; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
            <p style="margin: 0; color: #1e3a8a; font-weight: bold; text-align: center;">📍 Este agendamento \xe9 v\xe1lido apenas para:</p>
            <ul style="margin: 10px 0 0; color: #1e3a8a; padding-left: 20px;">
              <li><strong>8\xba Distrito Policial da Capital</strong></li>
              <li><strong>21\xba Distrito Policial da Capital</strong></li>
            </ul>
          </div>
          
          <div class="highlight-box">
            <div class="date">${T(j.date)}</div>
            <div class="time">${j.startTime} - ${j.endTime}</div>
          </div>

          <div class="section">
            <div class="section-title">Dados do Agendamento</div>
            <div class="info-row">
              <span class="info-label">Nome:</span>
              <span class="info-value">${j.name}</span>
            </div>
            ${s}
            ${t}
            ${a}
            ${r}
            <div class="info-row">
              <span class="info-label">C\xf3digo:</span>
              <span class="info-value">${j.id}</span>
            </div>
          </div>

          <div class="warning-box">
            <h3>⚠️ IMPORTANTE - LEVE NO DIA DO ATENDIMENTO:</h3>
            <ul>
              <li><strong>Documento de identifica\xe7\xe3o com foto</strong> (RG, CNH ou outro documento oficial)</li>
              <li><strong>Provas e evid\xeancias relacionadas ao relato:</strong>
                <ul>
                  <li>Mensagens de texto (prints de WhatsApp, SMS, etc.)</li>
                  <li>\xc1udios e v\xeddeos relevantes</li>
                  <li>Fotos e imagens</li>
                  <li>Documentos e artefatos relacionados</li>
                </ul>
              </li>
            </ul>
          </div>

          <div class="footer">
            <p style="margin-bottom: 10px;"><strong>📍 Endere\xe7o:</strong> ${k}</p>
            <p><strong>📞 Telefone:</strong> ${C} | <strong>📧 E-mail:</strong> ${$}</p>
            <p style="margin-top: 15px;">Agendamento realizado em: ${new Date(j.createdAt).toLocaleString("pt-BR")}</p>
            <p>Em caso de necessidade de cancelamento ou d\xfavidas, entre em contato conosco.</p>
          </div>
        </body>
      </html>
    `),e.document.close(),e.focus(),setTimeout(()=>{e.print(),e.close()},250)},className:"flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center gap-2",children:[(0,s.jsx)("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"})}),"Imprimir"]}),(0,s.jsx)("button",{onClick:r,className:"flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium",children:"Concluir"})]})]})]})}):(0,s.jsx)("div",{className:"fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4 z-50",children:(0,s.jsxs)("div",{className:"bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-md overflow-hidden max-h-[85vh] sm:max-h-[90vh] overflow-y-auto",children:[(0,s.jsx)("div",{className:"bg-gradient-to-r from-blue-600 to-blue-700 p-3 sm:p-6 text-white sticky top-0 z-10",children:(0,s.jsxs)("div",{className:"flex justify-between items-start",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("h2",{className:"text-base sm:text-xl font-semibold",children:"Agendar Atendimento"}),(0,s.jsx)("p",{className:"mt-0.5 sm:mt-1 text-blue-100 text-xs sm:text-sm",children:T(e.date)}),(0,s.jsxs)("p",{className:"text-lg sm:text-2xl font-bold mt-1 sm:mt-2",children:[e.startTime," - ",e.endTime]})]}),(0,s.jsx)("button",{onClick:r,className:"p-1 hover:bg-white/20 rounded-full transition-colors",children:(0,s.jsx)("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})})]})}),(0,s.jsxs)("form",{onSubmit:A,className:"p-3 sm:p-6 space-y-3",children:[(0,s.jsxs)("div",{className:"bg-red-50 border border-red-200 rounded-lg p-2.5 sm:p-3 text-xs text-red-800",children:[(0,s.jsxs)("p",{className:"font-bold flex items-center gap-1 mb-1",children:[(0,s.jsx)("svg",{className:"w-4 h-4 flex-shrink-0",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"})}),"Art. 299 do Código Penal"]}),(0,s.jsxs)("p",{className:"text-red-700 leading-snug text-[11px] sm:text-xs",children:["Inserir declaração falsa em documento: ",(0,s.jsx)("strong",{children:"Pena - reclusão de 1 a 5 anos, e multa."})]})]}),f&&(0,s.jsx)("div",{className:"p-2.5 sm:p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm",children:f}),(0,s.jsxs)("div",{children:[(0,s.jsxs)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:["Nome completo ",(0,s.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,s.jsx)("input",{type:"text",value:o,onChange:e=>i(e.target.value),onInvalid:e=>e.target.setCustomValidity("Por favor, preencha este campo."),onInput:e=>e.target.setCustomValidity(""),className:"w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-base",placeholder:"Digite seu nome completo",required:!0})]}),(0,s.jsxs)("div",{children:[(0,s.jsxs)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:["CPF ",(0,s.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,s.jsx)("input",{type:"text",value:n,onChange:e=>{let s=e.target.value.replace(/\D/g,"");s.length<=11&&d(s.replace(/(\d{3})(\d)/,"$1.$2").replace(/(\d{3})(\d)/,"$1.$2").replace(/(\d{3})(\d{1,2})$/,"$1-$2"))},onInvalid:e=>e.target.setCustomValidity("Por favor, preencha este campo."),onInput:e=>e.target.setCustomValidity(""),className:"w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-base",placeholder:"000.000.000-00",required:!0})]}),(0,s.jsxs)("div",{children:[(0,s.jsxs)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:["Celular ",(0,s.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,s.jsx)("input",{type:"tel",value:c,onChange:e=>{let s=e.target.value.replace(/\D/g,"");if(s.length<=11){let e=s;s.length>0&&(e="("+s.substring(0,2),s.length>2&&(e+=") "+s.substring(2,7)),s.length>7&&(e+="-"+s.substring(7,11))),m(e)}},onInvalid:e=>e.target.setCustomValidity("Por favor, preencha este campo."),onInput:e=>e.target.setCustomValidity(""),className:"w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-base",placeholder:"(82) 99999-9999",required:!0})]}),(0,s.jsxs)("div",{children:[(0,s.jsxs)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:["E-mail ",(0,s.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,s.jsx)("input",{type:"email",value:x,onChange:e=>p(e.target.value),onInvalid:e=>{let s=e.target;s.validity.valueMissing?s.setCustomValidity("Por favor, preencha este campo."):s.validity.typeMismatch&&s.setCustomValidity("Por favor, insira um endereço de e-mail válido.")},onInput:e=>e.target.setCustomValidity(""),className:"w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-base",placeholder:"seu@email.com",required:!0})]}),(0,s.jsxs)("div",{children:[(0,s.jsxs)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:["Descrição breve ",(0,s.jsx)("span",{className:"text-gray-400",children:"(opcional)"})]}),(0,s.jsx)("textarea",{value:g,onChange:e=>h(e.target.value),rows:2,className:"w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none text-base",placeholder:"Motivo do atendimento..."})]}),(0,s.jsxs)("div",{className:"flex gap-2 sm:gap-3 pt-2",children:[(0,s.jsx)("button",{type:"button",onClick:r,className:"flex-1 px-3 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm",children:"Cancelar"}),(0,s.jsx)("button",{type:"submit",disabled:u,className:"flex-1 px-3 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm",children:u?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("svg",{className:"animate-spin h-4 w-4",viewBox:"0 0 24 24",children:[(0,s.jsx)("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4",fill:"none"}),(0,s.jsx)("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),"Agendando..."]}):"Confirmar"})]})]})]})})}let l=["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"],o=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];function i(){let{slots:e,isReady:i}=(0,a.useApp)(),[n,d]=(0,t.useState)(new Date),[c,m]=(0,t.useState)(null),[x,p]=(0,t.useState)(null),g=n.getFullYear(),h=n.getMonth(),u=new Date(g,h,1),b=new Date(g,h+1,0),f=u.getDay(),v=b.getDate(),j=(0,t.useMemo)(()=>{let s={};return e.filter(e=>!e.isDisabled).forEach(e=>{s[e.date]||(s[e.date]=[]),s[e.date].push(e)}),Object.keys(s).forEach(e=>{s[e].sort((e,s)=>e.startTime.localeCompare(s.startTime))}),s},[e]),y=e=>{d(new Date(g,h+("next"===e?1:-1),1)),m(null)},N=new Date().toISOString().split("T")[0],w=e=>{let s=new Date;return new Date(`${e.date}T${e.startTime}:00`)<=s};return i?(0,s.jsxs)("div",{className:"w-full max-w-4xl mx-auto px-2 sm:px-0",children:[(0,s.jsxs)("div",{className:"flex items-center justify-between mb-4 sm:mb-6",children:[(0,s.jsx)("button",{onClick:()=>y("prev"),className:"p-2 hover:bg-gray-100 rounded-lg transition-colors",children:(0,s.jsx)("svg",{className:"w-5 h-5 sm:w-6 sm:h-6 text-gray-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M15 19l-7-7 7-7"})})}),(0,s.jsxs)("h2",{className:"text-lg sm:text-2xl font-semibold text-gray-800",children:[o[h]," ",g]}),(0,s.jsx)("button",{onClick:()=>y("next"),className:"p-2 hover:bg-gray-100 rounded-lg transition-colors",children:(0,s.jsx)("svg",{className:"w-5 h-5 sm:w-6 sm:h-6 text-gray-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5l7 7-7 7"})})})]}),(0,s.jsx)("div",{className:"grid grid-cols-7 gap-0.5 sm:gap-1 mb-2",children:l.map(e=>(0,s.jsx)("div",{className:"text-center text-xs sm:text-sm font-medium text-gray-500 py-1 sm:py-2",children:e},e))}),(0,s.jsxs)("div",{className:"grid grid-cols-7 gap-0.5 sm:gap-1",children:[Array.from({length:f}).map((e,t)=>(0,s.jsx)("div",{className:"h-14 sm:h-24 bg-gray-50 rounded-lg"},`empty-${t}`)),Array.from({length:v}).map((e,t)=>{let a=t+1,r=`${g}-${String(h+1).padStart(2,"0")}-${String(a).padStart(2,"0")}`,l=(e=>{let s=j[e]||[];if(0===s.length)return"none";let t=s.filter(e=>!e.isBooked&&!w(e));return 0===t.length?"full":t.length<s.filter(e=>!w(e)).length?"partial":"available"})(r),o=c===r,i=r<N,n=(j[r]||[]).filter(e=>!e.isBooked&&!w(e)).length;return(0,s.jsxs)("button",{onClick:()=>!i&&"none"!==l&&m(o?null:r),disabled:i||"none"===l,className:`
                h-14 sm:h-24 rounded-lg p-1 sm:p-2 text-left transition-all relative
                ${i?"bg-gray-100 text-gray-400 cursor-not-allowed":""}
                ${"none"===l&&!i?"bg-gray-50 text-gray-400 cursor-not-allowed":""}
                ${"available"===l&&!i?"bg-green-50 hover:bg-green-100 border-2 border-green-200 cursor-pointer":""}
                ${"partial"===l&&!i?"bg-yellow-50 hover:bg-yellow-100 border-2 border-yellow-200 cursor-pointer":""}
                ${"full"===l&&!i?"bg-red-50 text-gray-500 border-2 border-red-200 cursor-not-allowed":""}
                ${o?"ring-2 ring-blue-500 ring-offset-1 sm:ring-offset-2":""}
              `,children:[(0,s.jsx)("span",{className:`text-xs sm:text-sm font-medium ${r===N?"bg-blue-600 text-white rounded-full w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center":""}`,children:a}),"none"!==l&&!i&&(0,s.jsx)("div",{className:"mt-0.5 sm:mt-1 hidden sm:block",children:(0,s.jsx)("span",{className:`text-xs ${"full"===l?"text-red-600":"text-green-600"}`,children:"full"===l?"Lotado":`${n} vaga${1!==n?"s":""}`})}),"none"!==l&&!i&&(0,s.jsx)("div",{className:"sm:hidden absolute bottom-1 left-1/2 transform -translate-x-1/2",children:(0,s.jsx)("div",{className:`w-1.5 h-1.5 rounded-full ${"full"===l?"bg-red-500":"partial"===l?"bg-yellow-500":"bg-green-500"}`})})]},a)})]}),c&&(0,s.jsxs)("div",{className:"mt-4 sm:mt-8 p-4 sm:p-6 bg-white rounded-xl shadow-lg border border-gray-100",children:[(0,s.jsxs)("h3",{className:"text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4",children:["Horários disponíveis - ",new Date(c+"T12:00:00").toLocaleDateString("pt-BR",{weekday:"long",day:"numeric",month:"long"})]}),(0,s.jsx)("div",{className:"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3",children:(j[c]||[]).map(e=>{let t=w(e),a=e.isBooked||t;return(0,s.jsxs)("button",{onClick:()=>!a&&p(e),disabled:a,className:`
                    p-2 sm:p-4 rounded-lg text-center transition-all
                    ${a?"bg-gray-100 text-gray-400 cursor-not-allowed":"bg-blue-50 hover:bg-blue-100 text-blue-700 border-2 border-blue-200 hover:border-blue-300 cursor-pointer"}
                    ${e.isBooked?"line-through":""}
                  `,title:t&&!e.isBooked?"Horário já passou":e.isBooked?"Horário ocupado":"Clique para agendar",children:[(0,s.jsx)("span",{className:"font-medium text-sm sm:text-base",children:e.startTime}),(0,s.jsx)("span",{className:"text-gray-400 mx-0.5 sm:mx-1 text-sm",children:"-"}),(0,s.jsx)("span",{className:"font-medium text-sm sm:text-base",children:e.endTime}),t&&!e.isBooked&&(0,s.jsx)("div",{className:"text-xs text-gray-400 mt-1",children:"Passou"})]},e.id)})})]}),(0,s.jsxs)("div",{className:"mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-4 justify-center text-xs sm:text-sm",children:[(0,s.jsxs)("div",{className:"flex items-center gap-1 sm:gap-2",children:[(0,s.jsx)("div",{className:"w-3 h-3 sm:w-4 sm:h-4 rounded bg-green-200 border border-green-300"}),(0,s.jsx)("span",{className:"text-gray-600",children:"Disponível"})]}),(0,s.jsxs)("div",{className:"flex items-center gap-1 sm:gap-2",children:[(0,s.jsx)("div",{className:"w-3 h-3 sm:w-4 sm:h-4 rounded bg-yellow-200 border border-yellow-300"}),(0,s.jsx)("span",{className:"text-gray-600",children:"Parcial"})]}),(0,s.jsxs)("div",{className:"flex items-center gap-1 sm:gap-2",children:[(0,s.jsx)("div",{className:"w-3 h-3 sm:w-4 sm:h-4 rounded bg-red-200 border border-red-300"}),(0,s.jsx)("span",{className:"text-gray-600",children:"Lotado"})]})]}),x&&(0,s.jsx)(r,{slot:x,onClose:()=>p(null)})]}):(0,s.jsx)("div",{className:"w-full max-w-4xl mx-auto flex items-center justify-center py-20",children:(0,s.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"})})}var n=e.i(85698);function d(){let e="Av. Norma Pimentel Costa s/nº, Benedito Bentes, Maceió - Alagoas",t="(82) 3315-7917",a="8dp@pc.al.gov.br",r=n.default.version;return(0,s.jsx)("main",{className:"py-4 sm:py-8 px-3 sm:px-4",children:(0,s.jsxs)("div",{className:"max-w-6xl mx-auto",children:[(0,s.jsxs)("div",{className:"text-center mb-6 sm:mb-10",children:[(0,s.jsx)("h1",{className:"text-2xl sm:text-4xl font-bold text-gray-800 mb-2 sm:mb-4",children:"Agende seu Atendimento"}),(0,s.jsx)("p",{className:"text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto px-2",children:"Selecione uma data disponível no calendário abaixo e escolha o horário que melhor se adequa à sua necessidade."})]}),(0,s.jsx)("div",{className:"bg-blue-600 text-white rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-lg",children:(0,s.jsxs)("div",{className:"flex flex-col sm:flex-row items-center gap-4",children:[(0,s.jsx)("div",{className:"w-14 h-14 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0",children:(0,s.jsx)("span",{className:"text-3xl sm:text-4xl",children:"📍"})}),(0,s.jsxs)("div",{className:"text-center sm:text-left flex-1",children:[(0,s.jsx)("h2",{className:"text-lg sm:text-xl font-bold mb-2",children:"Este agendamento é válido apenas para:"}),(0,s.jsxs)("div",{className:"flex flex-col sm:flex-row gap-2 sm:gap-6 justify-center sm:justify-start mb-3",children:[(0,s.jsx)("span",{className:"bg-white/20 px-4 py-2 rounded-lg font-semibold text-sm sm:text-base",children:"🏛️ 8º Distrito Policial da Capital"}),(0,s.jsx)("span",{className:"bg-white/20 px-4 py-2 rounded-lg font-semibold text-sm sm:text-base",children:"🏛️ 21º Distrito Policial da Capital"})]}),(0,s.jsxs)("div",{className:"text-blue-100 text-xs sm:text-sm space-y-1",children:[(0,s.jsxs)("p",{children:[(0,s.jsx)("strong",{children:"📍 Endereço:"})," ",e]}),(0,s.jsxs)("p",{children:[(0,s.jsx)("strong",{children:"📞"})," ",t,"  | ",(0,s.jsx)("strong",{children:"📧"})," ",a]})]})]})]})}),(0,s.jsx)("div",{className:"bg-white rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-6 md:p-8",children:(0,s.jsx)(i,{})}),(0,s.jsxs)("div",{className:"mt-6 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6",children:[(0,s.jsxs)("div",{className:"bg-white rounded-xl p-4 sm:p-6 shadow-md",children:[(0,s.jsx)("div",{className:"w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4",children:(0,s.jsx)("svg",{className:"w-5 h-5 sm:w-6 sm:h-6 text-blue-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"})})}),(0,s.jsx)("h3",{className:"text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2",children:"1. Escolha a Data"}),(0,s.jsx)("p",{className:"text-gray-600 text-xs sm:text-sm",children:"Navegue pelo calendário e selecione uma data com horários disponíveis."})]}),(0,s.jsxs)("div",{className:"bg-white rounded-xl p-4 sm:p-6 shadow-md",children:[(0,s.jsx)("div",{className:"w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4",children:(0,s.jsx)("svg",{className:"w-5 h-5 sm:w-6 sm:h-6 text-green-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"})})}),(0,s.jsx)("h3",{className:"text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2",children:"2. Selecione o Horário"}),(0,s.jsx)("p",{className:"text-gray-600 text-xs sm:text-sm",children:"Escolha um dos horários disponíveis para o atendimento."})]}),(0,s.jsxs)("div",{className:"bg-white rounded-xl p-4 sm:p-6 shadow-md",children:[(0,s.jsx)("div",{className:"w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4",children:(0,s.jsx)("svg",{className:"w-5 h-5 sm:w-6 sm:h-6 text-purple-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"})})}),(0,s.jsx)("h3",{className:"text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2",children:"3. Confirme seus Dados"}),(0,s.jsx)("p",{className:"text-gray-600 text-xs sm:text-sm",children:"Preencha seu nome e informações de contato para finalizar."})]})]}),(0,s.jsxs)("footer",{className:"mt-8 sm:mt-12 bg-gray-800 text-white rounded-xl sm:rounded-2xl p-6 sm:p-8",children:[(0,s.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[(0,s.jsxs)("div",{children:[(0,s.jsxs)("h3",{className:"text-lg font-bold mb-4 flex items-center gap-2",children:[(0,s.jsx)("span",{className:"text-2xl",children:"📞"})," Contato"]}),(0,s.jsxs)("div",{className:"space-y-3 text-gray-300 text-sm",children:[(0,s.jsxs)("p",{className:"flex items-start gap-2",children:[(0,s.jsx)("span",{className:"text-blue-400 mt-0.5",children:"📍"}),(0,s.jsx)("span",{children:e})]}),(0,s.jsxs)("p",{className:"flex items-center gap-2",children:[(0,s.jsx)("span",{className:"text-green-400",children:"📞"}),(0,s.jsx)("a",{href:`tel:${t.replace(/\D/g,"")}`,className:"hover:text-white transition-colors",children:t})]}),(0,s.jsxs)("p",{className:"flex items-center gap-2",children:[(0,s.jsx)("span",{className:"text-yellow-400",children:"📧"}),(0,s.jsx)("a",{href:`mailto:${a}`,className:"hover:text-white transition-colors",children:a})]})]})]}),(0,s.jsxs)("div",{children:[(0,s.jsxs)("h3",{className:"text-lg font-bold mb-4 flex items-center gap-2",children:[(0,s.jsx)("span",{className:"text-2xl",children:"🏛️"})," Distritos Atendidos"]}),(0,s.jsxs)("ul",{className:"space-y-2 text-gray-300 text-sm",children:[(0,s.jsxs)("li",{className:"flex items-center gap-2",children:[(0,s.jsx)("span",{className:"w-2 h-2 bg-blue-400 rounded-full"}),"8º Distrito Policial da Capital"]}),(0,s.jsxs)("li",{className:"flex items-center gap-2",children:[(0,s.jsx)("span",{className:"w-2 h-2 bg-blue-400 rounded-full"}),"21º Distrito Policial da Capital"]})]})]})]}),(0,s.jsxs)("div",{className:"mt-6 pt-6 border-t border-gray-700 text-center text-gray-400 text-xs",children:[(0,s.jsxs)("p",{children:["© ",new Date().getFullYear()," Polícia Civil de Alagoas. Todos os direitos reservados."]}),(0,s.jsx)("p",{className:"mt-1",children:"Em caso de dúvidas ou necessidade de cancelamento, entre em contato conosco."}),(0,s.jsxs)("p",{className:"mt-2 text-gray-500",children:["v",r]})]})]})]})})}e.s(["default",()=>d],73835)}]);