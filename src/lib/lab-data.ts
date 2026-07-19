import { makePRNG } from "./prng";

/**
 * Latency Lab instrument list — FICTIONAL symbols, generated deterministically
 * (same seed server + client, so no hydration mismatch). The first ~50 are the
 * hand-picked recognizable symbols from the design; the rest are procedurally
 * generated to reach the full count. Locale-independent, so this lives in lib.
 * No real instruments, no client data.
 */

const SEED_SYMBOLS = [
  "AXTR", "BNDL", "CRVX", "DLTA", "EQNX", "FLUX", "GRVT", "HLIX", "IZOR", "JYNX",
  "KRPT", "LMND", "MOXA", "NOVR", "ORBT", "PYXL", "QUAD", "RVLT", "SVGE", "TRND",
  "UMBR", "VNTR", "WRLD", "XYLO", "YTTR", "ZPHR", "ARCL", "BLTZ", "CNDR", "DRFT",
  "EMBR", "FTHM", "GLPH", "HRZN", "IGNI", "JOLT", "KILN", "LUMN", "MRSH", "NADR",
  "OPQL", "PRSM", "QRTZ", "RUNE", "STLR", "TIDE", "ULTR", "VECT", "WISP", "XENO",
];

const WORDS = [
  "Systems", "Capital", "Dynamics", "Holdings", "Labs", "Partners", "Global",
  "Industries", "Group", "Networks", "Ventures", "Materials", "Trust", "Index",
  "Fund",
];

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/** Total synthetic instruments — the "11,000 instruments" the section describes. */
export const INSTRUMENT_COUNT = 11000;

export interface LabInstrument {
  sym: string;
  base: number;
  name: string;
}

/** A unique 4-letter symbol from an index (base-26). Deterministic, collision-
 *  free by construction — no dedup loop that could spin. */
function symbolFromIndex(n: number): string {
  let x = n;
  let sym = "";
  for (let k = 0; k < 4; k++) {
    sym = LETTERS[x % 26] + sym;
    x = Math.floor(x / 26);
  }
  return sym;
}

/** Builds `count` fictional instruments deterministically. */
export function makeInstruments(count = INSTRUMENT_COUNT): LabInstrument[] {
  const rnd = makePRNG(1337);
  const out: LabInstrument[] = [];
  const seen = new Set<string>(SEED_SYMBOLS);

  const push = (sym: string) => {
    const base = +(8 + rnd() * 480).toFixed(2);
    const name =
      sym.charAt(0) + sym.slice(1).toLowerCase() + " " + WORDS[Math.floor(rnd() * WORDS.length)];
    out.push({ sym, base, name });
  };

  // The hand-picked recognizable symbols first (match the design)…
  for (const sym of SEED_SYMBOLS) push(sym);

  // …then procedural fill, indexed so it always terminates.
  let n = 0;
  while (out.length < count) {
    const sym = symbolFromIndex(n++);
    if (seen.has(sym)) continue; // at most ~50 collisions with the seed set
    seen.add(sym);
    push(sym);
  }

  return out;
}
