'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PriorityBadge } from './priority-badge';
import { StatusBadge } from './status-badge';
import { Issue } from '@/lib/data/issues';

interface IssuesTableProps {
  issues: Issue[];
}

export function IssuesTable({ issues }: IssuesTableProps) {
  return (
    <div className="bg-card border border-border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px] text-center">Priority</TableHead>
            <TableHead className="w-[100px]">Key</TableHead>
            <TableHead className="min-w-[250px]">Summary</TableHead>
            <TableHead className="w-[120px]">System</TableHead>
            <TableHead className="w-[120px]">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                No issues found
              </TableCell>
            </TableRow>
          ) : (
            issues.map((issue) => (
              <TableRow key={issue.id}>
                <TableCell className="text-center">
                  <PriorityBadge priority={issue.priority} />
                </TableCell>
                <TableCell>
                  <a href="#" className="text-primary font-medium hover:underline">
                    {issue.key}
                  </a>
                </TableCell>
                <TableCell>{issue.summary}</TableCell>
                <TableCell>{issue.system}</TableCell>
                <TableCell>
                  <StatusBadge status={issue.status} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
