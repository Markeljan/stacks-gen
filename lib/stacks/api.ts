import {
  Configuration,
  type ContractInterfaceResponse,
  type SmartContract,
  SmartContractsApi,
} from "@stacks/blockchain-api-client";
import {
  cvToHex,
  cvToValue,
  hexToCV,
  parseToCV,
  type ClarityAbiType,
} from "@stacks/transactions";

const config = new Configuration({
  basePath: "https://api.hiro.so",
  apiKey: process.env.STACKS_API_KEY,
});
const contractsApi = new SmartContractsApi(config);

export const getContractDetails = async (
  contractId: string
): Promise<{
  sourceCode: string;
  abi: string;
}> => {
  const { source_code, abi } = (await contractsApi.getContractById({
    contractId,
  })) as SmartContract;

  return {
    sourceCode: source_code,
    abi,
  };
};

export const getContractInterfaceFunctions = async (contractId: string) => {
  const [contractAddress, contractName] = contractId.split(".");
  const contractInterfaceResponse = (await contractsApi.getContractInterface({
    contractAddress,
    contractName,
  })) as ContractInterfaceResponse;

  const contractInterfaceFunctions = contractInterfaceResponse.functions;
  return contractInterfaceFunctions;
};

export const readContractFunction = async ({
  contractId,
  functionName,
  args,
}: {
  contractId: string;
  functionName: string;
  args?: { value: string; type: ClarityAbiType }[];
}) => {
  const [contractAddress, contractName] = contractId.split(".");
  const result = await contractsApi.callReadOnlyFunction({
    contractAddress,
    contractName,
    functionName,
    readOnlyFunctionArgs: {
      sender: "SP2R1VEVDTESA9RBV9A9WE971FP0QDBEQ73ANM1DJ",
      arguments:
        args?.map((arg) => cvToHex(parseToCV(arg.value, arg.type))) || [],
    },
  });

  if (result.okay && result.result) {
    const convertedValue = cvToValue(hexToCV(result.result));
    return typeof convertedValue === "object" && "value" in convertedValue
      ? convertedValue.value
      : convertedValue;
  }
  return `Error: ${result.cause}`;
};
