// Accounts view renderer
(function () {
  const state = {
    mode: 'list', // list | create-account | account-details
    selectedAccount: null,
    accountTab: 'details', // details | users | websites
    bindSiteModalOpen: false,
    bindSitePage: 1,
    accountUsersMenuOpen: false,
    bindSiteSelected: null
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
      { name: 'ABC Investments', createdDate: '01-08-2026', msid: 'A1B2-C3D4-E5F6-G7H8', url: 'http://abcinvestments.com', lastUpdated: '2026-02-27', collaborators: [{name:'Brad Donovan', email:'brad.donovan@abcinvestments.com'},{name:'Amy Peterson', email:'amy.peterson@abcinvestments.com'},{name:'Sean Admin', email:'sean.admin@abcinvestments.com'}] },
      { name: 'Wealth Management Solutions', createdDate: '10-11-2025', msid: 'J9K0-L1M2-N3P4-Q5R6', url: 'http://abcinvestments.com', lastUpdated: '2026-02-26', collaborators: [{name:'Yoshi Sales', email:'yoshi.sales@abcinvestments.com'},{name:'Lana Core', email:'lana.core@abcinvestments.com'}] },
      { name: 'Investment Excellence Group', createdDate: '12-13-2025', msid: 'S7T8-U9V0-W1X2-Y3Z4', url: 'http://abcinvestments.com', lastUpdated: '2026-02-24', collaborators: [] },
      { name: 'Capital Growth Advisors', createdDate: '12-14-2025', msid: 'B4C5-D6E7-F8G9-H0J1', url: 'http://abcinvestments.com', lastUpdated: '2026-02-23', collaborators: [{name:'Bob Jones', email:'bob.jones@abcinvestments.com'},{name:'Jane Mitchell', email:'jane.mitchell@abcinvestments.com'}] },
      { name: 'Guardian Asset Management', createdDate: '01-03-2026', msid: 'K2L3-M4N5-P6Q7-R8S9', url: 'http://abcinvestments.com', lastUpdated: '2026-02-21', collaborators: [] },
      { name: 'Summit Financial Planning', createdDate: '01-08-2026', msid: 'T0U1-V2W3-X4Y5-Z6A7', url: 'http://abcinvestments.com', lastUpdated: '2026-02-20', collaborators: [{name:'Mia Chen', email:'mia.chen@abcinvestments.com'},{name:'Arjun Patel', email:'arjun.patel@abcinvestments.com'},{name:'Noah West', email:'noah.west@abcinvestments.com'}] },
      { name: 'Elite Financial Services', createdDate: '01-04-2026', msid: 'C8D9-E0F1-G2H3-J4K5', url: 'http://abcinvestments.com', lastUpdated: '2026-02-19', collaborators: [{name:'Olivia Park', email:'olivia.park@abcinvestments.com'}] },
      { name: 'Northstar Advisory Group', createdDate: '11-22-2025', msid: 'L6M7-N8P9-Q0R1-S2T3', url: 'http://abcinvestments.com', lastUpdated: '2026-02-18', collaborators: [{name:'Tom Ridge', email:'tom.ridge@abcinvestments.com'},{name:'Eva Cruz', email:'eva.cruz@abcinvestments.com'}] },
      { name: 'Crescent Wealth Partners', createdDate: '11-09-2025', msid: 'U4V5-W6X7-Y8Z9-A0B1', url: 'http://abcinvestments.com', lastUpdated: '2026-02-16', collaborators: [] },
      { name: 'Maple Ridge Advisors', createdDate: '10-02-2025', msid: 'D2E3-F4G5-H6J7-K8L9', url: 'http://abcinvestments.com', lastUpdated: '2026-02-14', collaborators: [{name:'Sam Lee', email:'sam.lee@abcinvestments.com'},{name:'Ira Bloom', email:'ira.bloom@abcinvestments.com'}] }
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

    const activityRows = [
      ['2026-02-04 · 2:34 PM', 'Sean Admin', 'sean.admin@abcinvestments.com', 'Site Bound to Account', 'superiorwealthmgmt.com', 'Website bound; collaborators synced.'],
      ['2026-02-04 · 2:34 PM', 'Sean Admin', 'sean.admin@broadridge.com', 'Account Owner Changed', 'abc-investments.com', 'Owner moved from Jane Mitchell to Robert Godwin.'],
      ['2026-02-04 · 2:34 PM', 'Greg Mallett', 'greg.mallett@broadridge.com', 'Collaborator Invited', 'abc-private-wealth.com', 'Invited Brad Donovan and Amy Peterson.'],
      ['2026-02-04 · 2:34 PM', 'Bob Jones', 'bob.jones@abcinvestments.com', 'Bulk User Created', 'ABC Institutional', 'Imported 147 users; 20 validation warnings.'],
      ['2026-02-04 · 2:34 PM', 'Sean Admin', 'sean.admin@abcinvestments.com', 'Sub-account Added', 'ABC Retail - West Region', 'Sub-account created with 20 users.'],
      ['2026-02-04 · 2:34 PM', 'Sean Admin', 'sean.admin@abcinvestments.com', 'Website Added', 'ABC Investments Corp', 'Website added and linked to account.']
    ].map((r) => `<tr><td>${r[0]}</td><td><strong>${r[1]}</strong><br/><span class="muted">${r[2]}</span></td><td><span class="status-pill">${r[3]}</span></td><td>${r[4]}</td><td>${r[5]}</td></tr>`).join('');

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
              <select class="text-input">
                <option>Retail Advisor</option>
                <option>Retail BD</option>
                <option>Enterprise</option>
                <option>Sub Account</option>
              </select>
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
          <div class="users-header-row users-header-spaced"><div></div><div class="account-users-actions"><button class="new-role-btn" id="accountUsersMenuBtn">Create or Add Users ▾</button><div class="dropdown account-users-dropdown ${state.accountUsersMenuOpen ? 'open' : ''}" id="accountUsersDropdown" ${state.accountUsersMenuOpen ? '' : 'hidden'}><button type="button">＋ New User</button><button type="button">⊕ Add Existing User</button></div></div></div>
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
        : state.accountTab === 'websites'
          ? `
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
                <div class="pdf-modal-body" style="padding:0.9rem; max-height:88vh; overflow:hidden;">
                  <div class="accounts-filter-row" style="margin-bottom:0.8rem;">
                    <div class="search-like-wrap" style="flex:1 1 auto;"><input class="text-input" type="text" placeholder="Search available site" /><span class="search-icon">⌕</span></div>
                    <div class="field-group" style="min-width:240px;"><select class="text-input"><option>Last Updated</option><option>Newest First</option><option>Oldest First</option></select></div>
                  </div>
                  <div class="bind-site-grid">
                    ${availableSites.slice((state.bindSitePage - 1) * 8, state.bindSitePage * 8).map((site, siteIndex) => `<article class="bind-site-card" data-bind-site-index="${siteIndex + ((state.bindSitePage - 1) * 8)}">${(site.collaborators?.length || 0) > 0 ? `<div class="site-collab-wrap top-right"><button type="button" class="site-collab-chip" aria-label="Collaborators">👤 ${site.collaborators.length}</button><div class="site-collab-pop">${(site.collaborators||[]).map((c)=>`<div><strong>${c.name}</strong><br/><span>${c.email}</span></div>`).join('')}</div></div>` : ''}<h4>${site.name}</h4><p>Created Date: ${site.createdDate}</p><p>MSID: ${site.msid}</p><a class="archive-link" href="#">${site.url}</a></article>`).join('')}
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
          `
          : `
            <div class="accounts-filter-row" style="margin-bottom:0.8rem; grid-template-columns: 1.5fr 1fr 1fr;">
              <div class="search-like-wrap"><input class="text-input" placeholder="Search by email or name" /><span class="search-icon">⌕</span></div>
              <div class="field-group"><input class="text-input" placeholder="MM/DD/YY" /></div>
              <div class="field-group"><select class="text-input"><option>All Events</option><option>Site Bound to Account</option><option>Account Owner Changed</option></select></div>
            </div>
            <div class="table-wrap users-table-wrap">
              <table class="users-table">
                <thead><tr><th>Date/Time</th><th>Performed By</th><th>Event Type</th><th>Impacted Area</th><th>Details</th></tr></thead>
                <tbody>${activityRows}</tbody>
              </table>
            </div>
          `;

    pageContainer.innerHTML = `
      <div class="users-breadcrumb"><a href="#" id="backToAccounts">Accounts</a> <span>›</span> <a href="#" id="accountCrumb">${accountName}</a> <span>›</span> <span>${state.accountTab === 'details' ? 'Account Details' : state.accountTab === 'users' ? 'Users' : state.accountTab === 'websites' ? 'Websites' : 'Activity'}</span></div>
      <div class="users-header-row users-header-spaced"><h1 class="page-title">Account Details - ${accountName}</h1></div>
      <div class="users-subnav" style="margin-bottom:0.85rem;">
        <button class="users-subnav-item ${state.accountTab === 'details' ? 'active' : ''}" data-account-tab="details" type="button">Account Details</button>
        <button class="users-subnav-item ${state.accountTab === 'users' ? 'active' : ''}" data-account-tab="users" type="button">Users</button>
        <button class="users-subnav-item ${state.accountTab === 'websites' ? 'active' : ''}" data-account-tab="websites" type="button">Websites</button>
        <button class="users-subnav-item ${state.accountTab === 'activity' ? 'active' : ''}" data-account-tab="activity" type="button">Activity</button>
      </div>
      ${tabContent}
      ${state.accountTab === 'websites' && state.bindSiteSelected != null ? `<div class="pdf-modal" id="bindSiteSummaryModal"><div class="pdf-modal-backdrop" id="bindSiteSummaryBackdrop"></div><div class="pdf-modal-dialog" style="max-width:980px;height:auto;"><div class="pdf-modal-header"><h3>Bind Site & Invite Collaborator</h3><button class="page-btn" id="bindSiteSummaryCloseBtn" type="button">Close</button></div><div class="pdf-modal-body" style="padding:1rem;"><p class="account-settings-copy" style="margin-bottom:.8rem;">Review the selected site information, then invite collaborators to join this site.</p><section class="roles-panel bind-summary-tile" style="background:#f4f9ff;margin-bottom:.9rem;"><h3 style="margin:0 0 .4rem;font-size:1.1rem;">Website Details</h3>${(availableSites[state.bindSiteSelected]?.collaborators?.length || 0) > 0 ? `<div class="site-collab-wrap top-right"><button type="button" class="site-collab-chip" aria-label="Collaborators">👤 ${availableSites[state.bindSiteSelected].collaborators.length}</button><button type="button" class="site-collab-info" aria-label="Collaborator notification info">ⓘ</button><div class="site-collab-info-pop">When you bind a user to a site, this will trigger an automated notification email that is sent to the collaborator being bound, from info@dashboard.broadridgeadvisor.com</div><div class="site-collab-pop">${(availableSites[state.bindSiteSelected].collaborators||[]).map((c)=>`<div><strong>${c.name}</strong><br/><span>${c.email}</span></div>`).join('')}</div></div>` : ''}<div class="create-account-grid" style="grid-template-columns:1fr 1fr; align-items:start;"><div><label class="muted">Selected Site:</label><div><strong>${availableSites[state.bindSiteSelected]?.url?.replace('http://','www.') || ''}</strong></div><div style="margin-top:.55rem;"><label class="muted" style="display:block;">MSID:</label><div><strong>${availableSites[state.bindSiteSelected]?.msid || ''}</strong></div></div></div><div><label class="muted">Target Account:</label><div><strong>${accountName}</strong></div></div></div></section><h3 style="margin:0 0 .6rem;">Invite as Collaborator</h3><div class="field-group" style="margin-bottom:.7rem;"><label>Collaborator Name<span class="required">*</span></label><select class="text-input" id="bindCollaboratorSelect"><option>Select a Collaborator</option><option>Internal Test Broadridge (wixbroadridgetest12@gmail.com)</option></select></div><div class="field-group"><label>Roles<span class="required">*</span></label><select class="text-input" id="bindRoleSelect"><option>Select a Role</option><option>Financial Advisor</option></select></div><div class="role-form-actions" style="margin-top:1rem;"><button class="page-btn" id="bindSiteSummaryCancelBtn" type="button">Cancel</button><button class="page-btn primary" id="bindSiteSendInviteBtn" type="button" disabled>Send Invite</button></div></div></div></div>` : ''}
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

    const menuBtn = pageContainer.querySelector('#accountUsersMenuBtn');
    const menu = pageContainer.querySelector('#accountUsersDropdown');
    menuBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      state.accountUsersMenuOpen = !state.accountUsersMenuOpen;
      renderAccountsView();
    });
    pageContainer.addEventListener('click', (e) => {
      if (!state.accountUsersMenuOpen) return;
      if (menu && menu.contains(e.target)) return;
      if (menuBtn && menuBtn.contains(e.target)) return;
      state.accountUsersMenuOpen = false;
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

    pageContainer.querySelectorAll('[data-bind-site-index]').forEach((card) => {
      card.addEventListener('click', () => {
        state.bindSiteSelected = Number(card.getAttribute('data-bind-site-index'));
        renderAccountsView();
      });
    });

    const closeBindSummary = () => {
      state.bindSiteSelected = null;
      renderAccountsView();
    };
    pageContainer.querySelector('#bindSiteSummaryCloseBtn')?.addEventListener('click', closeBindSummary);
    pageContainer.querySelector('#bindSiteSummaryBackdrop')?.addEventListener('click', closeBindSummary);
    pageContainer.querySelector('#bindSiteSummaryCancelBtn')?.addEventListener('click', closeBindSummary);
    const collabSel = pageContainer.querySelector('#bindCollaboratorSelect');
    const roleSel = pageContainer.querySelector('#bindRoleSelect');
    const sendBtn = pageContainer.querySelector('#bindSiteSendInviteBtn');
    const syncInviteButton = () => {
      if (!sendBtn || !collabSel || !roleSel) return;
      sendBtn.disabled = collabSel.selectedIndex === 0 || roleSel.selectedIndex === 0;
    };
    collabSel?.addEventListener('change', syncInviteButton);
    roleSel?.addEventListener('change', syncInviteButton);

    pageContainer.querySelectorAll('[data-account-tab]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.accountTab = btn.getAttribute('data-account-tab');
        state.bindSiteModalOpen = false;
        state.bindSitePage = 1;
        state.accountUsersMenuOpen = false;
        state.bindSiteSelected = null;
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
              <option>Retail Advisor</option>
              <option>Retail BD</option>
              <option>Enterprise</option>
              <option>Sub Account</option>
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
