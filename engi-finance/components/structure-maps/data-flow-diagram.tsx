'use client';

import { cn } from '@/lib/utils';
import { dataFlowSystems } from '@/lib/data/nodes';

interface SystemNodeProps {
  name: string;
  role: string;
  isCentral?: boolean;
  dataFlow?: string;
  arrowDirection?: 'left' | 'right' | 'up' | 'down';
}

function SystemNode({ name, role, isCentral, dataFlow, arrowDirection }: SystemNodeProps) {
  return (
    <div
      className={cn(
        'bg-card border border-border rounded-md p-4 text-center relative transition-all hover:shadow-sm hover:border-muted-foreground',
        isCentral && 'bg-secondary border-border'
      )}
    >
      <div className={cn('text-base font-semibold mb-1', isCentral && 'text-foreground')}>
        {name}
      </div>
      <div className="text-sm text-muted-foreground">{role}</div>
      {dataFlow && (
        <div
          className={cn(
            'absolute text-xs text-muted-foreground font-medium whitespace-nowrap',
            arrowDirection === 'right' && 'right-[-120px] top-1/2 -translate-y-1/2',
            arrowDirection === 'left' && 'left-[-120px] top-1/2 -translate-y-1/2',
            arrowDirection === 'down' && 'bottom-[-50px] left-1/2 -translate-x-1/2',
            arrowDirection === 'up' && 'top-[-50px] left-1/2 -translate-x-1/2'
          )}
        >
          {dataFlow}
        </div>
      )}
    </div>
  );
}

export function DataFlowDiagram() {
  const centralSystem = dataFlowSystems.find((s) => s.position === 'central');
  const upstreamSystems = dataFlowSystems.filter((s) => s.position === 'upstream');
  const lateralTopSystems = dataFlowSystems.filter((s) => s.position === 'lateral-top');
  const lateralBottomSystems = dataFlowSystems.filter((s) => s.position === 'lateral-bottom');
  const bankingSystems = dataFlowSystems.filter((s) => s.position === 'banking');
  const downstreamSystems = dataFlowSystems.filter((s) => s.position === 'downstream');

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-4">
        System integration map showing data flow between financial tools
      </p>

      <div className="bg-card border border-border rounded-md p-6 min-h-[500px]">
        <div className="grid grid-cols-3 grid-rows-3 gap-8 items-center min-h-[500px]">
          {/* Upstream Systems (Left Column, Middle Row) */}
          <div className="flex flex-col gap-6">
            {upstreamSystems.map((system) => (
              <SystemNode
                key={system.id}
                name={system.name}
                role={system.role}
                dataFlow={system.dataFlow}
                arrowDirection="right"
              />
            ))}
          </div>

          {/* Center Column */}
          <div className="flex flex-col gap-8">
            {/* Lateral Top Systems */}
            <div className="flex gap-4 justify-center">
              {lateralTopSystems.map((system) => (
                <SystemNode
                  key={system.id}
                  name={system.name}
                  role={system.role}
                  dataFlow={system.dataFlow}
                  arrowDirection="down"
                />
              ))}
            </div>

            {/* Central System */}
            {centralSystem && (
              <SystemNode
                name={centralSystem.name}
                role={centralSystem.role}
                isCentral
              />
            )}

            {/* Lateral Bottom Systems */}
            <div className="flex gap-4 justify-center">
              {lateralBottomSystems.map((system) => (
                <SystemNode
                  key={system.id}
                  name={system.name}
                  role={system.role}
                  dataFlow={system.dataFlow}
                  arrowDirection="up"
                />
              ))}
            </div>
          </div>

          {/* Banking & Downstream Systems (Right Column) */}
          <div className="flex flex-col gap-6">
            {bankingSystems.map((system) => (
              <SystemNode
                key={system.id}
                name={system.name}
                role={system.role}
                dataFlow={system.dataFlow}
                arrowDirection="left"
              />
            ))}
            {downstreamSystems.map((system) => (
              <SystemNode
                key={system.id}
                name={system.name}
                role={system.role}
                dataFlow={system.dataFlow}
                arrowDirection="left"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
