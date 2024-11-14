"use client";

import * as React from "react";

import { Code, Eye } from "lucide-react";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";

import { ContractFunction } from "@/components/contract-function";
import * as shadcnComponents from "@/components/ui";
import { Button } from "@/components/ui/button";

export const RenderUI = ({ componentCode }: { componentCode: string }) => {
  const [showCode, setShowCode] = React.useState(false);

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
      <div className="relative border rounded-lg overflow-hidden w-full max-w-xs sm:max-w-3xl h-[500px]">
        <div className="absolute top-2 right-2 z-10">
          <Button
            variant="outline"
            size="sm"
            className="flex w-28"
            onClick={() => setShowCode(!showCode)}
          >
            {showCode ? (
              <Eye className="h-4 w-4" />
            ) : (
              <Code className="h-4 w-4" />
            )}
            {showCode ? "View UI" : "View Code"}
          </Button>
        </div>
        <div className="p-4 h-full overflow-auto">
          {showCode ? (
            <LiveEditor
              style={{
                fontFamily: "monospace",
                fontSize: "14px",
                height: "100%",
                overflow: "auto",
                background: "transparent",
              }}
            />
          ) : (
            <div className="h-full overflow-auto">
              <LiveError />
              <LivePreview />
            </div>
          )}
        </div>
      </div>
    </LiveProvider>
  );
};
