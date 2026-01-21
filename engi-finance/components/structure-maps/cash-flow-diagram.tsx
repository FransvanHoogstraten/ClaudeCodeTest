'use client';

import { useState } from 'react';
import { FlowNode } from './flow-node';
import { cashFlowNodes, cashFlowSummary, FlowNode as FlowNodeType } from '@/lib/data/nodes';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

export function CashFlowDiagram() {
  const [selectedNode, setSelectedNode] = useState<FlowNodeType | null>(null);

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-4">
        Interactive cash flow diagram showing sources and uses of cash
      </p>

      {/* Flow Diagram Canvas */}
      <div className="bg-card border border-border rounded-md p-6 relative min-h-[600px] overflow-x-auto mb-6">
        {/* SVG Connections */}
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          viewBox="0 0 1200 600"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <marker
              id="arrowhead-green"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="#10b981" />
            </marker>
            <marker
              id="arrowhead-red"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="#ef4444" />
            </marker>
          </defs>

          {/* Cash inflows */}
          <path
            d="M 280 115 C 390 115, 390 280, 500 280"
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            opacity="0.6"
            markerEnd="url(#arrowhead-green)"
          />
          <path
            d="M 280 255 C 390 255, 390 280, 500 280"
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            opacity="0.6"
            markerEnd="url(#arrowhead-green)"
          />
          <path
            d="M 280 395 C 390 395, 390 280, 500 280"
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            opacity="0.6"
            markerEnd="url(#arrowhead-green)"
          />

          {/* Cash outflows */}
          <path
            d="M 720 245 C 810 245, 810 95, 900 95"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
            opacity="0.6"
            markerEnd="url(#arrowhead-red)"
          />
          <path
            d="M 720 280 C 810 280, 810 215, 900 215"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
            opacity="0.6"
            markerEnd="url(#arrowhead-red)"
          />
          <path
            d="M 720 315 C 810 315, 810 335, 900 335"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
            opacity="0.6"
            markerEnd="url(#arrowhead-red)"
          />
          <path
            d="M 720 350 C 810 350, 810 455, 900 455"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
            opacity="0.6"
            markerEnd="url(#arrowhead-red)"
          />
        </svg>

        {/* Flow Nodes */}
        <div className="relative min-w-[1200px] h-[560px]">
          {cashFlowNodes.map((node) => (
            <FlowNode key={node.id} node={node} onClick={setSelectedNode} />
          ))}
        </div>
      </div>

      {/* Flow Summary */}
      <div className="grid grid-cols-3 gap-6 p-6 bg-secondary rounded-md">
        <div>
          <h4 className="text-sm font-semibold mb-2">Cash In</h4>
          <div className="text-2xl font-bold text-emerald-500">
            {cashFlowSummary.cashIn}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-2">Cash Out</h4>
          <div className="text-2xl font-bold text-rose-500">
            {cashFlowSummary.cashOut}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-2">Net Change</h4>
          <div className="text-2xl font-bold text-rose-500">
            {cashFlowSummary.netChange}
          </div>
        </div>
      </div>

      {/* Node Details Dialog */}
      <Dialog open={!!selectedNode} onOpenChange={() => setSelectedNode(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedNode?.title}</DialogTitle>
          </DialogHeader>
          {selectedNode && (
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">Amount:</span>
                <span className="text-lg font-bold">{selectedNode.amount}</span>
              </div>
              <Separator />
              <div>
                <h4 className="text-sm font-semibold mb-3">Breakdown</h4>
                <div className="space-y-2">
                  {selectedNode.breakdown?.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between py-1 border-b border-border last:border-0"
                    >
                      <span className="text-sm text-muted-foreground">
                        {item.label}:
                      </span>
                      <span className="text-sm font-medium">{item.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
              {selectedNode.notes && (
                <>
                  <Separator />
                  <div>
                    <span className="text-sm text-muted-foreground">Notes:</span>
                    <p className="text-sm mt-1">{selectedNode.notes}</p>
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
