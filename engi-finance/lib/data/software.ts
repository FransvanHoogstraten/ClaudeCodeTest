export interface Platform {
  name: string;
  features: boolean[];
  isImplemented: boolean;
}

export interface SoftwareCategory {
  id: string;
  name: string;
  featureHeaders: string[];
  implemented: Platform;
  alternatives: Platform[];
}

export const softwareCategories: SoftwareCategory[] = [
  {
    id: 'erp',
    name: 'ERP',
    featureHeaders: ['Web-based', 'Mobile App', 'API', 'Integraties', 'Multi-currency', 'Real-time', 'Workflows', 'Reports'],
    implemented: {
      name: 'NetSuite',
      features: [true, true, true, true, true, true, true, true],
      isImplemented: true,
    },
    alternatives: [
      { name: 'SAP Business One', features: [true, true, true, true, true, false, true, true], isImplemented: false },
      { name: 'Microsoft Dynamics', features: [true, true, true, true, true, true, true, false], isImplemented: false },
      { name: 'Sage Intacct', features: [true, false, true, true, true, true, true, true], isImplemented: false },
    ],
  },
  {
    id: 'accounting',
    name: 'Accounting',
    featureHeaders: ['Web-based', 'Mobile App', 'API', 'Integraties', 'Multi-currency', 'Real-time', 'Workflows', 'Reports'],
    implemented: {
      name: 'QuickBooks',
      features: [true, true, true, true, false, true, true, true],
      isImplemented: true,
    },
    alternatives: [
      { name: 'Xero', features: [true, true, true, true, true, true, false, true], isImplemented: false },
      { name: 'FreshBooks', features: [true, true, true, false, false, true, true, true], isImplemented: false },
      { name: 'Wave', features: [true, false, false, false, false, true, false, true], isImplemented: false },
    ],
  },
  {
    id: 'ap',
    name: 'AP Software',
    featureHeaders: ['Web-based', 'Mobile', 'OCR', 'Workflows', 'Scheduling', 'Vendor Portal', 'ERP Sync', 'Audit Trail'],
    implemented: {
      name: 'Bill.com',
      features: [true, true, true, true, true, true, true, true],
      isImplemented: true,
    },
    alternatives: [
      { name: 'Tipalti', features: [true, false, true, true, true, true, true, true], isImplemented: false },
      { name: 'AvidXchange', features: [true, true, true, true, false, true, true, true], isImplemented: false },
      { name: 'Melio', features: [true, true, false, false, true, false, true, true], isImplemented: false },
    ],
  },
  {
    id: 'payroll',
    name: 'Payroll',
    featureHeaders: ['Cloud', 'Mobile App', 'Auto Tax', 'Benefits', 'Direct Deposit', 'Time Track', 'HR Tools', 'International'],
    implemented: {
      name: 'Gusto',
      features: [true, true, true, true, true, true, true, false],
      isImplemented: true,
    },
    alternatives: [
      { name: 'ADP', features: [true, true, true, true, true, true, true, true], isImplemented: false },
      { name: 'Paychex', features: [true, true, true, true, true, false, true, false], isImplemented: false },
      { name: 'Rippling', features: [true, true, true, true, true, true, true, true], isImplemented: false },
    ],
  },
  {
    id: 'expense',
    name: 'Expense Management',
    featureHeaders: ['Web & Mobile', 'OCR Scan', 'Auto-cat', 'Workflows', 'Corp Cards', 'Mileage', 'Multi-currency', 'Acct Sync'],
    implemented: {
      name: 'Expensify',
      features: [true, true, true, true, true, true, true, true],
      isImplemented: true,
    },
    alternatives: [
      { name: 'Concur', features: [true, true, true, true, true, true, true, true], isImplemented: false },
      { name: 'Ramp', features: [true, true, true, true, true, false, false, true], isImplemented: false },
      { name: 'Brex', features: [true, true, true, false, true, false, true, true], isImplemented: false },
    ],
  },
  {
    id: 'payment',
    name: 'Payment Processing',
    featureHeaders: ['API-first', 'Multi Payment', 'Recurring', 'Global', 'Fraud Detect', 'Dev Tools', 'Revenue Rec', 'Dashboard'],
    implemented: {
      name: 'Stripe',
      features: [true, true, true, true, true, true, true, true],
      isImplemented: true,
    },
    alternatives: [
      { name: 'PayPal', features: [false, true, true, true, true, false, false, true], isImplemented: false },
      { name: 'Square', features: [true, true, true, false, true, true, false, true], isImplemented: false },
      { name: 'Adyen', features: [true, true, true, true, true, true, true, true], isImplemented: false },
    ],
  },
  {
    id: 'reporting',
    name: 'Reporting & BI',
    featureHeaders: ['Web & Desktop', 'Dashboards', 'Connectors', 'Real-time', 'Mobile View', 'Collab', 'Calculations', 'Scheduled'],
    implemented: {
      name: 'Tableau',
      features: [true, true, true, true, true, true, true, true],
      isImplemented: true,
    },
    alternatives: [
      { name: 'Power BI', features: [true, true, true, true, true, true, true, true], isImplemented: false },
      { name: 'Looker', features: [true, true, true, true, true, true, false, true], isImplemented: false },
      { name: 'Metabase', features: [true, true, true, false, true, false, true, true], isImplemented: false },
    ],
  },
];
