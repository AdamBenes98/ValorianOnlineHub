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

  // ---- COORDINATE HELPERS (pixel -> viewBox) ----
  const scaleX = x => x * w / img.clientWidth;
  const scaleY = y => y * h / img.clientHeight;

  // ---- DRAW POLYGONS ----
  const paths = {
    "altstadt": "134,279 205,279 206,246 210,220 202,213 197,202 118,195 114,211 132,225 132,248",
  "frostborne": "206,386 208,384 221,376 233,369 235,361 238,351 238,339 244,334 245,324 234,321 214,322 201,322 179,320 164,322 154,322 150,356 158,376",
  "westliche-insel": "158,392 145,399 139,411 131,414 112,418 114,438 118,446 123,458 119,465 113,474 102,479 95,476 94,482 90,490 93,500 98,509 102,517 107,527 112,542 120,549 133,543 139,544 150,549 162,562 174,575 186,582 198,581 208,576 216,575 222,567 222,558 222,550 195,558 188,551 175,542 172,531 171,525 157,518 146,504 148,496 165,495 173,497 185,500 198,493 204,482 194,469 200,455 187,438 181,435 176,421 186,413 182,404 164,406 160,392",
  "schloss-valor": "233,459 254,459 255,502 316,503 321,514 375,516 376,540 327,543 324,589 236,585 234,458",
  "mienen": "255,497 256,459 319,462 317,500",
  "konigshagen": "322,503 322,467 467,470 501,508 505,549 382,589 386,512 319,504 319,464",
  "sud-block": "330,546 381,546 382,587 406,616 375,638 312,629 310,594 331,550",
  "ostliche-insel": "537,454 553,471 567,477 574,497 542,545 545,570 558,582 556,593 529,590 521,578 529,555 505,531 521,514 528,495 538,481 535,456",
  "neuer-hafen": "333,765 294,763 298,727 274,726 279,680 294,653 317,638 346,652 375,649 374,675 353,683 351,698 370,709 366,718 350,718 330,742 333,763",
  "alter-hafen": "383,646 372,625 499,555 509,572"
  };

  Object.entries(paths).forEach(([id, points]) => {
    const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
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

  // ---- MOUSE COORDS DEBUG ----
  wrapper.addEventListener('mousemove', e => {
    const rect = img.getBoundingClientRect();
    const x = scaleX(e.clientX - rect.left).toFixed(0);
    const y = scaleY(e.clientY - rect.top).toFixed(0);
    coords.textContent = `${x}, ${y}`;
  });
};

function renderPanel(r) {
  content.innerHTML = `
    <h2>${r.name}</h2>
    <p><strong>Ruler:</strong> ${r.owner}</p>
    ${r.houses.length ? `
      <h3>Real-estate</h3>
      <ul>
        ${r.houses.map(h => `
          <li>
            ${h.type} - <span class="price">${h.price}</span>
            ${h.available ? '<span class="badge">available</span>' : '<span style="color:var(--sub)">sold</span>'}
          </li>`).join('')}
      </ul>` : '<p>No public housing.</p>'}
    <h3>Fun facts</h3>
    <ul>${r.funFacts.map(f => `<li>${f}</li>`).join('')}</ul>
    ${r.images ? `
      <div class="gallery">
        ${r.images.map(url => `<img src="${url}" alt="">`).join('')}
      </div>` : ''}
  `;
  panel.classList.remove('hidden');
}

closeBtn.onclick = () => panel.classList.add('hidden');
