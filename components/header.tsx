"use client";

import { ContractForm } from "@/components/contract-form";
import { ConnectButton } from "@/components/connect-button";
import { cn } from "@/lib/utils";

interface HeaderProps {
  showContractForm?: boolean;
}

export const Header = ({ showContractForm }: HeaderProps) => {
  return (
    <header className="w-full flex flex-row justify-between items-center p-4">
      {showContractForm && (
        <div className="w-full max-w-xl">
          <ContractForm />
        </div>
      )}
      <div className={cn("flex w-full max-w-10 sm:max-w-xs items-center justify-center", !showContractForm && "ml-auto")}>
        <ConnectButton />
      </div>
    </header>
  );
};
