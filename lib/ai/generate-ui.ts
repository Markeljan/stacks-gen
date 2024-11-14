import { anthropic } from "@ai-sdk/anthropic";
// import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

export const generateUI = async ({
  contractId,
  functionsInterface,
  prompt,
}: {
  contractId: string;
  functionsInterface: unknown;
  prompt?: string;
}): Promise<string> => {
  const result = await generateObject({
    model: anthropic("claude-3-5-sonnet-latest"), //openai("gpt-4o"),
    schema: z.object({
      reactLiveCode: z.string(),
    }),
    prompt: `Generate a full, working React component using shadcn components and the ContractFunction component to create a UI for the following STACKS smart contract interface.
    ${JSON.stringify({ contractId, functionsInterface })}
    Example structure:
    () => {
      const { useState } = React;
      const { Card, Tabs, TabsList, TabsTrigger, TabsContent } = shadcn;

      function ContractUi() {
        return (
          <div className="w-full max-w-4xl mx-auto p-4">
            <Tabs defaultValue="read" className="w-full">
              <div className="flex justify-center mb-6">
                <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1">
                  <TabsTrigger value="read" className="rounded-sm px-3 py-1.5">
                    Read Functions
                  </TabsTrigger>
                  <TabsTrigger value="write" className="rounded-sm px-3 py-1.5">
                    Write Functions
                  </TabsTrigger>
                </TabsList>
              </div>
              <div className="mt-6">
                <TabsContent value="read" className="space-y-4">
                  <ContractFunction
                    contractId={contractId}
                    access="read_only"
                    functionName="getBalance"
                    args={[
                      { name: "address", type: "principal" }
                    ]}
                    className="w-full max-w-md mx-auto"
                  />
                  <ContractFunction
                    contractId={contractId}
                    access="read_only"
                    functionName="getTotalSupply"
                    args={[]}
                    className="w-full max-w-md mx-auto"
                  />
                </TabsContent>
                <TabsContent value="write" className="space-y-4">
                  <ContractFunction
                    contractId={contractId}
                    access="public"
                    functionName="transfer"
                    args={[
                      { name: "amount", type: "uint128" },
                      { name: "recipient", type: "principal" }
                    ]}
                    className="w-full max-w-md mx-auto"
                  />
                  <ContractFunction
                    contractId={contractId}
                    access="public"
                    functionName="mint"
                    args={[
                      { name: "amount", type: "uint128" },
                      { name: "recipient", type: "principal" }
                    ]}
                    className="w-full max-w-md mx-auto"
                  />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        );
      }

      return <ContractUi />;
    }
      
    IMPORTANT: modify the code based on the user's prompt.  Customize as much as possible to match the user's request and make a unique UI.  If the user's prompt is empty, follow the example structure with some random variation.

    User's prompt: ${prompt}

    Do not omit or placehold anything.
    `,
  });

  return result.object.reactLiveCode;
};
