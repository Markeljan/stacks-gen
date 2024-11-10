import { Redis } from "@upstash/redis";
import { generateId } from "ai";

// Initialize Redis
const redis = Redis.fromEnv();

// save contract ui source code
export const saveContractUI = async (address: string, sourceCode: string) => {
  const id = generateId();
  const entry = {
    id,
    address,
    sourceCode,
    timestamp: Date.now(),
  };

  // Add new source code to history list
  await redis.lpush(`${address}:history`, entry);
  // Store by ID for direct lookup
  await redis.set(`contract:${id}`, entry);
  // Also keep latest version in original key for backwards compatibility
  await redis.set(address, sourceCode);

  // Add address to list of all contracts
  await redis.sadd("contracts", address);
};

// get latest contract ui source code by address
export const getContractUI = async (address: string) => {
  const result = await redis.get<string>(address);
  return result;
};

// get contract by id
export const getContractById = async (id: string) => {
  type ContractEntry = {
    id: string;
    address: string;
    sourceCode: string;
    timestamp: number;
  };
  const result = await redis.get<ContractEntry>(`contract:${id}`);
  return result;
};

// get all historical contract ui source codes for an address
export const getContractUIHistory = async (address: string) => {
  type HistoryEntry = {
    id: string;
    address: string;
    sourceCode: string;
    timestamp: number;
  };
  const result = await redis.lrange<HistoryEntry>(`${address}:history`, 0, -1);
  return result;
};

// get specific historical contract ui source code by id
export const getContractUIById = async (id: string) => {
  const contract = await getContractById(id);
  return contract?.sourceCode;
};

// get all contracts that have generations
export const getAllContracts = async () => {
  const contracts = await redis.smembers("contracts");

  type ContractDetails = { address: string; timestamp?: number };
  const contractsWithDetails = await Promise.all(
    contracts.map(async (address: string) => {
      const history = await getContractUIHistory(address);
      const latestEntry = history[0];
      return {
        address,
        timestamp: latestEntry?.timestamp,
      };
    })
  );
  return contractsWithDetails.sort(
    (a: ContractDetails, b: ContractDetails) =>
      (b.timestamp || 0) - (a.timestamp || 0)
  );
};
