import { Priority } from './issues';

export type ApprovalType = 'Reporting' | 'Automation' | 'Other';

export interface Approval {
  id: string;
  key: string;
  summary: string;
  type: ApprovalType;
  priority: Priority;
}

export const approvals: Approval[] = [
  {
    id: '1',
    key: 'APR-001',
    summary: 'Vendor Payment Batch #2512-045',
    type: 'Reporting',
    priority: 'high',
  },
  {
    id: '2',
    key: 'APR-002',
    summary: 'Month-End Accrual Adjustment',
    type: 'Automation',
    priority: 'medium',
  },
  {
    id: '3',
    key: 'APR-003',
    summary: 'Marketing Department Budget Reallocation',
    type: 'Other',
    priority: 'low',
  },
];
