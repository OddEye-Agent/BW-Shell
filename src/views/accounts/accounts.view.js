// PR4: extracted Accounts view renderer from index.html (global runtime compatibility).

function renderAccountsView() {
      const tableRows = accountRows
        .map(
          (row) => `
              <tr>
                <td><a class="account-link" href="#">${row.accountName}</a></td>
                <td>${row.parentAccount}</td>
                <td>${row.subAccounts}</td>
                <td>${row.userCount}</td>
                <td>${row.ownerEmail}</td>
                <td>${row.createdOn}</td>
                <td class="actions-cell">
                  <button class="row-action-button" aria-label="Open account actions">⋯</button>
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
          <div class="page-header">
            <h1 class="page-title">Account Management</h1>
          </div>
          <div class="filter-row">
            <div class="field-group">
              <label for="accountSearch">Account Name</label>
              <input id="accountSearch" class="text-input" type="text" placeholder="Search by account" />
            </div>
            <div class="field-group">
              <label for="userSearch">User Search</label>
              <input id="userSearch" class="text-input" type="text" placeholder="Search by name or email address" />
            </div>
          </div>

          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Account Name</th>
                  <th>Parent Account</th>
                  <th>Sub Accounts</th>
                  <th>User Count</th>
                  <th>Account Owner Email</th>
                  <th>Account Creation Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>${tableRows}</tbody>
            </table>
          </div>

          <div class="pagination">
            <span>Showing 1-4 of 42 accounts</span>
            <div class="pagination-controls">
              <button class="page-btn" type="button">Previous</button>
              <button class="page-btn" type="button">1</button>
              <button class="page-btn" type="button">2</button>
              <button class="page-btn" type="button">3</button>
              <button class="page-btn" type="button">Next</button>
            </div>
          </div>
        `;

      attachRowMenuEvents();
    }

