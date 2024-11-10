"use client";

import { Button, Input, Label } from "@/components/ui";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useContract } from "@/lib/hooks/use-contract";
import { cn } from "@/lib/utils";
import type { ClarityAbiType } from "@stacks/transactions";
import { CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";

export interface ContractFunctionProps {
  functionName: string;
  contractId: string;
  access: "read_only" | "public";
  args?: Array<{ name: string; type: ClarityAbiType }>;
  className?: string;
}

export const ContractFunction = ({
  functionName,
  access,
  contractId,
  args = [],
  className,
}: ContractFunctionProps) => {
  const [result, setResult] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);
  const { readContract, writeContract } = useContract();

  const [inputValues, setInputValues] = useState<Record<string, string>>(
    args.reduce<Record<string, string>>((acc, arg) => {
      acc[arg.name] = "";
      return acc;
    }, {})
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    try {
      const formattedArgs = args.map((arg) => inputValues[arg.name]);
      const response = await (access === "read_only"
        ? readContract({
            contractId,
            functionName,
            args: formattedArgs.map((value, index) => ({
              value,
              type: args[index].type,
            })),
          })
        : writeContract({
            contractId,
            functionName,
            args: formattedArgs.map((value, index) => ({
              value,
              type: args[index].type,
            })),
          }));

      setResult(response);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <Card className={cn("w-full max-w-md mx-auto", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{functionName}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {access === "read_only" ? "Read-Only" : "Public"} Function
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {args.map((arg, index) => (
            <div key={`${arg.name}-${arg.type}-${index}`} className="space-y-2">
              <Label htmlFor={arg.name}>{arg.name}</Label>
              <Input
                id={arg.name}
                type="text"
                value={inputValues[arg.name]}
                onChange={(e) =>
                  setInputValues({ ...inputValues, [arg.name]: e.target.value })
                }
                placeholder={`Enter ${arg.type}`}
              />
            </div>
          ))}
          <Button type="submit" className="w-full">
            {access === "read_only" ? "Read" : "Write"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        {error && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {result ? (
          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              {typeof result === "object"
                ? JSON.stringify(result, null, 2)
                : result.toString()}
            </AlertDescription>
          </Alert>
        ) : null}
      </CardFooter>
    </Card>
  );
};
