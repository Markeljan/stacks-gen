"use server";

import {
  getAllContractUis,
  getContractUiById,
  getContractUisByContract,
} from "@/lib/db/redis";
import type { ContractUi } from "@/lib/types";

export const getContractUiByIdAction = async (
  id: string
): Promise<ContractUi | null> => {
  const contractUi = await getContractUiById(id);
  return contractUi;
};

export const getContractUisByContractAction = async (
  contractId: string
): Promise<ContractUi[] | null> => {
  const contractUis = await getContractUisByContract(contractId);
  return contractUis;
};

export const getAllContractUisAction = async (): Promise<
  ContractUi[] | null
> => {
  const contractUis = await getAllContractUis();
  return contractUis;
};
