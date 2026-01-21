'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CashFlowDiagram } from '@/components/structure-maps/cash-flow-diagram';
import { DataFlowDiagram } from '@/components/structure-maps/data-flow-diagram';

export default function StructureMapsPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-1">Structure Maps</h2>
        <p className="text-sm text-muted-foreground">
          Visualize your finance operations from different perspectives
        </p>
      </div>

      <Tabs defaultValue="cash-flow" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="cash-flow">Cash Flow</TabsTrigger>
          <TabsTrigger value="data-flow">Data Flow</TabsTrigger>
        </TabsList>
        <TabsContent value="cash-flow">
          <CashFlowDiagram />
        </TabsContent>
        <TabsContent value="data-flow">
          <DataFlowDiagram />
        </TabsContent>
      </Tabs>
    </div>
  );
}
