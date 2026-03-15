// ========================================
// HAUNTED SCENE BUILDER
// ========================================

function buildHauntScene(pageKey) {
  const scene = document.createElement('div');
  scene.className = 'haunt-scene';
  scene.innerHTML = `
    <div class="haunt-sky"></div>
    <div class="haunt-moon"></div>
    ${buildStars()}
    <div class="haunt-clouds">
      <div class="storm-cloud sc1"></div>
      <div class="storm-cloud sc2"></div>
      <div class="storm-cloud sc3"></div>
      <div class="storm-cloud sc4"></div>
    </div>

    <!-- Lightning bolt 1 -->
    <div class="lightning-container" id="lc" style="position:absolute;top:18%;width:55px;z-index:5;pointer-events:none;">
      <svg class="lightning-bolt-svg" id="lbolt" viewBox="0 0 26 90" width="26" height="90" fill="none">
        <polyline points="18,0 8,40 16,40 4,90 22,38 13,38 22,0" fill="#FFFFCC" stroke="#FFE060" stroke-width="1"/>
      </svg>
    </div>
    <!-- Lightning bolt 2 -->
    <div class="lightning-container" id="lc2" style="position:absolute;top:16%;width:45px;z-index:5;pointer-events:none;">
      <svg class="lightning-bolt-svg-2" id="lbolt2" viewBox="0 0 22 80" width="22" height="80" fill="none">
        <polyline points="16,0 7,35 14,35 3,80 19,33 11,33 19,0" fill="#FFFFCC" stroke="#FFE060" stroke-width="1"/>
      </svg>
    </div>
    <!-- Lightning bolt 3 -->
    <div class="lightning-container" id="lc3" style="position:absolute;top:20%;width:40px;z-index:5;pointer-events:none;">
      <svg class="lightning-bolt-svg-3" id="lbolt3" viewBox="0 0 20 75" width="20" height="75" fill="none">
        <polyline points="15,0 6,32 13,32 2,75 18,30 10,30 18,0" fill="#FFFFCC" stroke="#FFD040" stroke-width="1"/>
      </svg>
    </div>
    <div class="lightning-flash"></div>

    <!-- Ground -->
    <div class="haunt-ground">
      <div class="haunt-fog fog-1"></div>
      <div class="haunt-fog fog-2"></div>
      ${buildDryTrees()}
    </div>

    <!-- Entities -->
    ${buildGhosts(pageKey)}
    ${buildBats()}
  `;
  document.body.prepend(scene);
  initLightning();
}

// --- Stars (90 for dense sky) ---
function buildStars() {
  let html = '';
  for (let i = 0; i < 90; i++) {
    const x = Math.random() * 100;
    const y = Math.random() * 45;
    const size = Math.random() * 2.2 + 0.4;
    const dur = 1.5 + Math.random() * 4;
    const delay = Math.random() * 5;
    html += `<div class="haunt-star" style="left:${x}%;top:${y}%;width:${size}px;height:${size}px;animation-duration:${dur}s;animation-delay:${delay}s;"></div>`;
  }
  return html;
}

// --- Dead silhouette trees (reference-style thick SVG) ---
function buildDryTrees() {
  const trees = [
    { x: 1,   w: 130, h: 240 },
    { x: 14,  w: 90,  h: 175 },
    { x: 26,  w: 145, h: 265 },
    { x: 40,  w: 105, h: 195 },
    { x: 55,  w: 138, h: 252 },
    { x: 68,  w: 92,  h: 178 },
    { x: 80,  w: 148, h: 268 },
    { x: 92,  w: 98,  h: 188 },
  ];

  return trees.map(t => {
    const VW = 130, VH = 200;
    const c  = '#130900'; // very dark near-black brown
    // stroke widths
    const tk = 22; // trunk
    const mb = 14; // main branch
    const sb = 9;  // sub-branch
    const tw = 5;  // twig

    // Key Y coords
    const gnd  = VH;         // ground
    const tkT  = VH * 0.36;  // top of trunk
    const tkM  = VH * 0.50;  // trunk mid (branch origin)
    const tkB  = VH * 0.65;  // low branch origin

    return `
      <div class="dry-tree" style="left:${t.x}%;position:absolute;bottom:0;">
        <svg viewBox="-10 0 ${VW+20} ${VH}" width="${t.w}" height="${t.h}" xmlns="http://www.w3.org/2000/svg" overflow="visible">

          <!-- TRUNK -->
          <line x1="65" y1="${gnd}" x2="65" y2="${tkT}"
            stroke="${c}" stroke-width="${tk}" stroke-linecap="round"/>

          <!-- LOW side branch left -->
          <line x1="65" y1="${tkB}" x2="28" y2="${VH*0.52}"
            stroke="${c}" stroke-width="${sb+3}" stroke-linecap="round"/>
          <line x1="28" y1="${VH*0.52}" x2="14" y2="${VH*0.44}"
            stroke="${c}" stroke-width="${sb}" stroke-linecap="round"/>

          <!-- MAIN LEFT branch -->
          <line x1="65" y1="${tkM}" x2="16" y2="${VH*0.23}"
            stroke="${c}" stroke-width="${mb}" stroke-linecap="round"/>
          <!-- Left sub A -->
          <line x1="16" y1="${VH*0.23}" x2="2" y2="${VH*0.09}"
            stroke="${c}" stroke-width="${sb}" stroke-linecap="round"/>
          <!-- Left sub B -->
          <line x1="16" y1="${VH*0.23}" x2="32" y2="${VH*0.08}"
            stroke="${c}" stroke-width="${sb}" stroke-linecap="round"/>
          <!-- Left twigs -->
          <line x1="2"  y1="${VH*0.09}" x2="-5" y2="${VH*0.01}"
            stroke="${c}" stroke-width="${tw}" stroke-linecap="round"/>
          <line x1="32" y1="${VH*0.08}" x2="24" y2="${VH*0.00}"
            stroke="${c}" stroke-width="${tw}" stroke-linecap="round"/>
          <line x1="32" y1="${VH*0.08}" x2="38" y2="${VH*0.00}"
            stroke="${c}" stroke-width="${tw}" stroke-linecap="round"/>

          <!-- MAIN RIGHT branch -->
          <line x1="65" y1="${tkM+VH*0.04}" x2="112" y2="${VH*0.2}"
            stroke="${c}" stroke-width="${mb}" stroke-linecap="round"/>
          <!-- Right sub A -->
          <line x1="112" y1="${VH*0.2}" x2="124" y2="${VH*0.07}"
            stroke="${c}" stroke-width="${sb}" stroke-linecap="round"/>
          <!-- Right sub B -->
          <line x1="112" y1="${VH*0.2}" x2="98" y2="${VH*0.06}"
            stroke="${c}" stroke-width="${sb}" stroke-linecap="round"/>
          <!-- Right twigs -->
          <line x1="124" y1="${VH*0.07}" x2="130" y2="${VH*0.00}"
            stroke="${c}" stroke-width="${tw}" stroke-linecap="round"/>
          <line x1="98"  y1="${VH*0.06}" x2="92" y2="${VH*0.00}"
            stroke="${c}" stroke-width="${tw}" stroke-linecap="round"/>

          <!-- CENTER top branch -->
          <line x1="65" y1="${tkT+10}" x2="60" y2="${VH*0.08}"
            stroke="${c}" stroke-width="${sb+2}" stroke-linecap="round"/>
          <line x1="60" y1="${VH*0.08}" x2="50" y2="${VH*0.01}"
            stroke="${c}" stroke-width="${tw+1}" stroke-linecap="round"/>
          <line x1="60" y1="${VH*0.08}" x2="70" y2="${VH*0.00}"
            stroke="${c}" stroke-width="${tw+1}" stroke-linecap="round"/>
        </svg>
      </div>`;
  }).join('');
}

// --- Dead leaves: brown only, larger ---
function buildLeaves() {
  const emojis = ['🍂', '🍁'];
  return Array.from({length: 16}, (_, i) => {
    const e   = emojis[i % emojis.length];
    const x   = Math.random() * 100;
    const dur = 9 + Math.random() * 12;
    const del = Math.random() * 14;
    const sz  = 1.1 + Math.random() * 0.9;
    return `<div class="dry-leaf" style="left:${x}%;font-size:${sz}rem;animation-duration:${dur}s;animation-delay:-${del}s;">${e}</div>`;
  }).join('');
}

function spawnDryLeaves() {
  // Spawn leaves periodically
  setInterval(() => {
    const el = document.createElement('div');
    const emojis = ['🍂','🍁','🍃'];
    el.className = 'dry-leaf';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.cssText = `left:${Math.random()*100}%;font-size:${0.7+Math.random()*0.7}rem;animation-duration:${8+Math.random()*8}s;animation-delay:0s;`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 18000);
  }, 1800);
}

// --- Ghosts removed (no roaming ghosts) ---
function buildGhosts(pageKey) {
  return '';
}

// --- Bats ---
function buildBats() {
  return [
    { top:'14%', size:'1.2rem', dur:'22s', delay:'0s' },
    { top:'8%',  size:'0.9rem', dur:'35s', delay:'-14s' },
    { top:'20%', size:'1rem',   dur:'18s', delay:'-8s'  },
  ].map(b => `
    <div class="bat" style="top:${b.top};font-size:${b.size};animation-duration:${b.dur};animation-delay:${b.delay};">🦇</div>
  `).join('');
}

// --- Lightning randomizer (3 bolts) ---
function initLightning() {
  const lc  = document.getElementById('lc');
  const lc2 = document.getElementById('lc2');
  const lc3 = document.getElementById('lc3');

  function randomizeAll() {
    if (lc)  lc.style.left  = (5  + Math.random() * 70) + '%';
    if (lc2) lc2.style.left = (20 + Math.random() * 65) + '%';
    if (lc3) lc3.style.left = (10 + Math.random() * 75) + '%';
  }

  randomizeAll();
  // Cycle every ~4.7s so positions change before each new strike
  setInterval(randomizeAll, 4700);
}
