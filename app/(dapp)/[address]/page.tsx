import { ContractsList } from "@/components/contracts-list";
import { Header } from "@/components/header";
import { RenderUI } from "@/components/render-ui";
import { generateUI } from "@/lib/ai/generate-ui";
import { saveContractUI } from "@/lib/db/redis";
import { getContractInterfaceFunctions } from "@/lib/stacks/api";

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
  const functionsInterface = await getContractInterfaceFunctions(address);

  const generatedCode = await generateUI({
    contractId: address,
    functionsInterface,
    prompt,
  });

  await saveContractUI(address, generatedCode);

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <Header showContractForm={!!address} />
      <RenderUI componentCode={generatedCode} />
      <ContractsList address={address} />
    </div>
  );
}
