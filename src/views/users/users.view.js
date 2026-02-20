// Roles & Permissions Users module view
(function () {
  const state = {
    mode: 'list', // list | create
    editingRole: null,
    selectedPermissions: new Set(),
    baselinePermissions: new Set(),
    activePermissionCategory: 'Account',
    permissionSearch: ''
  };

  const getData = () => window.rolePermissionData || { roles: [], categories: [], rolePresets: [] };

  function esc(text) {
    return String(text || '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  const staffRoles = new Set(['Super Admin', 'Development', 'Service', 'Sales']);

  function isStaffRole(role) {
    const name = (role?.title || role?.name || '').trim();
    return staffRoles.has(name);
  }

  function humanRoleDescription(role) {
    const perms = role.permissions || [];
    const has = (token) => perms.some((p) => p.toLowerCase().includes(token));

    const canManageUsers = has('create a new user') || has('update user details') || has('disable a user');
    const canManageAccounts = has('create a new account') || has('update an account') || has('delete an account');
    const canManageCompliance = has('compliance') || has('workflow');
    const canManageBilling = has('billing') || has('subscription');
    const canManageRoles = has('create roles') || has('edit roles') || has('delete roles');

    if (canManageAccounts && canManageUsers && canManageCompliance && canManageRoles) {
      return 'Full-spectrum operational role with account administration, user controls, compliance workflow management, and role governance.';
    }
    if (canManageAccounts && canManageUsers && canManageRoles) {
      return 'Operations-focused role for managing accounts, user lifecycle actions, and role assignments across the platform.';
    }
    if (canManageCompliance) {
      return 'Compliance-focused role for monitoring review queues, workflows, and policy-driven approval operations.';
    }
    if (canManageUsers) {
      return 'User management role for onboarding, maintaining, and supporting users with controlled access operations.';
    }
    if (canManageBilling) {
      return 'Commercial operations role for handling billing visibility and subscription-related account updates.';
    }
    return 'Business support role with scoped permissions for daily platform operations.';
  }

  function roleSummary(role) {
    const sample = role.permissions.slice(0, 8).join(', ');
    const overflow = role.permissions.length > 8 ? `, +${role.permissions.length - 8} more` : '';
    return `${sample}${overflow}`;
  }

  function renderRoleList(container) {
    const data = getData();
    const cards = data.rolePresets
      .map(
        (role, idx) => `
        <article class="role-card" data-role-index="${idx}">
          <div class="role-card-main">
            <div class="role-title-row">
              <h3>${esc(role.title)}</h3>
              ${isStaffRole(role) ? '<span class="staff-flag">Staff Role</span>' : ''}
            </div>
            <p><strong>Description:</strong> ${esc(humanRoleDescription(role))}</p>
            <p><strong>Permissions:</strong> ${esc(roleSummary(role))}</p>
          </div>
          <button class="role-edit-btn" type="button" aria-label="Edit ${esc(role.title)}" data-edit-role="${idx}">✎</button>
        </article>
      `
      )
      .join('');

    container.innerHTML = `
      <div class="users-header-row">
        <h1 class="page-title">Roles & Permissions</h1>
      </div>
      <div class="users-subnav">
        <button class="users-subnav-item" type="button">Users</button>
        <button class="users-subnav-item active" type="button">Manage Roles</button>
        <button class="users-subnav-item" type="button">Groups</button>
        <button class="new-role-btn" id="newRoleBtn" type="button">New Role</button>
      </div>
      <section class="roles-panel">
        <h2 class="roles-panel-title">BW Shell Roles</h2>
        <div class="role-card-list">${cards}</div>
      </section>
    `;

    container.querySelector('#newRoleBtn')?.addEventListener('click', () => {
      state.mode = 'create';
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
        state.mode = 'create';
          state.editingRole = role;
        state.selectedPermissions = new Set(role.permissions);
        state.baselinePermissions = new Set(role.permissions);
        state.activePermissionCategory = getData().categories[0]?.name || 'Account';
        state.permissionSearch = '';
        renderUsersView();
      });
    });
  }

  function renderPermissionCategoryNav(categories) {
    return categories
      .map(
        (category) => `
          <button class="perm-category-nav-item ${state.activePermissionCategory === category.name ? 'active' : ''}" type="button" data-perm-nav="${esc(category.name)}">
            ${esc(category.name)}
          </button>
        `
      )
      .join('');
  }

  function renderPermissionRows(category) {
    const query = state.permissionSearch.trim().toLowerCase();
    const filtered = category.permissions.filter((perm) => {
      if (!query) return true;
      return (
        perm.name.toLowerCase().includes(query) ||
        (perm.description || '').toLowerCase().includes(query)
      );
    });

    const rows = filtered
      .map((perm) => {
        const checked = state.selectedPermissions.has(perm.name) ? 'checked' : '';
        return `
          <label class="perm-row">
            <input type="checkbox" class="perm-checkbox" data-perm="${esc(perm.name)}" ${checked} />
            <span class="perm-copy">
              <span class="perm-name">${esc(perm.name)}</span>
              <span class="perm-desc">${esc(perm.description || '')}</span>
            </span>
          </label>
        `;
      })
      .join('');

    return filtered.length
      ? rows
      : '<div class="perm-empty">No permissions match your search in this module.</div>';
  }

  function renderImpactPreview() {
    const selected = [...state.selectedPermissions];
    const has = (token) => selected.some((p) => p.toLowerCase().includes(token));
    const modules = new Set();
    const data = getData();
    data.categories.forEach((category) => {
      if (category.permissions.some((p) => state.selectedPermissions.has(p.name))) {
        modules.add(category.name);
      }
    });

    const capabilities = [];
    if (has('create a new account') || has('update an account')) capabilities.push('Account administration');
    if (has('create a new user') || has('disable a user')) capabilities.push('User lifecycle control');
    if (has('workflow') || has('compliance')) capabilities.push('Compliance operations');
    if (has('billing') || has('subscription')) capabilities.push('Billing and subscription access');
    if (has('create roles') || has('edit roles') || has('delete roles')) capabilities.push('Role governance');

    const highRisk = selected.filter((p) => /delete|revoke|disable/i.test(p));

    return `
      <aside class="impact-preview">
        <h3>Role Impact Preview</h3>
        <p><strong>${selected.length}</strong> permissions selected across <strong>${modules.size}</strong> modules.</p>
        <p><strong>Capabilities:</strong> ${capabilities.length ? esc(capabilities.join(', ')) : 'Basic access scope only.'}</p>
        <p><strong>High-risk actions:</strong> ${highRisk.length ? esc(highRisk.slice(0, 4).join(', ')) + (highRisk.length > 4 ? `, +${highRisk.length - 4} more` : '') : 'None detected'}</p>
      </aside>
    `;
  }

  function renderDiffSummary() {
    if (!state.editingRole) return '';
    const added = [...state.selectedPermissions].filter((p) => !state.baselinePermissions.has(p));
    const removed = [...state.baselinePermissions].filter((p) => !state.selectedPermissions.has(p));

    return `
      <div class="perm-diff-summary">
        <span>Changes in this edit:</span>
        <span class="diff-added">+${added.length} added</span>
        <span class="diff-removed">-${removed.length} removed</span>
      </div>
    `;
  }

  function wireCreateEvents(container) {
    container.querySelectorAll('#cancelRoleBtnDetails, #cancelRoleBtnPermissions').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.mode = 'list';
        renderUsersView();
      });
    });

    container.querySelector('#backToDetailsBtn')?.addEventListener('click', () => {
      renderUsersView();
    });

    container.querySelectorAll('[data-perm-nav]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.activePermissionCategory = btn.getAttribute('data-perm-nav');
        renderUsersView();
      });
    });

    container.querySelector('#permissionSearchInput')?.addEventListener('input', (e) => {
      state.permissionSearch = e.target.value || '';
      renderUsersView();
    });

    container.querySelectorAll('.perm-checkbox').forEach((input) => {
      input.addEventListener('change', () => {
        const p = input.getAttribute('data-perm');
        if (input.checked) state.selectedPermissions.add(p);
        else state.selectedPermissions.delete(p);
        renderUsersView();
      });
    });

    container.querySelectorAll('.perm-select-all').forEach((input) => {
      input.addEventListener('change', () => {
        const categoryName = input.getAttribute('data-select-all');
        const category = getData().categories.find((c) => c.name === categoryName);
        if (!category) return;
        category.permissions.forEach((perm) => {
          if (input.checked) state.selectedPermissions.add(perm.name);
          else state.selectedPermissions.delete(perm.name);
        });
        renderUsersView();
      });
    });

    container.querySelector('#saveRoleBtn')?.addEventListener('click', () => {
      const roleTitle = container.querySelector('#roleTitle')?.value.trim();
      const roleDesc = container.querySelector('#roleDescription')?.value.trim();
      if (!roleTitle) {
        alert('Role Title is required.');
        return;
      }
      if (state.selectedPermissions.size === 0) {
        alert('Select at least one permission.');
        return;
      }

      const data = getData();
      const payload = {
        name: roleTitle,
        title: roleTitle,
        description: roleDesc || 'Role created in prototype UI.',
        permissions: [...state.selectedPermissions]
      };

      if (state.editingRole) {
        const idx = data.rolePresets.findIndex((r) => r.name === state.editingRole.name);
        if (idx >= 0) data.rolePresets[idx] = payload;
      } else {
        data.rolePresets.unshift(payload);
      }

      state.mode = 'list';
      state.editingRole = null;
      renderUsersView();
    });
  }

  function renderCreateRole(container) {
    const role = state.editingRole;
    const categories = getData().categories;
    const activeCategory = categories.find((c) => c.name === state.activePermissionCategory) || categories[0] || { name: 'Account', permissions: [] };

    container.innerHTML = `
      <div class="users-breadcrumb"><a href="#">Users</a> <span>›</span> <a href="#" id="backToRoles">Roles</a> <span>›</span> <span>${role ? 'Edit Role' : 'Create Role'}</span></div>
      <div class="users-header-row users-header-spaced"><h1 class="page-title">${role ? 'Edit Role' : 'New Role'}</h1></div>
      <section class="create-role-layout">
        <div class="role-form-col ${state.step === 1 ? '' : 'is-hidden'}">
          <h2>Role Details</h2>
          <label>BAS Staff<span class="required">*</span></label>
          <div class="radio-row">
            <label><input name="basStaff" type="radio" checked /> Yes</label>
            <label><input name="basStaff" type="radio" /> No</label>
          </div>
          <label for="roleTitle">Role Title<span class="required">*</span></label>
          <input id="roleTitle" class="text-input" type="text" value="${esc(role?.title || '')}" placeholder="Enter role title" />
          <label for="roleDescription">Description<span class="required">*</span></label>
          <textarea id="roleDescription" class="text-area" placeholder="What is the role used for?">${esc(role?.description || '')}</textarea>
          <div class="role-form-actions">
            <button type="button" class="page-btn" id="cancelRoleBtnDetails">Cancel</button>
          </div>
        </div>

        <div class="role-perms-col ${state.step === 2 ? '' : 'is-hidden'}">
          <div class="role-perms-header-row">
            <h2>Permissions<span class="required">*</span></h2>
            <p class="perm-selection-summary"><strong>${state.selectedPermissions.size}</strong> permissions selected</p>
          </div>

          ${renderDiffSummary()}

          <div class="permissions-workbench">
            <div class="permissions-sidebar">
              ${renderPermissionCategoryNav(categories)}
            </div>
            <div class="permissions-main">
              <input id="permissionSearchInput" class="text-input" type="search" value="${esc(state.permissionSearch)}" placeholder="Search permissions in ${esc(activeCategory.name)}" />
              <div class="perm-accordion">
                <section class="perm-category" data-category="${esc(activeCategory.name)}">
                  <div class="perm-category-header static">
                    <span>${esc(activeCategory.name)}</span>
                  </div>
                  <div class="perm-category-body open">
                    <label class="perm-row select-all">
                      <input type="checkbox" class="perm-select-all" data-select-all="${esc(activeCategory.name)}" />
                      <span class="perm-copy"><span class="perm-name">Select All</span></span>
                    </label>
                    ${renderPermissionRows(activeCategory)}
                  </div>
                </section>
              </div>
            </div>
            ${renderImpactPreview()}
          </div>

          <div class="role-form-actions">
            <button type="button" class="page-btn" id="cancelRoleBtnPermissions">Cancel</button>
            <button type="button" class="page-btn primary" id="saveRoleBtn">Save Role</button>
          </div>
        </div>
      </section>
    `;

    container.querySelector('#backToRoles')?.addEventListener('click', (e) => {
      e.preventDefault();
      state.mode = 'list';
      renderUsersView();
    });

    container.querySelector('#stepDetailsBtn')?.addEventListener('click', () => {
      renderUsersView();
    });

    wireCreateEvents(container);
  }

  window.renderUsersView = function renderUsersView() {
    const container = document.getElementById('pageContainer');
    if (!container) return;
    if (state.mode === 'create') renderCreateRole(container);
    else renderRoleList(container);
  };
})();
