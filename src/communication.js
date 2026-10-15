(() => {
  'use strict';
  const categories = ['Necessidades básicas','Alimentação','Saúde e bem-estar','Sentimentos','Pessoas','Locais','Respostas','Rotina'];
  const builtins = [
    ['💧','Água','Quero beber água','Necessidades básicas'],['🚽','Banheiro','Preciso ir ao banheiro','Necessidades básicas'],['🆘','Ajuda','Preciso de ajuda','Necessidades básicas'],['🛏️','Descansar','Quero descansar','Necessidades básicas'],
    ['🍽️','Comida','Estou com fome','Alimentação'],['🍎','Fruta','Quero uma fruta','Alimentação'],['🥛','Leite','Quero beber leite','Alimentação'],['☕','Café','Quero um café','Alimentação'],
    ['🤕','Dor','Estou com dor','Saúde e bem-estar'],['💊','Remédio','Preciso do meu remédio','Saúde e bem-estar'],['🩺','Médico','Quero falar com o médico','Saúde e bem-estar'],['😴','Sono','Estou com sono','Saúde e bem-estar'],
    ['😊','Feliz','Estou feliz','Sentimentos'],['😢','Triste','Estou triste','Sentimentos'],['😟','Preocupado','Estou preocupado','Sentimentos'],['😠','Irritado','Estou irritado','Sentimentos'],
    ['👩','Mãe','Quero falar com minha mãe','Pessoas'],['👨','Pai','Quero falar com meu pai','Pessoas'],['👪','Família','Quero ver minha família','Pessoas'],['🧑‍⚕️','Cuidador','Preciso falar com meu cuidador','Pessoas'],
    ['🏠','Casa','Quero ir para casa','Locais'],['🏥','Hospital','Preciso ir ao hospital','Locais'],['🌳','Jardim','Quero ir ao jardim','Locais'],['🚗','Passear','Quero passear','Locais'],
    ['👍','Sim','Sim','Respostas'],['👎','Não','Não','Respostas'],['🙏','Obrigado','Muito obrigado','Respostas'],['❓','Não entendi','Não entendi, por favor repita','Respostas'],
    ['🛁','Banho','Quero tomar banho','Rotina'],['👕','Roupa','Quero trocar de roupa','Rotina'],['📺','Televisão','Quero assistir televisão','Rotina'],['📞','Telefonar','Quero fazer uma ligação','Rotina']
  ].map((x,i)=>({id:`base-${i}` ,emoji:x[0],label:x[1],phrase:x[2],category:x[3]}));
  const $ = id => document.getElementById(id);
  let db, recorder, stream, chunks=[], recordedBlob=null, previewUrl=null, activeAudio=null, renderUrls=[];
  const status = msg => { $('commStatus').textContent=msg; };
  function dbOpen(){
    if(db) return Promise.resolve(db);
    return new Promise((resolve,reject)=>{
      const req=indexedDB.open('ConectaVidaComunicacao',1);
      req.onupgradeneeded=()=>req.result.createObjectStore('cards',{keyPath:'id'});
      req.onsuccess=()=>{db=req.result;resolve(db)};
      req.onerror=()=>reject(req.error);
    });
  }
  async function getCards(){const d=await dbOpen();return new Promise((resolve,reject)=>{const r=d.transaction('cards').objectStore('cards').getAll();r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})}
  async function putCard(card){const d=await dbOpen();return new Promise((resolve,reject)=>{const r=d.transaction('cards','readwrite').objectStore('cards').put(card);r.onsuccess=resolve;r.onerror=()=>reject(r.error)})}
  async function removeCard(id){const d=await dbOpen();return new Promise((resolve,reject)=>{const r=d.transaction('cards','readwrite').objectStore('cards').delete(id);r.onsuccess=resolve;r.onerror=()=>reject(r.error)})}
  function speak(phrase){
    if(!('speechSynthesis' in window)){status('Este navegador não oferece leitura automática de texto.');return}
    speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(phrase);utterance.lang='pt-BR';utterance.rate=.85;
    const voice=speechSynthesis.getVoices().find(v=>v.lang.toLowerCase()==='pt-br');if(voice)utterance.voice=voice;
    speechSynthesis.speak(utterance);
  }
  function play(card){
    if(activeAudio){activeAudio.pause();activeAudio=null}
    if('speechSynthesis' in window)speechSynthesis.cancel();
    status(`Mensagem: ${card.phrase}`);
    if(card.audio){const url=URL.createObjectURL(card.audio);activeAudio=new Audio(url);activeAudio.onended=()=>URL.revokeObjectURL(url);activeAudio.onerror=()=>{URL.revokeObjectURL(url);speak(card.phrase)};activeAudio.play().catch(()=>{URL.revokeObjectURL(url);speak(card.phrase)})}
    else speak(card.phrase);
  }
  function makeCard(card){
    const article=document.createElement('article');article.className='picture-card';
    const button=document.createElement('button');button.type='button';button.className='picture-action';button.setAttribute('aria-label',`Falar: ${card.phrase}`);
    if(card.image){const img=document.createElement('img');const url=URL.createObjectURL(card.image);renderUrls.push(url);img.src=url;img.alt=card.label;button.append(img)}
    else {const symbol=document.createElement('span');symbol.className='symbol';symbol.textContent=card.emoji;symbol.setAttribute('aria-hidden','true');button.append(symbol)}
    const label=document.createElement('span');label.textContent=card.label;button.append(label);button.addEventListener('click',()=>play(card));article.append(button);
    if(!card.id.startsWith('base-')){const del=document.createElement('button');del.className='delete-card';del.textContent='Excluir imagem';del.type='button';del.addEventListener('click',async()=>{if(confirm(`Excluir o cartão “${card.label}”?`)){await removeCard(card.id);await render()}});article.append(del)}
    return article;
  }
  async function render(){
    renderUrls.forEach(URL.revokeObjectURL);renderUrls=[];
    const grid=$('pictureGrid');grid.replaceChildren();
    let custom=[];try{custom=await getCards()}catch{status('O armazenamento local está indisponível. As imagens padrão continuam funcionando.')}
    const selected=$('categoryFilter').value;
    const cards=[...builtins,...custom].filter(c=>selected==='Todas'||c.category===selected);
    cards.forEach(c=>grid.append(makeCard(c)));
    if(!cards.length)status('Não há imagens nesta categoria.');
  }
  function stopTracks(){if(stream){stream.getTracks().forEach(t=>t.stop());stream=null}}
  function resetRecording(){recordedBlob=null;$('listenRecording').disabled=true;$('startRecording').disabled=false;$('stopRecording').disabled=true;$('recordStatus').textContent='';if(previewUrl){URL.revokeObjectURL(previewUrl);previewUrl=null}}
  function closeEditor(){if(recorder?.state==='recording')recorder.stop();stopTracks();resetRecording();$('editor').classList.add('hidden');$('cardForm').reset()}
  async function startRecording(){
    if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder){$('recordStatus').textContent='Gravação indisponível neste navegador. Use HTTPS ou localhost e permita o microfone.';return}
    try{
      stream=await navigator.mediaDevices.getUserMedia({audio:true});chunks=[];recorder=new MediaRecorder(stream);
      recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data)};
      recorder.onstop=()=>{recordedBlob=new Blob(chunks,{type:recorder.mimeType||'audio/webm'});stopTracks();$('listenRecording').disabled=!recordedBlob.size;$('startRecording').disabled=false;$('stopRecording').disabled=true;$('recordStatus').textContent='Gravação concluída. Você pode ouvi-la antes de salvar.'};
      recorder.start();$('startRecording').disabled=true;$('stopRecording').disabled=false;$('recordStatus').textContent='Gravando... clique em Parar gravação quando terminar.';
    }catch{$('recordStatus').textContent='Não foi possível acessar o microfone. Verifique a permissão do navegador.';stopTracks()}
  }
  function init(){
    ['Todas',...categories].forEach(c=>{const opt=new Option(c,c);$('categoryFilter').add(opt)});
    categories.forEach(c=>$('cardCategory').add(new Option(c,c)));
    $('categoryFilter').addEventListener('change',render);
    $('backHome').addEventListener('click',()=>{$('communication').classList.add('hidden');$('home').classList.remove('hidden');closeEditor()});
    $('addCard').addEventListener('click',()=>{$('editor').classList.remove('hidden');$('cardLabel').focus()});
    $('cancelCard').addEventListener('click',closeEditor);
    $('startRecording').addEventListener('click',startRecording);
    $('stopRecording').addEventListener('click',()=>{if(recorder?.state==='recording')recorder.stop()});
    $('listenRecording').addEventListener('click',()=>{if(recordedBlob){if(previewUrl)URL.revokeObjectURL(previewUrl);previewUrl=URL.createObjectURL(recordedBlob);new Audio(previewUrl).play()}});
    $('cardForm').addEventListener('submit',async e=>{
      e.preventDefault();if(recorder?.state==='recording'){$('recordStatus').textContent='Pare a gravação antes de salvar.';return}
      const file=$('cardImage').files[0];if(!file||!['image/png','image/jpeg','image/webp'].includes(file.type)||file.size>2*1024*1024){$('recordStatus').textContent='Escolha uma imagem JPG, PNG ou WebP de até 2 MB.';return}
      const card={id:crypto.randomUUID(),label:$('cardLabel').value.trim(),phrase:$('cardPhrase').value.trim(),category:$('cardCategory').value,image:file,audio:recordedBlob};
      if(!card.label||!card.phrase)return;
      try{await putCard(card);closeEditor();$('categoryFilter').value=card.category;await render();status(`Cartão “${card.label}” salvo neste navegador.`)}catch{$('recordStatus').textContent='Não foi possível salvar. Verifique o espaço e as permissões de armazenamento do navegador.'}
    });
  }
  document.addEventListener('DOMContentLoaded',init);
  window.ConectaCommunication={open:async()=>{$('home').classList.add('hidden');$('communication').classList.remove('hidden');$('editor').classList.add('hidden');await render();$('commTitle').focus?.();window.scrollTo(0,0)}};
})();
