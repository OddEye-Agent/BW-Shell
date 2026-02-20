// Accounts view renderer
(function () {
  const state = {
    mode: 'list' // list | create-account
  };

  function renderAccountsList() {
    const tableRows = accountRows
      .map(
        (row) => `
          <tr>
            <td><a class="account-link" href="#">${row.accountName}</a></td>
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
    renderAccountsList();
  };
})();
