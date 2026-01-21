'use client';

import { cn } from '@/lib/utils';
import { FlowNode as FlowNodeType } from '@/lib/data/nodes';
import { Button } from '@/components/ui/button';

interface FlowNodeProps {
  node: FlowNodeType;
  onClick: (node: FlowNodeType) => void;
}

export function FlowNode({ node, onClick }: FlowNodeProps) {
  const isSource = node.type === 'cash-source';
  const isUse = node.type === 'cash-use';
  const isCentral = node.type === 'central-account';

  return (
    <div
      className={cn(
        'absolute bg-card border rounded-md p-4 shadow-sm transition-all duration-150 cursor-pointer hover:shadow-md hover:-translate-y-0.5',
        isSource && 'border-l-4 border-l-emerald-500 w-[180px]',
        isUse && 'border-r-4 border-r-rose-500 w-[180px]',
        isCentral && 'border-2 border-primary bg-secondary w-[220px]'
      )}
      style={{ left: node.position.x, top: node.position.y }}
      onClick={() => onClick(node)}
    >
      <div className="text-sm font-semibold text-foreground mb-2 leading-tight">
        {node.title}
      </div>
      {isCentral ? (
        <div className="text-sm text-muted-foreground">
          <div className="flex justify-between py-1 border-b border-border">
            <span>Starting:</span>
            <span className="font-semibold text-foreground">$2.1M</span>
          </div>
          <div className="flex justify-between py-1 border-b border-border">
            <span>Ending:</span>
            <span className="font-semibold text-foreground">$2.07M</span>
          </div>
          <div className="flex justify-between py-1 mt-1">
            <span>Net Change:</span>
            <span className="font-semibold text-rose-500">-$30K</span>
          </div>
        </div>
      ) : (
        <>
          <div
            className={cn(
              'text-xl font-bold mb-2',
              isSource && 'text-emerald-500',
              isUse && 'text-rose-500'
            )}
          >
            {node.amount}
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="w-full text-xs"
            onClick={(e) => {
              e.stopPropagation();
              onClick(node);
            }}
          >
            Details
          </Button>
        </>
      )}
    </div>
  );
}
