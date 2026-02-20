// Roles & Permissions Users module view
(function () {
  const state = {
    mode: 'list', // list | create
    editingRole: null,
    selectedPermissions: new Set(),
    openCategories: new Set(['Account'])
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
      state.openCategories = new Set(['Account']);
      renderUsersView();
    });

    container.querySelectorAll('[data-edit-role]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.getAttribute('data-edit-role'));
        const role = data.rolePresets[idx];
        state.mode = 'create';
        state.editingRole = role;
        state.selectedPermissions = new Set(role.permissions);
        state.openCategories = new Set([data.categories[0]?.name || 'Account']);
        renderUsersView();
      });
    });
  }

  function renderPermissionsAccordion() {
    const data = getData();
    return data.categories
      .map((category, idx) => {
        const isOpen = state.openCategories.has(category.name);
        const perms = category.permissions
          .map((perm) => {
            const checked = state.selectedPermissions.has(perm.name) ? 'checked' : '';
            return `
              <label class="perm-row">
                <input type="checkbox" class="perm-checkbox" data-perm="${esc(perm.name)}" ${checked} />
                <span>${esc(perm.name)}</span>
              </label>
            `;
          })
          .join('');

        return `
          <section class="perm-category" data-category="${esc(category.name)}">
            <button type="button" class="perm-category-header" data-toggle-category="${esc(category.name)}">
              <span>${esc(category.name)}</span>
              <span>${isOpen ? '⌄' : '›'}</span>
            </button>
            <div class="perm-category-body ${isOpen ? 'open' : ''}">
              <label class="perm-row select-all">
                <input type="checkbox" class="perm-select-all" data-select-all="${esc(category.name)}" />
                <span>Select All</span>
              </label>
              ${perms}
            </div>
          </section>
        `;
      })
      .join('');
  }

  function wireCreateEvents(container) {
    container.querySelector('#cancelRoleBtn')?.addEventListener('click', () => {
      state.mode = 'list';
      renderUsersView();
    });

    container.querySelectorAll('[data-toggle-category]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const c = btn.getAttribute('data-toggle-category');
        if (state.openCategories.has(c)) state.openCategories.delete(c);
        else state.openCategories.add(c);
        renderUsersView();
      });
    });

    container.querySelectorAll('.perm-checkbox').forEach((input) => {
      input.addEventListener('change', () => {
        const p = input.getAttribute('data-perm');
        if (input.checked) state.selectedPermissions.add(p);
        else state.selectedPermissions.delete(p);
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
    container.innerHTML = `
      <div class="users-breadcrumb"><a href="#">Users</a> <span>›</span> <a href="#" id="backToRoles">Roles</a> <span>›</span> <span>${role ? 'Edit Role' : 'Create Role'}</span></div>
      <div class="users-header-row users-header-spaced"><h1 class="page-title">${role ? 'Edit Role' : 'New Role'}</h1></div>
      <section class="create-role-layout">
        <div class="role-form-col">
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
            <button type="button" class="page-btn" id="cancelRoleBtn">Cancel</button>
            <button type="button" class="page-btn primary" id="saveRoleBtn">Save Role</button>
          </div>
        </div>
        <div class="role-perms-col">
          <h2>Permissions<span class="required">*</span></h2>
          <div class="perm-accordion">${renderPermissionsAccordion()}</div>
        </div>
      </section>
    `;


    container.querySelector('#backToRoles')?.addEventListener('click', (e) => {
      e.preventDefault();
      state.mode = 'list';
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
