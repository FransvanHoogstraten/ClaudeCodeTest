'use client';

import { useState, useMemo } from 'react';
import { IssuesTable } from '@/components/issues/issues-table';
import { IssuesFilters } from '@/components/issues/issues-filters';
import { PriorityBadge } from '@/components/issues/priority-badge';
import { issues, systems, Priority, IssueStatus } from '@/lib/data/issues';

export default function IssuesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriorities, setSelectedPriorities] = useState<Priority[]>(['high', 'medium', 'low']);
  const [selectedStatuses, setSelectedStatuses] = useState<IssueStatus[]>(['open', 'in-progress']);
  const [selectedSystems, setSelectedSystems] = useState<string[]>(systems);

  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      const matchesSearch = searchTerm === '' ||
        issue.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.key.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPriority = selectedPriorities.length === 0 || selectedPriorities.includes(issue.priority);
      const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(issue.status);
      const matchesSystem = selectedSystems.length === 0 || selectedSystems.includes(issue.system);
      return matchesSearch && matchesPriority && matchesStatus && matchesSystem;
    });
  }, [searchTerm, selectedPriorities, selectedStatuses, selectedSystems]);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-1">Issues</h2>
        <p className="text-sm text-muted-foreground">
          Track and resolve finance operations issues
        </p>
        <div className="flex gap-6 mt-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <PriorityBadge priority="high" />
            <span>High</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <PriorityBadge priority="medium" />
            <span>Medium</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <PriorityBadge priority="low" />
            <span>Low</span>
          </div>
        </div>
      </div>

      <IssuesFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedPriorities={selectedPriorities}
        onPrioritiesChange={setSelectedPriorities}
        selectedStatuses={selectedStatuses}
        onStatusesChange={setSelectedStatuses}
        selectedSystems={selectedSystems}
        onSystemsChange={setSelectedSystems}
        systems={systems}
      />

      <IssuesTable issues={filteredIssues} />

      <div className="flex justify-between items-center mt-4 p-3 bg-card border border-border rounded-md">
        <span className="text-sm text-muted-foreground">
          {filteredIssues.length === 0
            ? 'No issues found'
            : filteredIssues.length === 1
            ? 'Showing 1 of 1 issue'
            : `Showing 1-${filteredIssues.length} of ${filteredIssues.length} issues`}
        </span>
      </div>
    </div>
  );
}
