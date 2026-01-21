export type NodeType = 'cash-source' | 'cash-use' | 'central-account';

export interface FlowNode {
  id: string;
  title: string;
  amount: string;
  type: NodeType;
  position: { x: number; y: number };
  breakdown?: { label: string; amount: string }[];
  notes?: string;
}

export const cashFlowNodes: FlowNode[] = [
  // Cash Sources (Left Column)
  {
    id: 'customer-payments',
    title: 'Customer Payments',
    amount: '+$650K',
    type: 'cash-source',
    position: { x: 100, y: 80 },
    breakdown: [
      { label: 'AR Collections', amount: '$420K' },
      { label: 'Credit Card Payments', amount: '$180K' },
      { label: 'Wire Transfers', amount: '$50K' },
    ],
    notes: 'Cash received from customers for outstanding invoices and new sales.',
  },
  {
    id: 'new-revenue',
    title: 'New Revenue',
    amount: '+$320K',
    type: 'cash-source',
    position: { x: 100, y: 220 },
    breakdown: [
      { label: 'Subscription Revenue', amount: '$180K' },
      { label: 'Service Revenue', amount: '$100K' },
      { label: 'Product Sales', amount: '$40K' },
    ],
    notes: 'New cash from current month sales and subscriptions.',
  },
  {
    id: 'other-income',
    title: 'Other Income',
    amount: '+$150K',
    type: 'cash-source',
    position: { x: 100, y: 360 },
    breakdown: [
      { label: 'Interest Income', amount: '$50K' },
      { label: 'Refunds & Rebates', amount: '$60K' },
      { label: 'Miscellaneous', amount: '$40K' },
    ],
    notes: 'Non-operating cash inflows including interest and refunds.',
  },
  // Central Bank Account
  {
    id: 'bank-account',
    title: 'Bank Account',
    amount: 'Net Change: -$30K',
    type: 'central-account',
    position: { x: 500, y: 220 },
    breakdown: [
      { label: 'Starting Balance', amount: '$2.1M' },
      { label: 'Total Cash In', amount: '+$1,120K' },
      { label: 'Total Cash Out', amount: '-$1,150K' },
      { label: 'Ending Balance', amount: '$2.07M' },
    ],
    notes: 'Main operating account showing cash flow for the month.',
  },
  // Cash Uses (Right Column)
  {
    id: 'vendor-payments',
    title: 'Vendor Payments',
    amount: '-$480K',
    type: 'cash-use',
    position: { x: 900, y: 60 },
    breakdown: [
      { label: 'Supplier Invoices', amount: '$320K' },
      { label: 'Service Providers', amount: '$100K' },
      { label: 'Utilities', amount: '$60K' },
    ],
    notes: 'Payments to vendors for goods and services received.',
  },
  {
    id: 'payroll',
    title: 'Payroll',
    amount: '-$320K',
    type: 'cash-use',
    position: { x: 900, y: 180 },
    breakdown: [
      { label: 'Salaries & Wages', amount: '$250K' },
      { label: 'Benefits', amount: '$50K' },
      { label: 'Payroll Taxes', amount: '$20K' },
    ],
    notes: 'Employee compensation including salaries, benefits, and payroll taxes.',
  },
  {
    id: 'operating-expenses',
    title: 'Operating Expenses',
    amount: '-$200K',
    type: 'cash-use',
    position: { x: 900, y: 300 },
    breakdown: [
      { label: 'Rent', amount: '$80K' },
      { label: 'Software & Tools', amount: '$70K' },
      { label: 'Marketing', amount: '$50K' },
    ],
    notes: 'General operating expenses including rent, software, and marketing.',
  },
  {
    id: 'capital-expenditures',
    title: 'Capital Expenditures',
    amount: '-$150K',
    type: 'cash-use',
    position: { x: 900, y: 420 },
    breakdown: [
      { label: 'Equipment Purchases', amount: '$100K' },
      { label: 'Infrastructure', amount: '$50K' },
    ],
    notes: 'Investments in long-term assets and infrastructure.',
  },
];

export interface DataFlowSystem {
  id: string;
  name: string;
  role: string;
  position: 'upstream' | 'central' | 'lateral-top' | 'lateral-bottom' | 'banking' | 'downstream';
  dataFlow?: string;
}

export const dataFlowSystems: DataFlowSystem[] = [
  { id: 'netsuite', name: 'NetSuite ERP', role: 'Core Financial System', position: 'central' },
  { id: 'stripe', name: 'Stripe', role: 'Payment Processing', position: 'upstream', dataFlow: 'Payment Transactions' },
  { id: 'billcom', name: 'Bill.com', role: 'Accounts Payable', position: 'lateral-top', dataFlow: 'AP Transactions' },
  { id: 'expensify', name: 'Expensify', role: 'Expense Management', position: 'lateral-top', dataFlow: 'Expense Reports' },
  { id: 'gusto', name: 'Gusto', role: 'Payroll & HR', position: 'lateral-bottom', dataFlow: 'Payroll Data' },
  { id: 'plaid', name: 'Plaid', role: 'Bank Connectivity', position: 'banking', dataFlow: 'Bank Transactions' },
  { id: 'quickbooks', name: 'QuickBooks', role: 'Secondary Books', position: 'banking', dataFlow: 'GL Sync' },
  { id: 'tableau', name: 'Tableau', role: 'Reporting & Analytics', position: 'downstream', dataFlow: 'Financial Data Export' },
];

export const cashFlowSummary = {
  cashIn: '+$1,120K',
  cashOut: '-$1,150K',
  netChange: '-$30K',
};
