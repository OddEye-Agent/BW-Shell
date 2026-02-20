// Users module (Users / Manage Roles / Groups)
(function () {
  const state = {
    mode: 'list', // list | create-role | create-user
    activeTab: 'Users',
    editingRole: null,
    selectedPermissions: new Set(),
    baselinePermissions: new Set(),
    activePermissionCategory: 'Account',
    permissionSearch: ''
  };

  const usersRows = [
    { name: 'fromswitch swdonotuse', email: 'user@from.com', role: 'Financial Advisor', account: 'mksDOnotuseswitchchanges', createdOn: '02-20-2026', status: 'Active' },
    { name: 'mksswitchfive donotuse', email: 'jhh@hhh.in', role: 'Financial Advisor', account: 'mksDOnotuseswitchchanges', createdOn: '02-20-2026', status: 'Inactive' },
    { name: 'push abc', email: 'push@gmail.com', role: 'Financial Advisor', account: 'pushabc', createdOn: '02-20-2026', status: 'Active' },
    { name: 'mksbindtwo donotuse', email: 'kjj@we.in', role: 'Program Admin', account: 'manasabinddonotuse', createdOn: '02-20-2026', status: 'Active' },
    { name: 'mksbind donotuse', email: 'kku@et.in', role: 'Financial Advisor', account: 'manasabinddonotuse', createdOn: '02-20-2026', status: 'Active' },
    { name: 'user two', email: 'user2@gmail.co', role: 'Financial Advisor', account: 'entitled content for websites swathi', createdOn: '02-20-2026', status: 'Active' },
    { name: 'swathi cs', email: 'swathics87@gmail.com', role: 'Financial Advisor', account: 'entitled content for websites swathi', createdOn: '02-20-2026', status: 'Active' },
    { name: 'pushp k', email: 'pushp@gmail.com', role: 'Financial Advisor', account: 'pushpa', createdOn: '02-20-2026', status: 'Active' },
    { name: 'pushpa kumari', email: 'pushpa@gmail.com', role: 'Financial Advisor', account: 'pushpa', createdOn: '02-20-2026', status: 'Active' },
    { name: 'Anitha sssssUpd', email: 'anitha_ssssss@gmail.com', role: 'Financial Advisor', account: 'ActivitylogCheckAccupdATED', createdOn: '02-20-2026', status: 'Active' }
  ];

  const groupsRows = [
    { accountName: 'Broadridge', groupName: 'Automation_GroupryFec', members: 1 },
    { accountName: 'Broadridge', groupName: 'Automation_GroupKNAqR', members: 1 },
    { accountName: 'Broadridge', groupName: 'Automation_Reviver_group-123---_6DEKCR', members: 2 },
    { accountName: 'Broadridge', groupName: 'Automation_Reviver_group-123---_sMLc_c', members: 2 },
    { accountName: 'Broadridge', groupName: 'Automation_Reviver_group-123---_BRsX0A', members: 2 },
    { accountName: 'navtabvalidationaccount', groupName: 'Demo', members: 1 },
    { accountName: 'Broadridge', groupName: 'Automation_Reviver_group-123---_A3jIl9qJtlmy2WJVhR', members: 2 },
    { accountName: 'Broadridge', groupName: 'Automation_Reviver_group-123---_1uITGH', members: 2 },
    { accountName: 'Broadridge', groupName: 'Automation_Reviver_group-123---_8gK6q0', members: 2 },
    { accountName: 'Broadridge', groupName: 'Automation_Reviver_group-123---_QK9zvA', members: 2 }
  ];


  const getData = () => window.rolePermissionData || { roles: [], categories: [], rolePresets: [] };
  const staffRoles = new Set(['Super Admin', 'Broadridge Manager', 'Service', 'Sales']);

  function esc(text) {
    return String(text || '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function renderUsersSubnav() {
    return `
      <div class="users-subnav">
        <button class="users-subnav-item ${state.activeTab === 'Users' ? 'active' : ''}" type="button" data-users-tab="Users">Users</button>
        <button class="users-subnav-item ${state.activeTab === 'Manage Roles' ? 'active' : ''}" type="button" data-users-tab="Manage Roles">Manage Roles</button>
        <button class="users-subnav-item ${state.activeTab === 'Groups' ? 'active' : ''}" type="button" data-users-tab="Groups">Groups</button>
        ${state.activeTab === 'Manage Roles' ? '<button class=\"new-role-btn\" id=\"newRoleBtn\" type=\"button\">New Role</button>' : state.activeTab === 'Users' ? '<button class=\"new-role-btn\" id=\"newUserBtn\" type=\"button\">New User</button>' : state.activeTab === 'Groups' ? '<button class=\"new-role-btn\" type=\"button\">New Group</button>' : ''}
      </div>
    `;
  }

  function wireUsersSubnav(container) {
    container.querySelectorAll('[data-users-tab]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.activeTab = btn.getAttribute('data-users-tab');
        state.mode = 'list';
        renderUsersView();
      });
    });
  }

  function humanRoleDescription(role) {
    const perms = role.permissions || [];
    const has = (token) => perms.some((p) => p.toLowerCase().includes(token));
    const canManageUsers = has('create a new user') || has('update user details') || has('disable a user');
    const canManageAccounts = has('create a new account') || has('update an account') || has('delete an account');
    const canManageCompliance = has('compliance') || has('workflow');
    const canManageRoles = has('create roles') || has('edit roles') || has('delete roles');
    if (canManageAccounts && canManageUsers && canManageCompliance && canManageRoles) return 'Full-spectrum operational role with account administration, user controls, compliance workflow management, and role governance.';
    if (canManageAccounts && canManageUsers && canManageRoles) return 'Operations-focused role for managing accounts, user lifecycle actions, and role assignments across the platform.';
    if (canManageCompliance) return 'Compliance-focused role for monitoring review queues, workflows, and policy-driven approval operations.';
    if (canManageUsers) return 'User management role for onboarding, maintaining, and supporting users with controlled access operations.';
    return 'Business support role with scoped permissions for daily platform operations.';
  }

  function renderUsersTable(container) {
    const rows = usersRows
      .map((row) => `
        <tr>
          <td><a class="account-link" href="#">${esc(row.name)}</a></td>
          <td><a class="account-link" href="#">${esc(row.email)}</a></td>
          <td>${esc(row.role)}</td>
          <td>${esc(row.account)}</td>
          <td>${esc(row.createdOn)}</td>
          <td>${esc(row.status)}</td>
          <td class="actions-cell"><button class="row-action-button" aria-label="Edit user">✎</button></td>
        </tr>
      `)
      .join('');

    container.innerHTML = `
      <div class="users-header-row"><h1 class="page-title">User Management</h1></div>
      ${renderUsersSubnav()}

      <div class="accounts-toolbar">
        <div class="accounts-filter-group">
          <label>Account Name</label>
          <div class="accounts-filter-row">
            <div class="select-like-wrap"><select class="text-input select-like"><option>Search by account</option></select></div>
            <div class="select-like-wrap"><select class="text-input select-like"><option>Search by roles</option></select></div>
            <div class="search-like-wrap"><input class="text-input" type="text" placeholder="Search by name or email..." /><span class="search-icon">⌕</span></div>
          </div>
        </div>
      </div>

      <div class="table-wrap users-table-wrap">
        <table class="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Roles</th>
              <th>Account Affiliation</th>
              <th>User Created Date</th>
              <th>User Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;

    wireUsersSubnav(container);

    container.querySelector('#newUserBtn')?.addEventListener('click', () => {
      state.mode = 'create-user';
      state.activeTab = 'Users';
      renderUsersView();
    });
  }

  function renderCreateUser(container) {
    container.innerHTML = `
      <div class="users-breadcrumb"><a href="#" id="backToUsers">Users</a> <span>›</span> <span>Create User</span></div>
      <div class="users-header-row users-header-spaced"><h1 class="page-title">Create User</h1></div>

      <section class="create-user-panel">
        <div class="create-user-grid">
          <div class="field-group">
            <label for="newUserFirstName">First Name<span class="required">*</span></label>
            <input id="newUserFirstName" class="text-input" type="text" placeholder="Enter first name" />
          </div>
          <div class="field-group">
            <label for="newUserLastName">Last Name<span class="required">*</span></label>
            <input id="newUserLastName" class="text-input" type="text" placeholder="Enter last name" />
          </div>
          <div class="field-group">
            <label for="newUserEmail">Email<span class="required">*</span></label>
            <input id="newUserEmail" class="text-input" type="email" placeholder="Enter user's email address" />
          </div>
          <div class="field-group">
            <label for="newUserAccount">Assign To Account<span class="required">*</span></label>
            <select id="newUserAccount" class="text-input">
              <option>Select account</option>
              <option>mksDOnotuseswitchchanges</option>
              <option>manasabinddonotuse</option>
              <option>pushabc</option>
            </select>
          </div>
        </div>

        <div class="create-user-status-wrap">
          <label>User Status</label>
          <div class="radio-row">
            <label><input type="radio" name="newUserStatus" checked /> Active</label>
            <label><input type="radio" name="newUserStatus" /> Disable</label>
          </div>
        </div>
      </section>

      <section class="roles-panel create-user-roles-panel">
        <h2 class="roles-panel-title">Roles & Permissions</h2>
        <div class="create-user-role-list">
          <label class="create-user-role-item">
            <input type="checkbox" />
            <span class="perm-copy"><span class="perm-name">Home Office Video</span><span class="perm-desc">Home Office user with video script management capabilities</span></span>
          </label>
          <label class="create-user-role-item">
            <input type="checkbox" />
            <span class="perm-copy"><span class="perm-name">Financial Advisor Video</span><span class="perm-desc">User that can manage videos, update content and media associations</span></span>
          </label>
          <label class="create-user-role-item">
            <input type="checkbox" />
            <span class="perm-copy"><span class="perm-name">gdf</span><span class="perm-desc">Sample role for parity prototype coverage</span></span>
          </label>
        </div>
      </section>

      <div class="role-form-actions">
        <button type="button" class="page-btn" id="cancelCreateUserBtn">Cancel</button>
        <button type="button" class="page-btn primary">Create User</button>
      </div>
    `;

    const back = () => {
      state.mode = 'list';
      state.activeTab = 'Users';
      renderUsersView();
    };

    container.querySelector('#backToUsers')?.addEventListener('click', (e) => {
      e.preventDefault();
      back();
    });

    container.querySelector('#cancelCreateUserBtn')?.addEventListener('click', back);
  }

  function renderRoleList(container) {
    const data = getData();
    const cards = data.rolePresets
      .map((role, idx) => {
        const sample = (role.permissions || []).slice(0, 8).join(', ');
        const overflow = (role.permissions || []).length > 8 ? `, +${(role.permissions || []).length - 8} more` : '';
        return `
          <article class="role-card" data-role-index="${idx}">
            <div class="role-card-main">
              <div class="role-title-row">
                <h3>${esc(role.title)}</h3>
                ${staffRoles.has(role.title || role.name) ? '<span class="staff-flag">Staff Role</span>' : ''}
              </div>
              <p><strong>Description:</strong> ${esc(humanRoleDescription(role))}</p>
              <p><strong>Permissions:</strong> ${esc(sample + overflow)}</p>
            </div>
            <button class="role-edit-btn" type="button" aria-label="Edit ${esc(role.title)}" data-edit-role="${idx}">✎</button>
          </article>
        `;
      })
      .join('');

    container.innerHTML = `
      <div class="users-header-row"><h1 class="page-title">Roles & Permissions</h1></div>
      ${renderUsersSubnav()}
      <section class="roles-panel">
        <h2 class="roles-panel-title">BW Shell Roles</h2>
        <div class="role-card-list">${cards}</div>
      </section>
    `;

    wireUsersSubnav(container);

    container.querySelector('#newRoleBtn')?.addEventListener('click', () => {
      state.mode = 'create-role';
      state.editingRole = null;
      state.selectedPermissions = new Set();
      state.baselinePermissions = new Set();
      state.activePermissionCategory = getData().categories[0]?.name || 'Account';
      state.permissionSearch = '';
      renderUsersView();
    });

    container.querySelectorAll('[data-edit-role]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.getAttribute('data-edit-role'));
        const role = data.rolePresets[idx];
        state.mode = 'create-role';
        state.editingRole = role;
        state.selectedPermissions = new Set(role.permissions || []);
        state.baselinePermissions = new Set(role.permissions || []);
        state.activePermissionCategory = getData().categories[0]?.name || 'Account';
        state.permissionSearch = '';
        renderUsersView();
      });
    });
  }

  function renderGroupsPlaceholder(container) {
    const rows = groupsRows
      .map((row) => `
        <tr>
          <td>${esc(row.accountName)}</td>
          <td>${esc(row.groupName)}</td>
          <td><a class="account-link" href="#">${row.members}</a></td>
          <td class="group-actions-cell">
            <button class="row-action-button" aria-label="Edit group">✎</button>
            <button class="row-action-button" aria-label="Add member">◔</button>
            <button class="row-action-button" aria-label="Delete group">🗑</button>
          </td>
        </tr>
      `)
      .join('');

    container.innerHTML = `
      <div class="users-breadcrumb"><a href="#">Users</a> <span>›</span> <span>Groups</span></div>
      <div class="users-header-row"><h1 class="page-title">Group Management</h1></div>
      ${renderUsersSubnav()}

      <div class="accounts-toolbar">
        <div class="accounts-filter-group">
          <label>Account Name</label>
          <div class="accounts-filter-row">
            <div class="select-like-wrap"><select class="text-input select-like"><option>Search by account</option></select></div>
            <div class="search-like-wrap"><input class="text-input" type="text" placeholder="Search by group name" /><span class="search-icon">⌕</span></div>
          </div>
        </div>
      </div>

      <div class="table-wrap users-table-wrap">
        <table class="users-table groups-table">
          <thead>
            <tr>
              <th>Account Name</th>
              <th>Group Name</th>
              <th>Group Members</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;

    wireUsersSubnav(container);
  }

  function renderCreateRole(container) {
    const data = getData();
    const role = state.editingRole;
    const categories = data.categories || [];
    const activeCategory = categories.find((c) => c.name === state.activePermissionCategory) || categories[0] || { name: 'Account', permissions: [] };

    const categoryNav = categories.map((category) => `<button class="perm-category-nav-item ${state.activePermissionCategory === category.name ? 'active' : ''}" type="button" data-perm-nav="${esc(category.name)}">${esc(category.name)}</button>`).join('');
    const query = state.permissionSearch.trim().toLowerCase();
    const visiblePerms = (activeCategory.permissions || []).filter((perm) => !query || perm.name.toLowerCase().includes(query) || (perm.description || '').toLowerCase().includes(query));
    const permRows = visiblePerms.map((perm) => `
      <label class="perm-row">
        <input type="checkbox" class="perm-checkbox" data-perm="${esc(perm.name)}" ${state.selectedPermissions.has(perm.name) ? 'checked' : ''} />
        <span class="perm-copy"><span class="perm-name">${esc(perm.name)}</span><span class="perm-desc">${esc(perm.description || '')}</span></span>
      </label>
    `).join('');

    const added = [...state.selectedPermissions].filter((p) => !state.baselinePermissions.has(p)).length;
    const removed = [...state.baselinePermissions].filter((p) => !state.selectedPermissions.has(p)).length;

    container.innerHTML = `
      <div class="users-breadcrumb"><a href="#">Users</a> <span>›</span> <a href="#" id="backToRoles">Roles</a> <span>›</span> <span>${role ? 'Edit Role' : 'Create Role'}</span></div>
      <div class="users-header-row users-header-spaced"><h1 class="page-title">${role ? 'Edit Role' : 'New Role'}</h1></div>
      <section class="create-role-layout">
        <div class="role-form-col">
          <h2>Role Details</h2>
          <label>BAS Staff<span class="required">*</span></label>
          <div class="radio-row"><label><input name="basStaff" type="radio" checked /> Yes</label><label><input name="basStaff" type="radio" /> No</label></div>
          <label for="roleTitle">Role Title<span class="required">*</span></label>
          <input id="roleTitle" class="text-input" type="text" value="${esc(role?.title || '')}" placeholder="Enter role title" />
          <label for="roleDescription">Description<span class="required">*</span></label>
          <textarea id="roleDescription" class="text-area" placeholder="What is the role used for?">${esc(role?.description || '')}</textarea>
          <div class="role-form-actions"><button type="button" class="page-btn" id="cancelRoleBtn">Cancel</button></div>
        </div>
        <div class="role-perms-col">
          <div class="role-perms-header-row"><h2>Permissions<span class="required">*</span></h2><p class="perm-selection-summary"><strong>${state.selectedPermissions.size}</strong> permissions selected</p></div>
          ${state.editingRole ? `<div class="perm-diff-summary"><span>Changes in this edit:</span><span class="diff-added">+${added} added</span><span class="diff-removed">-${removed} removed</span></div>` : ''}
          <div class="permissions-workbench">
            <div class="permissions-sidebar">${categoryNav}</div>
            <div class="permissions-main">
              <input id="permissionSearchInput" class="text-input" type="search" value="${esc(state.permissionSearch)}" placeholder="Search permissions in ${esc(activeCategory.name)}" />
              <div class="perm-accordion">
                <section class="perm-category" data-category="${esc(activeCategory.name)}">
                  <div class="perm-category-header static"><span>${esc(activeCategory.name)}</span></div>
                  <div class="perm-category-body open">
                    <label class="perm-row select-all"><input type="checkbox" class="perm-select-all" data-select-all="${esc(activeCategory.name)}" /><span class="perm-copy"><span class="perm-name">Select All</span></span></label>
                    ${permRows || '<div class="perm-empty">No permissions match your search in this module.</div>'}
                  </div>
                </section>
              </div>
            </div>
            <aside class="impact-preview"><h3>Role Impact Preview</h3><p><strong>${state.selectedPermissions.size}</strong> permissions selected.</p></aside>
          </div>
          <div class="role-form-actions"><button type="button" class="page-btn" id="cancelRoleBtn2">Cancel</button><button type="button" class="page-btn primary" id="saveRoleBtn">Save Role</button></div>
        </div>
      </section>
    `;

    container.querySelector('#backToRoles')?.addEventListener('click', (e) => {
      e.preventDefault();
      state.mode = 'list';
      state.activeTab = 'Manage Roles';
      renderUsersView();
    });

    container.querySelectorAll('#cancelRoleBtn,#cancelRoleBtn2').forEach((btn) => btn.addEventListener('click', () => {
      state.mode = 'list';
      state.activeTab = 'Manage Roles';
      renderUsersView();
    }));

    container.querySelectorAll('[data-perm-nav]').forEach((btn) => btn.addEventListener('click', () => {
      state.activePermissionCategory = btn.getAttribute('data-perm-nav');
      renderUsersView();
    }));

    container.querySelector('#permissionSearchInput')?.addEventListener('input', (e) => {
      state.permissionSearch = e.target.value || '';
      renderUsersView();
    });

    container.querySelectorAll('.perm-checkbox').forEach((input) => input.addEventListener('change', () => {
      const p = input.getAttribute('data-perm');
      if (input.checked) state.selectedPermissions.add(p);
      else state.selectedPermissions.delete(p);
      renderUsersView();
    }));

    container.querySelectorAll('.perm-select-all').forEach((input) => input.addEventListener('change', () => {
      const categoryName = input.getAttribute('data-select-all');
      const category = getData().categories.find((c) => c.name === categoryName);
      if (!category) return;
      category.permissions.forEach((perm) => {
        if (input.checked) state.selectedPermissions.add(perm.name);
        else state.selectedPermissions.delete(perm.name);
      });
      renderUsersView();
    }));

    container.querySelector('#saveRoleBtn')?.addEventListener('click', () => {
      const roleTitle = container.querySelector('#roleTitle')?.value.trim();
      const roleDesc = container.querySelector('#roleDescription')?.value.trim();
      if (!roleTitle) return alert('Role Title is required.');
      if (state.selectedPermissions.size === 0) return alert('Select at least one permission.');

      const payload = { name: roleTitle, title: roleTitle, description: roleDesc || 'Role created in prototype UI.', permissions: [...state.selectedPermissions] };
      const roleData = getData();
      if (state.editingRole) {
        const idx = roleData.rolePresets.findIndex((r) => r.name === state.editingRole.name);
        if (idx >= 0) roleData.rolePresets[idx] = payload;
      } else {
        roleData.rolePresets.unshift(payload);
      }
      state.mode = 'list';
      state.activeTab = 'Manage Roles';
      state.editingRole = null;
      renderUsersView();
    });
  }

  window.renderUsersView = function renderUsersView() {
    const container = document.getElementById('pageContainer');
    if (!container) return;

    if (state.mode === 'create-role') {
      renderCreateRole(container);
      return;
    }

    if (state.mode === 'create-user') {
      renderCreateUser(container);
      return;
    }

    if (state.activeTab === 'Manage Roles') {
      renderRoleList(container);
      return;
    }

    if (state.activeTab === 'Groups') {
      renderGroupsPlaceholder(container);
      return;
    }

    renderUsersTable(container);
  };
})();
