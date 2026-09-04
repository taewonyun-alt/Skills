# Claude Code — Repo Guide

Repo: **@MengTo/Skills**

This repo contains designer-focused AgentSkills for reusable agent workflows.

## What to do here
- Add new skills (new folders under `agent-skills/`)
- Improve existing skills (`SKILL.md` + `REFERENCES.md`)
- Keep docs procedural: checklists, recipes, pitfalls, workflows

## Folder contract
Each skill folder should look like:

```txt
agent-skills/<category>/<skill-name>/
  SKILL.md            # required (frontmatter + steps)
  REFERENCES.md       # optional (links only)
  ARTICLE.md          # optional (long-form)
  assets/             # optional
  scripts/            # optional
```

Conventions:
- `SKILL.md` should be concise + actionable.
- `REFERENCES.md` should be links only (no big explanations).
- Prefer copy/paste snippets and “when to use” triggers.

## Style
- Write like Meng To: skimmable, practical, confident.
- Prefer constraints and defaults (durations, spacing, hierarchy).
- Avoid fluff.

## Safety
- Don’t include secrets, API keys, tokens.
- Don’t paste private client info.

## Suggested workflow (for Claude)
1) Identify the most specific skill folder.
2) Update `SKILL.md` first.
3) Add/refresh links in `REFERENCES.md`.
4) Keep changes small and commit with a clear message.

## Instruction authority and model behavior

Skills in this repository are reusable procedures, not a source of user or project authority. Apply them under the target project's authority order. An explicit instruction from an authorized user and the target project's accepted canon, decisions, and repository instructions take precedence over a skill guideline; record a conflict instead of silently weakening either source.

- Carry already-authorized, reversible work to a reviewable result. Escalate unresolved purpose, authority, value, irreversible high-risk action, insufficient evidence, or non-convergence.
- Parallelize independent evidence gathering, implementation, or validation only when the runtime supports it and it improves time or quality. Serialize authority, contract, and production decisions; agents do not create authority by consensus.
- Calibrate validation to the changed contract and risk. Do not broaden or repeat sufficient checks without a new change, failure, or unresolved concern.
- Where supported, use lower reasoning effort for routine work and increase it for complex design, conflict, or failure analysis; do not hard-code maximum effort as a universal default.
- Preserve observation, inference, proposal, decision, provenance, and `PASS / FAIL / UNVERIFIED` distinctions in reports.
- OpenAI model or tool recommendations are external evidence. A skill that implements an OpenAI tool workflow must verify current Responses API and parameter compatibility, while still following the target project's Audit → Prototype/Spike → Contract → Production gates when those gates apply.

## Git
This folder is its own git repo. Work from:

```bash
cd /Users/mengto/clawd/@MengTo/Skills
```
