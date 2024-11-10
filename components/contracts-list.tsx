import Link from "next/link";

import type { ContractUi } from "@/lib/types";

export function ContractsList({ contractUis }: { contractUis: ContractUi[] }) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">Generated Apps</h2>

      <div className="max-h-[600px] overflow-y-auto rounded-lg border">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {contractUis.map((contractUi, index) => (
            <Link
              key={`${contractUi.id}-${index}`}
              href={`/contract/${contractUi.id}`}
              className="p-4 border rounded-lg hover:bg-accent transition-colors"
            >
              <div className="break-all">
                <span className="font-medium">{contractUi.contractId}</span>
              </div>
              {contractUi.timestamp && (
                <div className="text-sm text-muted-foreground mt-2">
                  {new Date(contractUi.timestamp).toLocaleDateString()}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
