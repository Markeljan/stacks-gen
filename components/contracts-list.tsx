import Link from "next/link";
import type { ContractUi } from "@/lib/types";
import { RenderUiPreview } from "@/components/render-ui-preview";

export function ContractsList({ contractUis }: { contractUis: ContractUi[] }) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">Generated Apps</h2>

      <div className="max-h-[800px] overflow-y-auto rounded-lg border p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {contractUis.map((contractUi, index) => (
            <Link
              key={`${contractUi.id}-${index}`}
              href={`/contract/${contractUi.id}`}
              className="group relative aspect-square overflow-hidden rounded-lg border hover:border-primary transition-colors"
            >
              <RenderUiPreview componentCode={contractUi.sourceCode} />
              <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-sm font-medium text-primary">
                  View Details
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
