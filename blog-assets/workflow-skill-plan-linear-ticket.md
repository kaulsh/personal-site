---
name: plan-linear-ticket
description:
    Fetches a Linear ticket by ID (e.g. SCORE-123), scans the codebase for
    relevant files, and produces a structured implementation plan in plan mode.
    Use when the user provides a Linear ticket ID like SCORE-XXX, mentions
    planning or implementing a ticket, or asks to plan work from a Linear issue.
    After the user approves the plan, post it as a comment on the Linear ticket
    using the Linear MCP.
---

# Plan Linear Ticket

Given a Linear ticket ID, fetch the ticket, scan the codebase, and develop a
structured implementation plan collaboratively in plan mode. Post the plan as a
Linear comment only when the user approves.

## Process

### 1. Fetch the ticket

Use the Linear MCP (`plugin-linear-linear` server, `get_issue` tool) to read:

-   Title, description, status, assignee
-   Existing comments — if a comment with `## Implementation plan` already
    exists, tell the user and ask whether to revise it or start fresh.

### 2. Scan the codebase

Search for files relevant to the ticket:

-   Components, pages, or routes mentioned or implied
-   Backend services, controllers, or handlers involved
-   Database models, schema files, or migrations affected
-   Shared utilities or types that may need updating

### 3. Ask clarifying questions (if needed)

If the ticket description is ambiguous or under-specified relative to the
codebase, ask questions **before** presenting the plan. Wait for answers.

### 4. Present the implementation plan

Output the plan inline in the conversation using this structure:

---

## Summary

One paragraph plain-English description of what this ticket does and why.

## Approach

High-level approach and any key architectural decisions or trade-offs.

## Frontend changes

For each UI change:

-   Component or page being modified/created
-   Specific changes (props, state, layout, new routes)
-   New user interactions or flows

## Backend changes

For each backend change:

-   Endpoint or service involved (new or modified)
-   Expected input/output shape
-   Async jobs, queues, or background processing
-   Error cases to handle

## Database changes

-   Schema changes (new tables, columns, index changes)
-   Migration notes (safe to run live? backfill needed?)
-   Query patterns to add or update

## File impact map

-   **Definite changes**: files that will certainly be modified
-   **Likely changes**: files that probably need updating
-   **Watch**: files that could be affected — verify during implementation

## Implementation steps

Ordered checklist of concrete implementation tasks.

## Edge cases & risks

Non-obvious scenarios, potential failure points, or areas to slow down and
verify.

---

### 5. Iterate

Present the plan and ask: _"Does this look right, or would you like to adjust
anything before I post it to Linear?"_

Revise based on feedback. Repeat until the user explicitly approves.

### 6. Post to Linear (on approval only)

When the user says the plan is ready, use the Linear MCP (`save_comment` tool)
to post the plan as a comment on the ticket. Then confirm:

-   Ticket ID and title
-   Any risks worth flagging before implementation begins

## Rules

-   Always fetch the ticket first — never work from memory
-   Never post to Linear without explicit user approval
-   Do not invent features not in the ticket
-   Flag architectural decisions explicitly rather than deciding silently
-   Check for an existing plan comment before posting — do not duplicate
