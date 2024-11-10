import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncateAddress = ({ address, length = 6 }: { address: string; length?: number }) => {
  return `${address.slice(0, length)} · ${address.slice(-length)}`;
};
