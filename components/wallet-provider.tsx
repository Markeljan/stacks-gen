"use client";

import { type AuthOptions, Connect } from "@stacks/connect-react";
import { DEPLOYMENT_URL } from "vercel-url";

import { useUserSession } from "@/lib/use-user-session";

const appDetails = {
  name: "STXGPT",
  icon: `${DEPLOYMENT_URL}/stacks.png`,
};

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const { setUserSession } = useUserSession();

  const authOptions: AuthOptions = {
    appDetails,
    onFinish({ userSession: newSession }) {
      setUserSession(newSession);
    },
  };
  return <Connect authOptions={authOptions}>{children}</Connect>;
}
