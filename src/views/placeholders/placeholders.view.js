// PR4: extracted Placeholder view renderer from index.html (global runtime compatibility).

function wireVetCalculatorEvents() {
  const resultEl = document.getElementById('vetCalcResult');
  const readNum = (id) => Number(document.getElementById(id)?.value || 0);

  document.getElementById('calcVetVolumeBtn')?.addEventListener('click', () => {
    const weight = readNum('dogWeightKg');
    const recipientPcv = readNum('recipientPcv');
    const targetPcv = readNum('targetPcv');
    const donorPcv = readNum('donorPcv');
    const factor = readNum('bloodVolumeFactor');

    if (!weight || !donorPcv || targetPcv <= recipientPcv) {
      resultEl.textContent = 'Please provide valid values (weight > 0, donor PCV > 0, and target PCV greater than recipient PCV).';
      return;
    }

    const volumeMl = (weight * factor * (targetPcv - recipientPcv)) / donorPcv;
    const roundedMl = Math.round(volumeMl);

    resultEl.innerHTML = `Estimated transfusion volume: <strong>${roundedMl} mL</strong> <span class="muted">(exact: ${volumeMl.toFixed(1)} mL)</span>`;
  });
}

function wireExperimentalModals() {
  const bindModal = (openId, modalId, closeId, backdropId) => {
    const modal = document.getElementById(modalId);
    const openBtn = document.getElementById(openId);
    const closeBtn = document.getElementById(closeId);
    const backdrop = document.getElementById(backdropId);
    if (!modal) return;
    openBtn?.addEventListener('click', () => {
      modal.hidden = false;
    });
    const close = () => {
      modal.hidden = true;
    };
    closeBtn?.addEventListener('click', close);
    backdrop?.addEventListener('click', close);
  };

  bindModal('openVetCalcTile', 'vetCalcModal', 'closeVetCalcModal', 'vetCalcBackdrop');
  bindModal('openIcuRoundingTile', 'icuRoundingModal', 'closeIcuRoundingModal', 'icuRoundingBackdrop');
}

function renderExperimentalVetCalculatorView() {
  pageContainer.innerHTML = `
    <div class="page-header">
      <h1 class="page-title">Experimental</h1>
      <p class="page-subtitle">Prototype utilities and clinical support experiments.</p>
    </div>

    <section class="experimental-tile-grid">
      <button class="exp-tool-tile" id="openVetCalcTile" type="button">
        <div class="exp-tool-graphic" aria-hidden="true">🐶🩸</div>
        <div class="exp-tool-title">Canine Transfusion Volume Calculator</div>
        <div class="exp-tool-desc">Estimate blood volume (mL) needed to raise recipient PCV/HCT to target.</div>
      </button>

      <button class="exp-tool-tile" id="openIcuRoundingTile" type="button">
        <div class="exp-tool-graphic" aria-hidden="true">🩺📋</div>
        <div class="exp-tool-title">UCI Vet Rounding Sheet</div>
        <div class="exp-tool-desc">Capture critical ICU rounding information for veterinary technician handoffs.</div>
      </button>
    </section>

    <div class="vet-calc-modal" id="vetCalcModal" hidden>
      <div class="vet-calc-backdrop" id="vetCalcBackdrop"></div>
      <section class="vet-calc-dialog" role="dialog" aria-modal="true" aria-label="Canine Transfusion Volume Calculator">
        <div class="vet-calc-dialog-header">
          <h2>Canine Transfusion Volume Calculator</h2>
          <button type="button" class="page-btn" id="closeVetCalcModal">Close</button>
        </div>

        <div class="vet-calc-panel">
          <div class="vet-calc-grid">
            <div class="field-group"><label for="dogWeightKg">Dog Weight (kg)</label><input id="dogWeightKg" class="text-input" type="number" min="0" step="0.1" placeholder="e.g. 18.5" /></div>
            <div class="field-group"><label for="recipientPcv">Recipient PCV / HCT (%)</label><input id="recipientPcv" class="text-input" type="number" min="0" max="100" step="0.1" placeholder="e.g. 12" /></div>
            <div class="field-group"><label for="targetPcv">Target PCV / HCT (%)</label><input id="targetPcv" class="text-input" type="number" min="0" max="100" step="0.1" value="25" /></div>
            <div class="field-group"><label for="donorPcv">Donor PCV / HCT (%)</label><input id="donorPcv" class="text-input" type="number" min="0" max="100" step="0.1" value="45" /></div>
            <div class="field-group"><label for="bloodVolumeFactor">Blood Volume Factor (mL/kg)</label><select id="bloodVolumeFactor" class="text-input"><option value="90" selected>90 mL/kg (typical canine)</option><option value="85">85 mL/kg (conservative)</option><option value="95">95 mL/kg (high estimate)</option></select></div>
          </div>

          <div class="vet-calc-actions"><button type="button" class="page-btn primary" id="calcVetVolumeBtn">Calculate Volume</button></div>
          <div class="vet-calc-result" id="vetCalcResult" aria-live="polite">Enter values and click Calculate.</div>
          <div class="vet-calc-note">Formula used: <code>Volume (mL) = Weight(kg) × Blood Volume (mL/kg) × (Target PCV − Recipient PCV) / Donor PCV</code></div>
          <div class="vet-calc-warning">Experimental support tool only — not a substitute for veterinary clinical judgment, patient monitoring, or local protocol.</div>
        </div>
      </section>
    </div>

    <div class="vet-calc-modal" id="icuRoundingModal" hidden>
      <div class="vet-calc-backdrop" id="icuRoundingBackdrop"></div>
      <section class="vet-calc-dialog" role="dialog" aria-modal="true" aria-label="UCI Vet Rounding Sheet">
        <div class="vet-calc-dialog-header">
          <h2>UCI Vet Rounding Sheet</h2>
          <button type="button" class="page-btn" id="closeIcuRoundingModal">Close</button>
        </div>

        <div class="vet-calc-panel">
          <div class="vet-calc-grid">
            <div class="field-group"><label>Patient Name</label><input class="text-input" type="text" placeholder="Patient name" /></div>
            <div class="field-group"><label>Species / Breed</label><input class="text-input" type="text" placeholder="Canine - Labrador" /></div>
            <div class="field-group"><label>Weight (kg)</label><input class="text-input" type="number" min="0" step="0.1" /></div>
            <div class="field-group"><label>Primary Diagnosis</label><input class="text-input" type="text" placeholder="e.g. IMHA" /></div>
            <div class="field-group"><label>Temp (°C)</label><input class="text-input" type="number" step="0.1" /></div>
            <div class="field-group"><label>Heart Rate (bpm)</label><input class="text-input" type="number" /></div>
            <div class="field-group"><label>Resp Rate (/min)</label><input class="text-input" type="number" /></div>
            <div class="field-group"><label>BP (mmHg)</label><input class="text-input" type="text" placeholder="120/75" /></div>
            <div class="field-group"><label>Pain Score (0-10)</label><input class="text-input" type="number" min="0" max="10" /></div>
            <div class="field-group"><label>Urine Output (mL/kg/hr)</label><input class="text-input" type="number" min="0" step="0.1" /></div>
            <div class="field-group"><label>Fluid Plan</label><input class="text-input" type="text" placeholder="e.g. LRS 3 mL/kg/hr" /></div>
            <div class="field-group"><label>Next Recheck Time</label><input class="text-input" type="time" /></div>
          </div>

          <div class="field-group" style="margin-top:.8rem;">
            <label>Technician Notes / Handoff</label>
            <textarea class="text-area" rows="5" placeholder="Enter monitoring notes, changes, and tasks for next round..."></textarea>
          </div>

          <div class="vet-calc-actions">
            <button type="button" class="page-btn">Save Draft</button>
            <button type="button" class="page-btn primary">Complete Round</button>
          </div>
        </div>
      </section>
    </div>
  `;

  wireVetCalculatorEvents();
  wireExperimentalModals();
}

function renderPlaceholderView(sectionName) {
  if (sectionName === 'Experimental') {
    renderExperimentalVetCalculatorView();
    return;
  }

  const sectionCards = placeholderSections[sectionName] || [];
  const cards = sectionCards
    .map(([title, desc]) => `<article class="placeholder-card"><h3>${title}</h3><p>${desc}</p></article>`)
    .join('');

  const headerTitle = pageHeaderTitles[sectionName] || sectionName;

  pageContainer.innerHTML = `
      <div class="page-header">
        <h1 class="page-title">${headerTitle}</h1>
        <p class="page-subtitle">This section is ready for the next phase of UI buildout.</p>
      </div>
      <div class="placeholder-grid">${cards}</div>
    `;
}
