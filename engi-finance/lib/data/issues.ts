export type Priority = 'high' | 'medium' | 'low';
export type IssueStatus = 'open' | 'in-progress' | 'resolved';

export interface Issue {
  id: string;
  key: string;
  summary: string;
  system: string;
  priority: Priority;
  status: IssueStatus;
}

export const issues: Issue[] = [
  {
    id: '1',
    key: 'FIN-101',
    summary: 'Bank reconciliation variance $15K',
    system: 'NetSuite',
    priority: 'high',
    status: 'in-progress',
  },
  {
    id: '2',
    key: 'FIN-102',
    summary: 'Bank feed connection failing',
    system: 'Plaid',
    priority: 'high',
    status: 'open',
  },
  {
    id: '3',
    key: 'FIN-103',
    summary: 'Revenue recognition incomplete',
    system: 'NetSuite',
    priority: 'high',
    status: 'open',
  },
  {
    id: '4',
    key: 'FIN-104',
    summary: 'Automate recurring journal entries',
    system: 'NetSuite',
    priority: 'low',
    status: 'open',
  },
  {
    id: '5',
    key: 'FIN-105',
    summary: 'Payroll accrual calculation error',
    system: 'Gusto',
    priority: 'medium',
    status: 'in-progress',
  },
  {
    id: '6',
    key: 'FIN-106',
    summary: 'Review Q4 expense reports',
    system: 'Expensify',
    priority: 'low',
    status: 'resolved',
  },
  {
    id: '7',
    key: 'FIN-107',
    summary: 'Add bank feed retry logic',
    system: 'Plaid',
    priority: 'medium',
    status: 'open',
  },
  {
    id: '8',
    key: 'FIN-108',
    summary: 'Invoice sync delay',
    system: 'Bill.com',
    priority: 'medium',
    status: 'in-progress',
  },
];

export const systems = ['NetSuite', 'Plaid', 'Gusto', 'Expensify', 'Bill.com'];
export const priorities: Priority[] = ['high', 'medium', 'low'];
export const statuses: IssueStatus[] = ['open', 'in-progress', 'resolved'];
