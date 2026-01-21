import { CategoryCard } from '@/components/software-stack/category-card';
import { softwareCategories } from '@/lib/data/software';

export default function SoftwareStackPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-1">Software Stack Overview</h2>
        <p className="text-sm text-muted-foreground">
          Functionaliteiten per geimplementeerd platform
        </p>
        <div className="flex gap-6 mt-3 p-3 bg-secondary rounded-md">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span>Beschikbaar</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="w-3 h-3 rounded-full bg-border" />
            <span>Niet beschikbaar</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {softwareCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
