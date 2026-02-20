// Content page view (accordion shell parity)
(function () {
  const accordionItems = ['Research Articles', 'Videos', 'Newsletters', 'Calculators'];

  window.renderContentView = function renderContentView() {
    pageContainer.innerHTML = `
      <div class="page-header content-page-header">
        <h1 class="page-title">Content</h1>
      </div>

      <section class="content-info-panel">
        <p>Choose whether to allow all content, or select specific categories or items.</p>
      </section>

      <section class="content-accordion-list" aria-label="Content categories">
        ${accordionItems
          .map(
            (label, idx) => `
              <details class="content-accordion-item" ${idx === 0 ? '' : ''}>
                <summary>
                  <span class="content-accordion-caret" aria-hidden="true">▸</span>
                  <span>${label}</span>
                </summary>
                <div class="content-accordion-body"></div>
              </details>
            `
          )
          .join('')}
      </section>

      <div class="content-actions">
        <button type="button" class="page-btn">Cancel</button>
        <button type="button" class="page-btn primary content-save-btn" disabled>Save</button>
      </div>
    `;
  };
})();
