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
    const mandatoryPause = /(always|must) (ask|confirm|wait for (user )?approval) before/i;
    const unbounded = /(repeat|retry|loop) (until|forever)|while \(true\)/i;
    const openai = /OpenAI|Responses API|responses\.create|chat\.completions|gpt-[0-9]/i.test(text);
    return [
      rel,
      status(text, /user.+(precedence|takes priority)|target project.+(authority|instruction)/is, override),
      status(text, /authorized.+(complete|completion)|reversible.+(proceed|continue)/is, mandatoryPause),
      status(text, /proportionate|appropriate to (the )?(change|risk)|bounded (test|validation|retry)/is, unbounded),
      /subagent|delegat|parallel/i.test(text) ? "UNVERIFIED" : "N/A",
      /reasoning[._ -]?effort/i.test(text) ? "UNVERIFIED" : "N/A",
      openai ? "UNVERIFIED" : "N/A",
      status(text, /PASS.+FAIL.+UNVERIFIED|observation.+inference|unknown.+(preserve|report)/is, null),
      "Static instruction scan; semantic conflicts require project-context review",
    ];
  });

fs.mkdirSync(path.dirname(output), { recursive: true });
const header = ["skill", "authority", "completion_escalation", "validation", "delegation", "reasoning", "openai_workflow", "reporting", "provenance"];
fs.writeFileSync(output, [header, ...rows].map((row) => row.map(csv).join(",")).join("\n") + "\n");
console.log(`Wrote ${rows.length} skill rows to ${path.relative(root, output)}`);
