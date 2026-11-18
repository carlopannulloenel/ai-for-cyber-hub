const storeKey = 'ai-for-cyber-hub-demo-v1';
const navs = [
  ['home','Home','home'],
  ['domains','Domini','layers'],
  ['evaluations','Valutazioni in corso','clipboard'],
  ['critical','Processi critici','chart'],
];
const fnOrder=['Govern','Identify','Protect','Detect','Respond','Recover','Transversal'];
const fnMeta={
  Govern:{title:'Govern',label:'Governo',color:'#8369ce',bg:'#f0ecfb',desc:'Strategia, governance, rischio e responsabilità.'},
  Identify:{title:'Identify',label:'Identificare',color:'#0e9c8d',bg:'#e6f7f3',desc:'Asset, vulnerabilità ed esposizione alle minacce.'},
  Protect:{title:'Protect',label:'Proteggere',color:'#347ad0',bg:'#eaf2fe',desc:'Identità, applicazioni, dati e infrastrutture.'},
  Detect:{title:'Detect',label:'Rilevare',color:'#d08b2b',bg:'#fff5e5',desc:'Monitoring, analisi e rilevamento delle minacce.'},
  Respond:{title:'Respond',label:'Rispondere',color:'#cb6470',bg:'#fff0f1',desc:'Incident response, indagini e forensics.'},
  Recover:{title:'Recover',label:'Ripristinare',color:'#62955a',bg:'#eff7ec',desc:'Resilienza e ritorno alla normale operatività.'},
  Transversal:{title:'Trasversali',label:'Ambiti trasversali',color:'#738098',bg:'#edf1f6',desc:'Attività che interessano più funzioni.'},
};
const svgPaths={
  home:'<path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22v-8h6v8"/>',
  layers:'<path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/>',
  clipboard:'<rect x="5" y="4" width="14" height="18" rx="2"/><rect x="9" y="2" width="6" height="4" rx="1"/><path d="m9 14 2 2 4-4"/>',
  chart:'<path d="M4 21h16"/><path d="M7 17V9m5 8V3m5 14v-6"/>',
  right:'<path d="m9 18 6-6-6-6"/>',
  left:'<path d="m15 18-6-6 6-6"/>',
  check:'<path d="m5 12 4 4L19 6"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',
  spark:'<path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z"/><path d="m19 17 .7 2.3L22 20l-2.3.7L19 23l-.7-2.3L16 20l2.3-.7L19 17Z"/>',
  shield:'<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/>',
  users:'<circle cx="9" cy="8" r="3"/><path d="M3 21v-2a6 6 0 0 1 12 0v2"/><path d="M17 5a3 3 0 0 1 0 6m2 10v-2a6 6 0 0 0-3-5"/>',
  filter:'<path d="M4 7h16M7 12h10m-7 5h4"/>',
  menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
  close:'<path d="M6 6 18 18M18 6 6 18"/>',
  activity:'<path d="M3 12h4l3-8 4 16 3-8h4"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 3"/>',
  download:'<path d="M12 3v12m-4-4 4 4 4-4"/><path d="M4 18v3h16v-3"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7h.01"/>',
  flag:'<path d="M5 22V4m0 1c5-3 9 3 14 0v11c-5 3-9-3-14 0"/>',
  reload:'<path d="M20 11a8 8 0 1 0-2 6"/><path d="m20 5 0 6-6 0"/>',
  file:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8m-8 4h8"/>',
  external:'<path d="M14 3h7v7m0-7-10 10"/><path d="M20 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6"/>',
};
const icon=(name,size=19)=>`<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${svgPaths[name]||svgPaths.info}</svg>`;
const esc=v=>String(v??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const fmtDate=v=>v?new Date(v).toLocaleDateString('it-IT',{day:'2-digit',month:'short',year:'numeric'}):'—';
const clip=(s,max=120)=>String(s||'').length>max?String(s).slice(0,max-1)+'…':String(s||'');
const slug=v=>String(v||'').replace(/[^a-zA-Z0-9]/g,'_');
const scopeName='AI for Cybersecurity';
let data={macros:[],processes:[]};
let db={version:1,evaluations:[],profile:''};
try {const stored=JSON.parse(localStorage.getItem(storeKey)||'null');if(stored && Array.isArray(stored.evaluations))db={...db,...stored};} catch(_e){}
const app={page:'home',fn:null,macro:null,process:null,selectedEvaluation:null,domainQuery:'',evalQuery:'',evalFn:'all',evalOwner:'all',showExtra:false,mobileNav:false,modal:null,criticalFn:'all'};
const save=()=>{try{localStorage.setItem(storeKey,JSON.stringify(db));}catch(e){console.warn('Storage non disponibile',e)}};
const scoped=()=>data.processes.filter(p=>app.showExtra||p.track===scopeName);
const processesOf=macroId=>scoped().filter(p=>p.macroId===macroId);
const macrosOf=fn=>data.macros.filter(m=>m.function===fn && (app.showExtra||m.track===scopeName));
const macroBy=id=>data.macros.find(m=>m.id===id);
const procBy=id=>data.processes.find(p=>p.id===id);
const evaluationsFor=id=>db.evaluations.filter(e=>e.processId===id);
const latestFor=id=>evaluationsFor(id).at(-1);
const statusFor=id=>latestFor(id)?.status||'NON VALUTATO';
const evalActive=()=>db.evaluations.filter(e=>e.status==='IN VALUTAZIONE');
const pill=(status)=>`<span class="status-pill status-${slug(status||'NON VALUTATO')}"><span class="pill-dot"></span>${esc(status||'NON VALUTATO')}</span>`;
const priorityBadge=p=>`<span class="priority priority-${slug(p.priority)}">${p.priority==='Da definire'?'Priorità da definire':`Priorità ${esc(p.priority.toLowerCase())}`}</span>`;
const circle=fn=>`<span class="fn-circle" style="color:${fnMeta[fn]?.color||'#718096'};background:${fnMeta[fn]?.bg||'#edf1f6'}"></span>`;
const countCases=arr=>arr.reduce((n,p)=>n+p.useCases.length,0);
function setPage(page){app.page=page;app.modal=null;app.mobileNav=false;app.selectedEvaluation=null;window.location.hash=page;render()}
function header(title,subtitle,trail=''){
 return `<div class="page-heading"><div>${trail?`<div class="breadcrumb">${trail}</div>`:''}<h1>${title}</h1>${subtitle?`<p>${subtitle}</p>`:''}</div></div>`
}
function shell(body){
 const mine=evalActive().length;
 return `<div class="layout"><aside class="sidebar ${app.mobileNav?'is-open':''}">
 <div class="brand"><span class="brand-symbol">${icon('activity',23)}</span><div><strong>AI for Cyber</strong><small>Opportunity Hub</small></div></div>
 <div class="sidebar-label">WORKSPACE</div><nav class="navigation">${navs.map(([id,label,ico])=>`<button class="nav-btn ${app.page===id?'active':''}" data-action="navigate" data-page="${id}">${icon(ico)}<span>${label}</span>${id==='evaluations'?`<span class="nav-count">${mine}</span>`:''}</button>`).join('')}</nav>
 <div class="sidebar-spacer"></div>
 <div class="sidebar-note"><div class="side-note-head">${icon('shield',18)} <strong>Focus AI for Cyber</strong></div><p>Valutiamo dove l'AI può supportare i processi. Non è una piattaforma di technology scouting.</p></div>
 <div class="sidebar-bottom"><span class="online-dot"></span>Catalogo demo · Dati locali</div>
 </aside><div class="main"><div class="topbar"><button class="mobile-toggle" data-action="mobile-nav" aria-label="Menu">${icon('menu')}</button><div class="topbar-product"><span class="topbar-divider"></span>Catalogo opportunità AI <span class="topbar-sep">/</span> <span class="topbar-current">${navs.find(n=>n[0]===app.page)?.[1]||'Home'}</span></div><div class="topbar-right"><span class="demo-chip">PROTOTIPO</span><button class="person-chip" data-action="profile">${icon('users',16)}<span>${esc(db.profile||'Utente demo')}</span></button></div></div><main class="content">${body}</main></div></div>${renderModal()}`;
}
function home(){
 const all=scoped(), active=evalActive(), assessed=all.filter(p=>statusFor(p.id)==='VALUTATO').length;
 const top=all.filter(p=>p.priorityOrder&&statusFor(p.id)!=='VALUTATO').sort((a,b)=>a.priorityOrder-b.priorityOrder).slice(0,3);
 const macroCount=data.macros.filter(m=>processesOf(m.id).length).length;
 const nums=[{n:all.length,k:'Processi mappati',sub:'Dal catalogo consolidato',i:'layers'},{n:macroCount,k:'Macrodomini',sub:'Organizzati per funzione NIST',i:'shield'},{n:active.length,k:'In valutazione',sub:'Presi in carico',i:'clipboard'},{n:assessed,k:'Valutati',sub:'Analisi completate',i:'check'}];
 return `${header('Una vista unica delle opportunità AI','Esplora i processi Cyber, individua dove l’AI può essere utile e tieni traccia delle valutazioni.')}
 <section class="hero"><div class="hero-deco hero-deco-1"></div><div class="hero-deco hero-deco-2"></div><div class="hero-content"><span class="eyebrow hero-eyebrow">AI FOR CYBERSECURITY</span><h2>Dal processo all’opportunità.</h2><p>Un catalogo condiviso per analizzare l’applicabilità dell’AI ai processi Cybersecurity, documentare le valutazioni e individuare i prossimi approfondimenti.</p><div class="hero-buttons"><button class="primary-btn inverted" data-action="navigate" data-page="domains">Esplora i domini ${icon('arrow',17)}</button><button class="outline-light-btn" data-action="navigate" data-page="critical">Vedi i processi prioritari</button></div></div><div class="hero-visual"><div class="hero-orbit ring1"></div><div class="hero-orbit ring2"></div><div class="hero-orbit ring3"></div><div class="hero-mid">${icon('spark',42)}</div><span class="orbit-label t1">Govern</span><span class="orbit-label t2">Protect</span><span class="orbit-label t3">Detect</span></div></section>
 <section class="metrics">${nums.map(x=>`<div class="metric"><span class="metric-icon">${icon(x.i,20)}</span><strong>${x.n}</strong><span>${x.k}</span><small>${x.sub}</small></div>`).join('')}</section>
 <div class="section-heading"><div><h2>Da dove iniziare</h2><p>Tre percorsi per lavorare sul catalogo</p></div></div><div class="feature-grid">
 <button class="feature-card" data-action="navigate" data-page="domains"><span class="feature-ico green">${icon('layers',23)}</span><strong>Esplora per dominio</strong><p>Dalle funzioni NIST ai singoli processi e use case AI.</p><span class="feature-link">Apri il catalogo ${icon('arrow',16)}</span></button>
 <button class="feature-card" data-action="navigate" data-page="evaluations"><span class="feature-ico blue">${icon('clipboard',23)}</span><strong>Riprendi una valutazione</strong><p>Consulta le analisi avviate e registra i risultati.</p><span class="feature-link">Valutazioni in corso ${icon('arrow',16)}</span></button>
 <button class="feature-card" data-action="navigate" data-page="critical"><span class="feature-ico peach">${icon('chart',23)}</span><strong>Guarda le priorità</strong><p>Una prima selezione ragionata dei processi da approfondire.</p><span class="feature-link">Processi critici ${icon('arrow',16)}</span></button></div>
 <div class="section-heading gap-top"><div><h2>In primo piano</h2><p>Priorità indicative, non ancora validate dai referenti</p></div><button class="text-btn" data-action="navigate" data-page="critical">Mostra tutto ${icon('right',16)}</button></div>
 <div class="home-spotlight">${top.map((p,i)=>`<button class="spotlight-row" data-action="open-from-any" data-id="${esc(p.id)}"><span class="spotlight-number">0${i+1}</span><span class="spotlight-main"><strong>${esc(p.name)}</strong><small>${esc(p.macro)}</small></span>${pill(statusFor(p.id))}${icon('right',18)}</button>`).join('')}</div>
 <div class="notice-line">${icon('info',17)} Il catalogo è una base di lavoro da validare. Le modifiche alle valutazioni si salvano soltanto in questo browser.</div>`;
}
function domains(){
 const trail=`<button data-action="domain-reset">Domini</button>${app.fn?` ${icon('right',13)} <button data-action="domain-back-fn">${esc(fnMeta[app.fn]?.title||app.fn)}</button>`:''}${app.macro?` ${icon('right',13)} <span>${esc(macroBy(app.macro)?.name||'')}</span>`:''}`;
 if(!app.fn){const functions=fnOrder.filter(f=>macrosOf(f).length);
  return `${header('Domini Cybersecurity','Seleziona una funzione NIST per visualizzare i macrodomini associati.')}
 <div class="domain-toolbar"><div class="tip-box">${icon('info',18)} Il catalogo segue una classificazione operativa ispirata al NIST CSF 2.0. Le aree trasversali sono indicate separatamente.</div><label class="switch-row"><input type="checkbox" id="extra-track" ${app.showExtra?'checked':''}/><span>Includi anche Cybersecurity for AI</span></label></div>
 <div class="function-grid">${functions.map(fn=>{
 const m=macrosOf(fn), pc=m.reduce((sum,x)=>sum+processesOf(x.id).length,0), meta=fnMeta[fn];return `<button class="function-card" data-action="function" data-id="${fn}" style="--fcolor:${meta.color};--fbg:${meta.bg}"><span class="function-symbol">${icon('shield',24)}</span><span class="function-name">${meta.title}</span><span class="function-label">${meta.label}</span><p>${meta.desc}</p><span class="function-foot"><span>${m.length} macrodomini · ${pc} processi</span>${icon('arrow',18)}</span></button>`}).join('')}</div>`;
 }
 if(!app.macro){let m=macrosOf(app.fn);return `${header(fnMeta[app.fn]?.title||'Domini',`Seleziona un macrodominio per vedere i processi disponibili.`,` ${trail}`)}
 <div class="subheading">${circle(app.fn)} <strong>${m.length} macrodomini</strong> <span>della funzione ${esc(app.fn)}</span></div>
 <div class="macro-grid">${m.map(x=>{let ps=processesOf(x.id);return `<button class="macro-card" data-action="macro" data-id="${esc(x.id)}"><span class="macro-top"><span class="mono-id">${x.id}</span>${icon('right',20)}</span><h3>${esc(x.name)}</h3><p>${esc(clip(x.description,140))}</p><span class="macro-bottom">${ps.length} processi <span>Apri ${icon('arrow',15)}</span></span></button>`}).join('')}</div>`}
 const processes=processesOf(app.macro);const query=app.domainQuery.trim().toLowerCase();const filtered=processes.filter(p=>[p.name,p.macro,...p.useCases.flatMap(c=>[c.activity,c.description,c.id])].join(' ').toLowerCase().includes(query));
 const selected=procBy(app.process);const selectedHere=selected&&selected.macroId===app.macro?selected:null;
 return `${header(esc(macroBy(app.macro)?.name||''),`${processes.length} processi mappati. Seleziona un processo per consultare il dettaglio e avviare una valutazione.`,trail)}
 <div class="workbench"><div class="process-browser"><div class="browser-top"><strong>Processi</strong><span>${filtered.length} risultati</span></div><label class="search-field">${icon('search',17)}<input data-input="domain-search" type="search" placeholder="Cerca processo o attività" value="${esc(app.domainQuery)}" aria-label="Cerca processo"/></label><div class="process-scroll">${filtered.length?filtered.map(p=>processRow(p,selectedHere?.id===p.id)).join(''):'<div class="no-results">Nessun processo trovato.</div>'}</div></div><div class="process-detail">${selectedHere?detail(selectedHere):`<div class="empty-selection"><span>${icon('file',34)}</span><h3>Seleziona un processo</h3><p>Qui troverai attività, casi d’uso, input, output, KPI e le informazioni utili per avviare una valutazione.</p></div>`}</div></div>`;
}
function processRow(p,isSelected){return `<button class="process-list-row ${isSelected?'selected':''}" data-action="process" data-id="${esc(p.id)}"><span class="process-list-row-main"><strong>${esc(p.name)}</strong><small>${esc(p.useCases.map(c=>c.activity).slice(0,2).join(' · '))}</small></span><span class="process-list-bottom">${pill(statusFor(p.id))}${icon('right',15)}</span></button>`}
function field(label,value,ico){return `<div class="data-field"><div class="data-field-label">${ico?icon(ico,16):''}${esc(label)}</div><div class="data-field-value">${esc(value||'Non specificato nel catalogo')}</div></div>`}
function detail(p){const status=statusFor(p.id),cur=latestFor(p.id),hist=evaluationsFor(p.id);return `<div class="detail-header"><div class="detail-small"><span class="mono-id">${esc(p.macroId)}</span><span class="small-sep">·</span><span>${esc(p.macro)}</span></div><div class="detail-title-row"><h2>${esc(p.name)}</h2>${priorityBadge(p)}</div><div class="detail-status-row">${pill(status)}<span>${p.useCases.length} ${p.useCases.length===1?'use case':'use case'} AI</span></div><div class="detail-actions">${status==='IN VALUTAZIONE'?`<button class="primary-btn" data-action="show-evaluation-for" data-id="${esc(p.id)}">Apri valutazione ${icon('arrow',16)}</button>`:status==='VALUTATO'?`<button class="secondary-btn" disabled>Valutazione completata</button>`:`<button class="primary-btn" data-action="start-evaluation" data-id="${esc(p.id)}">${status==='SCARTATO'?'Riapri valutazione':'Avvia valutazione'} ${icon('arrow',16)}</button>`}</div></div>
 <div class="detail-content"><div class="detail-section"><h3>Use case AI collegati</h3>${p.useCases.map((u,i)=>`<div class="usecase"><div class="usecase-title"><span class="mono-id">${esc(u.id)}</span><strong>${esc(u.activity)}</strong></div><p>${esc(u.description)}</p><div class="data-grid">${field('Capability AI proposta',u.capability,'spark')}${field('Input necessari',u.inputs,'file')}${field('Output verificabile',u.outputs,'check')}${field('KPI da misurare',u.kpi,'chart')}${field('Autonomia iniziale',u.autonomy,'shield')}${field('Rischi e controlli',u.risks,'flag')}${field('AI vs automazione',u.automation,'activity')}${field('Prerequisiti',u.prerequisites,'info')}</div></div>`).join('')}</div>
 <div class="detail-section"><h3>Responsabilità e priorità</h3><div class="data-grid">${field('Process owner',p.processOwner||'Da identificare','users')}${field('Evaluation owner',cur?.owner||(status==='NON VALUTATO'?'Non assegnato':'Da assegnare'),'users')}${field('Motivo della priorità',p.priorityReason,'chart')}${field('Perimetro',p.track,'layers')}</div></div>
 ${hist.length?`<div class="detail-section"><h3>Storico valutazioni <span class="muted">(${hist.length})</span></h3>${[...hist].reverse().map(e=>`<div class="history-row"><div><strong>${esc(e.status)}</strong><small>${esc(e.owner)} · ${fmtDate(e.startedAt)}${e.endedAt?' → '+fmtDate(e.endedAt):''}</small>${e.reason?`<p>${esc(e.reason)}</p>`:''}</div></div>`).join('')}</div>`:''}</div>`}
function evaluations(){
 const active=evalActive(),owners=[...new Set(active.map(e=>e.owner))].sort();
 const query=app.evalQuery.toLowerCase().trim();
 const filtered=active.filter(e=>{let p=procBy(e.processId);return p&&(app.evalFn==='all'||p.function===app.evalFn)&&(app.evalOwner==='all'||e.owner===app.evalOwner)&&[p.name,p.macro,e.owner,...p.useCases.map(c=>c.activity)].join(' ').toLowerCase().includes(query)});
 let chosen=active.find(e=>e.id===app.selectedEvaluation)||filtered[0];
 if(!filtered.includes(chosen))chosen=filtered[0];
 return `${header('Valutazioni in corso','Tutte le analisi aperte, con il referente che le ha prese in carico.')}
 <div class="evaluation-toolbar"><label class="search-field search-wide">${icon('search',17)}<input data-input="eval-search" placeholder="Cerca processo o referente" value="${esc(app.evalQuery)}" aria-label="Cerca valutazione"/></label><select data-change="eval-fn" aria-label="Filtra funzione"><option value="all">Tutte le funzioni</option>${fnOrder.filter(f=>macrosOf(f).length).map(f=>`<option value="${f}" ${app.evalFn===f?'selected':''}>${esc(fnMeta[f]?.title||f)}</option>`).join('')}</select><select data-change="eval-owner" aria-label="Filtra referente"><option value="all">Tutti i referenti</option>${owners.map(o=>`<option value="${esc(o)}" ${app.evalOwner===o?'selected':''}>${esc(o)}</option>`).join('')}</select></div>
 ${!active.length?`<div class="full-empty"><span class="big-icon">${icon('clipboard',35)}</span><h2>Nessuna valutazione in corso</h2><p>Seleziona un processo dal catalogo e prendilo in carico. Comparirà qui automaticamente.</p><button class="primary-btn" data-action="navigate" data-page="domains">Vai ai domini ${icon('arrow',16)}</button></div>`:
 `<div class="evaluation-layout"><div class="evaluation-list"><div class="browser-top"><strong>In lavorazione</strong><span>${filtered.length} valutazioni</span></div>${filtered.length?filtered.map(e=>{let p=procBy(e.processId);return `<button class="evaluation-item ${chosen?.id===e.id?'selected':''}" data-action="select-eval" data-id="${esc(e.id)}"><div class="evaluation-item-head">${circle(p.function)} <span>${esc(p.macro)}</span>${icon('right',17)}</div><strong>${esc(p.name)}</strong><p>${esc(clip(p.useCases[0]?.description,110))}</p><div class="evaluation-item-foot"><span>${icon('users',15)} ${esc(e.owner)}</span><span>${fmtDate(e.startedAt)}</span></div></button>`}).join(''):'<div class="no-results">Nessuna valutazione corrisponde ai filtri.</div>'}</div><div class="evaluation-workspace">${chosen?evaluationDetail(chosen):`<div class="empty-selection"><h3>Seleziona una valutazione</h3></div>`}</div></div>`}`;
}
function evaluationDetail(e){const p=procBy(e.processId);return `<div class="eval-detail-head"><span class="eyebrow">VALUTAZIONE IN CORSO</span><h2>${esc(p.name)}</h2><div class="eval-owner-info">${pill(e.status)}<span>${icon('users',16)} ${esc(e.owner)}</span><span>Avviata il ${fmtDate(e.startedAt)}</span></div><p>${esc(p.useCases[0]?.description)}</p><button class="quiet-btn" data-action="open-from-any" data-id="${esc(p.id)}">Apri scheda processo ${icon('right',15)}</button></div>
 <div class="evaluation-workspace-body"><section class="work-card"><h3>Appunti di valutazione</h3><p>Annota evidenze, ipotesi, criticità e prossimi approfondimenti. Il contenuto viene conservato in questo browser.</p><textarea rows="6" id="evaluation-notes" data-eval-id="${esc(e.id)}" placeholder="Es. verificare la disponibilità dei dati storici e individuare il referente tecnico...">${esc(e.notes||'')}</textarea><span class="autosave-caption">${icon('check',14)} Salvataggio locale automatico</span></section>
 <section class="work-card compact"><h3>Punti di verifica</h3><div class="check-questions"><div>Il problema operativo è definito?</div><div>Esistono dati e una baseline di confronto?</div><div>L’output AI può essere verificato da un esperto?</div><div>I rischi e l’autonomia sono compatibili con il processo?</div></div></section>
 <section class="ai-placeholder"><div class="ai-title">${icon('spark',20)} <strong>Supporto AI alla valutazione</strong><span>DA INTEGRARE</span></div><p>In una fase successiva, un assistente potrà analizzare questo use case e suggerire approcci tecnici, possibili integrazioni e verifiche, avviando ricerche mirate solo quando richieste dal valutatore.</p><div class="example-prompt">Esempio: “Quali alternative AI sono adatte a questo processo e come potremmo misurarne l’efficacia?”</div></section>
 <div class="eval-complete"><div><strong>Concludi o sospendi l'analisi</strong><p>Registra l'esito. La valutazione uscirà dall'elenco delle attività in corso.</p></div><div class="eval-action-row"><button class="secondary-btn" data-action="finish-evaluation" data-id="${esc(e.id)}" data-status="NON VALUTATO">Rimetti in catalogo</button><button class="secondary-btn danger-hover" data-action="finish-evaluation" data-id="${esc(e.id)}" data-status="SCARTATO">Scarta</button><button class="primary-btn" data-action="finish-evaluation" data-id="${esc(e.id)}" data-status="VALUTATO">Segna come valutato ${icon('check',15)}</button></div></div></div>`;}
function critical(){
 const relevant=scoped().filter(p=>p.priorityOrder!==null&&statusFor(p.id)!=='VALUTATO').sort((a,b)=>a.priorityOrder-b.priorityOrder);
 const results=app.criticalFn==='all'?relevant:relevant.filter(p=>p.function===app.criticalFn);
 const top=results.slice(0,10);
 return `${header('Processi critici','Le prime opportunità da approfondire, con motivazioni e stato aggiornato delle valutazioni.')}
 <div class="critical-info"><div class="critical-info-left">${icon('flag',21)}<div><strong>Priorità iniziali da validare</strong><p>Questa selezione è indicativa e si basa su valore potenziale, riusabilità e misurabilità. Non rappresenta una valutazione aziendale approvata. I processi già valutati non compaiono nell’elenco.</p></div></div><select data-change="critical-fn" aria-label="Filtra per funzione"><option value="all">Tutte le funzioni</option>${fnOrder.filter(f=>macrosOf(f).length).map(f=>`<option value="${f}" ${app.criticalFn===f?'selected':''}>${esc(fnMeta[f]?.title||f)}</option>`).join('')}</select></div>
 <div class="critical-list">${top.length?top.map((p,i)=>`<div class="critical-row"><div class="rank">${String(i+1).padStart(2,'0')}</div><div class="critical-main"><div class="critical-overline">${circle(p.function)} ${esc(p.macro)}</div><h3>${esc(p.name)}</h3><p>${esc(p.priorityReason)}</p><div class="critical-meta">${priorityBadge(p)}${pill(statusFor(p.id))}</div></div><button class="circle-arrow" data-action="open-from-any" data-id="${esc(p.id)}" aria-label="Apri ${esc(p.name)}">${icon('arrow',20)}</button></div>`).join(''):'<div class="no-results">Nessun processo prioritario per il filtro selezionato.</div>'}</div><div class="notice-line">${icon('info',17)} Le priorità sono una proposta editoriale iniziale. Andrebbero definite con i process owner e riviste periodicamente.</div>`;
}
function renderModal(){
 if(!app.modal)return '';
 const m=app.modal;
 if(m.type==='start'){
 const p=procBy(m.id);return `<div class="modal-overlay" data-action="close-modal"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="modal-header"><div><span class="eyebrow">NUOVA VALUTAZIONE</span><h2 id="modal-title">Prendi in carico il processo</h2></div><button class="icon-btn" data-action="close-modal">${icon('close')}</button></div><p class="modal-desc"><strong>${esc(p?.name)}</strong><br/>La valutazione verrà associata al referente indicato, distinto dal process owner.</p><form id="start-form" data-process="${esc(m.id)}"><label class="form-label" for="eval-owner-name">Evaluation owner</label><input id="eval-owner-name" name="owner" maxlength="80" required placeholder="Nome e cognome" value="${esc(db.profile||'')}" autocomplete="name"/><p class="form-help">Demo senza autenticazione. L'identità viene inserita manualmente.</p><div class="modal-actions"><button type="button" class="secondary-btn" data-action="close-modal">Annulla</button><button type="submit" class="primary-btn">Avvia valutazione ${icon('arrow',16)}</button></div></form></div></div>`;
 }
 if(m.type==='finish'){
 const e=db.evaluations.find(x=>x.id===m.id);const p=e&&procBy(e.processId);
 return `<div class="modal-overlay" data-action="close-modal"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="modal-header"><div><span class="eyebrow">CHIUSURA VALUTAZIONE</span><h2 id="modal-title">${m.status==='VALUTATO'?'Concludi la valutazione':m.status==='SCARTATO'?'Scarta il processo':'Rimetti in catalogo'}</h2></div><button class="icon-btn" data-action="close-modal">${icon('close')}</button></div><p class="modal-desc">${esc(p?.name||'')}</p><form id="finish-form" data-id="${esc(m.id)}" data-status="${m.status}"><label class="form-label" for="finish-reason">Motivazione / esito</label><textarea id="finish-reason" name="reason" required rows="4" placeholder="Riporta una motivazione sintetica e verificabile..."></textarea><p class="form-help">La motivazione resterà nello storico del processo. Lo stato VALUTATO non implica l'adozione dell'AI.</p><div class="modal-actions"><button type="button" class="secondary-btn" data-action="close-modal">Annulla</button><button type="submit" class="primary-btn">Conferma ${icon('check',16)}</button></div></form></div></div>`;
 }
 if(m.type==='profile')return `<div class="modal-overlay" data-action="close-modal"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="modal-header"><div><span class="eyebrow">DEMO LOCALE</span><h2 id="modal-title">Profilo e dati</h2></div><button class="icon-btn" data-action="close-modal">${icon('close')}</button></div><p class="modal-desc">La demo usa il salvataggio locale del browser. I dati non sono condivisi con altri utenti o dispositivi.</p><form id="profile-form"><label class="form-label" for="profile-name">Nome del valutatore</label><input id="profile-name" name="name" maxlength="80" value="${esc(db.profile)}" placeholder="Nome e cognome"/><div class="modal-actions"><button type="button" class="secondary-btn" data-action="download-data">${icon('download',16)} Esporta dati</button><button type="submit" class="primary-btn">Salva profilo</button></div></form><div class="modal-divider"></div><button class="reset-link" data-action="reset-demo">${icon('reload',16)} Ripristina demo (cancella valutazioni locali)</button></div></div>`;
 return '';
}
function render(){let content=app.page==='domains'?domains():app.page==='evaluations'?evaluations():app.page==='critical'?critical():home();document.querySelector('#app').innerHTML=shell(content)}
function openProcess(id){const p=procBy(id);if(!p)return;app.fn=p.function;app.macro=p.macroId;app.process=p.id;app.domainQuery='';app.page='domains';window.location.hash='domains';render()}
function openEvalForProcess(id){let e=evalActive().find(x=>x.processId===id);if(!e)return;app.page='evaluations';app.selectedEvaluation=e.id;window.location.hash='evaluations';render()}
function startEvaluation(id,owner){owner=String(owner||'').trim();if(!owner)return;let p=procBy(id);if(!p ||statusFor(id)==='IN VALUTAZIONE'||statusFor(id)==='VALUTATO')return;
 const e={id:'evaluation-'+Date.now()+'-'+Math.random().toString(36).slice(2,7),processId:id,owner,status:'IN VALUTAZIONE',startedAt:new Date().toISOString(),endedAt:null,notes:'',reason:''};db.profile=owner;db.evaluations.push(e);save();app.modal=null;openEvalForProcess(id)}
function finishEvaluation(id,status,reason){const e=db.evaluations.find(x=>x.id===id);if(!e||e.status!=='IN VALUTAZIONE')return;e.status=status;e.reason=String(reason||'').trim();e.endedAt=new Date().toISOString();save();app.modal=null;app.selectedEvaluation=null;app.page='evaluations';render();}
function exportData(){let blob=new Blob([JSON.stringify({exportedAt:new Date().toISOString(),version:db.version,evaluations:db.evaluations,profile:db.profile},null,2)],{type:'application/json'});let u=URL.createObjectURL(blob);let a=document.createElement('a');a.href=u;a.download='ai-for-cyber-valutazioni-demo.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),2000)}
document.addEventListener('click',e=>{
 const el=e.target.closest('[data-action]');if(!el)return;const {action,id,page,status}=el.dataset;
 if(action==='close-modal'&&el.classList.contains('modal-overlay')&&e.target!==el)return;
 if(action==='navigate'){setPage(page);return}
 if(action==='mobile-nav'){app.mobileNav=!app.mobileNav;render();return}
 if(action==='function'){app.fn=id;app.macro=null;app.process=null;app.domainQuery='';render();return}
 if(action==='macro'){app.macro=id;app.process=null;app.domainQuery='';render();return}
 if(action==='process'){app.process=id;render();return}
 if(action==='domain-reset'){app.fn=null;app.macro=null;app.process=null;render();return}
 if(action==='domain-back-fn'){app.macro=null;app.process=null;render();return}
 if(action==='open-from-any'){openProcess(id);return}
 if(action==='select-eval'){app.selectedEvaluation=id;render();return}
 if(action==='start-evaluation'){app.modal={type:'start',id};render();document.querySelector('#eval-owner-name')?.focus();return}
 if(action==='show-evaluation-for'){openEvalForProcess(id);return}
 if(action==='finish-evaluation'){app.modal={type:'finish',id,status};render();return}
 if(action==='profile'){app.modal={type:'profile'};render();return}
 if(action==='close-modal'){app.modal=null;render();return}
 if(action==='download-data'){exportData();return}
 if(action==='reset-demo'){if(confirm('Eliminare tutti i dati della demo salvati in questo browser?')){db={version:1,evaluations:[],profile:''};save();app.modal=null;render()}return}
});
document.addEventListener('input',e=>{
 const input=e.target;if(input.matches('[data-input="domain-search"]')){app.domainQuery=input.value;const pos=input.selectionStart;render();let fresh=document.querySelector('[data-input="domain-search"]');fresh?.focus();try{fresh?.setSelectionRange(pos,pos)}catch(_e){};return}
 if(input.matches('[data-input="eval-search"]')){app.evalQuery=input.value;const pos=input.selectionStart;render();let fresh=document.querySelector('[data-input="eval-search"]');fresh?.focus();try{fresh?.setSelectionRange(pos,pos)}catch(_e){};return}
 if(input.matches('#evaluation-notes')){let item=db.evaluations.find(v=>v.id===input.dataset.evalId);if(item){item.notes=input.value;save()}}
});
document.addEventListener('change',e=>{const t=e.target;const a=t.dataset.change;if(t.id==='extra-track'){app.showExtra=t.checked;app.fn=null;app.macro=null;app.process=null;render();return}if(a==='eval-fn'){app.evalFn=t.value;app.selectedEvaluation=null;render()}if(a==='eval-owner'){app.evalOwner=t.value;app.selectedEvaluation=null;render()}if(a==='critical-fn'){app.criticalFn=t.value;render()}});
document.addEventListener('submit',e=>{
 const form=e.target;if(!form.matches('#start-form,#finish-form,#profile-form'))return;e.preventDefault();const f=new FormData(form);
 if(form.id==='start-form')startEvaluation(form.dataset.process,f.get('owner'));
 if(form.id==='finish-form')finishEvaluation(form.dataset.id,form.dataset.status,f.get('reason'));
 if(form.id==='profile-form'){db.profile=String(f.get('name')||'').trim();save();app.modal=null;render()}
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&app.modal){app.modal=null;render()}});
async function init(){try{const response=await fetch('./src/data/catalogue.json');if(!response.ok)throw new Error('HTTP '+response.status);data=await response.json();let hash=window.location.hash.slice(1);if(navs.some(n=>n[0]===hash))app.page=hash;render()}catch(e){document.querySelector('#app').innerHTML=`<div class="boot-error"><h1>Impossibile caricare il catalogo</h1><p>Apri la demo da un web server, non direttamente dal file HTML.</p><pre>${esc(e.message)}</pre></div>`}}
init();
