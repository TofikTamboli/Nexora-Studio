import { useReducedMotion as useFMReducedMotion } from "framer-motion";

export function useReducedMotion(): boolean {
  const shouldReduce = useFMReducedMotion();
  return Boolean(shouldReduce);
}
