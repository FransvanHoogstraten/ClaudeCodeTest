'use client';

import { useState } from 'react';
import { ApprovalsTable } from '@/components/approvals/approvals-table';
import { approvals as initialApprovals } from '@/lib/data/approvals';

export default function ApprovalsPage() {
  const [approvals, setApprovals] = useState(initialApprovals);

  const handleApprove = (id: string) => {
    setApprovals((prev) => prev.filter((a) => a.id !== id));
  };

  const handleReject = (id: string) => {
    setApprovals((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-1">Pending Approvals</h2>
        <p className="text-sm text-muted-foreground">
          Human-in-the-loop review queue
        </p>
      </div>

      <ApprovalsTable
        approvals={approvals}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}
