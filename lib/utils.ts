import { Hero } from "@/types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const DummyHero = new Hero({});
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
