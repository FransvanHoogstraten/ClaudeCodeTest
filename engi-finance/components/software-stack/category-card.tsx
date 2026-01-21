'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { SoftwareCategory, Platform } from '@/lib/data/software';

interface CategoryCardProps {
  category: SoftwareCategory;
}

function FeatureDot({ has }: { has: boolean }) {
  return (
    <span
      className={cn(
        'w-3 h-3 rounded-full inline-block',
        has ? 'bg-emerald-500' : 'bg-border'
      )}
    />
  );
}

function PlatformRow({
  platform,
  isImplemented,
  isAlternative,
}: {
  platform: Platform;
  isImplemented: boolean;
  isAlternative: boolean;
}) {
  return (
    <TableRow className={cn(isAlternative && 'bg-muted/50')}>
      <TableCell
        className={cn(
          'font-medium',
          isImplemented && 'relative',
          isAlternative && 'text-muted-foreground font-normal'
        )}
      >
        {isImplemented && (
          <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-emerald-500" />
        )}
        {platform.name}
      </TableCell>
      {platform.features.map((has, index) => (
        <TableCell key={index} className="text-center">
          <FeatureDot has={has} />
        </TableCell>
      ))}
    </TableRow>
  );
}

export function CategoryCard({ category }: CategoryCardProps) {
  const [showAlternatives, setShowAlternatives] = useState(false);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{category.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[120px]">Platform</TableHead>
                {category.featureHeaders.map((header, index) => (
                  <TableHead
                    key={index}
                    className="text-center min-w-[80px] text-xs font-medium"
                  >
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <PlatformRow
                platform={category.implemented}
                isImplemented={true}
                isAlternative={false}
              />
              {showAlternatives &&
                category.alternatives.map((alt, index) => (
                  <PlatformRow
                    key={index}
                    platform={alt}
                    isImplemented={false}
                    isAlternative={true}
                  />
                ))}
            </TableBody>
          </Table>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="mt-4 text-xs"
          onClick={() => setShowAlternatives(!showAlternatives)}
        >
          {showAlternatives ? (
            <>
              Hide alternatives <ChevronUp className="ml-1 h-3 w-3" />
            </>
          ) : (
            <>
              Show alternatives <ChevronDown className="ml-1 h-3 w-3" />
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
