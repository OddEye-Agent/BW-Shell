// PR4: extracted Placeholder view renderer from index.html (global runtime compatibility).

function renderPlaceholderView(sectionName) {
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
