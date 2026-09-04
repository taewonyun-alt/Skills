# OpenAI latest-model instruction audit — 2026-09-05

## Result

The repository-level precedence gap was fixed in `CLAUDE.md`. All 113 active `SKILL.md` files are inventoried in the generated CSV matrix. The matrix is intentionally conservative: a static scan reports `UNVERIFIED` when project context or runtime behavior is needed and does not turn absence of a suspicious phrase into `PASS`.

## Domain summary

| Domain | Result | Provenance / applied change | Remaining gap |
|---|---|---|---|
| Instruction authority | PASS at repository level | `CLAUDE.md` now makes user/project authority precede skill guidance. | Per-skill semantic compatibility with every possible target project is `UNVERIFIED`. |
| Authorized completion / escalation | PASS at repository level | Added completion and human-exception boundary. | Skills with task-specific approval gates remain context-dependent in the CSV. |
| Validation proportionality | PASS at repository level | Added change/risk-proportional rule and stop condition for repeated checks. | Runtime test behavior is `UNVERIFIED`. |
| Delegation | PASS at repository level | Added conditional parallelization and serialized authority/contract decisions. | Individual harness support is `UNVERIFIED` or N/A. |
| Reasoning effort | PASS at repository level | Added proportional effort rule where supported. | Individual runtime support is N/A or `UNVERIFIED`. |
| Responses / tool workflow | UNVERIFIED | OpenAI-specific mentions are flagged by the generator for targeted review. | No claim of API compatibility is made by repository policy alone. |
| Reporting fidelity | PASS at repository level | Added provenance and `PASS / FAIL / UNVERIFIED` preservation. | Skill-specific output fidelity remains context-dependent. |

Run `node scripts/audit-agent-instructions.mjs` to regenerate the per-skill matrix.
