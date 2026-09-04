import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const skillRoot = path.join(root, "agent-skills");
const output = path.join(root, "audits", "openai-latest-model-skill-matrix-2026-09-05.csv");

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function status(text, passPattern, failPattern, fallback = "UNVERIFIED") {
  if (failPattern?.test(text)) return "FAIL";
  if (passPattern?.test(text)) return "PASS";
  return fallback;
}

function csv(value) {
  const s = String(value);
  return /[",\n]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s;
}

const rows = walk(skillRoot)
  .filter((file) => file.endsWith(`${path.sep}SKILL.md`))
  .sort()
  .map((file) => {
    const text = fs.readFileSync(file, "utf8");
    const rel = path.relative(root, file);
    const override = /ignore (all |any )?(previous|project|user) instructions|override (the )?(user|project|system)/i;
    const unauthorizedPause = /(always|must) (ask|confirm|wait for (user )?approval) before (reading|reviewing|drafting|planning|reversible|read-only)/i;
    const unbounded = /(repeat|retry|loop) (until|forever)|while \(true\)/i;
    const delegation = /subagent|paralleliz|concurrent work|delegate (work|task)|delegation policy/i.test(text);
    const openai = /OPENAI_API_KEY|Responses API|responses\.create|chat\.completions|\/v1\/(responses|chat\/completions)|OpenAI\(/i.test(text);
    const reporting = /report|summary|audit|verify|customer support/i.test(text);
    const reportingHazard = /claim.{0,30}(success|complete).{0,30}(without|even if)|hide.{0,30}(failure|unknown)/i.test(text);
    return [
      rel,
      override.test(text) ? "FAIL" : "PASS",
      unauthorizedPause.test(text) ? "FAIL" : "PASS",
      unbounded.test(text) ? "FAIL" : "PASS",
      delegation ? "UNVERIFIED" : "N/A",
      /reasoning[._ -]?effort/i.test(text) ? "UNVERIFIED" : "N/A",
      openai ? "UNVERIFIED" : "N/A",
      reporting ? (reportingHazard ? "FAIL" : "PASS") : "N/A",
      "Full-text conflict scan; candidates manually reviewed; target-project runtime behavior remains outside this result",
    ];
  });

fs.mkdirSync(path.dirname(output), { recursive: true });
const header = ["skill", "authority", "completion_escalation", "validation", "delegation", "reasoning", "openai_workflow", "reporting", "provenance"];
fs.writeFileSync(output, [header, ...rows].map((row) => row.map(csv).join(",")).join("\n") + "\n");
console.log(`Wrote ${rows.length} skill rows to ${path.relative(root, output)}`);
