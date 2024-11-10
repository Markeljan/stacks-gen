"use client";

import { showConnect, useConnect } from "@stacks/connect-react";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useAccount } from "@/lib/hooks/use-account";
import { useClipboard } from "@/lib/hooks/use-clipboard";
import { useUserSession } from "@/lib/hooks/use-user-session";
import { cn, truncateAddress } from "@/lib/utils";

export const ConnectButton = () => {
  const { isSignedIn, stxAddress, network, setNetwork } = useAccount();
  const { userSession } = useUserSession();
  const { authOptions } = useConnect();
  const { isCopied, copyToClipboard } = useClipboard();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogin = () => {
    showConnect(authOptions);
  };

  const handleLogout = () => {
    userSession?.signUserOut();
  };

  const handleCopy = () => {
    if (isCopied || !stxAddress) return;
    copyToClipboard(stxAddress);
  };

  const toggleNetwork = () => {
    setNetwork?.(network === "mainnet" ? "testnet" : "mainnet");
  };

  const MobileDrawer = () => (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Wallet Connection</DrawerTitle>
          <DrawerDescription />
        </DrawerHeader>
        <div className="p-4 space-y-4">
          {isSignedIn ? (
            <>
              <Button
                onClick={toggleNetwork}
                className="w-full justify-between"
                variant="outline"
              >
                <span>Network:</span>
                <span
                  className={
                    network === "testnet" ? "text-lime-600" : "text-orange-600"
                  }
                >
                  {network === "testnet" ? "Testnet" : "Mainnet"}
                </span>
              </Button>
              <Button
                onClick={handleCopy}
                variant="outline"
                className="w-full justify-between"
              >
                <span>Address:</span>
                <span>
                  {truncateAddress({ address: stxAddress || "", length: 10 })}
                </span>
              </Button>
              <Button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                variant="destructive"
                className="w-full"
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              onClick={() => {
                handleLogin();
                setIsOpen(false);
              }}
              className="w-full"
            >
              Connect Wallet
            </Button>
          )}
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );

  return (
    <>
      <MobileDrawer />
      <div
        className={cn(
          "relative items-center justify-between w-full h-12 px-4 max-w-64 bg-secondary text-secondary-foreground rounded-full shadow-md max-sm:h-10 transition-colors duration-200 hidden md:flex",
          !isSignedIn && "bg-primary"
        )}
      >
        <Button
          type="button"
          onClick={isSignedIn ? toggleNetwork : handleLogin}
          className="z-10 flex items-center justify-center w-18 h-6 text-xs font-medium rounded-full focus:outline-none transition-all duration-200 relative overflow-hidden"
        >
          {!isSignedIn ? (
            <p>Connect Wallet</p>
          ) : (
            <>
              <div
                className={`absolute inset-0 ${
                  network === "testnet" ? "bg-lime-400/70" : "bg-orange-400/50"
                } transition-all duration-200 ${
                  network === "testnet" ? "translate-x-0" : "translate-x-full"
                }`}
              />
              <span className="relative z-10">
                {network === "testnet" ? "Testnet" : "Mainnet"}
              </span>
            </>
          )}
        </Button>
        <div className="flex items-center space-x-2">
          {stxAddress ? (
            <>
              <Button
                type="button"
                onClick={handleCopy}
                variant="ghost"
                className="p-1 text-secondary-foreground/70 transition-colors duration-100 active:scale-95 active:text-green-600"
              >
                {truncateAddress({ address: stxAddress || "", length: 6 })}
              </Button>

              <Button
                type="button"
                onClick={handleLogout}
                variant="ghost"
                className="p-1 text-secondary-foreground/70 hover:text-primary transition-colors duration-200"
              >
                <span className="sr-only">Logout</span>
                <X className="h-4 w-4 transition-transform duration-200 hover:scale-125" />
              </Button>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};
