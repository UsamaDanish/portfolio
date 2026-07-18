/**
 * Seeded linear-congruential PRNG (same constants as the design prototype).
 * Deterministic from a fixed seed so the Latency Lab's instrument list is
 * identical on the server and client — no hydration mismatch.
 */
export function makePRNG(seed = 1337): () => number {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}
