export type TaskStatus = 'complete' | 'in-progress' | 'blocked' | 'not-started';

export interface Task {
  id: string;
  name: string;
  owner: string;
  dueDay: string;
  notes: string;
  section: string;
}

export interface MonthlyStatus {
  taskId: string;
  month: string;
  status: TaskStatus;
}

export const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

export const monthNames: Record<string, string> = {
  jan: 'January 2025',
  feb: 'February 2025',
  mar: 'March 2025',
  apr: 'April 2025',
  may: 'May 2025',
  jun: 'June 2025',
  jul: 'July 2025',
  aug: 'August 2025',
  sep: 'September 2025',
  oct: 'October 2025',
  nov: 'November 2025',
  dec: 'December 2025',
};

export const sections = [
  { id: 'ap', name: 'Accounts Payable' },
  { id: 'ar', name: 'Accounts Receivable' },
  { id: 'gl', name: 'General Ledger' },
  { id: 'bank', name: 'Bank Reconciliation' },
  { id: 'report', name: 'Financial Reporting' },
];

export const tasks: Task[] = [
  // Accounts Payable
  { id: 'ap-review-invoices', name: 'Review and approve all vendor invoices', owner: 'Finance Team', dueDay: 'Day 5', notes: 'Review all vendor invoices for accuracy and approval workflow completion.', section: 'ap' },
  { id: 'ap-payment-runs', name: 'Process payment runs', owner: 'Finance Team', dueDay: 'Day 10', notes: 'Execute payment batches for approved vendor invoices.', section: 'ap' },
  { id: 'ap-aging', name: 'Reconcile AP aging report', owner: 'Accounting Team', dueDay: 'Day 28', notes: 'Review AP aging report and reconcile discrepancies.', section: 'ap' },
  // Accounts Receivable
  { id: 'ar-invoices', name: 'Generate and send invoices', owner: 'Collections Team', dueDay: 'Day 1', notes: 'Generate customer invoices and send for payment.', section: 'ar' },
  { id: 'ar-payments', name: 'Record customer payments', owner: 'Collections Team', dueDay: 'Day 26', notes: 'Record and apply all customer payments received.', section: 'ar' },
  { id: 'ar-aging', name: 'Review AR aging report', owner: 'Collections Team', dueDay: 'Day 30', notes: 'Analyze AR aging and identify collection risks.', section: 'ar' },
  // General Ledger
  { id: 'gl-entries', name: 'Post all journal entries', owner: 'Controller', dueDay: 'Day 27', notes: 'Post all journal entries for the month.', section: 'gl' },
  { id: 'gl-accruals', name: 'Record month-end accruals', owner: 'Controller', dueDay: 'Day 29', notes: 'Record accruals for prepaid expenses and deferred revenue.', section: 'gl' },
  { id: 'gl-review', name: 'Review GL account balances', owner: 'Controller', dueDay: 'Day 30', notes: 'Review GL for anomalies and unusual balances.', section: 'gl' },
  // Bank Reconciliation
  { id: 'bank-download', name: 'Download bank statements', owner: 'Accounting Team', dueDay: 'Day 27', notes: 'Download all bank statements for reconciliation.', section: 'bank' },
  { id: 'bank-operating', name: 'Reconcile operating account', owner: 'Accounting Team', dueDay: 'Day 29', notes: 'Reconcile main operating bank account.', section: 'bank' },
  // Financial Reporting
  { id: 'report-pl', name: 'Generate P&L', owner: 'CFO', dueDay: 'Day 28', notes: 'Generate preliminary profit & loss statement.', section: 'report' },
  { id: 'report-bs', name: 'Generate Balance Sheet', owner: 'CFO', dueDay: 'Day 29', notes: 'Generate preliminary balance sheet.', section: 'report' },
  { id: 'report-cf', name: 'Prepare cash flow statement', owner: 'CFO', dueDay: 'Day 30', notes: 'Prepare statement of cash flows.', section: 'report' },
  { id: 'report-mgmt', name: 'Management reporting package', owner: 'CFO', dueDay: 'Day 31 + 3', notes: 'Prepare comprehensive management reporting package.', section: 'report' },
];

// Generate status data for each task and month
function generateStatusMatrix(): MonthlyStatus[] {
  const statuses: MonthlyStatus[] = [];

  tasks.forEach(task => {
    months.forEach(month => {
      let status: TaskStatus = 'complete';

      // Nov and Dec have some in-progress, blocked, or not-started
      if (month === 'nov') {
        if (task.id === 'ap-aging' || task.id === 'gl-review' || task.id === 'report-cf' || task.id === 'report-mgmt') {
          status = 'in-progress';
        } else if (task.id === 'bank-operating') {
          status = 'blocked';
        }
      } else if (month === 'dec') {
        if (['ap-aging', 'ar-aging', 'gl-review', 'bank-operating', 'report-bs'].includes(task.id)) {
          status = 'in-progress';
        } else if (['report-cf', 'report-mgmt'].includes(task.id)) {
          status = 'not-started';
        }
      }

      statuses.push({ taskId: task.id, month, status });
    });
  });

  return statuses;
}

export const statusMatrix = generateStatusMatrix();

export function getTaskStatus(taskId: string, month: string): TaskStatus {
  const entry = statusMatrix.find(s => s.taskId === taskId && s.month === month);
  return entry?.status || 'not-started';
}

// Summary data
export const monthlyCompletionBadges: Record<string, { value: number; status: 'complete' | 'in-progress' }> = {
  jan: { value: 100, status: 'complete' },
  feb: { value: 100, status: 'complete' },
  mar: { value: 100, status: 'complete' },
  apr: { value: 100, status: 'complete' },
  may: { value: 100, status: 'complete' },
  jun: { value: 100, status: 'complete' },
  jul: { value: 100, status: 'complete' },
  aug: { value: 100, status: 'complete' },
  sep: { value: 100, status: 'complete' },
  oct: { value: 100, status: 'complete' },
  nov: { value: 85, status: 'in-progress' },
  dec: { value: 65, status: 'in-progress' },
};
