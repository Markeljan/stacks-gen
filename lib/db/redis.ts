import { Redis } from "@upstash/redis";
import { generateId } from "ai";

import type { ContractUi } from "@/lib/types";

// Initialize Redis
const redis = Redis.fromEnv();

// save contract ui source code
export const saveContractUi = async ({
  contractId,
  sourceCode,
}: {
  contractId: string;
  sourceCode: string;
}): Promise<string> => {
  const id = generateId();
  const contractUi: ContractUi = {
    id,
    contractId,
    sourceCode,
    timestamp: Date.now(),
  };

  // Store contract by ID
  await redis.set(`contract:${id}`, contractUi);

  // Add contract ID to contractId's list
  await redis.lpush(`${contractId}:contracts`, id);

  // Add to global list of all contracts
  await redis.lpush("allContracts", id);

  return id;
};

export const getContractUiById = async (
  id: string
): Promise<ContractUi | null> => {
  const contractUi = await redis.get<ContractUi>(`contract:${id}`);
  return contractUi;
};

export const getContractUisByContract = async (
  contractId: string
): Promise<ContractUi[] | null> => {
  const ids = await redis.lrange(`${contractId}:contracts`, 0, -1);
  const contractUis = await Promise.all(ids.map((id) => getContractUiById(id)));
  return contractUis.filter((contractUi) => contractUi !== null);
};

export const getAllContractUis = async (): Promise<ContractUi[]> => {
  const ids = await redis.lrange("allContracts", 0, -1);
  const contractUis = await Promise.all(ids.map((id) => getContractUiById(id)));
  return contractUis.filter((contractUi) => contractUi !== null);
};
