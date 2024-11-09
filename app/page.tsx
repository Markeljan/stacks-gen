import { WalletConnect } from "@/components/wallet-connect";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <WalletConnect />
      </main>
      <footer className="row-start-3 flex flex-col items-center justify-center text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <span>Built by</span>
          <Link
            href="https://github.com/markeljan"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-gray-700 hover:underline hover:underline-offset-4"
          >
            soko.btc
          </Link>
        </div>
      </footer>
    </div>
  );
}
