// PR5: centralized UI state store (global runtime compatibility, no build step).

window.bwShellStore = {
  state: {
    activePage: 'Accounts',
    userMenuOpen: false,
    compliance: {
      activeTab: typeof defaultComplianceTab !== 'undefined' ? defaultComplianceTab : 'Archive'
    },
    adminTools: {
      activeTab: typeof defaultAdminToolsTab !== 'undefined' ? defaultAdminToolsTab : 'BAS Roles'
    }
  },
  set(partial) {
    this.state = { ...this.state, ...partial };
    return this.state;
  }
};
