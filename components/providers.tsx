"use client";

import { type AuthOptions, Connect } from "@stacks/connect-react";
import { ThemeProvider } from "next-themes";
import { DEPLOYMENT_URL } from "vercel-url";

import { useUserSession } from "@/lib/hooks/use-user-session";

const appDetails = {
  name: "STXGPT",
  icon: `${DEPLOYMENT_URL}/stacks.png`,
};

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const { setUserSession } = useUserSession();

  const authOptions: AuthOptions = {
    appDetails,
    onFinish({ userSession: newSession }) {
      setUserSession(newSession);
    },
  };
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="theme-preference"
    >
      <Connect authOptions={authOptions}>{children}</Connect>
    </ThemeProvider>
  );
};
