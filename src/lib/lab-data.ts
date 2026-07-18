import { makePRNG } from "./prng";

/**
 * Latency Lab instrument list — FICTIONAL symbols, generated deterministically.
 * Locale-independent (symbols never translate), so this lives in lib, not the
 * content dictionaries. No real instruments, no client data.
 */

const SYMBOLS = [
  "AXTR", "BNDL", "CRVX", "DLTA", "EQNX", "FLUX", "GRVT", "HLIX", "IZOR", "JYNX",
  "KRPT", "LMND", "MOXA", "NOVR", "ORBT", "PYXL", "QUAD", "RVLT", "SVGE", "TRND",
  "UMBR", "VNTR", "WRLD", "XYLO", "YTTR", "ZPHR", "ARCL", "BLTZ", "CNDR", "DRFT",
  "EMBR", "FTHM", "GLPH", "HRZN", "IGNI", "JOLT", "KILN", "LUMN", "MRSH", "NADR",
  "OPQL", "PRSM", "QRTZ", "RUNE", "STLR", "TIDE", "ULTR", "VECT", "WISP", "XENO",
] as const;

const WORDS = [
  "Systems", "Capital", "Dynamics", "Holdings", "Labs", "Partners", "Global",
  "Industries", "Group", "Networks", "Ventures", "Materials", "Trust", "Index",
  "Fund",
];

export interface LabInstrument {
  sym: string;
  base: number;
  name: string;
}

/** Builds the ~50 fictional instruments; call order matches the prototype. */
export function makeInstruments(): LabInstrument[] {
  const rnd = makePRNG(1337);
  return SYMBOLS.map((sym) => {
    const base = +(8 + rnd() * 480).toFixed(2);
    const name =
      sym.charAt(0) + sym.slice(1).toLowerCase() + " " + WORDS[Math.floor(rnd() * WORDS.length)];
    return { sym, base, name };
  });
}
