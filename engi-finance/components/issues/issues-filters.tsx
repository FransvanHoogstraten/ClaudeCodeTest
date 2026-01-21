'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { Priority, IssueStatus } from '@/lib/data/issues';

interface IssuesFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedPriorities: Priority[];
  onPrioritiesChange: (priorities: Priority[]) => void;
  selectedStatuses: IssueStatus[];
  onStatusesChange: (statuses: IssueStatus[]) => void;
  selectedSystems: string[];
  onSystemsChange: (systems: string[]) => void;
  systems: string[];
}

export function IssuesFilters({
  searchTerm,
  onSearchChange,
  selectedPriorities,
  onPrioritiesChange,
  selectedStatuses,
  onStatusesChange,
  selectedSystems,
  onSystemsChange,
  systems,
}: IssuesFiltersProps) {
  const priorities: Priority[] = ['high', 'medium', 'low'];
  const statuses: IssueStatus[] = ['open', 'in-progress', 'resolved'];

  const togglePriority = (priority: Priority) => {
    if (selectedPriorities.includes(priority)) {
      onPrioritiesChange(selectedPriorities.filter((p) => p !== priority));
    } else {
      onPrioritiesChange([...selectedPriorities, priority]);
    }
  };

  const toggleStatus = (status: IssueStatus) => {
    if (selectedStatuses.includes(status)) {
      onStatusesChange(selectedStatuses.filter((s) => s !== status));
    } else {
      onStatusesChange([...selectedStatuses, status]);
    }
  };

  const toggleSystem = (system: string) => {
    if (selectedSystems.includes(system)) {
      onSystemsChange(selectedSystems.filter((s) => s !== system));
    } else {
      onSystemsChange([...selectedSystems, system]);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 p-3 bg-card border border-border rounded-md mb-4">
      <Input
        placeholder="Search issues..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-[200px]"
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            Priority <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {priorities.map((priority) => (
            <DropdownMenuCheckboxItem
              key={priority}
              checked={selectedPriorities.includes(priority)}
              onCheckedChange={() => togglePriority(priority)}
            >
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            System <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {systems.map((system) => (
            <DropdownMenuCheckboxItem
              key={system}
              checked={selectedSystems.includes(system)}
              onCheckedChange={() => toggleSystem(system)}
            >
              {system}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            Status <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {statuses.map((status) => (
            <DropdownMenuCheckboxItem
              key={status}
              checked={selectedStatuses.includes(status)}
              onCheckedChange={() => toggleStatus(status)}
            >
              {status === 'in-progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1)}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
