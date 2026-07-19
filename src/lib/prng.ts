/**
 * Seeded PRNG (mulberry32) — deterministic from a fixed seed, so any generated
 * data is identical on the server and client (no hydration mismatch). Uses
 * Math.imul throughout, so it stays numerically exact for millions of draws
 * (a plain `s * bigConstant` LCG overflows JS's 53-bit safe-integer range and
 * degrades into a short cycle).
 */
export function makePRNG(seed = 1337): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
