"use client";

import * as React from "react";

import { LivePreview, LiveProvider } from "react-live";

import { ContractFunction } from "@/components/contract-function";
import * as shadcnComponents from "@/components/ui";

export const RenderUiPreview = ({
  componentCode,
}: {
  componentCode: string;
}) => {
  const scope = {
    ...React,
    shadcn: shadcnComponents,
    ContractFunction: ContractFunction,
    default: undefined,
  };

  // biome-ignore lint/performance/noDelete: <explanation>
  delete scope.default;

  return (
    <LiveProvider code={componentCode} scope={scope}>
      <div className="w-full aspect-square overflow-hidden rounded-lg border">
        <div className="w-full h-full overflow-hidden scale-[0.7] origin-top-center">
          <LivePreview />
        </div>
      </div>
    </LiveProvider>
  );
};
