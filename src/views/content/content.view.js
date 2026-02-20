// Content page view (category-specific accordion shells)
(function () {
  const researchArticles = {
    left: {
      category: 'API Testing',
      items: [
        'Automation Test for update RESEARCH_ARTICLE',
        'Automation Test for RESEARCH_ARTICLE',
        'Automation Test for update RESEARCH_ARTICLE (v2)',
        'Automation Test for RESEARCH_ARTICLE (staging)',
        'Automation Test for update NEWSLETTER',
        'Modern Portfolio Theory in Volatile Markets',
        'Retirement Income Buckets Explained',
        'Tax-Loss Harvesting: Practical Guide',
        'Estate Planning Basics for Families',
        'Credit Spread Signals and Allocation',
        'Behavioral Finance and Investor Biases',
        '2026 Mid-Year Market Outlook',
        'Cash Management During Rate Cycles',
        'Planning for Education Costs Efficiently',
        'Risk Tolerance vs Risk Capacity'
      ]
    },
    right: {
      category: 'Others',
      items: [
        'Insuring the Vehicles That Drive Your Business',
        'Should You Bank Your Retirement on Your Business?',
        'What Is a SIMPLE?',
        'Specialty Policies Can Help Insure Fun',
        'What Investment Risks Should I Know About?',
        'How Can I Estimate My Future Social Security Benefits?',
        'On the Move: Insurance Protection for Your Automobile and Other Vehicles',
        'What Is Dollar-Cost Averaging?',
        'How Inflation Impacts Long-Term Financial Plans',
        'Dividend Strategies for Income Investors',
        'Term vs Permanent Life Insurance',
        'Business Continuity Planning Checklist',
        'Disability Insurance: Coverage Essentials',
        'How to Evaluate Mutual Fund Fees',
        'Building an Emergency Fund in Stages'
      ]
    }
  };

  const accordionItems = ['Research Articles', 'Videos', 'Newsletters', 'Calculators'];

  function renderResearchColumn(col, side) {
    const itemHtml = col.items
      .map(
        (title, idx) => `
          <label class="research-tile">
            <input type="checkbox" class="research-item-checkbox" data-side="${side}" data-item-index="${idx}" />
            <span class="research-title">${title}</span>
          </label>
        `
      )
      .join('');

    return `
      <div class="research-col" data-side="${side}">
        <div class="research-col-header">
          <strong>${col.category}</strong>
          <label class="research-select-all"><input type="checkbox" class="research-col-select-all" data-side="${side}" /> Select All</label>
        </div>
        <div class="research-list">${itemHtml}</div>
      </div>
    `;
  }

  function wireResearchInteractions() {
    const panel = pageContainer.querySelector('#researchPanel');
    if (!panel) return;

    const globalSelectAll = panel.querySelector('#researchSelectAll');
    const totalBadge = panel.querySelector('#researchSelectionBadge');
    const allItemCheckboxes = [...panel.querySelectorAll('.research-item-checkbox')];
    const colSelectAllBoxes = [...panel.querySelectorAll('.research-col-select-all')];

    const updateState = () => {
      const selected = allItemCheckboxes.filter((cb) => cb.checked).length;
      const total = allItemCheckboxes.length;
      totalBadge.textContent = `${selected} out of ${total} selected`;
      globalSelectAll.checked = total > 0 && selected === total;
      globalSelectAll.indeterminate = selected > 0 && selected < total;

      colSelectAllBoxes.forEach((colCb) => {
        const side = colCb.dataset.side;
        const colItems = allItemCheckboxes.filter((itemCb) => itemCb.dataset.side === side);
        const colSelected = colItems.filter((x) => x.checked).length;
        colCb.checked = colItems.length > 0 && colSelected === colItems.length;
        colCb.indeterminate = colSelected > 0 && colSelected < colItems.length;
      });
    };

    globalSelectAll?.addEventListener('change', () => {
      allItemCheckboxes.forEach((cb) => {
        cb.checked = globalSelectAll.checked;
      });
      updateState();
    });

    colSelectAllBoxes.forEach((colCb) => {
      colCb.addEventListener('change', () => {
        const side = colCb.dataset.side;
        allItemCheckboxes.forEach((itemCb) => {
          if (itemCb.dataset.side === side) itemCb.checked = colCb.checked;
        });
        updateState();
      });
    });

    allItemCheckboxes.forEach((cb) => cb.addEventListener('change', updateState));
    updateState();
  }

  function renderResearchAccordionBody() {
    return `
      <div id="researchPanel" class="research-panel">
        <div class="research-banner-row">
          <div class="research-banner-text">Choose whether to allow all content, or select specific categories or items.</div>
          <div class="research-banner-actions">
            <label class="research-select-all"><input id="researchSelectAll" type="checkbox" /> Select All</label>
            <span id="researchSelectionBadge" class="research-selected-badge">0 out of 30 selected</span>
          </div>
        </div>

        <div class="research-columns">
          ${renderResearchColumn(researchArticles.left, 'left')}
          ${renderResearchColumn(researchArticles.right, 'right')}
        </div>
      </div>
    `;
  }

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
          .map((label, idx) => {
            const isResearch = idx === 0;
            return `
              <details class="content-accordion-item" ${isResearch ? 'open' : ''}>
                <summary>
                  <span class="content-accordion-caret" aria-hidden="true">▸</span>
                  <span>${label}</span>
                </summary>
                <div class="content-accordion-body ${isResearch ? 'has-body' : ''}">
                  ${isResearch ? renderResearchAccordionBody() : ''}
                </div>
              </details>
            `;
          })
          .join('')}
      </section>

      <div class="content-actions">
        <button type="button" class="page-btn">Cancel</button>
        <button type="button" class="page-btn primary">Save</button>
      </div>
    `;

    wireResearchInteractions();
  };
})();
