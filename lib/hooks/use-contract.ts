import { useAccount } from "@/lib/hooks/use-account";
import { readContractFunction } from "@/lib/stacks/api";
import { openContractCall } from "@stacks/connect-react";
import { parseToCV, type ClarityAbiType } from "@stacks/transactions";

export const useContract = () => {
  const readContract = async ({
    contractId,
    functionName,
    args,
  }: {
    contractId: string;
    functionName: string;
    args?: { value: string; type: ClarityAbiType }[];
  }) => {
    const data = await readContractFunction({
      contractId,
      functionName,
      args,
    });

    return data;
  };

  const writeContract = async ({
    contractId,
    functionName,
    args,
  }: {
    contractId: string;
    functionName: string;
    args?: { value: string; type: ClarityAbiType }[];
  }) => {
    const [contractAddress, contractName] = contractId.split(".");
    await openContractCall({
      contractAddress,
      contractName,
      functionName,
      functionArgs:
        args?.map((arg) => {
          try {
            return parseToCV(arg.value, arg.type);
          } catch (error) {
            console.error("Error parsing argument:", error);
            return "";
          }
        }) || [],
      network: "mainnet",
      fee: "0.03",
    });
  };

  return {
    readContract,
    writeContract,
  };
};
