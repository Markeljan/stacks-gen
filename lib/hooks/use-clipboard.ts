import { useState } from "react";

import { toast } from "sonner";

export interface useCopyToClipboardProps {
  timeout?: number;
}

export function useClipboard({ timeout = 1000 }: useCopyToClipboardProps = {}) {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyToClipboard = (value: string) => {
    if (typeof window === "undefined" || !navigator.clipboard?.writeText) {
      return;
    }

    if (!value) {
      return;
    }

    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);
      toast.success("Copied to clipboard", {
        icon: "📋",
        duration: timeout,
      });
      setTimeout(() => {
        setIsCopied(false);
      }, timeout);
    });
  };

  return { isCopied, copyToClipboard };
}
