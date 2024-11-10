import { Suspense } from "react";
import { ContractsList } from "@/components/contracts-list";
import { Header } from "@/components/header";
import { RenderUI } from "@/components/render-ui";
import { generateUI } from "@/lib/ai/generate-ui";
import { saveContractUi } from "@/lib/db/redis";
import { getContractInterfaceFunctions } from "@/lib/stacks/api";
import { Button } from "@/components/ui/button";
import { Code } from "lucide-react";
import { getContractUisByContractAction } from "@/lib/db/actions";

// Fallback components
const GeneratedUIFallback = () => (
  <div className="relative border rounded-lg overflow-hidden w-full max-w-xs sm:max-w-3xl h-[500px]">
    <div className="absolute top-2 right-2 z-10">
      <Button variant="outline" size="sm" className="flex w-28" disabled>
        <Code className="h-4 w-4" />
        View Code
      </Button>
    </div>
    <div className="p-4 h-full overflow-auto">
      <div className="h-full w-full bg-gray-200 animate-pulse rounded-md" />
    </div>
  </div>
);

const ContractsListFallback = () => (
  <div className="w-full max-w-xs sm:max-w-3xl">
    <div className="h-10 bg-gray-200 animate-pulse rounded-md mb-4" />
    <div className="space-y-2">
      {[...Array(3)].map((_, index) => (
        <div
          key={`contract-${index}-${Math.random()}`}
          className="h-16 bg-gray-200 animate-pulse rounded-md"
        />
      ))}
    </div>
  </div>
);

// Async components
async function GeneratedUI({
  address,
  prompt,
}: {
  address: string;
  prompt?: string;
}) {
  const functionsInterface = await getContractInterfaceFunctions(address);
  const generatedCode = await generateUI({
    contractId: address,
    functionsInterface,
    prompt,
  });
  await saveContractUi({
    contractId: address,
    sourceCode: generatedCode,
  });
  return <RenderUI componentCode={generatedCode} />;
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{
    address: string;
  }>;
  searchParams: Promise<{
    prompt?: string;
  }>;
}) {
  const { address } = await params;
  const { prompt } = await searchParams;
  const contractUis = await getContractUisByContractAction(address);
  const showContractsList = contractUis && contractUis.length > 0;

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <Header showContractForm={!!address} />
      <Suspense fallback={<GeneratedUIFallback />}>
        <GeneratedUI address={address} prompt={prompt} />
      </Suspense>
      <Suspense fallback={<ContractsListFallback />}>
        {showContractsList ? (
          <ContractsList contractUis={contractUis} />
        ) : (
          <div className="text-center text-sm text-muted-foreground">
            No contracts generated yet.
          </div>
        )}
      </Suspense>
    </div>
  );
}
