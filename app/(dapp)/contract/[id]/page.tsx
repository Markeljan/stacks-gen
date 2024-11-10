import { notFound } from "next/navigation";
import { Suspense } from "react";

import { RenderUIView } from "@/components/render-ui-view";
import { getContractUiByIdAction } from "@/lib/db/actions";
import { Header } from "@/components/header";

// Fallback component for loading state
const UIFallback = () => (
  <div className="w-full min-h-screen bg-gray-100 animate-pulse" />
);

// Async component to fetch and display the UI
async function ContractUI({ id }: { id: string }) {
  const generatedUi = await getContractUiByIdAction(id);

  if (!generatedUi) {
    notFound();
  }

  return <RenderUIView componentCode={generatedUi.sourceCode} />;
}

export default async function Page({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;
  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <Header />
      <Suspense fallback={<UIFallback />}>
        <ContractUI id={id} />
      </Suspense>
    </div>
  );
}
