// Accounts view renderer
(function () {
  const state = {
    mode: 'list', // list | create-account | account-details
    selectedAccount: null,
    accountTab: 'details', // details | users | websites
    bindSiteModalOpen: false,
    bindSitePage: 1
  };

  function openAccountDetails(accountName) {
    state.mode = 'account-details';
    state.selectedAccount = accountName;
    state.accountTab = 'details';
    renderAccountsView();
  }

  function renderAccountsList() {
    const tableRows = accountRows
      .map(
        (row) => `
          <tr>
            <td><a class="account-link" href="#" data-open-account="${row.accountName}">${row.accountName}</a></td>
            <td>${row.parentAccount || 'Broadridge'}</td>
            <td class="numeric-cell">${row.subAccounts}</td>
            <td class="numeric-cell">${row.userCount}</td>
            <td>${row.ownerEmail || '—'}</td>
            <td>${row.createdOn}</td>
            <td class="actions-cell account-actions-cell">
              <button class="row-action-button" aria-label="Open account actions">⋮</button>
              <div class="row-action-menu" role="menu" aria-label="Row actions">
                <button type="button">Edit account</button>
                <button type="button">Add sub account</button>
                <button type="button">Add user</button>
                <button type="button">Bind site to account</button>
              </div>
            </td>
          </tr>
        `
      )
      .join('');

    pageContainer.innerHTML = `
      <div class="page-header account-page-header">
        <h1 class="page-title">Account Management</h1>
      </div>

      <div class="accounts-toolbar">
        <div class="accounts-filter-group">
          <label for="accountSearch">Account Name</label>
          <div class="accounts-filter-row">
            <div class="select-like-wrap">
              <select id="accountSearch" class="text-input select-like">
                <option>Search by account</option>
              </select>
            </div>
            <div class="search-like-wrap">
              <input id="userSearch" class="text-input" type="text" placeholder="Search by name or email address" />
              <span class="search-icon">⌕</span>
            </div>
          </div>
        </div>
        <button class="new-account-btn" id="newAccountBtn" type="button">New Account</button>
      </div>

      <div class="table-wrap accounts-table-wrap">
        <table class="accounts-table">
          <thead>
            <tr>
              <th>Account Name</th>
              <th>Parent Account</th>
              <th>Sub Accounts</th>
              <th>Users Count</th>
              <th>Account Owner Email</th>
              <th>Account Creation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>${tableRows}</tbody>
        </table>
      </div>

      <div class="accounts-pagination">
        <div class="page-size-wrap">
          <span>Page Size:</span>
          <select class="text-input page-size-select">
            <option>10</option>
          </select>
        </div>
        <span>1 to 8 of 8</span>
        <span>Page 1 of 1</span>
      </div>
    `;

    attachRowMenuEvents();
    pageContainer.querySelector('#newAccountBtn')?.addEventListener('click', () => {
      state.mode = 'create-account';
      renderAccountsView();
    });

    pageContainer.querySelectorAll('[data-open-account]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        openAccountDetails(el.getAttribute('data-open-account'));
      });
    });
  }

  function renderAccountDetails() {
    const accountName = state.selectedAccount || 'Hatfield Production Test';
    const availableSites = [
      { name: 'ABC Investments', createdDate: '01-08-2026', createdBy: 'Yoshi Sales', msid: 'MS373103', url: 'http://abcinvestments.com', lastUpdated: '2026-02-27' },
      { name: 'Wealth Management Solutions', createdDate: '10-11-2025', createdBy: 'Yoshi Sales', msid: 'MS373103', url: 'http://abcinvestments.com', lastUpdated: '2026-02-26' },
      { name: 'Investment Excellence Group', createdDate: '12-13-2025', createdBy: 'Yoshi Sales', msid: 'MS373103', url: 'http://abcinvestments.com', lastUpdated: '2026-02-24' },
      { name: 'Capital Growth Advisors', createdDate: '12-14-2025', createdBy: 'Yoshi Sales', msid: 'MS373103', url: 'http://abcinvestments.com', lastUpdated: '2026-02-23' },
      { name: 'Guardian Asset Management', createdDate: '01-03-2026', createdBy: 'Yoshi Sales', msid: 'MS373103', url: 'http://abcinvestments.com', lastUpdated: '2026-02-21' },
      { name: 'Summit Financial Planning', createdDate: '01-08-2026', createdBy: 'Yoshi Sales', msid: 'MS373103', url: 'http://abcinvestments.com', lastUpdated: '2026-02-20' },
      { name: 'Elite Financial Services', createdDate: '01-04-2026', createdBy: 'Yoshi Sales', msid: 'MS373103', url: 'http://abcinvestments.com', lastUpdated: '2026-02-19' },
      { name: 'Northstar Advisory Group', createdDate: '11-22-2025', createdBy: 'Yoshi Sales', msid: 'MS373103', url: 'http://abcinvestments.com', lastUpdated: '2026-02-18' },
      { name: 'Crescent Wealth Partners', createdDate: '11-09-2025', createdBy: 'Yoshi Sales', msid: 'MS373103', url: 'http://abcinvestments.com', lastUpdated: '2026-02-16' },
      { name: 'Maple Ridge Advisors', createdDate: '10-02-2025', createdBy: 'Yoshi Sales', msid: 'MS373103', url: 'http://abcinvestments.com', lastUpdated: '2026-02-14' }
    ];

    const usersRows = `
      <tr>
        <td><a class="account-link" href="#">Internal Test Broadridge</a></td>
        <td><a class="account-link" href="#">wixbroadridgetest12@gmail.com</a></td>
        <td>FINANCIAL_ADVISOR</td>
        <td>02/27/2026</td>
        <td>${accountName}</td>
        <td>Active</td>
        <td class="actions-cell">⋮</td>
      </tr>
    `;

    const websitesRows = `
      <tr>
        <td>02/27/2026</td>
        <td><a class="archive-link" href="#">www.hatfieldfinancialgroup.com</a></td>
        <td>Internal Test Broadridge</td>
        <td><a class="archive-link" href="#">1</a></td>
        <td>In Draft</td>
        <td class="actions-cell">👤</td>
      </tr>
    `;

    const tabContent = state.accountTab === 'details'
      ? `
        <section class="create-account-panel">
          <div class="create-account-grid">
            <div class="field-group">
              <label>Account Name<span class="required">*</span></label>
              <input class="text-input" value="${accountName}" />
            </div>
            <div class="field-group">
              <label>Account Type<span class="required">*</span></label>
              <select class="text-input"><option>Retail Advisor</option></select>
            </div>
            <div class="field-group">
              <label>Parent account</label>
              <select class="text-input"><option>Select parent account</option></select>
            </div>
          </div>
        </section>
        <div class="role-form-actions">
          <button class="page-btn" id="cancelAccountDetailBtn" type="button">Cancel</button>
          <button class="page-btn primary" type="button">Save</button>
        </div>
      `
      : state.accountTab === 'users'
        ? `
          <div class="users-header-row users-header-spaced"><div></div><button class="new-role-btn">Create or Add Users ▾</button></div>
          <div class="table-wrap users-table-wrap">
            <table class="users-table">
              <thead>
                <tr>
                  <th>Name</th><th>Email</th><th>Role</th><th>User Created Date</th><th>Account Affiliation</th><th>User Status</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>${usersRows}</tbody>
            </table>
          </div>
        `
        : `
          <div style="display:grid; grid-template-columns: 1fr 180px; gap: 0.8rem; align-items:start;">
            <div class="table-wrap users-table-wrap">
              <table class="users-table">
                <thead>
                  <tr>
                    <th>Created On</th><th>Website Name</th><th>Site Owner</th><th>Collaborators Info</th><th>Site Status</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>${websitesRows}</tbody>
              </table>
            </div>
            <section class="roles-panel" style="padding:0.85rem;">
              <h3 style="margin:0 0 0.6rem; font-size:14px;">Quick Action</h3>
              <button class="new-role-btn" id="bindNewSiteBtn" style="width:100%; margin-left:0;">🔗 Bind New Site</button>
            </section>
          </div>

          <div class="pdf-modal" id="bindSiteModal" ${state.bindSiteModalOpen ? '' : 'hidden'}>
            <div class="pdf-modal-backdrop" id="bindSiteBackdrop"></div>
            <div class="pdf-modal-dialog" style="max-width: 1060px; height: auto;">
              <div class="pdf-modal-header">
                <h3>Bind New Site</h3>
                <button class="page-btn" id="bindSiteCloseBtn" type="button">Close</button>
              </div>
              <div class="pdf-modal-body" style="padding:0.9rem; max-height:70vh; overflow:auto;">
                <div class="accounts-filter-row" style="margin-bottom:0.8rem;">
                  <div class="search-like-wrap" style="flex:1 1 auto;"><input class="text-input" type="text" placeholder="Search available site" /><span class="search-icon">⌕</span></div>
                  <div class="field-group" style="min-width:240px;"><select class="text-input"><option>Last Updated</option><option>Newest First</option><option>Oldest First</option></select></div>
                </div>
                <div class="bind-site-grid">
                  ${availableSites.slice((state.bindSitePage - 1) * 8, state.bindSitePage * 8).map((site) => `<article class="bind-site-card"><h4>${site.name}</h4><p>Created Date: ${site.createdDate}</p><p>Created By: ${site.createdBy}</p><p>MSID: ${site.msid}</p><a class="archive-link" href="#">${site.url}</a></article>`).join('')}
                </div>
                <div class="accounts-pagination" style="margin-top:0.8rem;">
                  <span>Page ${state.bindSitePage} of ${Math.max(1, Math.ceil(availableSites.length / 8))}</span>
                  <div style="display:flex; gap:0.45rem;">
                    <button class="page-btn" id="bindSitePrevBtn" ${state.bindSitePage <= 1 ? 'disabled' : ''}>Previous</button>
                    <button class="page-btn" id="bindSiteNextBtn" ${state.bindSitePage >= Math.ceil(availableSites.length / 8) ? 'disabled' : ''}>Next</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;

    pageContainer.innerHTML = `
      <div class="users-breadcrumb"><a href="#" id="backToAccounts">Accounts</a> <span>›</span> <a href="#" id="accountCrumb">${accountName}</a> <span>›</span> <span>${state.accountTab === 'details' ? 'Account Details' : state.accountTab === 'users' ? 'Users' : 'Websites'}</span></div>
      <div class="users-header-row users-header-spaced"><h1 class="page-title">Account Details - ${accountName}</h1></div>
      <div class="users-subnav" style="margin-bottom:0.85rem;">
        <button class="users-subnav-item ${state.accountTab === 'details' ? 'active' : ''}" data-account-tab="details" type="button">Account Details</button>
        <button class="users-subnav-item ${state.accountTab === 'users' ? 'active' : ''}" data-account-tab="users" type="button">Users</button>
        <button class="users-subnav-item ${state.accountTab === 'websites' ? 'active' : ''}" data-account-tab="websites" type="button">Websites</button>
      </div>
      ${tabContent}
    `;

    const goBack = (e) => {
      e.preventDefault();
      state.mode = 'list';
      renderAccountsView();
    };

    pageContainer.querySelector('#backToAccounts')?.addEventListener('click', goBack);
    pageContainer.querySelector('#accountCrumb')?.addEventListener('click', (e) => {
      e.preventDefault();
      state.accountTab = 'details';
      renderAccountsView();
    });
    pageContainer.querySelector('#cancelAccountDetailBtn')?.addEventListener('click', () => {
      state.mode = 'list';
      renderAccountsView();
    });
    pageContainer.querySelector('#bindNewSiteBtn')?.addEventListener('click', () => {
      state.bindSiteModalOpen = true;
      renderAccountsView();
    });
    pageContainer.querySelector('#bindSiteCloseBtn')?.addEventListener('click', () => {
      state.bindSiteModalOpen = false;
      renderAccountsView();
    });
    pageContainer.querySelector('#bindSiteBackdrop')?.addEventListener('click', () => {
      state.bindSiteModalOpen = false;
      renderAccountsView();
    });
    pageContainer.querySelector('#bindSitePrevBtn')?.addEventListener('click', () => {
      state.bindSitePage = Math.max(1, state.bindSitePage - 1);
      renderAccountsView();
    });
    pageContainer.querySelector('#bindSiteNextBtn')?.addEventListener('click', () => {
      state.bindSitePage = Math.min(Math.ceil(availableSites.length / 8), state.bindSitePage + 1);
      renderAccountsView();
    });

    pageContainer.querySelectorAll('[data-account-tab]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.accountTab = btn.getAttribute('data-account-tab');
        state.bindSiteModalOpen = false;
        state.bindSitePage = 1;
        renderAccountsView();
      });
    });
  }

  function renderCreateAccount() {
    pageContainer.innerHTML = `
      <div class="users-breadcrumb"><a href="#" id="backToAccounts">Accounts</a> <span>›</span> <span>Create Account</span></div>
      <div class="users-header-row users-header-spaced"><h1 class="page-title">Create Account</h1></div>

      <section class="create-account-panel">
        <div class="create-account-grid">
          <div class="field-group">
            <label for="newAccountName">Account Name<span class="required">*</span></label>
            <input id="newAccountName" class="text-input" type="text" placeholder="Enter account name" />
          </div>

          <div class="field-group">
            <label for="newAccountType">Account Type<span class="required">*</span></label>
            <select id="newAccountType" class="text-input">
              <option>Select account type</option>
              <option>Home Office</option>
              <option>Financial Advisor</option>
              <option>Enterprise</option>
            </select>
          </div>

          <div class="field-group">
            <label for="newParentAccount">Parent account</label>
            <select id="newParentAccount" class="text-input">
              <option>Select parent account</option>
              <option>Broadridge</option>
              <option>mksDOnotuseswitchchanges</option>
              <option>manasabinddonotuse</option>
            </select>
          </div>
        </div>
      </section>

      <div class="role-form-actions">
        <button type="button" class="page-btn" id="cancelCreateAccountBtn">Cancel</button>
        <button type="button" class="page-btn primary">Save</button>
      </div>
    `;

    const back = () => {
      state.mode = 'list';
      renderAccountsView();
    };

    pageContainer.querySelector('#backToAccounts')?.addEventListener('click', (e) => {
      e.preventDefault();
      back();
    });

    pageContainer.querySelector('#cancelCreateAccountBtn')?.addEventListener('click', back);
  }

  window.renderAccountsView = function renderAccountsView() {
    if (state.mode === 'create-account') {
      renderCreateAccount();
      return;
    }
    if (state.mode === 'account-details') {
      renderAccountDetails();
      return;
    }
    renderAccountsList();
  };
})();