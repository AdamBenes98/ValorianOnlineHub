// Create clickable polygons on top of the raster map
const wrapper = document.getElementById('map-wrapper');
const overlay = document.getElementById('map-overlay');
const img   = document.getElementById('map-img');
const panel = document.getElementById('info-panel');
const content = document.getElementById('panel-content');
const closeBtn = document.getElementById('close-btn');
const coords = document.getElementById('coords');
const yearSpan = document.getElementById('year');

yearSpan.textContent = new Date().getFullYear();

// When image is loaded we know native dimensions
img.onload = () => {
  const w = img.naturalWidth;
  const h = img.naturalHeight;
  overlay.setAttribute('viewBox', `0 0 ${w} ${h}`);

  // ---- COORDINATE HELPERS (pixel → viewBox) ----
  const scaleX = x => x * w / img.clientWidth;
  const scaleY = y => y * h / img.clientHeight;

  // ---- DRAW POLYGONS (replace with your own coords) ----
  // Coordinates below are **EXAMPLE** – you must open the PNG in any
  // editor, read pixel coords of corners and replace them here.
  const paths = {
    valoria: "600,200 750,180 800,300 700,350 550,320",
    altstadt: "550,320 700,350 680,420 520,400",
    frostborne: "100,50 300,40 350,150 200,180",
    "westliche-insel": "50,400 200,380 220,480 80,500",
    "schloss-valor": "750,180 850,160 870,240 800,300",
    mienen: "400,500 550,480 580,580 430,600",
    konigshagen: "700,450 850,440 880,530 730,540",
    "sud-block": "520,540 680,530 700,620 540,630",
    "ostliche-insel": "900,300 1050,290 1080,400 930,410",
    "neuer-hafen": "300,650 450,640 470,720 330,730",
    "alter-hafen": "150,700 280,690 300,770 180,780",
    "nicht-anerkanntes-gebiet": "1000,600 1150,590 1170,700 1020,710"
  };

  Object.entries(paths).forEach(([id, points]) => {
    const poly = document.createElementNS('http://www.w3.org/2000/svg','polygon');
    poly.setAttribute('id', id);
    poly.setAttribute('points', points);
    overlay.appendChild(poly);
  });

  // ---- CLICK HANDLER ----
  overlay.addEventListener('click', e => {
    const region = REGION_DATA.find(r => r.id === e.target.id);
    if (!region) return;
    renderPanel(region);
  });

  // ---- MOUSE COORDS DEBUG (optional) ----
  wrapper.addEventListener('mousemove', e => {
    const rect = img.getBoundingClientRect();
    const x = scaleX(e.clientX - rect.left).toFixed(0);
    const y = scaleY(e.clientY - rect.top).toFixed(0);
    coords.textContent = `${x}, ${y}`;
  });
};

function renderPanel(r){
  content.innerHTML = `
    <h2>${r.name}</h2>
    <p><strong>Ruler:</strong> ${r.owner}</p>
    ${r.houses.length ? `
      <h3>Real-estate</h3>
      <ul>
        ${r.houses.map(h=>`
          <li>
            ${h.type} – <span class="price">${h.price}</span>
            ${h.available ? '<span class="badge">available</span>' : '<span style="color:var(--sub)">sold</span>'}
          </li>`).join('')}
      </ul>` : '<p>No public housing.</p>'}
    <h3>Fun facts</h3>
    <ul>${r.funFacts.map(f=>`<li>${f}</li>`).join('')}</ul>
    ${r.images ? `
      <div class="gallery">
        ${r.images.map(url=>`<img src="${url}" alt="">`).join('')}
      </div>` : ''}
  `;
  panel.classList.remove('hidden');
}

closeBtn.onclick = () => panel.classList.add('hidden');
