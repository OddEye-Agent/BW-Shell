export const adminToolsTabs = ['BAS Roles', 'BAS Users', 'BAS Accounts', 'Wix Websites', 'Wix Roles', 'Wix Folders', 'Calculators'];

export const basRolesRows = [
  { roleName: 'Financial Advisor', roleKey: 'FIN_ADVISOR', usersAssigned: 22, updatedOn: '2026-02-08' },
  { roleName: 'Staff Admin', roleKey: 'STAFF_ADMIN', usersAssigned: 8, updatedOn: '2026-02-07' },
  { roleName: 'Compliance Reviewer', roleKey: 'COMPLIANCE_REVIEW', usersAssigned: 15, updatedOn: '2026-02-05' },
  { roleName: 'Developer', roleKey: 'DEVELOPER', usersAssigned: 31, updatedOn: '2026-02-01' }
];

export const basUsersRows = [
  { userId: 'usr-10012', name: 'Talia Morrow', email: 'talia.morrow+qa@internal.local', role: 'Staff Admin', accountId: 'BAS-ACCT-4421', environment: 'QA', state: 'Active' },
  { userId: 'usr-10041', name: 'Jesse Patel', email: 'jesse.patel+dev@internal.local', role: 'Developer', accountId: 'BAS-ACCT-1180', environment: 'DEV', state: 'Disabled' },
  { userId: 'usr-10103', name: 'Morgan Ellis', email: 'morgan.ellis+uat@internal.local', role: 'Compliance Reviewer', accountId: 'BAS-ACCT-9008', environment: 'UAT', state: 'Disabled' },
  { userId: 'usr-10155', name: 'Nora Castillo', email: 'nora.castillo+qa@internal.local', role: 'Program Admin', accountId: 'BAS-ACCT-7774', environment: 'QA', state: 'Active' }
];

export const basAccountsRows = [
  { accountId: 'BAS-ACCT-4421', accountName: 'Northwind QA Sandbox', owner: 'Identity Ops', linkedUsers: 14, environment: 'QA', health: 'Healthy', updatedOn: '2026-02-07' },
  { accountId: 'BAS-ACCT-1180', accountName: 'Blue Harbor Dev Seed', owner: 'Automation Team', linkedUsers: 7, environment: 'DEV', health: 'Needs Cleanup', updatedOn: '2026-02-03' },
  { accountId: 'BAS-ACCT-9008', accountName: 'Evergreen UAT Replay', owner: 'Support Tools', linkedUsers: 2, environment: 'UAT', health: 'Archived', updatedOn: '2026-01-28' },
  { accountId: 'BAS-ACCT-7774', accountName: 'Summit Regression QA', owner: 'QA Automation', linkedUsers: 19, environment: 'QA', health: 'Needs Cleanup', updatedOn: '2026-02-05' }
];

export const wixWebsitesRows = [
  { name: 'west-coast-primary', displayName: 'West Coast Primary', published: 'Yes', isPremium: 'Yes', blocked: 'No', editorType: 'Studio', ownerAccountId: 'A7H29K...' },
  { name: 'east-hub-site', displayName: 'East Hub Website', published: 'No', isPremium: 'No', blocked: 'No', editorType: 'Editor', ownerAccountId: 'D2M67R...' },
  { name: 'midwest-service-portal', displayName: 'Midwest Service Portal', published: 'Yes', isPremium: 'Yes', blocked: 'Yes', editorType: 'Studio', ownerAccountId: 'H4P39V...' }
];

export const wixRolesPredefined = [
  { roleName: 'Owner', permissions: 'No Restrictions' },
  { roleName: 'Account Admin', permissions: 'Account' },
  { roleName: 'Website Manager', permissions: 'Site' }
];

export const wixRolesCustom = [
  { roleName: 'Financial Advisor', permissions: 'Site' },
  { roleName: 'Program Admin', permissions: 'Account' },
  { roleName: 'Marketing Support', permissions: 'Site' }
];

export const wixFoldersRows = [
  { folderName: 'BAS Marketing', path: '\\BAS Marketing', siteCount: 14 },
  { folderName: 'Enterprise Demo Sites', path: '\\Enterprise Demo Sites', siteCount: 8 },
  { folderName: 'CFP Websites', path: '\\CFP Websites', siteCount: 31 }
];

export const calculatorsRows = [
  { status: 'Deployed', description: 'Annuity Calculator', publishDate: '2026-02-05', expiryDate: '2026-03-10' },
  { status: 'Redeployed', description: 'Mortgage Calculator', publishDate: '2026-02-06', expiryDate: '2026-03-11' },
  { status: 'Deployed', description: 'Tax Calculator', publishDate: '2026-02-08', expiryDate: '2026-03-14' }
];
