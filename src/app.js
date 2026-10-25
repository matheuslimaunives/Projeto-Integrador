const KEY="conectaVidaIA";
const defaults={
  idoso:["visual","audio","ajuda"],
  fala:["comunicacao","voz","ajuda"]
};
const catalog={
  comunicacao:["💬","Comunicação assistida","Escolha imagens organizadas por categoria, ouça frases e cadastre seus próprios cartões."],
  voz:["🔊","Reprodução de voz","Estrutura inicial para transformar a mensagem selecionada em áudio."],
  visual:["👁️","Acessibilidade visual","Leitura facilitada, contraste e controles maiores para reduzir barreiras de interação."],
  audio:["🎧","Orientações em áudio","Espaço para instruções e navegação guiada por áudio."],
  vibracao:["📳","Alertas por vibração","Estrutura reservada para notificações táteis em dispositivos compatíveis."],
  ajuda:["🆘","Ajuda e contatos","Área para organizar contatos importantes e orientações de ajuda."]
};
const form=document.querySelector("#form"),setup=document.querySelector("#setup"),home=document.querySelector("#home");
const modules=document.querySelector("#modules"),welcome=document.querySelector("#welcome"),description=document.querySelector("#description");

function resources(){return [...document.querySelectorAll('input[name="resource"]:checked')].map(x=>x.value)}
function adapt(rs){document.body.classList.toggle("large-text",rs.includes("visual"));document.body.classList.toggle("large-controls",rs.includes("visual"));document.body.classList.toggle("high-contrast",rs.includes("visual"))}
function show(user){
  document.querySelector("#communication").classList.add("hidden");setup.classList.add("hidden");home.classList.remove("hidden");
  welcome.textContent=`Olá, ${user.name}!`;
  description.textContent=user.profile==="idoso"
    ?"A interface foi preparada para reduzir passos, facilitar a leitura e apoiar a orientação."
    :"A interface foi preparada para comunicação por imagens, frases e reprodução da mensagem.";
  modules.innerHTML="";
  user.resources.forEach(key=>{
    const [icon,title,text]=catalog[key]||[];
    if(!title)return;
    const el=document.createElement("article");el.className="module";
    el.innerHTML=`<div class="module-icon" aria-hidden="true">${icon}</div><h2>${title}</h2><p>${text}</p><button type="button">Abrir módulo</button>`;
    if(key!=="comunicacao") el.querySelector("button").textContent="Em desenvolvimento";
    el.querySelector("button").addEventListener("click",()=>{
      if(key==="comunicacao") window.ConectaCommunication.open();
      else alert(`${title}: recurso em desenvolvimento.`);
    });
    modules.appendChild(el);
  });
  adapt(user.resources);
}
form.addEventListener("submit",e=>{
  e.preventDefault();
  const fd=new FormData(form),profile=fd.get("profile"),name=String(fd.get("name")).trim();
  if(!name){document.querySelector("#name").setCustomValidity("Informe um nome válido.");document.querySelector("#name").reportValidity();return}
  let rs=resources();if(!rs.length)rs=defaults[profile]||[];
  const user={name,ageGroup:fd.get("age"),profile,resources:rs};
  try{localStorage.setItem(KEY,JSON.stringify(user))}catch{alert("Não foi possível salvar o perfil neste navegador. Você pode continuar nesta sessão.")}
  show(user);
});
document.querySelector("#name").addEventListener("input",e=>e.target.setCustomValidity(""));
document.querySelector("#reset").addEventListener("click",()=>{
  window.ConectaCommunication.close();try{localStorage.removeItem(KEY)}catch{}form.reset();setup.classList.remove("hidden");home.classList.add("hidden");
  document.body.classList.remove("large-text","large-controls","high-contrast");window.scrollTo(0,0);
});
try{const saved=localStorage.getItem(KEY);if(saved){const user=JSON.parse(saved);if(!user||typeof user.name!=="string"||!Array.isArray(user.resources)||!Object.hasOwn(defaults,user.profile))throw new Error("Perfil inválido");show(user)}}catch{try{localStorage.removeItem(KEY)}catch{}}
