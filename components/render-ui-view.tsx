"use client";

import * as React from "react";

import { LiveError, LivePreview, LiveProvider } from "react-live";

import { ContractFunction } from "@/components/contract-function";
import * as shadcnComponents from "@/components/ui";

export const RenderUIView = ({ componentCode }: { componentCode: string }) => {
  const scope = {
    ...React,
    shadcn: shadcnComponents,
    ContractFunction: ContractFunction,
  };

  return (
    <LiveProvider code={componentCode} scope={scope}>
      <div className="w-full min-h-screen bg-background text-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <LiveError />
          <LivePreview />
        </div>
      </div>
    </LiveProvider>
  );
};
