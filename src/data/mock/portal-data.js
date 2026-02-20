// PR3: extracted mock data/constants from index.html

const accountRows = [
      {
        accountName: 'Northwind Retail Group',
        parentAccount: 'Global Commerce Holdings',
        subAccounts: 4,
        userCount: 58,
        ownerEmail: 'owner@northwind.com',
        createdOn: '2024-01-17'
      },
      {
        accountName: 'Summit Health Partners',
        parentAccount: 'Summit Enterprises',
        subAccounts: 2,
        userCount: 31,
        ownerEmail: 'admin@summithealth.com',
        createdOn: '2023-09-05'
      },
      {
        accountName: 'Blue Harbor Logistics',
        parentAccount: 'Blue Harbor Group',
        subAccounts: 7,
        userCount: 102,
        ownerEmail: 'ops@blueharbor.io',
        createdOn: '2022-11-28'
      },
      {
        accountName: 'Evergreen Academy',
        parentAccount: 'Evergreen Education Network',
        subAccounts: 3,
        userCount: 44,
        ownerEmail: 'support@evergreenacademy.edu',
        createdOn: '2024-04-10'
      }
    ];

    const placeholderSections = {
      Users: [
        ['User Directory', 'Browse users, roles, and status snapshots.'],
        ['Access Requests', 'Pending approvals for user permissions.'],
        ['Audit Trail', 'User login and privilege activity.']
      ],
      Content: [
        ['Publishing Queue', 'Track drafts, approvals, and publish states.'],
        ['Asset Library', 'Manage reusable media and documents.'],
        ['Editorial Notes', 'Capture collaboration notes and next steps.']
      ],
      Websites: [
        ['Site Health', 'Uptime and environment status indicators.'],
        ['Release History', 'Recent deployments and rollback options.'],
        ['Domain Settings', 'Placeholder controls for DNS and routing.']
      ],
      Locator: [
        ['Region Filters', 'Prototype controls to narrow location data.'],
        ['Map Panel', 'Reserved area for map visualization.'],
        ['Location Table', 'List of managed locations and tags.']
      ],
      Video: [
        ['Upload Queue', 'Monitor incoming video processing jobs.'],
        ['Channel Configuration', 'Manage playback targets and metadata.'],
        ['Compliance Checks', 'Track review status and quality gates.']
      ],
      'Admin Tools': [
        ['System Settings', 'Centralized admin-level configuration options.'],
        ['Job Scheduler', 'Control recurring maintenance automation.'],
        ['Permissions Matrix', 'Visualize and tune role-based access.']
      ]
    };



    const pageHeaderTitles = {
      Accounts: 'Account Management',
      Users: 'User Management',
      Compliance: 'Compliance',
      Content: 'Content Management',
      Websites: 'Website Management',
      Locator: 'Locator',
      Video: 'Video',
      'Admin Tools': 'Admin Tools'
    };

    const complianceTabs = [
      {
        name: 'Workflows',
        description: 'Review and configure compliance workflows for onboarding and policy checks.'
      },
      {
        name: 'Compliance Queue',
        description: 'Track pending compliance reviews, status updates, and assigned owners.'
      },
      {
        name: 'Advisor Queue',
        description: 'Monitor advisor requests requiring guidance, remediation, or escalation.'
      },
      {
        name: 'Archive',
        description: 'Access historical compliance records, completed tasks, and audit references.'
      }
    ];

    const defaultComplianceTab = 'Archive';
    const adminToolsEditRows = {};

    const adminToolsTabs = [
      {
        name: 'BAS Roles',
        description: 'Manage BAS role records for lower-environment testing and quick permission cleanup.',
        searchPlaceholder: 'Search role name or description',
        searchFields: ['roleName', 'description'],
        filters: [
          {
            id: 'assignmentBand',
            label: 'Users Assigned',
            allLabel: 'All assignment counts',
            options: ['0-10', '11-25', '26+']
          }
        ],
        columns: [
          { key: 'roleName', label: 'Role Name' },
          { key: 'description', label: 'Description', width: '32%' },
          { key: 'usersAssigned', label: 'Users Assigned' },
          { key: 'updatedOn', label: 'Updated On' }
        ],
        rows: [
          { roleName: 'Financial Advisor', roleKey: 'FIN_ADVISOR', description: 'Advisory workspace access for portfolio planning and client actions.', usersAssigned: 22, assignmentBand: '11-25', updatedOn: '2026-02-08' },
          { roleName: 'Staff Admin', roleKey: 'STAFF_ADMIN', description: 'Internal staff administration access for lower-environment data maintenance.', usersAssigned: 8, assignmentBand: '0-10', updatedOn: '2026-02-07' },
          { roleName: 'Compliance Reviewer', roleKey: 'COMPLIANCE_REVIEW', description: 'Can review queued compliance artifacts and submit approval decisions.', usersAssigned: 15, assignmentBand: '11-25', updatedOn: '2026-02-05' },
          { roleName: 'Compliance Admin', roleKey: 'COMPLIANCE_ADMIN', description: 'Manages compliance configuration, escalations, and remediation routing.', usersAssigned: 6, assignmentBand: '0-10', updatedOn: '2026-02-04' },
          { roleName: 'Program Admin', roleKey: 'PROGRAM_ADMIN', description: 'Configures program-level metadata and onboarding defaults for testing.', usersAssigned: 12, assignmentBand: '11-25', updatedOn: '2026-02-03' },
          { roleName: 'Developer', roleKey: 'DEVELOPER', description: 'Engineering access for integration validation and sandbox troubleshooting.', usersAssigned: 31, assignmentBand: '26+', updatedOn: '2026-02-01' }
        ]
      },
      {
        name: 'BAS Users',
        description: 'Find and clean up BAS user test records, role assignments, and account links quickly.',
        searchPlaceholder: 'Search email, user id, or name',
        searchFields: ['userId', 'name', 'email'],
        filters: [
          {
            id: 'environment',
            label: 'Environment',
            allLabel: 'All environments',
            options: ['DEV', 'QA', 'UAT']
          },
          {
            id: 'state',
            label: 'Status',
            allLabel: 'All statuses',
            options: ['Active', 'Disabled']
          }
        ],
        columns: [
          { key: 'userId', label: 'User ID' },
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'role', label: 'Roles' },
          { key: 'accountId', label: 'BAS Account ID' },
          { key: 'state', label: 'Status' }
        ],
        rows: [
          { userId: 'usr-10012', name: 'Talia Morrow', email: 'talia.morrow+qa@internal.local', role: 'Staff Admin', accountId: 'BAS-ACCT-4421', environment: 'QA', state: 'Active' },
          { userId: 'usr-10041', name: 'Jesse Patel', email: 'jesse.patel+dev@internal.local', role: 'Developer', accountId: 'BAS-ACCT-1180', environment: 'DEV', state: 'Disabled' },
          { userId: 'usr-10103', name: 'Morgan Ellis', email: 'morgan.ellis+uat@internal.local', role: 'Compliance Reviewer', accountId: 'BAS-ACCT-9008', environment: 'UAT', state: 'Disabled' },
          { userId: 'usr-10155', name: 'Nora Castillo', email: 'nora.castillo+qa@internal.local', role: 'Program Admin', accountId: 'BAS-ACCT-7774', environment: 'QA', state: 'Active' }
        ]
      },
      {
        name: 'BAS Accounts',
        description: 'Review and maintain BAS account test data used by staff across lower environments.',
        searchPlaceholder: 'Search account id, account name, or owner',
        searchFields: ['accountId', 'accountName', 'owner'],
        filters: [],
        columns: [
          { key: 'accountId', label: 'Account ID' },
          { key: 'accountName', label: 'Account Name' },
          { key: 'owner', label: 'Owner Email' },
          { key: 'linkedUsers', label: 'Users' },
          { key: 'updatedOn', label: 'Updated On' }
        ],
        rows: [
          { accountId: 'BAS-ACCT-4421', accountName: 'Northwind QA Sandbox', owner: 'identity.ops@bwshell.internal', linkedUsers: 14, updatedOn: '2026-02-07' },
          { accountId: 'BAS-ACCT-1180', accountName: 'Blue Harbor Dev Seed', owner: 'automation.team@bwshell.internal', linkedUsers: 7, updatedOn: '2026-02-03' },
          { accountId: 'BAS-ACCT-9008', accountName: 'Evergreen UAT Replay', owner: 'support.tools@bwshell.internal', linkedUsers: 2, updatedOn: '2026-01-28' },
          { accountId: 'BAS-ACCT-7774', accountName: 'Summit Regression QA', owner: 'qa.automation@bwshell.internal', linkedUsers: 19, updatedOn: '2026-02-05' }
        ]
      },
      {
        name: 'Wix Websites',
        description: 'Manage synced Wix websites and operational metadata.',
        enableCrud: false,
        searchPlaceholder: 'Search name, display name, owner account ID, or folder ID',
        searchFields: ['name', 'displayName', 'ownerAccountId', 'folderId', 'namespace'],
        filters: [
          {
            id: 'published',
            label: 'Published',
            allLabel: 'All publish states',
            options: ['Yes', 'No']
          },
          {
            id: 'isPremium',
            label: 'Is Premium',
            allLabel: 'All premium states',
            options: ['Yes', 'No']
          },
          {
            id: 'blocked',
            label: 'Blocked',
            allLabel: 'All block states',
            options: ['Yes', 'No']
          },
          {
            id: 'editorType',
            label: 'Editor Type',
            allLabel: 'All editor types',
            options: ['Studio', 'Editor']
          }
        ],
        columns: [
          { key: 'name', label: 'Name' },
          { key: 'displayName', label: 'Display Name' },
          { key: 'published', label: 'Published' },
          { key: 'dateCreated', label: 'Date Created' },
          { key: 'lastUpdate', label: 'Last Update' },
          { key: 'isPremium', label: 'Is Premium' },
          { key: 'viewUrl', label: 'View URL' },
          { key: 'blocked', label: 'Blocked' },
          { key: 'ownerAccountId', label: 'Owner Account ID' },
          { key: 'contributorAccountIds', label: 'Contributor Account IDs' },
          { key: 'folderId', label: 'Folder ID' },
          { key: 'editorType', label: 'Editor Type' },
          { key: 'namespace', label: 'Namespace' }
        ],
        rows: [
          { name: 'west-coast-primary', displayName: 'West Coast Primary', published: 'Yes', dateCreated: '2025-12-10', lastUpdate: '2026-02-08', isPremium: 'Yes', viewUrl: 'https://west.example.internal', blocked: 'No', ownerAccountId: 'A7H29KQ8D-4F12-9B8C-72D3-5E19A2B4C6D7', contributorAccountIds: 'B3F10H2KQ-98A7-4C11-8D3E-2A9F41B6D8C2, C9L24N7PZ-65D1-4A22-9F8E-7B3C12D5E6A4', folderId: 'F8A31D2LQ-77B3-4D11-92C8-1E7F4A5B9D0C', editorType: 'Studio', namespace: 'Wix' },
          { name: 'east-hub-site', displayName: 'East Hub Website', published: 'No', dateCreated: '2025-11-04', lastUpdate: '2026-02-06', isPremium: 'No', viewUrl: 'https://east.example.internal', blocked: 'No', ownerAccountId: 'D2M67R4TY-1C45-4B9D-8A2E-3F6A90B1C5D7', contributorAccountIds: 'E5Q18S2UV-83D2-4E19-9C4B-5A7F31D8G6H2', folderId: 'G7K25T9WP-41A8-4F20-8B7D-9C2E6L3M1N5R', editorType: 'Editor', namespace: 'Wix' },
          { name: 'midwest-service-portal', displayName: 'Midwest Service Portal', published: 'Yes', dateCreated: '2025-09-19', lastUpdate: '2026-02-05', isPremium: 'Yes', viewUrl: 'https://midwest.example.internal', blocked: 'Yes', ownerAccountId: 'H4P39V8YX-52E6-4A71-9D0B-6L2Q84R5T1U3', contributorAccountIds: 'J8R42W1ZA-73B9-4C20-8F1D-4M6N92P3Q7S5, K2T61X4BC-95C3-4D11-9A7E-8R1U53V6W0Y2', folderId: 'L6V54Y3DE-29D4-4B88-7C2F-0T9W15X8Z4A6', editorType: 'Studio', namespace: 'Wix' }
        ]
      },
      {
        name: 'Wix Roles',
        description: 'Review pre-defined Wix roles and staff-created custom role profiles.',
        preDefinedRoles: [
          { roleName: 'Owner', description: 'Full control across website configuration, billing, publishing, roles, and connected integrations.', permissions: 'NO Restricitons' },
          { roleName: 'Account Admin', description: 'Can manage account-level settings, team membership, and operational controls for linked websites.', permissions: 'Account' },
          { roleName: 'Admin', description: 'Can update key settings, publishing preferences, and user access within assigned scopes.', permissions: 'SIte' },
          { roleName: 'Website Manager', description: 'Manages page structure, navigation, SEO settings, and publishing readiness for sites.', permissions: 'SIte' },
          { roleName: 'Website Designer', description: 'Edits layout, theme, styling, and visual components without account administration rights.', permissions: 'SIte' }
        ],
        customRoles: [
          { roleName: 'Fianancial Advisor', description: 'Supports advisor-specific content updates and review workflows for assigned web properties.', permissions: 'SIte' },
          { roleName: 'Program Admin', description: 'Coordinates program-level pages, release updates, and scoped collaborator permissions.', permissions: 'Account' },
          { roleName: 'Developer', description: 'Maintains technical implementations, integrations, and troubleshooting in lower environments.', permissions: 'NO Restricitons' },
          { roleName: 'Home Office Executive', description: 'Read/review access to executive dashboards and strategic website reporting areas.', permissions: 'Account' },
          { roleName: 'Content Editor', description: 'Creates and edits content blocks, media, and draft updates for designated sites.', permissions: 'SIte' },
          { roleName: 'Assistant', description: 'Supports operational updates and limited content edits under guided team oversight.', permissions: 'SIte' },
          { roleName: 'Marketing Support', description: 'Updates campaign assets, promotion sections, and marketing copy across approved pages.', permissions: 'SIte' }
        ]
      },
      {
        name: 'Wix Folders',
        description: 'Manage Wix folder records used for organizing sites and content in lower environments.',
        enableCrud: false,
        searchPlaceholder: 'Search folder name or path',
        searchFields: ['folderName', 'path'],
        filters: [
          {
            id: 'siteCountBand',
            label: 'Site Count',
            allLabel: 'All site counts',
            options: ['0-10', '11-25', '26+']
          }
        ],
        columns: [
          { key: 'folderName', label: 'Folder Name' },
          { key: 'dateCreated', label: 'Date Created' },
          { key: 'lastUpdated', label: 'Last Updated' },
          { key: 'siteCount', label: 'Site Count' },
          { key: 'path', label: 'Path' }
        ],
        rows: [
          { folderName: 'BAS Marketing', dateCreated: '2025-10-12', lastUpdated: '2026-02-08', siteCount: 14, path: '\\BAS Marketing', siteCountBand: '11-25' },
          { folderName: 'Enterprise Demo Sites', dateCreated: '2025-09-03', lastUpdated: '2026-02-05', siteCount: 8, path: '\\Enterprise Demo sites', siteCountBand: '0-10' },
          { folderName: 'CFP Websites', dateCreated: '2025-07-21', lastUpdated: '2026-02-02', siteCount: 31, path: '\\CFP Websites', siteCountBand: '26+' }
        ]
      },
      {
        name: 'Calculators',
        description: 'Functional table for automated calculator validation records in lower environments.',
        rows: [
          { checked: false, status: 'Deployed', description: 'automated test validation for content type CALCUALTOR created on 2026-02-01', expiryDate: '2026-03-01', publishDate: '2026-02-02' },
          { checked: false, status: 'Redeployed', description: 'automated test validation for content type CALCUALTOR created on 2026-02-02', expiryDate: '2026-03-04', publishDate: '2026-02-03' },
          { checked: true, status: 'Deployed', description: 'automated test validation for content type CALCUALTOR created on invalid-date', expiryDate: 'invalid-date', publishDate: '2026-02-04' },
          { checked: false, status: 'Redeployed', description: 'Annuity Calculator', expiryDate: '2026-03-10', publishDate: '2026-02-05' },
          { checked: true, status: 'Deployed', description: 'Mortgage Calculator', expiryDate: '2026-03-11', publishDate: '2026-02-06' },
          { checked: false, status: 'Redeployed', description: 'automated test validation for content type CALCUALTOR created on 2026-02-06', expiryDate: '2026-03-13', publishDate: 'invalid-date' },
          { checked: false, status: 'Deployed', description: 'automated test validation for content type tax CALCUALTOR created on 2026-02-07', expiryDate: '2026-03-14', publishDate: '2026-02-08' },
          { checked: false, status: 'Redeployed', description: 'automated test validation for content type savings CALCUALTOR created on invalid-date', expiryDate: '2026-03-15', publishDate: '2026-02-09' },
          { checked: true, status: 'Deployed', description: 'automated test validation for content type CALCUALTOR created on 2026-02-09', expiryDate: '2026-03-18', publishDate: '2026-02-10' },
          { checked: false, status: 'Redeployed', description: 'automated test validation for content type college CALCUALTOR created on 2026-02-10', expiryDate: 'invalid-date', publishDate: '2026-02-11' }
        ]
      }
    ];

    const defaultAdminToolsTab = 'BAS Roles';

    const complianceArchiveRows = [
      {
        event_date: '2026-01-16',
        status: 'Approved',
        file_type: 'PDF',
        submitter_id: 'ariana.holt@westwindcapital.com',
        approver_id: 'Derek.Mills',
        bas_account_id: 'WestWind Capital',
        wix_account_id: 'A9K3P2-B7Q4-M5R8T1',
        site_id: 'A7F2-9KLM-4Q8P-T2X',
        website_id: 'West Coast Primary',
        revision: 'Rev 1',
        revision_url: 'https://example.com/revision/4821',
        diff_json: '{"header":"updated","hero":"copy-change"}'
      },
      {
        event_date: '2026-01-14',
        status: 'Submitted',
        file_type: 'PDF',
        submitter_id: 'ariana.holt@westwindcapital.com',
        approver_id: 'Derek.Mills',
        bas_account_id: 'WestWind Capital',
        wix_account_id: 'A9K3P2-B7Q4-M5R8T1',
        site_id: 'A7F2-9KLM-4Q8P-T2X',
        website_id: 'West Coast Primary',
        revision: 'Rev 1',
        revision_url: 'https://example.com/revision/4821',
        diff_json: '{"header":"updated","hero":"copy-change"}'
      },
      {
        event_date: '2026-01-13',
        status: 'Rejected',
        file_type: 'PDF',
        submitter_id: 'jordan.kim@easthubadvisors.com',
        approver_id: 'Celine.Brooks',
        bas_account_id: 'EastHub Advisors',
        wix_account_id: 'J4M8N2-C1R7-P9T5V3',
        site_id: 'Q3W8-R2TY-7PLM-K9V',
        website_id: 'East Hub Website',
        revision: 'Rev 2',
        revision_url: 'https://example.com/revision/4833',
        diff_json: '{"notes":"missing legal disclaimer"}'
      },
      {
        event_date: '2026-01-11',
        status: 'Submitted',
        file_type: 'PDF',
        submitter_id: 'jordan.kim@easthubadvisors.com',
        approver_id: 'Celine.Brooks',
        bas_account_id: 'EastHub Advisors',
        wix_account_id: 'J4M8N2-C1R7-P9T5V3',
        site_id: 'Q3W8-R2TY-7PLM-K9V',
        website_id: 'East Hub Website',
        revision: 'Rev 2',
        revision_url: 'https://example.com/revision/4833',
        diff_json: '{"notes":"missing legal disclaimer"}'
      },
      {
        event_date: '2026-01-10',
        status: 'Approved',
        file_type: 'PDF',
        submitter_id: 'nia.patel@midwestservicegroup.com',
        approver_id: 'Marco.Sloan',
        bas_account_id: 'Midwest Service Group',
        wix_account_id: 'R8L2C5-D3F7-H1J9K4',
        site_id: 'M5N2-Z8XC-1VBP-D4R',
        website_id: 'Midwest Service Portal',
        revision: 'Rev 3',
        revision_url: 'https://example.com/revision/4794',
        diff_json: '{"footer":"policy-link"}'
      },
      {
        event_date: '2026-01-08',
        status: 'Submitted',
        file_type: 'PDF',
        submitter_id: 'nia.patel@midwestservicegroup.com',
        approver_id: 'Marco.Sloan',
        bas_account_id: 'Midwest Service Group',
        wix_account_id: 'R8L2C5-D3F7-H1J9K4',
        site_id: 'M5N2-Z8XC-1VBP-D4R',
        website_id: 'Midwest Service Portal',
        revision: 'Rev 3',
        revision_url: 'https://example.com/revision/4794',
        diff_json: '{"footer":"policy-link"}'
      },
      {
        event_date: '2026-01-07',
        status: 'Rejected',
        file_type: 'PDF',
        submitter_id: 'leo.foster@southernopsllc.com',
        approver_id: 'Celine.Brooks',
        bas_account_id: 'Southern Operations LLC',
        wix_account_id: 'T6V3B1-N8M4-Q2W7E5',
        site_id: 'B2NM-7QWE-5RTY-L8K',
        website_id: 'Southern Operations',
        revision: 'Rev 4',
        revision_url: 'https://example.com/revision/4766',
        diff_json: '{"compliance":"needs updated disclosures"}'
      },
      {
        event_date: '2026-01-05',
        status: 'Submitted',
        file_type: 'PDF',
        submitter_id: 'leo.foster@southernopsllc.com',
        approver_id: 'Celine.Brooks',
        bas_account_id: 'Southern Operations LLC',
        wix_account_id: 'T6V3B1-N8M4-Q2W7E5',
        site_id: 'B2NM-7QWE-5RTY-L8K',
        website_id: 'Southern Operations',
        revision: 'Rev 4',
        revision_url: 'https://example.com/revision/4766',
        diff_json: '{"compliance":"needs updated disclosures"}'
      },
      {
        event_date: '2026-01-04',
        status: 'Approved',
        file_type: 'PDF',
        submitter_id: 'maya.chen@northdigitalpartners.com',
        approver_id: 'Derek.Mills',
        bas_account_id: 'North Digital Partners',
        wix_account_id: 'P5S9D2-K4L1-Z7X3C8',
        site_id: 'H9JK-2PLM-6QWE-N3T',
        website_id: 'Northern Digital HQ',
        revision: 'Rev 5',
        revision_url: 'https://example.com/revision/4702',
        diff_json: '{"hero":"updated cta spacing"}'
      },
      {
        event_date: '2026-01-02',
        status: 'Submitted',
        file_type: 'PDF',
        submitter_id: 'maya.chen@northdigitalpartners.com',
        approver_id: 'Derek.Mills',
        bas_account_id: 'North Digital Partners',
        wix_account_id: 'P5S9D2-K4L1-Z7X3C8',
        site_id: 'H9JK-2PLM-6QWE-N3T',
        website_id: 'Northern Digital HQ',
        revision: 'Rev 5',
        revision_url: 'https://example.com/revision/4702',
        diff_json: '{"hero":"updated cta spacing"}'
      }
    ];
