# OpenAI latest-model instruction audit — 2026-09-05

## Result

The repository-level precedence gap was fixed in `CLAUDE.md`. All 113 active `SKILL.md` files are inventoried in the generated CSV matrix. The full-text scan found no instruction that claims authority over user/project instructions and no unbounded agent validation loop. Every clarification-question candidate was manually reviewed; 13 design skills now explicitly infer from context and reversible defaults before asking. The support-draft skill no longer creates Codex tasks or recurring automations unless the user explicitly requested that external state change.

## Domain summary

| Domain | Result | Provenance / applied change | Remaining gap |
|---|---|---|---|
| Instruction authority | PASS in audited text | `CLAUDE.md` makes user/project authority precede skill guidance; all 113 skill bodies were scanned for override claims and candidate matches were reviewed. | Compatibility with an unknown future target project's unseen instructions remains outside this result. |
| Authorized completion / escalation | PASS in audited text | Clarification candidates now require a materially outcome-changing gap; financial, send, account, inaccessible-source, and login gates were retained because they protect real authority/evidence boundaries. | Runtime compliance is not proven by text inspection. |
| Validation proportionality | PASS in audited text | No unbounded validation retry was found; repository policy stops sufficient checks unless a new change, failure, or concern appears. | Runtime compliance is not proven by text inspection. |
| Delegation | PASS at repository level | Added conditional parallelization and serialized authority/contract decisions. | Individual harness support is `UNVERIFIED` or N/A. |
| Reasoning effort | PASS at repository level | Added proportional effort rule where supported. | Individual runtime support is N/A or `UNVERIFIED`. |
| Responses / tool workflow | N/A for current runtime | The repository contains reusable instruction text, not a direct OpenAI API runtime. | A future skill that adds a direct API implementation must be audited then. |
| Reporting fidelity | PASS at repository level | Added provenance and `PASS / FAIL / UNVERIFIED` preservation. | Skill-specific output fidelity remains context-dependent. |

Run `node scripts/audit-agent-instructions.mjs` to regenerate the per-skill matrix.
