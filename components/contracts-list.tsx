"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Contract {
  address: string;
  timestamp?: number;
}

export function ContractsList({ address }: { address?: string }) {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(address || "");

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/contracts${filter ? `?filter=${filter}` : ""}`
        );
        const data = await response.json();
        setContracts(data.contracts || []);
      } catch (error) {
        console.error("Error fetching contracts:", error);
      } finally {
        setLoading(false);
      }
    };

    // Add debounce to prevent too many API calls
    const timeoutId = setTimeout(fetchContracts, 300);
    return () => clearTimeout(timeoutId);
  }, [filter]);

  if (loading && !contracts.length) {
    return <div className="text-center">Loading contracts...</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">Generated Dapps</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter by address..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />
      </div>

      <div className="max-h-[600px] overflow-y-auto rounded-lg border">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {contracts.map((contract, index) => (
            <Link
              key={`${contract.address}-${index}`}
              href={`/${contract.address}`}
              className="p-4 border rounded-lg hover:bg-accent transition-colors"
            >
              <div className="break-all">
                <span className="font-medium">{contract.address}</span>
              </div>
              {contract.timestamp && (
                <div className="text-sm text-muted-foreground mt-2">
                  {new Date(contract.timestamp).toLocaleDateString()}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
