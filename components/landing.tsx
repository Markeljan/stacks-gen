"use client";

import { ContractForm } from "@/components/contract-form";
import { Header } from "@/components/header";

export const Landing = () => {
  return (
    <>
      <Header />
      <h1 className="text-4xl font-bold">Stacks Contract Visualizer</h1>
      <ContractForm showPrompt />
    </>
  );
};
