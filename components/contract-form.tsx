"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { ArrowUpIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const ContractForm = ({
  showPrompt = false,
}: {
  showPrompt?: boolean;
}) => {
  const [address, setAddress] = useState("");
  const [prompt, setPrompt] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (address?.trim()) {
      const queryParams = new URLSearchParams();
      if (showPrompt && prompt.trim()) {
        queryParams.append("prompt", prompt.trim());
      }
      const queryString = queryParams.toString();
      router.push(`/${address}${queryString ? `?${queryString}` : ""}`);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-3xl">
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Contract address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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
        </div>
        {showPrompt && (
          <Textarea
            placeholder="Enter your prompt here"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full min-h-[100px] text-lg py-2 px-4 rounded-lg shadow-lg"
          />
        )}
      </form>
    </div>
  );
};
