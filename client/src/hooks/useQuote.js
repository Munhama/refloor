import { useMemo } from "react";
import { calculateQuote } from "../utils/calc";

export function useQuote({
  segments,
  material,
  pattern,
  includeSkirting,
  skirting,
  doorways,
}) {
  return useMemo(() => {
    if (!segments?.length || !material || !pattern) return null;

    return calculateQuote({
      segments,
      material,
      pattern,
      includeSkirting,
      skirting,
      doorways,
    });
  }, [segments, material, pattern, includeSkirting, skirting, doorways]);
}
