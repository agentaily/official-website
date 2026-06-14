# Subagents

Project subagents for **Agentaily 官网 (official-website)**. Each has a single responsibility, least-privilege tools, and communicates through **durable artifacts** — `features/` is the contract everyone works against. **This project is self-contained**: the methodology below + `TESTING.md` (test strategy/layers/guardrails) are the agents' shared truth — no external skill needed.

## Roster

| Agent            | Owns                                                                                                                  | Doesn't touch                 |
| ---------------- | --------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `spec-architect` | SPEC.md, `features/`, `src/` (strict TS — types / i18n seam / component contracts) contracts                          | implementation, tests         |
| `implementer`    | `src/` (strict TS — types / i18n seam / component contracts) bodies, [UI] app UI, vitest · `tests/unit/` (inner loop) | features, integration/e2e, CI |
| `outer-tester`   | @amiceli/vitest-cucumber + Testing Library · `tests/integration/` (realize features; no e2e layer yet)                | product code                  |
| `reviewer`       | independent adversarial review (read-only)                                                                            | editing code                  |
| `release-eng`    | GitHub Actions (CI) + Cloudflare Pages(merge main 即部署)+ lefthook + Prettier                                        | product code, features, tests |
| `pr-analyst`     | triage an incoming PR → classify / decompose / route (read-only)                                                      | implementing, merging         |
| `designer` [UI]  | `DESIGN.md` (visual truth source) + design pages in Claude Design → design-sync into code                             | product logic, tests          |

## Flow (double-loop TDD + PR-driven)

```
PR (task ticket) ─► pr-analyst ─► classify + route ───────────────┐
intent / handoff ─► spec-architect ─► `features/` + contracts ─┤
        designer [UI] ─► design-sync'd UI ────────────────────────┤
                                                                   ▼
                              implementer  ◄── contract ──►  outer-tester
                          (inner loop: code + unit tests)   (outer loop: integration + e2e)
                                            └───────┬────────┘
                                                    ▼
                                              reviewer  (independent, read-only)
                                                    ▼
                                              release-eng  (CI / build / release)
```

## Principles (the five hard rules — this project's methodology truth)

- **Contract-first**: hand off via artifacts (`features/`, types, structured reports), not prose.
- **Independent verification**: `reviewer` ≠ `implementer`; reviewer is read-only and adversarial.
- **Don't split the inner loop**: the same agent (`implementer`) writes a unit's failing test and its code.
- **Least privilege**: tools encode the boundary (reviewer has no Write).
- **Parallelism needs isolation**: run concurrent implementers in git worktrees.
- **Persistent memory**: each agent carries `memory: project` + a `# Persistent Agent Memory` block — learnings accrue into `.claude/agent-memory/<agent>/` (per-agent, project-scoped, version-controlled & team-shared) and survive across conversations.

Invoke via the Agent tool (`subagent_type: <name>`). The main loop stays the orchestrator: it decomposes by feature, routes, and reconciles conflicts.
