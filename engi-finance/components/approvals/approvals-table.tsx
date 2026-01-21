'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { PriorityBadge } from '@/components/issues/priority-badge';
import { Approval } from '@/lib/data/approvals';
import { toast } from 'sonner';

interface ApprovalsTableProps {
  approvals: Approval[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export function ApprovalsTable({ approvals, onApprove, onReject }: ApprovalsTableProps) {
  const handleApprove = (approval: Approval) => {
    onApprove(approval.id);
    toast.success(`Approved: ${approval.summary}`);
  };

  const handleReject = (approval: Approval) => {
    onReject(approval.id);
    toast.warning(`Rejected: ${approval.summary}`);
  };

  return (
    <div className="bg-card border border-border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[70px] text-center">Priority</TableHead>
            <TableHead className="w-[100px]">Key</TableHead>
            <TableHead>Summary</TableHead>
            <TableHead className="w-[120px]">Type</TableHead>
            <TableHead className="w-[160px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {approvals.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                No pending approvals
              </TableCell>
            </TableRow>
          ) : (
            approvals.map((approval) => (
              <TableRow key={approval.id}>
                <TableCell className="text-center">
                  <PriorityBadge priority={approval.priority} />
                </TableCell>
                <TableCell>
                  <a href="#" className="text-primary font-medium hover:underline">
                    {approval.key}
                  </a>
                </TableCell>
                <TableCell>{approval.summary}</TableCell>
                <TableCell>{approval.type}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs">
                          Approve
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Approve this item?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to approve: {approval.summary}?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-emerald-500 hover:bg-emerald-600"
                            onClick={() => handleApprove(approval)}
                          >
                            Approve
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="destructive" className="text-xs">
                          Reject
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Reject this item?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to reject: {approval.summary}?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive hover:bg-destructive/90"
                            onClick={() => handleReject(approval)}
                          >
                            Reject
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
