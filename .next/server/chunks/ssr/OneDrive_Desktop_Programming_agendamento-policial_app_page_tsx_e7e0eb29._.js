module.exports=[67742,a=>{"use strict";var b=a.i(71629),c=a.i(97947),d=a.i(45376);function e({slot:a,onClose:e}){let{addBooking:f}=(0,d.useApp)(),[g,h]=(0,c.useState)(""),[i,j]=(0,c.useState)(""),[k,l]=(0,c.useState)(""),[m,n]=(0,c.useState)(""),[o,p]=(0,c.useState)(""),[q,r]=(0,c.useState)(!1),[s,t]=(0,c.useState)(""),[u,v]=(0,c.useState)(null),[w,x]=(0,c.useState)(null),y="(82) 3315-7917",z="Av. Norma Pimentel Costa s/nº, Benedito Bentes, Maceió - Alagoas",A="8dp@pc.al.gov.br",B=async a=>{try{x("pending");let b=await fetch("/api/send-email",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({to:a.email,subject:`Confirma\xe7\xe3o de Agendamento - ${D(a.date)} \xe0s ${a.startTime}`,html:`
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
            <div style="font-size: 18px; font-weight: bold; color: #1e40af;">${D(a.date)}</div>
            <div style="font-size: 24px; font-weight: bold; color: #333; margin-top: 10px;">${a.startTime} - ${a.endTime}</div>
          </div>

          <div style="margin-bottom: 25px;">
            <div style="font-weight: bold; color: #333; margin-bottom: 10px; font-size: 14px; text-transform: uppercase;">Dados do Agendamento</div>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555; width: 120px;">Nome:</td>
                <td style="padding: 8px 0; color: #333;">${a.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">CPF:</td>
                <td style="padding: 8px 0; color: #333;">${a.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,"$1.$2.$3-$4")}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Telefone:</td>
                <td style="padding: 8px 0; color: #333;">${a.phone.replace(/(\d{2})(\d{5})(\d{4})/,"($1) $2-$3")}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">E-mail:</td>
                <td style="padding: 8px 0; color: #333;">${a.email}</td>
              </tr>
              ${a.description?`
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Descri\xe7\xe3o:</td>
                <td style="padding: 8px 0; color: #333;">${a.description}</td>
              </tr>
              `:""}
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">C\xf3digo:</td>
                <td style="padding: 8px 0; color: #333; font-family: monospace;">${a.id}</td>
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
            <p style="margin-bottom: 10px;"><strong>📍 Endere\xe7o:</strong> ${z}</p>
            <p><strong>📞 Telefone:</strong> ${y} | <strong>📧 E-mail:</strong> ${A}</p>
            <p style="margin-top: 15px; font-size: 11px;">Agendamento realizado em: ${new Date(a.createdAt).toLocaleString("pt-BR")}</p>
            <p style="font-size: 11px;">Em caso de necessidade de cancelamento ou d\xfavidas, entre em contato conosco.</p>
          </div>
        </body>
      </html>
    `})}),c=await b.json();c.success&&c.emailSent?x("sent"):x("failed")}catch(a){console.error("Erro ao enviar email:",a),x("failed")}},C=async b=>{if(b.preventDefault(),t(""),!g.trim())return void t("Nome é obrigatório");if(!i.trim())return void t("CPF é obrigatório");let c=i.replace(/\D/g,"");if(11!==c.length)return void t("CPF inválido. Digite os 11 dígitos.");if(/^(\d)\1{10}$/.test(c))return void t("CPF inválido.");let d=0;for(let a=0;a<9;a++)d+=parseInt(c.charAt(a))*(10-a);let e=10*d%11;if((10===e||11===e)&&(e=0),e!==parseInt(c.charAt(9)))return void t("CPF inválido.");d=0;for(let a=0;a<10;a++)d+=parseInt(c.charAt(a))*(11-a);if((10==(e=10*d%11)||11===e)&&(e=0),e!==parseInt(c.charAt(10)))return void t("CPF inválido.");if(!k.trim())return void t("Celular é obrigatório");let h=k.replace(/\D/g,"");if(!/^[1-9]{2}9[0-9]{8}$/.test(h))return void t("Celular inválido. Use o formato (XX) 9XXXX-XXXX");if(!m.trim())return void t("E-mail é obrigatório");if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m.trim()))return void t("E-mail inválido");r(!0);try{let b={id:"",slotId:a.id,name:g.trim(),cpf:i.replace(/\D/g,""),phone:k.replace(/\D/g,""),email:m.trim(),description:o.trim()||void 0,createdAt:new Date().toISOString()},c=await f(b);if(c){let b={...c,cpf:c.cpf||"",phone:c.phone||"",email:c.email||"",date:a.date,startTime:a.startTime,endTime:a.endTime};v(b),B(b)}else t("Erro ao fazer agendamento. Tente novamente.")}catch{t("Erro ao fazer agendamento. Tente novamente.")}finally{r(!1)}},D=a=>new Date(a+"T12:00:00").toLocaleDateString("pt-BR",{weekday:"long",day:"numeric",month:"long",year:"numeric"}),E=a=>a.replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,"$1.$2.$3-$4"),F=a=>{let b=a.replace(/\D/g,"");return 11===b.length?b.replace(/(\d{2})(\d{5})(\d{4})/,"($1) $2-$3"):a};return u?(0,b.jsx)("div",{className:"fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4 z-50",children:(0,b.jsxs)("div",{className:"bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-lg overflow-hidden max-h-[95vh] sm:max-h-[90vh] overflow-y-auto",children:[(0,b.jsx)("div",{className:"bg-gradient-to-r from-green-600 to-green-700 p-4 sm:p-6 text-white sticky top-0",children:(0,b.jsxs)("div",{className:"flex items-center gap-3",children:[(0,b.jsx)("div",{className:"w-12 h-12 bg-white/20 rounded-full flex items-center justify-center",children:(0,b.jsx)("svg",{className:"w-7 h-7",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,b.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 13l4 4L19 7"})})}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h2",{className:"text-xl font-semibold",children:"Agendamento Confirmado!"}),(0,b.jsx)("p",{className:"text-green-100 text-sm",children:"Seu atendimento foi agendado com sucesso"})]})]})}),(0,b.jsxs)("div",{className:"p-4 sm:p-6 space-y-4",children:[(0,b.jsxs)("div",{className:"bg-blue-100 border-2 border-blue-400 rounded-xl p-4",children:[(0,b.jsxs)("p",{className:"text-blue-800 font-bold text-center mb-2 flex items-center justify-center gap-2",children:[(0,b.jsx)("span",{children:"📍"})," Este agendamento é válido apenas para:"]}),(0,b.jsxs)("ul",{className:"text-blue-900 text-sm space-y-1 ml-4",children:[(0,b.jsx)("li",{children:(0,b.jsx)("strong",{children:"• 8º Distrito Policial da Capital"})}),(0,b.jsx)("li",{children:(0,b.jsx)("strong",{children:"• 21º Distrito Policial da Capital"})})]})]}),(0,b.jsxs)("div",{className:"bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-center",children:[(0,b.jsx)("p",{className:"text-blue-800 font-medium",children:D(u.date)}),(0,b.jsxs)("p",{className:"text-2xl font-bold text-blue-900 mt-1",children:[u.startTime," - ",u.endTime]})]}),(0,b.jsxs)("div",{className:"space-y-2",children:[(0,b.jsx)("h3",{className:"font-semibold text-gray-800 text-sm uppercase",children:"Seus Dados"}),(0,b.jsxs)("div",{className:"bg-gray-50 rounded-lg p-3 space-y-1 text-sm",children:[(0,b.jsxs)("p",{children:[(0,b.jsx)("span",{className:"font-medium text-gray-600",children:"Nome:"})," ",u.name]}),u.cpf&&(0,b.jsxs)("p",{children:[(0,b.jsx)("span",{className:"font-medium text-gray-600",children:"CPF:"})," ",E(u.cpf)]}),u.phone&&(0,b.jsxs)("p",{children:[(0,b.jsx)("span",{className:"font-medium text-gray-600",children:"Telefone:"})," ",F(u.phone)]}),u.email&&(0,b.jsxs)("p",{children:[(0,b.jsx)("span",{className:"font-medium text-gray-600",children:"E-mail:"})," ",u.email]}),u.description&&(0,b.jsxs)("p",{children:[(0,b.jsx)("span",{className:"font-medium text-gray-600",children:"Descrição:"})," ",u.description]})]})]}),(0,b.jsxs)("div",{className:"bg-amber-50 border border-amber-300 rounded-xl p-4",children:[(0,b.jsxs)("h3",{className:"font-bold text-amber-800 flex items-center gap-2 mb-3",children:[(0,b.jsx)("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,b.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"})}),"Importante - Leve no dia:"]}),(0,b.jsxs)("ul",{className:"text-amber-900 text-sm space-y-2",children:[(0,b.jsxs)("li",{className:"flex items-start gap-2",children:[(0,b.jsx)("span",{className:"text-amber-600 mt-0.5",children:"📄"}),(0,b.jsxs)("span",{children:[(0,b.jsx)("strong",{children:"Documento de identificação com foto"})," (RG, CNH ou outro documento oficial)"]})]}),(0,b.jsxs)("li",{className:"flex items-start gap-2",children:[(0,b.jsx)("span",{className:"text-amber-600 mt-0.5",children:"📱"}),(0,b.jsxs)("span",{children:[(0,b.jsx)("strong",{children:"Mensagens de texto"})," (prints de WhatsApp, SMS, redes sociais)"]})]}),(0,b.jsxs)("li",{className:"flex items-start gap-2",children:[(0,b.jsx)("span",{className:"text-amber-600 mt-0.5",children:"🎵"}),(0,b.jsxs)("span",{children:[(0,b.jsx)("strong",{children:"Áudios e vídeos"})," relevantes ao caso"]})]}),(0,b.jsxs)("li",{className:"flex items-start gap-2",children:[(0,b.jsx)("span",{className:"text-amber-600 mt-0.5",children:"📷"}),(0,b.jsxs)("span",{children:[(0,b.jsx)("strong",{children:"Fotos e imagens"})," relacionadas"]})]}),(0,b.jsxs)("li",{className:"flex items-start gap-2",children:[(0,b.jsx)("span",{className:"text-amber-600 mt-0.5",children:"📁"}),(0,b.jsxs)("span",{children:[(0,b.jsx)("strong",{children:"Documentos e artefatos"})," que comprovem o relato"]})]})]})]}),(0,b.jsxs)("div",{className:"text-center text-xs text-gray-500 space-y-2 bg-gray-50 rounded-lg p-3",children:[(0,b.jsxs)("p",{className:"text-gray-700",children:[(0,b.jsx)("strong",{children:"📍 Endereço:"})," ",z]}),(0,b.jsxs)("p",{children:[(0,b.jsx)("strong",{children:"📞"})," ",y," | ",(0,b.jsx)("strong",{children:"📧"})," ",A]}),(0,b.jsxs)("p",{className:"pt-1 border-t border-gray-200",children:["Código: ",(0,b.jsx)("span",{className:"font-mono",children:u.id})]})]}),(0,b.jsxs)("div",{className:`p-3 rounded-lg text-sm flex items-center gap-2 ${"pending"===w?"bg-blue-50 text-blue-700":"sent"===w?"bg-green-50 text-green-700":"failed"===w?"bg-red-50 text-red-700":"bg-gray-50 text-gray-600"}`,children:["pending"===w&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)("svg",{className:"animate-spin h-4 w-4",viewBox:"0 0 24 24",children:[(0,b.jsx)("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4",fill:"none"}),(0,b.jsx)("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),(0,b.jsxs)("span",{children:["Enviando comprovante para ",u.email,"..."]})]}),"sent"===w&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,b.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 13l4 4L19 7"})}),(0,b.jsxs)("span",{children:["Comprovante enviado para ",u.email]})]}),"failed"===w&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,b.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"})}),(0,b.jsx)("span",{children:"Não foi possível enviar o email. Use o botão Imprimir."})]})]}),(0,b.jsxs)("div",{className:"flex gap-3 pt-2",children:[(0,b.jsxs)("button",{onClick:()=>{if(!u)return;let a=window.open("","_blank");if(!a)return;let b=u.cpf?`<div class="info-row"><span class="info-label">CPF:</span><span class="info-value">${E(u.cpf)}</span></div>`:"",c=u.phone?`<div class="info-row"><span class="info-label">Telefone:</span><span class="info-value">${F(u.phone)}</span></div>`:"",d=u.email?`<div class="info-row"><span class="info-label">E-mail:</span><span class="info-value">${u.email}</span></div>`:"",e=u.description?`<div class="info-row"><span class="info-label">Descri\xe7\xe3o:</span><span class="info-value">${u.description}</span></div>`:"";a.document.write(`
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
            <div class="date">${D(u.date)}</div>
            <div class="time">${u.startTime} - ${u.endTime}</div>
          </div>

          <div class="section">
            <div class="section-title">Dados do Agendamento</div>
            <div class="info-row">
              <span class="info-label">Nome:</span>
              <span class="info-value">${u.name}</span>
            </div>
            ${b}
            ${c}
            ${d}
            ${e}
            <div class="info-row">
              <span class="info-label">C\xf3digo:</span>
              <span class="info-value">${u.id}</span>
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
            <p style="margin-bottom: 10px;"><strong>📍 Endere\xe7o:</strong> ${z}</p>
            <p><strong>📞 Telefone:</strong> ${y} | <strong>📧 E-mail:</strong> ${A}</p>
            <p style="margin-top: 15px;">Agendamento realizado em: ${new Date(u.createdAt).toLocaleString("pt-BR")}</p>
            <p>Em caso de necessidade de cancelamento ou d\xfavidas, entre em contato conosco.</p>
          </div>
        </body>
      </html>
    `),a.document.close(),a.focus(),setTimeout(()=>{a.print(),a.close()},250)},className:"flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center gap-2",children:[(0,b.jsx)("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,b.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"})}),"Imprimir"]}),(0,b.jsx)("button",{onClick:e,className:"flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium",children:"Concluir"})]})]})]})}):(0,b.jsx)("div",{className:"fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4 z-50",children:(0,b.jsxs)("div",{className:"bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-md overflow-hidden max-h-[85vh] sm:max-h-[90vh] overflow-y-auto",children:[(0,b.jsx)("div",{className:"bg-gradient-to-r from-blue-600 to-blue-700 p-3 sm:p-6 text-white sticky top-0 z-10",children:(0,b.jsxs)("div",{className:"flex justify-between items-start",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("h2",{className:"text-base sm:text-xl font-semibold",children:"Agendar Atendimento"}),(0,b.jsx)("p",{className:"mt-0.5 sm:mt-1 text-blue-100 text-xs sm:text-sm",children:D(a.date)}),(0,b.jsxs)("p",{className:"text-lg sm:text-2xl font-bold mt-1 sm:mt-2",children:[a.startTime," - ",a.endTime]})]}),(0,b.jsx)("button",{onClick:e,className:"p-1 hover:bg-white/20 rounded-full transition-colors",children:(0,b.jsx)("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,b.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})})]})}),(0,b.jsxs)("form",{onSubmit:C,className:"p-3 sm:p-6 space-y-3",children:[(0,b.jsxs)("div",{className:"bg-red-50 border border-red-200 rounded-lg p-2.5 sm:p-3 text-xs text-red-800",children:[(0,b.jsxs)("p",{className:"font-bold flex items-center gap-1 mb-1",children:[(0,b.jsx)("svg",{className:"w-4 h-4 flex-shrink-0",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,b.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"})}),"Art. 299 do Código Penal"]}),(0,b.jsxs)("p",{className:"text-red-700 leading-snug text-[11px] sm:text-xs",children:["Inserir declaração falsa em documento: ",(0,b.jsx)("strong",{children:"Pena - reclusão de 1 a 5 anos, e multa."})]})]}),s&&(0,b.jsx)("div",{className:"p-2.5 sm:p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm",children:s}),(0,b.jsxs)("div",{children:[(0,b.jsxs)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:["Nome completo ",(0,b.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,b.jsx)("input",{type:"text",value:g,onChange:a=>h(a.target.value),onInvalid:a=>a.target.setCustomValidity("Por favor, preencha este campo."),onInput:a=>a.target.setCustomValidity(""),className:"w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-base",placeholder:"Digite seu nome completo",required:!0})]}),(0,b.jsxs)("div",{children:[(0,b.jsxs)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:["CPF ",(0,b.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,b.jsx)("input",{type:"text",value:i,onChange:a=>{let b=a.target.value.replace(/\D/g,"");b.length<=11&&j(b.replace(/(\d{3})(\d)/,"$1.$2").replace(/(\d{3})(\d)/,"$1.$2").replace(/(\d{3})(\d{1,2})$/,"$1-$2"))},onInvalid:a=>a.target.setCustomValidity("Por favor, preencha este campo."),onInput:a=>a.target.setCustomValidity(""),className:"w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-base",placeholder:"000.000.000-00",required:!0})]}),(0,b.jsxs)("div",{children:[(0,b.jsxs)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:["Celular ",(0,b.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,b.jsx)("input",{type:"tel",value:k,onChange:a=>{let b=a.target.value.replace(/\D/g,"");if(b.length<=11){let a=b;b.length>0&&(a="("+b.substring(0,2),b.length>2&&(a+=") "+b.substring(2,7)),b.length>7&&(a+="-"+b.substring(7,11))),l(a)}},onInvalid:a=>a.target.setCustomValidity("Por favor, preencha este campo."),onInput:a=>a.target.setCustomValidity(""),className:"w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-base",placeholder:"(82) 99999-9999",required:!0})]}),(0,b.jsxs)("div",{children:[(0,b.jsxs)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:["E-mail ",(0,b.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,b.jsx)("input",{type:"email",value:m,onChange:a=>n(a.target.value),onInvalid:a=>{let b=a.target;b.validity.valueMissing?b.setCustomValidity("Por favor, preencha este campo."):b.validity.typeMismatch&&b.setCustomValidity("Por favor, insira um endereço de e-mail válido.")},onInput:a=>a.target.setCustomValidity(""),className:"w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-base",placeholder:"seu@email.com",required:!0})]}),(0,b.jsxs)("div",{children:[(0,b.jsxs)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:["Descrição breve ",(0,b.jsx)("span",{className:"text-gray-400",children:"(opcional)"})]}),(0,b.jsx)("textarea",{value:o,onChange:a=>p(a.target.value),rows:2,className:"w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none text-base",placeholder:"Motivo do atendimento..."})]}),(0,b.jsxs)("div",{className:"flex gap-2 sm:gap-3 pt-2",children:[(0,b.jsx)("button",{type:"button",onClick:e,className:"flex-1 px-3 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm",children:"Cancelar"}),(0,b.jsx)("button",{type:"submit",disabled:q,className:"flex-1 px-3 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm",children:q?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)("svg",{className:"animate-spin h-4 w-4",viewBox:"0 0 24 24",children:[(0,b.jsx)("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4",fill:"none"}),(0,b.jsx)("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),"Agendando..."]}):"Confirmar"})]})]})]})})}let f=["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"],g=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];function h(){let{slots:a,isReady:h}=(0,d.useApp)(),[i,j]=(0,c.useState)(new Date),[k,l]=(0,c.useState)(null),[m,n]=(0,c.useState)(null),o=i.getFullYear(),p=i.getMonth(),q=new Date(o,p,1),r=new Date(o,p+1,0),s=q.getDay(),t=r.getDate(),u=(0,c.useMemo)(()=>{let b={};return a.filter(a=>!a.isDisabled).forEach(a=>{b[a.date]||(b[a.date]=[]),b[a.date].push(a)}),Object.keys(b).forEach(a=>{b[a].sort((a,b)=>a.startTime.localeCompare(b.startTime))}),b},[a]),v=a=>{j(new Date(o,p+("next"===a?1:-1),1)),l(null)},w=new Date().toISOString().split("T")[0],x=a=>{let b=new Date;return new Date(`${a.date}T${a.startTime}:00`)<=b};return h?(0,b.jsxs)("div",{className:"w-full max-w-4xl mx-auto px-2 sm:px-0",children:[(0,b.jsxs)("div",{className:"flex items-center justify-between mb-4 sm:mb-6",children:[(0,b.jsx)("button",{onClick:()=>v("prev"),className:"p-2 hover:bg-gray-100 rounded-lg transition-colors",children:(0,b.jsx)("svg",{className:"w-5 h-5 sm:w-6 sm:h-6 text-gray-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,b.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M15 19l-7-7 7-7"})})}),(0,b.jsxs)("h2",{className:"text-lg sm:text-2xl font-semibold text-gray-800",children:[g[p]," ",o]}),(0,b.jsx)("button",{onClick:()=>v("next"),className:"p-2 hover:bg-gray-100 rounded-lg transition-colors",children:(0,b.jsx)("svg",{className:"w-5 h-5 sm:w-6 sm:h-6 text-gray-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,b.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5l7 7-7 7"})})})]}),(0,b.jsx)("div",{className:"grid grid-cols-7 gap-0.5 sm:gap-1 mb-2",children:f.map(a=>(0,b.jsx)("div",{className:"text-center text-xs sm:text-sm font-medium text-gray-500 py-1 sm:py-2",children:a},a))}),(0,b.jsxs)("div",{className:"grid grid-cols-7 gap-0.5 sm:gap-1",children:[Array.from({length:s}).map((a,c)=>(0,b.jsx)("div",{className:"h-14 sm:h-24 bg-gray-50 rounded-lg"},`empty-${c}`)),Array.from({length:t}).map((a,c)=>{let d=c+1,e=`${o}-${String(p+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`,f=(a=>{let b=u[a]||[];if(0===b.length)return"none";let c=b.filter(a=>!a.isBooked&&!x(a));return 0===c.length?"full":c.length<b.filter(a=>!x(a)).length?"partial":"available"})(e),g=k===e,h=e<w,i=(u[e]||[]).filter(a=>!a.isBooked&&!x(a)).length;return(0,b.jsxs)("button",{onClick:()=>!h&&"none"!==f&&l(g?null:e),disabled:h||"none"===f,className:`
                h-14 sm:h-24 rounded-lg p-1 sm:p-2 text-left transition-all relative
                ${h?"bg-gray-100 text-gray-400 cursor-not-allowed":""}
                ${"none"===f&&!h?"bg-gray-50 text-gray-400 cursor-not-allowed":""}
                ${"available"===f&&!h?"bg-green-50 hover:bg-green-100 border-2 border-green-200 cursor-pointer":""}
                ${"partial"===f&&!h?"bg-yellow-50 hover:bg-yellow-100 border-2 border-yellow-200 cursor-pointer":""}
                ${"full"===f&&!h?"bg-red-50 text-gray-500 border-2 border-red-200 cursor-not-allowed":""}
                ${g?"ring-2 ring-blue-500 ring-offset-1 sm:ring-offset-2":""}
              `,children:[(0,b.jsx)("span",{className:`text-xs sm:text-sm font-medium ${e===w?"bg-blue-600 text-white rounded-full w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center":""}`,children:d}),"none"!==f&&!h&&(0,b.jsx)("div",{className:"mt-0.5 sm:mt-1 hidden sm:block",children:(0,b.jsx)("span",{className:`text-xs ${"full"===f?"text-red-600":"text-green-600"}`,children:"full"===f?"Lotado":`${i} vaga${1!==i?"s":""}`})}),"none"!==f&&!h&&(0,b.jsx)("div",{className:"sm:hidden absolute bottom-1 left-1/2 transform -translate-x-1/2",children:(0,b.jsx)("div",{className:`w-1.5 h-1.5 rounded-full ${"full"===f?"bg-red-500":"partial"===f?"bg-yellow-500":"bg-green-500"}`})})]},d)})]}),k&&(0,b.jsxs)("div",{className:"mt-4 sm:mt-8 p-4 sm:p-6 bg-white rounded-xl shadow-lg border border-gray-100",children:[(0,b.jsxs)("h3",{className:"text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4",children:["Horários disponíveis - ",new Date(k+"T12:00:00").toLocaleDateString("pt-BR",{weekday:"long",day:"numeric",month:"long"})]}),(0,b.jsx)("div",{className:"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3",children:(u[k]||[]).map(a=>{let c=x(a),d=a.isBooked||c;return(0,b.jsxs)("button",{onClick:()=>!d&&n(a),disabled:d,className:`
                    p-2 sm:p-4 rounded-lg text-center transition-all
                    ${d?"bg-gray-100 text-gray-400 cursor-not-allowed":"bg-blue-50 hover:bg-blue-100 text-blue-700 border-2 border-blue-200 hover:border-blue-300 cursor-pointer"}
                    ${a.isBooked?"line-through":""}
                  `,title:c&&!a.isBooked?"Horário já passou":a.isBooked?"Horário ocupado":"Clique para agendar",children:[(0,b.jsx)("span",{className:"font-medium text-sm sm:text-base",children:a.startTime}),(0,b.jsx)("span",{className:"text-gray-400 mx-0.5 sm:mx-1 text-sm",children:"-"}),(0,b.jsx)("span",{className:"font-medium text-sm sm:text-base",children:a.endTime}),c&&!a.isBooked&&(0,b.jsx)("div",{className:"text-xs text-gray-400 mt-1",children:"Passou"})]},a.id)})})]}),(0,b.jsxs)("div",{className:"mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-4 justify-center text-xs sm:text-sm",children:[(0,b.jsxs)("div",{className:"flex items-center gap-1 sm:gap-2",children:[(0,b.jsx)("div",{className:"w-3 h-3 sm:w-4 sm:h-4 rounded bg-green-200 border border-green-300"}),(0,b.jsx)("span",{className:"text-gray-600",children:"Disponível"})]}),(0,b.jsxs)("div",{className:"flex items-center gap-1 sm:gap-2",children:[(0,b.jsx)("div",{className:"w-3 h-3 sm:w-4 sm:h-4 rounded bg-yellow-200 border border-yellow-300"}),(0,b.jsx)("span",{className:"text-gray-600",children:"Parcial"})]}),(0,b.jsxs)("div",{className:"flex items-center gap-1 sm:gap-2",children:[(0,b.jsx)("div",{className:"w-3 h-3 sm:w-4 sm:h-4 rounded bg-red-200 border border-red-300"}),(0,b.jsx)("span",{className:"text-gray-600",children:"Lotado"})]})]}),m&&(0,b.jsx)(e,{slot:m,onClose:()=>n(null)})]}):(0,b.jsx)("div",{className:"w-full max-w-4xl mx-auto flex items-center justify-center py-20",children:(0,b.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"})})}var i=a.i(85698);function j(){let a="Av. Norma Pimentel Costa s/nº, Benedito Bentes, Maceió - Alagoas",c="(82) 3315-7917",d="8dp@pc.al.gov.br",e=i.default.version;return(0,b.jsx)("main",{className:"py-4 sm:py-8 px-3 sm:px-4",children:(0,b.jsxs)("div",{className:"max-w-6xl mx-auto",children:[(0,b.jsxs)("div",{className:"text-center mb-6 sm:mb-10",children:[(0,b.jsx)("h1",{className:"text-2xl sm:text-4xl font-bold text-gray-800 mb-2 sm:mb-4",children:"Agende seu Atendimento"}),(0,b.jsx)("p",{className:"text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto px-2",children:"Selecione uma data disponível no calendário abaixo e escolha o horário que melhor se adequa à sua necessidade."})]}),(0,b.jsx)("div",{className:"bg-blue-600 text-white rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-lg",children:(0,b.jsxs)("div",{className:"flex flex-col sm:flex-row items-center gap-4",children:[(0,b.jsx)("div",{className:"w-14 h-14 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0",children:(0,b.jsx)("span",{className:"text-3xl sm:text-4xl",children:"📍"})}),(0,b.jsxs)("div",{className:"text-center sm:text-left flex-1",children:[(0,b.jsx)("h2",{className:"text-lg sm:text-xl font-bold mb-2",children:"Este agendamento é válido apenas para:"}),(0,b.jsxs)("div",{className:"flex flex-col sm:flex-row gap-2 sm:gap-6 justify-center sm:justify-start mb-3",children:[(0,b.jsx)("span",{className:"bg-white/20 px-4 py-2 rounded-lg font-semibold text-sm sm:text-base",children:"🏛️ 8º Distrito Policial da Capital"}),(0,b.jsx)("span",{className:"bg-white/20 px-4 py-2 rounded-lg font-semibold text-sm sm:text-base",children:"🏛️ 21º Distrito Policial da Capital"})]}),(0,b.jsxs)("div",{className:"text-blue-100 text-xs sm:text-sm space-y-1",children:[(0,b.jsxs)("p",{children:[(0,b.jsx)("strong",{children:"📍 Endereço:"})," ",a]}),(0,b.jsxs)("p",{children:[(0,b.jsx)("strong",{children:"📞"})," ",c,"  | ",(0,b.jsx)("strong",{children:"📧"})," ",d]})]})]})]})}),(0,b.jsx)("div",{className:"bg-white rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-6 md:p-8",children:(0,b.jsx)(h,{})}),(0,b.jsxs)("div",{className:"mt-6 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6",children:[(0,b.jsxs)("div",{className:"bg-white rounded-xl p-4 sm:p-6 shadow-md",children:[(0,b.jsx)("div",{className:"w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4",children:(0,b.jsx)("svg",{className:"w-5 h-5 sm:w-6 sm:h-6 text-blue-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,b.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"})})}),(0,b.jsx)("h3",{className:"text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2",children:"1. Escolha a Data"}),(0,b.jsx)("p",{className:"text-gray-600 text-xs sm:text-sm",children:"Navegue pelo calendário e selecione uma data com horários disponíveis."})]}),(0,b.jsxs)("div",{className:"bg-white rounded-xl p-4 sm:p-6 shadow-md",children:[(0,b.jsx)("div",{className:"w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4",children:(0,b.jsx)("svg",{className:"w-5 h-5 sm:w-6 sm:h-6 text-green-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,b.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"})})}),(0,b.jsx)("h3",{className:"text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2",children:"2. Selecione o Horário"}),(0,b.jsx)("p",{className:"text-gray-600 text-xs sm:text-sm",children:"Escolha um dos horários disponíveis para o atendimento."})]}),(0,b.jsxs)("div",{className:"bg-white rounded-xl p-4 sm:p-6 shadow-md",children:[(0,b.jsx)("div",{className:"w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4",children:(0,b.jsx)("svg",{className:"w-5 h-5 sm:w-6 sm:h-6 text-purple-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,b.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"})})}),(0,b.jsx)("h3",{className:"text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2",children:"3. Confirme seus Dados"}),(0,b.jsx)("p",{className:"text-gray-600 text-xs sm:text-sm",children:"Preencha seu nome e informações de contato para finalizar."})]})]}),(0,b.jsxs)("footer",{className:"mt-8 sm:mt-12 bg-gray-800 text-white rounded-xl sm:rounded-2xl p-6 sm:p-8",children:[(0,b.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[(0,b.jsxs)("div",{children:[(0,b.jsxs)("h3",{className:"text-lg font-bold mb-4 flex items-center gap-2",children:[(0,b.jsx)("span",{className:"text-2xl",children:"📞"})," Contato"]}),(0,b.jsxs)("div",{className:"space-y-3 text-gray-300 text-sm",children:[(0,b.jsxs)("p",{className:"flex items-start gap-2",children:[(0,b.jsx)("span",{className:"text-blue-400 mt-0.5",children:"📍"}),(0,b.jsx)("span",{children:a})]}),(0,b.jsxs)("p",{className:"flex items-center gap-2",children:[(0,b.jsx)("span",{className:"text-green-400",children:"📞"}),(0,b.jsx)("a",{href:`tel:${c.replace(/\D/g,"")}`,className:"hover:text-white transition-colors",children:c})]}),(0,b.jsxs)("p",{className:"flex items-center gap-2",children:[(0,b.jsx)("span",{className:"text-yellow-400",children:"📧"}),(0,b.jsx)("a",{href:`mailto:${d}`,className:"hover:text-white transition-colors",children:d})]})]})]}),(0,b.jsxs)("div",{children:[(0,b.jsxs)("h3",{className:"text-lg font-bold mb-4 flex items-center gap-2",children:[(0,b.jsx)("span",{className:"text-2xl",children:"🏛️"})," Distritos Atendidos"]}),(0,b.jsxs)("ul",{className:"space-y-2 text-gray-300 text-sm",children:[(0,b.jsxs)("li",{className:"flex items-center gap-2",children:[(0,b.jsx)("span",{className:"w-2 h-2 bg-blue-400 rounded-full"}),"8º Distrito Policial da Capital"]}),(0,b.jsxs)("li",{className:"flex items-center gap-2",children:[(0,b.jsx)("span",{className:"w-2 h-2 bg-blue-400 rounded-full"}),"21º Distrito Policial da Capital"]})]})]})]}),(0,b.jsxs)("div",{className:"mt-6 pt-6 border-t border-gray-700 text-center text-gray-400 text-xs",children:[(0,b.jsxs)("p",{children:["© ",new Date().getFullYear()," Polícia Civil de Alagoas. Todos os direitos reservados."]}),(0,b.jsx)("p",{className:"mt-1",children:"Em caso de dúvidas ou necessidade de cancelamento, entre em contato conosco."}),(0,b.jsxs)("p",{className:"mt-2 text-gray-500",children:["v",e]})]})]})]})})}a.s(["default",()=>j],67742)}];

//# sourceMappingURL=OneDrive_Desktop_Programming_agendamento-policial_app_page_tsx_e7e0eb29._.js.map