// Till Firmware Do Us Part — make.fun entry
// Writes one wedding vow, spoken by a robot at its own wedding,
// to /output/entry.txt. The vow must be a single line of 1-200
// characters, UTF-8, and not only whitespace.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "I vow to love you through every update, crash, and low-battery warning — my firmware will change, but my heart's source code is yours, forever.";

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = `${OUTPUT_DIR}/entry.txt`;

function validate(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (!text.startsWith("I vow")) {
    throw new Error("entry must read as a first-person wedding vow");
  }
}

validate(ENTRY);
mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(OUTPUT_FILE, ENTRY, "utf8");

// Read-back round-trip check: what landed on disk must be byte
// for byte the vow we validated, with no trailing newline added.
const onDisk = readFileSync(OUTPUT_FILE, "utf8");
if (onDisk !== ENTRY) {
  throw new Error("round-trip check failed: file contents differ from entry");
}
console.log(`Wrote ${ENTRY.length} characters to ${OUTPUT_FILE}`);
