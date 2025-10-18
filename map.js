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
    altstadt: "156,309 227,311 228,291 232,279 224,273 219,262 140,255 136,271 154,285 154,308",
    frostborne: "228,431 230,429 243,421 255,414 257,406 260,396 260,384 266,379 267,369 256,366 236,367 223,367 201,365 186,367 176,367 172,401 180,421",
    "westliche-insel":  "180,437 167,444 161,456 153,459 134,463 136,483 140,491 145,503 141,510 135,519 124,524 117,521 116,527 112,535 115,545 120,554 124,562 129,572 134,587 142,594 155,588 161,589 172,594 184,607 196,620 208,627 220,626 230,621 238,620 244,612 244,603 244,595 217,603 210,596 197,587 194,576 193,570 179,563 168,549 170,541 187,540 195,542 207,545 220,538 226,527 216,514 222,500 209,483 203,480 198,466 208,458 204,449 186,451 182,437",
    "schloss-valor": "255,504 276,504 277,547 338,548 343,559 397,561 398,585 349,588 346,634 258,630 256,503",
    mienen: "277,542 278,504 341,507 339,545",
    konigshagen: "344,548 344,512 489,515 548,578 527,594 535,619 520,615 501,584 447,621 460,638 433,660 403,631 403,559 341,549 341,509",
    "sud-block": "352,591 403,591 404,632 428,661 397,683 334,674 332,639 348,635 353,595",
    "ostliche-insel": "584,499 600,516 614,522 621,542 589,590 592,615 605,627 603,638 576,635 568,623 576,600 552,576 568,559 575,540 585,526 582,501",
    "neuer-hafen": "355,810 316,808 320,772 296,771 301,725 316,698 339,683 368,697 397,694 396,720 375,728 373,743 392,754 388,763 372,763 352,787 355,808",
    "alter-hafen": "462,645 480,633 495,650 548,611 566,636 426,722 408,691 443,671 432,658 447,649",
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
