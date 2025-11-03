export function calculateQuote({
  segments,
  material,
  pattern,
  includeSkirting,
  skirting,
  doorways = [],
}) {
  return {
    segments,
    material,
    pattern,
    includeSkirting,
    skirting,
    doorways,
  };
}
