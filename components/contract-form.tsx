"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { ArrowUpIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const ContractForm = () => {
  const [address, setAddress] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (address?.trim()) {
      router.push(`/${address}`);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-3xl">
      <form onSubmit={handleSubmit} className="w-full relative">
        <Input
          type="text"
          placeholder="contract address"
          value={address}
          onChange={(e) => {
            const value = e.target.value;
            setAddress(value);
          }}
          className="w-full text-lg py-6 pr-12 rounded-full shadow-lg"
        />
        <Button
          type="submit"
          size="icon"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full"
        >
          <ArrowUpIcon className="h-6 w-6" />
          <span className="sr-only">Visualize Contract</span>
        </Button>
      </form>
    </div>
  );
};
