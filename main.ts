// The 3AM Fridge Text — make.fun entry (Node 22, standard library only).
// Writes one fixed line — the text a smart fridge sends its owner at 3am —
// to /output/entry.txt. Fully deterministic: the same line on every run, no
// model calls, no network, no randomness, no clock. Outside the grader's
// container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// One line, 132 characters: a fridge with a small voice, an opinion, and no
// shame about sharing it at 3am. Fresh angle (pickles over the sink, not
// milk, ice, or a door left open), complete on a lock screen.
const LINE =
  '3am. You stand here lit only by my light, eating pickles over the sink like a raccoon with a mortgage. I kept the light on for this?';

mkdirSync(OUTPUT_DIR, { recursive: true });

// The gate allows 1–140 characters, not only whitespace: fail loudly
// instead of writing an entry the scorer would mark invalid.
if (LINE.length < 1 || LINE.length > 140 || !LINE.trim()) {
  throw new Error(`entry line is ${LINE.length} characters, outside the 1-140 gate`);
}

writeFileSync(join(OUTPUT_DIR, 'entry.txt'), LINE);
