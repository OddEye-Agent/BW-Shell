// PR4: extracted Placeholder view renderer from index.html (global runtime compatibility).

function renderExperimentalVetCalculatorView() {
  pageContainer.innerHTML = `
    <div class="page-header">
      <h1 class="page-title">Experimental</h1>
      <p class="page-subtitle">Canine blood transfusion volume calculator (experimental reference tool).</p>
    </div>

    <section class="vet-calc-panel">
      <div class="vet-calc-grid">
        <div class="field-group">
          <label for="dogWeightKg">Dog Weight (kg)</label>
          <input id="dogWeightKg" class="text-input" type="number" min="0" step="0.1" placeholder="e.g. 18.5" />
        </div>

        <div class="field-group">
          <label for="recipientPcv">Recipient PCV / HCT (%)</label>
          <input id="recipientPcv" class="text-input" type="number" min="0" max="100" step="0.1" placeholder="e.g. 12" />
        </div>

        <div class="field-group">
          <label for="targetPcv">Target PCV / HCT (%)</label>
          <input id="targetPcv" class="text-input" type="number" min="0" max="100" step="0.1" value="25" />
        </div>

        <div class="field-group">
          <label for="donorPcv">Donor PCV / HCT (%)</label>
          <input id="donorPcv" class="text-input" type="number" min="0" max="100" step="0.1" value="45" />
        </div>

        <div class="field-group">
          <label for="bloodVolumeFactor">Blood Volume Factor (mL/kg)</label>
          <select id="bloodVolumeFactor" class="text-input">
            <option value="90" selected>90 mL/kg (typical canine)</option>
            <option value="85">85 mL/kg (conservative)</option>
            <option value="95">95 mL/kg (high estimate)</option>
          </select>
        </div>
      </div>

      <div class="vet-calc-actions">
        <button type="button" class="page-btn primary" id="calcVetVolumeBtn">Calculate Volume</button>
      </div>

      <div class="vet-calc-result" id="vetCalcResult" aria-live="polite">
        Enter values and click Calculate.
      </div>

      <div class="vet-calc-note">
        Formula used: <code>Volume (mL) = Weight(kg) × Blood Volume (mL/kg) × (Target PCV − Recipient PCV) / Donor PCV</code>
      </div>
      <div class="vet-calc-warning">
        Experimental support tool only — not a substitute for veterinary clinical judgment, patient monitoring, or local protocol.
      </div>
    </section>
  `;

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
