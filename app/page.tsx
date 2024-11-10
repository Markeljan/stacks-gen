import Link from "next/link";
import { ContractsList } from "@/components/contracts-list";
import { Landing } from "@/components/landing";

export default function HomePage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-background">
      <main className="flex flex-col gap-8 row-start-1 items-center sm:items-start">
        <Landing />
        <ContractsList />
      </main>
      <footer className="row-start-3 flex flex-col items-center justify-center text-sm text-primary-foreground">
        <div className="flex items-center gap-1">
          <span>Built by</span>
          <Link
            href="https://github.com/markeljan"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-muted-foreground hover:underline hover:underline-offset-4"
          >
            soko.btc
          </Link>
        </div>
      </footer>
    </div>
  );
}
